import dayjs from "dayjs";
import { flushSync, mount, tick, unmount } from "svelte";
import RelativeThreshold from "./RelativeThreshold.test.svelte";

describe("relativeThreshold", () => {
  let instance: null | ReturnType<typeof mount> = null;
  const FIXED_DATE = new Date("2024-01-01T00:00:00.000Z");
  const THRESHOLD = 2 * 60 * 1_000; // 2 minutes, matches RelativeThreshold.test.svelte
  const FORMAT = "h:mm a";

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(FIXED_DATE);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    if (instance) {
      unmount(instance);
    }
    instance = null;
    document.body.innerHTML = "";
  });

  const getElement = (selector: string) => {
    const element = document.querySelector(selector);
    assert(element instanceof HTMLElement);
    return element;
  };

  test("under threshold: renders relative text with an absolute title", () => {
    instance = mount(RelativeThreshold, { target: document.body });
    flushSync();

    for (const selector of [
      '[data-test="component-threshold"]',
      '[data-test="action-threshold"]',
      '[data-test="attachment-threshold"]',
    ]) {
      const element = getElement(selector);
      expect(/ago/.test(element.textContent ?? "")).toEqual(true);
      expect(element.title).toEqual(dayjs(FIXED_DATE).format(FORMAT));
    }
  });

  test("already past threshold at mount: shows absolute format immediately, no relative flash", () => {
    instance = mount(RelativeThreshold, { target: document.body });
    flushSync();

    const element = getElement('[data-test="component-already-past"]');
    const alreadyOld = dayjs(FIXED_DATE).subtract(2 * THRESHOLD, "millisecond");
    expect(element.textContent).toEqual(alreadyOld.format(FORMAT));
    expect(element.title).toBeFalsy();
  });

  test("crosses threshold while mounted: flips from relative to absolute, live", async () => {
    instance = mount(RelativeThreshold, { target: document.body });
    flushSync();

    const component = getElement('[data-test="component-threshold"]');
    const action = getElement('[data-test="action-threshold"]');
    const attachment = getElement('[data-test="attachment-threshold"]');

    expect(/ago/.test(component.textContent ?? "")).toEqual(true);
    expect(/ago/.test(action.textContent ?? "")).toEqual(true);
    expect(/ago/.test(attachment.textContent ?? "")).toEqual(true);

    // Still under the 2-minute threshold.
    vi.advanceTimersByTime(THRESHOLD / 2);
    await tick();
    expect(/ago/.test(component.textContent ?? "")).toEqual(true);
    expect(/ago/.test(action.textContent ?? "")).toEqual(true);
    expect(/ago/.test(attachment.textContent ?? "")).toEqual(true);

    // Crosses the threshold.
    vi.advanceTimersByTime(THRESHOLD);
    await tick();

    // The absolute display formats the original timestamp (FIXED_DATE),
    // not "now" — crossing the threshold doesn't change what's shown.
    const expected = dayjs(FIXED_DATE).format(FORMAT);

    expect(component.textContent).toEqual(expected);
    expect(component.title).toBeFalsy();

    expect(action.textContent).toEqual(expected);
    expect(action.title).toBeFalsy();

    expect(attachment.textContent).toEqual(expected);
    expect(attachment.title).toBeFalsy();
  });

  test("default (relativeThreshold unset): existing relative behavior is unaffected", async () => {
    instance = mount(RelativeThreshold, { target: document.body });
    flushSync();

    const element = getElement('[data-test="component-default"]');
    expect(/ago/.test(element.textContent ?? "")).toEqual(true);
    expect(element.title).toBeTruthy();

    // Advance well past what would be a threshold in the other cases.
    vi.advanceTimersByTime(THRESHOLD * 2);
    await tick();

    expect(/ago/.test(element.textContent ?? "")).toEqual(true);
    expect(element.title).toBeTruthy();
  });
});
