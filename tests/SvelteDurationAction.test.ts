import { flushSync, mount, tick, unmount } from "svelte";
import SvelteDurationAction from "./SvelteDurationAction.test.svelte";

describe("svelteDuration action", () => {
  let instance: null | ReturnType<typeof mount> = null;
  const FIXED_DATE = new Date("2024-01-01T00:00:00.000Z");

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

  test("sets datetime and text on a <time> element", () => {
    instance = mount(SvelteDurationAction, { target: document.body });
    flushSync();

    const el = getElement('[data-test="basic"]');
    expect(el.tagName).toEqual("TIME");
    expect(el.textContent).toEqual("01:01:01");
    expect(el.getAttribute("datetime")).toEqual("PT1H1M1S");
  });

  test("works on non-time elements too", () => {
    instance = mount(SvelteDurationAction, { target: document.body });
    flushSync();

    const el = getElement('[data-test="basic-span"]');
    expect(el.tagName).toEqual("SPAN");
    expect(el.textContent).toEqual("01:01:01");
  });

  test("rollup: excess magnitude rolls into the largest present token", () => {
    instance = mount(SvelteDurationAction, { target: document.body });
    flushSync();

    expect(getElement('[data-test="rollup"]').textContent).toEqual("90:00");
  });

  test("humanize + withSuffix", () => {
    instance = mount(SvelteDurationAction, { target: document.body });
    flushSync();

    expect(getElement('[data-test="humanize"]').textContent).toEqual(
      "in an hour",
    );
  });

  test("locale", async () => {
    await import("dayjs/locale/de");

    instance = mount(SvelteDurationAction, { target: document.body });
    flushSync();

    expect(getElement('[data-test="locale"]').textContent).toEqual(
      "eine Stunde",
    );
  });

  test("since + live: ticks as time passes", async () => {
    instance = mount(SvelteDurationAction, { target: document.body });
    flushSync();

    const el = getElement('[data-test="since"]');
    expect(el.textContent).toEqual("00:00:00");

    vi.advanceTimersByTime(5_000);
    await tick();

    expect(el.textContent).toEqual("00:00:05");
  });
});
