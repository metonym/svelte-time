import { flushSync, mount, tick, unmount } from "svelte";
import SvelteCountdownAction from "./SvelteCountdownAction.test.svelte";

describe("svelteCountdown action", () => {
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
    instance = mount(SvelteCountdownAction, { target: document.body });
    flushSync();

    const el = getElement('[data-test="basic"]');
    expect(el.tagName).toEqual("TIME");
    expect(el.textContent).toEqual("00:05:00");
    expect(el.getAttribute("datetime")).toEqual("PT5M");
  });

  test("works on non-time elements too", () => {
    instance = mount(SvelteCountdownAction, { target: document.body });
    flushSync();

    const el = getElement('[data-test="basic-span"]');
    expect(el.tagName).toEqual("SPAN");
    expect(el.textContent).toEqual("00:05:00");
  });

  test("format controls the displayed template", () => {
    instance = mount(SvelteCountdownAction, { target: document.body });
    flushSync();

    expect(getElement('[data-test="format-mm-ss"]').textContent).toEqual(
      "05:00",
    );
  });

  test("humanize + withSuffix", () => {
    instance = mount(SvelteCountdownAction, { target: document.body });
    flushSync();

    expect(getElement('[data-test="humanize"]').textContent).toEqual(
      "in 5 minutes",
    );
  });

  test("locale", async () => {
    await import("dayjs/locale/de");

    instance = mount(SvelteCountdownAction, { target: document.body });
    flushSync();

    expect(getElement('[data-test="locale"]').textContent).toEqual("5 Minuten");
  });

  test("live (default): ticks every second and clamps at zero", async () => {
    instance = mount(SvelteCountdownAction, { target: document.body });
    flushSync();

    const el = getElement('[data-test="live"]');
    expect(el.textContent).toEqual("00:00:02");

    vi.advanceTimersByTime(1000);
    await tick();
    expect(el.textContent).toEqual("00:00:01");

    vi.advanceTimersByTime(5000);
    await tick();
    expect(el.textContent).toEqual("00:00:00");
  });

  test("oncomplete fires exactly once when the countdown reaches zero", async () => {
    const oncomplete = vi.fn();
    instance = mount(SvelteCountdownAction, {
      target: document.body,
      props: { oncomplete },
    });
    flushSync();

    expect(oncomplete).not.toHaveBeenCalled();

    vi.advanceTimersByTime(2000);
    await tick();
    expect(oncomplete).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(10_000);
    await tick();
    expect(oncomplete).toHaveBeenCalledTimes(1);
  });
});
