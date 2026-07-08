import { flushSync, mount, tick, unmount } from "svelte";
import DurationAttachment from "./DurationAttachment.test.svelte";

describe("duration attachment", () => {
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
    instance = mount(DurationAttachment, { target: document.body });
    flushSync();

    const el = getElement('[data-test="basic"]');
    expect(el.textContent).toEqual("01:01:01");
    expect(el.getAttribute("datetime")).toEqual("PT1H1M1S");
  });

  test("rollup: excess magnitude rolls into the largest present token", () => {
    instance = mount(DurationAttachment, { target: document.body });
    flushSync();

    expect(getElement('[data-test="rollup"]').textContent).toEqual("90:00");
  });

  test("humanize + withSuffix", () => {
    instance = mount(DurationAttachment, { target: document.body });
    flushSync();

    expect(getElement('[data-test="humanize"]').textContent).toEqual(
      "in an hour",
    );
  });

  test("since + live: ticks as time passes via the shared clock", async () => {
    instance = mount(DurationAttachment, { target: document.body });
    flushSync();

    const el = getElement('[data-test="since"]');
    expect(el.textContent).toEqual("00:00:00");

    vi.advanceTimersByTime(65_000);
    await tick();

    expect(el.textContent).toEqual("00:01:05");
  });
});
