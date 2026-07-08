import { flushSync, mount, tick, unmount } from "svelte";
import Countdown from "./Countdown.test.svelte";

describe("Countdown", () => {
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

  test("renders as a <time> element counting down to a future instant", () => {
    instance = mount(Countdown, { target: document.body });
    flushSync();

    const el = getElement('[data-test="basic"]');
    expect(el.tagName).toEqual("TIME");
    expect(el.textContent).toEqual("00:05:00");
    expect(el.getAttribute("datetime")).toEqual("PT5M");
  });

  test("format controls the displayed template", () => {
    instance = mount(Countdown, { target: document.body });
    flushSync();

    expect(getElement('[data-test="format-mm-ss"]').textContent).toEqual(
      "05:00",
    );
  });

  test("humanize and withSuffix", () => {
    instance = mount(Countdown, { target: document.body });
    flushSync();

    expect(getElement('[data-test="humanize-default"]').textContent).toEqual(
      "5 minutes",
    );
    expect(
      getElement('[data-test="humanize-with-suffix"]').textContent,
    ).toEqual("in 5 minutes");
  });

  test("locale formatting", async () => {
    await import("dayjs/locale/de");

    instance = mount(Countdown, { target: document.body });
    flushSync();

    expect(getElement('[data-test="locale-de"]').textContent).toEqual(
      "5 Minuten",
    );
  });

  test("live: ticks down and clamps at zero", async () => {
    instance = mount(Countdown, { target: document.body });
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
    instance = mount(Countdown, {
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

  test("a target already in the past renders zero immediately", () => {
    instance = mount(Countdown, { target: document.body });
    flushSync();

    expect(getElement('[data-test="already-past"]').textContent).toEqual(
      "00:00:00",
    );
  });

  test("children snippet receives the formatted value and the done flag", async () => {
    instance = mount(Countdown, { target: document.body });
    flushSync();

    expect(getElement('[data-test="children-value"]').textContent).toEqual(
      "00:00:02",
    );
    expect(getElement('[data-test="children-done"]').textContent).toEqual(
      "false",
    );

    vi.advanceTimersByTime(2000);
    await tick();

    expect(getElement('[data-test="children-value"]').textContent).toEqual(
      "00:00:00",
    );
    expect(getElement('[data-test="children-done"]').textContent).toEqual(
      "true",
    );
  });

  test("changing `to` restarts the countdown and re-arms oncomplete", async () => {
    instance = mount(Countdown, { target: document.body });
    flushSync();

    const el = getElement('[data-test="reset"]');
    const calls = getElement('[data-test="reset-oncomplete-calls"]');

    // Starts already-past -> completes immediately.
    expect(el.textContent).toEqual("00:00:00");
    expect(calls.textContent).toEqual("1");

    const button = getElement('[data-test="btn-restart"]');
    button.click();
    flushSync();

    expect(el.textContent).toEqual("00:00:02");
    expect(calls.textContent).toEqual("1");

    vi.advanceTimersByTime(2000);
    await tick();

    expect(el.textContent).toEqual("00:00:00");
    expect(calls.textContent).toEqual("2");
  });
});
