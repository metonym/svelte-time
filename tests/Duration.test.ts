import { flushSync, mount, tick, unmount } from "svelte";
import Duration from "./Duration.test.svelte";

describe("Duration", () => {
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

  test("renders as a <time> element with an ISO 8601 datetime attribute", () => {
    instance = mount(Duration, { target: document.body });
    flushSync();

    const el = getElement('[data-test="basic"]');
    expect(el.tagName).toEqual("TIME");
    expect(el.getAttribute("datetime")).toEqual("PT1H1M1S");
  });

  test("default value and format", () => {
    instance = mount(Duration, { target: document.body });
    flushSync();

    expect(getElement('[data-test="default"]').textContent).toEqual("00:00:00");
    expect(
      getElement('[data-test="default"]').getAttribute("datetime"),
    ).toEqual("P0D");
    expect(getElement('[data-test="basic"]').textContent).toEqual("01:01:01");
  });

  test("unit converts a numeric value before formatting", () => {
    instance = mount(Duration, { target: document.body });
    flushSync();

    const el = getElement('[data-test="value-seconds"]');
    expect(el.textContent).toEqual("01:30");
    expect(el.getAttribute("datetime")).toEqual("PT1M30S");
  });

  test("rollup: magnitude larger than the format's largest token rolls up instead of dropping", () => {
    instance = mount(Duration, { target: document.body });
    flushSync();

    // 90 minutes with format="mm:ss" -> "90:00", not "30:00"
    const minutes = getElement('[data-test="rollup-minutes"]');
    expect(minutes.textContent).toEqual("90:00");
    expect(minutes.getAttribute("datetime")).toEqual("PT1H30M");

    // 25 hours with format="HH:mm:ss" -> "25:00:00", not "01:00:00"
    const hours = getElement('[data-test="rollup-hours"]');
    expect(hours.textContent).toEqual("25:00:00");
  });

  test("value accepts an ISO 8601 duration string or a dayjs Duration instance", () => {
    instance = mount(Duration, { target: document.body });
    flushSync();

    expect(getElement('[data-test="value-iso-string"]').textContent).toEqual(
      "02:00:00",
    );
    expect(
      getElement('[data-test="value-duration-object"]').textContent,
    ).toEqual("02:00:00");
  });

  test("humanize and withSuffix", () => {
    instance = mount(Duration, { target: document.body });
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
    await import("dayjs/locale/es");

    instance = mount(Duration, { target: document.body });
    flushSync();

    expect(getElement('[data-test="locale-de"]').textContent).toEqual(
      "eine Stunde",
    );
    expect(getElement('[data-test="locale-es"]').textContent).toEqual(
      "2 minutos",
    );
  });

  test("since + live: renders elapsed time and ticks as time passes", async () => {
    instance = mount(Duration, { target: document.body });
    flushSync();

    const el = getElement('[data-test="since"]');
    expect(el.textContent).toEqual("00:00:00");

    vi.advanceTimersByTime(65_000);
    await tick();

    expect(el.textContent).toEqual("00:01:05");
  });
});
