import { flushSync, mount, tick, unmount } from "svelte";
import Stopwatch from "./Stopwatch.test.svelte";

describe("Stopwatch", () => {
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

  test("renders as a <time> element counting up from `since`", () => {
    instance = mount(Stopwatch, { target: document.body });
    flushSync();

    const el = getElement('[data-test="basic"]');
    expect(el.tagName).toEqual("TIME");
    expect(el.textContent).toEqual("00:05:00");
    expect(el.getAttribute("datetime")).toEqual("PT5M");
  });

  test("format controls the displayed template", () => {
    instance = mount(Stopwatch, { target: document.body });
    flushSync();

    expect(getElement('[data-test="format-mm-ss"]').textContent).toEqual(
      "05:00",
    );
  });

  test("humanize and withSuffix", () => {
    instance = mount(Stopwatch, { target: document.body });
    flushSync();

    expect(getElement('[data-test="humanize-default"]').textContent).toEqual(
      "an hour",
    );
    expect(
      getElement('[data-test="humanize-with-suffix"]').textContent,
    ).toEqual("in an hour");
  });

  test("locale formatting", async () => {
    await import("dayjs/locale/de");

    instance = mount(Stopwatch, { target: document.body });
    flushSync();

    expect(getElement('[data-test="locale-de"]').textContent).toEqual(
      "eine Stunde",
    );
  });

  test("live (default): ticks up every second", async () => {
    instance = mount(Stopwatch, { target: document.body });
    flushSync();

    const el = getElement('[data-test="live"]');
    expect(el.textContent).toEqual("00:00:00");

    vi.advanceTimersByTime(1000);
    await tick();
    expect(el.textContent).toEqual("00:00:01");

    vi.advanceTimersByTime(5000);
    await tick();
    expect(el.textContent).toEqual("00:00:06");
  });

  test("live as a number uses a custom fixed interval", async () => {
    instance = mount(Stopwatch, { target: document.body });
    flushSync();

    const el = getElement('[data-test="live-custom-interval"]');
    expect(el.textContent).toEqual("00:00:00");

    vi.advanceTimersByTime(5000);
    await tick();
    expect(el.textContent).toEqual("00:00:05");
  });

  test("`running={false}` freezes the display, and resuming excludes the paused interval", async () => {
    instance = mount(Stopwatch, { target: document.body });
    flushSync();

    const value = getElement('[data-test="pause-value"]');
    const runningFlag = getElement('[data-test="pause-running"]');
    const toggle = getElement('[data-test="btn-toggle-pause"]');

    expect(value.textContent).toEqual("00:00:00");
    expect(runningFlag.textContent).toEqual("true");

    vi.advanceTimersByTime(3000);
    await tick();
    expect(value.textContent).toEqual("00:00:03");

    // Pause: freezes the displayed elapsed value.
    toggle.click();
    flushSync();
    expect(runningFlag.textContent).toEqual("false");
    expect(value.textContent).toEqual("00:00:03");

    vi.advanceTimersByTime(5000);
    await tick();
    expect(value.textContent).toEqual("00:00:03");

    // Resume: the paused interval is excluded from elapsed time.
    toggle.click();
    flushSync();
    expect(runningFlag.textContent).toEqual("true");
    expect(value.textContent).toEqual("00:00:03");

    vi.advanceTimersByTime(2000);
    await tick();
    expect(value.textContent).toEqual("00:00:05");
  });

  test("changing `since` resets the stopwatch to zero and restarts", async () => {
    instance = mount(Stopwatch, { target: document.body });
    flushSync();

    const el = getElement('[data-test="reset"]');
    expect(el.textContent).toEqual("00:00:00");

    vi.advanceTimersByTime(3000);
    await tick();
    expect(el.textContent).toEqual("00:00:03");

    const button = getElement('[data-test="btn-restart"]');
    button.click();
    flushSync();

    expect(el.textContent).toEqual("00:00:00");

    vi.advanceTimersByTime(2000);
    await tick();
    expect(el.textContent).toEqual("00:00:02");
  });

  test("children snippet receives the formatted value and the running state", () => {
    instance = mount(Stopwatch, { target: document.body });
    flushSync();

    expect(getElement('[data-test="pause-value"]').textContent).toEqual(
      "00:00:00",
    );
    expect(getElement('[data-test="pause-running"]').textContent).toEqual(
      "true",
    );
  });
});
