import { flushSync, mount, tick, unmount } from "svelte";
import StopwatchAttachment from "./StopwatchAttachment.test.svelte";

describe("stopwatch attachment", () => {
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

  test("basic render: textContent and datetime are correct", () => {
    instance = mount(StopwatchAttachment, { target: document.body });
    flushSync();

    const el = getElement('[data-test="basic"]');
    expect(el.textContent).toEqual("00:05:00");
    expect(el.getAttribute("datetime")).toEqual("PT5M");
  });

  test("format controls the displayed template", () => {
    instance = mount(StopwatchAttachment, { target: document.body });
    flushSync();

    expect(getElement('[data-test="format-mm-ss"]').textContent).toEqual(
      "05:00",
    );
  });

  test("humanize + withSuffix", () => {
    instance = mount(StopwatchAttachment, { target: document.body });
    flushSync();

    expect(getElement('[data-test="humanize"]').textContent).toEqual(
      "in an hour",
    );
  });

  test("live (default): ticks up every second via the shared clock", async () => {
    instance = mount(StopwatchAttachment, { target: document.body });
    flushSync();

    const el = getElement('[data-test="live"]');
    expect(el.textContent).toEqual("00:00:00");

    vi.advanceTimersByTime(1000);
    await tick();

    expect(el.textContent).toEqual("00:00:01");
  });

  test("pausing freezes the display and resuming excludes the paused interval", async () => {
    instance = mount(StopwatchAttachment, { target: document.body });
    flushSync();

    const el = getElement('[data-test="pause"]');
    const toggle = getElement('[data-test="btn-toggle-pause"]');

    expect(el.textContent).toEqual("00:00:00");

    vi.advanceTimersByTime(3000);
    await tick();
    expect(el.textContent).toEqual("00:00:03");

    toggle.click();
    flushSync();

    vi.advanceTimersByTime(5000);
    await tick();
    expect(el.textContent).toEqual("00:00:03");

    toggle.click();
    flushSync();
    expect(el.textContent).toEqual("00:00:03");

    vi.advanceTimersByTime(2000);
    await tick();
    expect(el.textContent).toEqual("00:00:05");
  });
});
