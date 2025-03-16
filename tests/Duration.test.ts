import dayjs from "dayjs";
import { flushSync, mount, tick, unmount } from "svelte";
import Duration from "./Duration.test.svelte";

describe("Duration", () => {
  let instance: null | ReturnType<typeof mount> = null;

  beforeEach(() => {
    vi.useFakeTimers();
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
    return document.querySelector(selector) as HTMLElement;
  };

  test("renders as time element with datetime attribute", () => {
    const target = document.body;

    instance = mount(Duration, { target });
    flushSync();

    // Verify element is a <time> element, not <span>
    const defaultComponent = getElement('[data-test="default"]')!;
    expect(defaultComponent.tagName).toEqual("TIME");
    expect(defaultComponent.getAttribute("datetime")).toEqual("PT1H");

    const valueSeconds = getElement('[data-test="value-seconds"]')!;
    expect(valueSeconds.tagName).toEqual("TIME");
    expect(valueSeconds.getAttribute("datetime")).toEqual("PT1M30S");

    const valueDurationObject = getElement(
      '[data-test="value-duration-object"]',
    )!;
    expect(valueDurationObject.tagName).toEqual("TIME");
    expect(valueDurationObject.getAttribute("datetime")).toEqual("PT2H");
  });

  test("formats duration correctly", () => {
    const target = document.body;

    instance = mount(Duration, { target });
    flushSync();

    const defaultComponent = getElement('[data-test="default"]')!;
    // Default behavior: raw milliseconds
    expect(defaultComponent.innerHTML).toEqual("3600000");

    const valueSeconds = getElement('[data-test="value-seconds"]')!;
    // Default behavior: raw milliseconds (90 seconds = 90000 ms)
    expect(valueSeconds.innerHTML).toEqual("90000");

    const humanizeDefault = getElement('[data-test="humanize-default"]')!;
    expect(humanizeDefault.innerHTML).toEqual("an hour");

    const humanizeFalseFormat = getElement(
      '[data-test="humanize-false-format"]',
    )!;
    expect(humanizeFalseFormat.innerHTML).toEqual("01:00:00");

    const humanizeFalseFormatShort = getElement(
      '[data-test="humanize-false-format-short"]',
    )!;
    expect(humanizeFalseFormatShort.innerHTML).toEqual("90:00");
  });

  test("locale formatting", async () => {
    // Import locales before mounting
    await import("dayjs/locale/de");
    await import("dayjs/locale/es");

    const target = document.body;

    instance = mount(Duration, { target });
    flushSync();

    const localeDe = getElement('[data-test="locale-de"]')!;
    expect(localeDe.innerHTML).toEqual("eine Stunde");
    expect(localeDe.getAttribute("datetime")).toEqual("PT1H");

    const localeEs = getElement('[data-test="locale-es"]')!;
    expect(localeEs.innerHTML).toEqual("2 minutos");
    expect(localeEs.getAttribute("datetime")).toEqual("PT2M");
  });

  test("live updates", async () => {
    const target = document.body;

    instance = mount(Duration, { target });
    flushSync();

    const live = getElement('[data-test="live"]')!;
    expect(live.tagName).toEqual("TIME");
    expect(live.getAttribute("datetime")).toEqual("PT1H");
    expect(live.innerHTML).toEqual("an hour");

    // Advance time by 60 seconds (default interval)
    vi.advanceTimersByTime(60 * 1000);
    await tick();
    expect(live.getAttribute("datetime")).toEqual("PT1H");
    expect(live.innerHTML).toEqual("an hour");

    const liveCustomInterval = getElement(
      '[data-test="live-custom-interval"]',
    )!;
    expect(liveCustomInterval.tagName).toEqual("TIME");
    expect(liveCustomInterval.getAttribute("datetime")).toEqual("PT1H");
    expect(liveCustomInterval.innerHTML).toEqual("60:00");

    // Advance time by 1 second (custom interval)
    vi.advanceTimersByTime(1000);
    await tick();
    expect(liveCustomInterval.getAttribute("datetime")).toEqual("PT1H");
    expect(liveCustomInterval.innerHTML).toEqual("60:00");
  });

  test("ISO 8601 duration format in datetime attribute", () => {
    const target = document.body;

    instance = mount(Duration, { target });
    flushSync();

    // Test various durations and their ISO 8601 representations
    const oneHour = getElement('[data-test="default"]')!;
    expect(oneHour.getAttribute("datetime")).toEqual("PT1H");

    const oneMinuteThirty = getElement('[data-test="value-seconds"]')!;
    expect(oneMinuteThirty.getAttribute("datetime")).toEqual("PT1M30S");

    const twoHours = getElement('[data-test="value-duration-object"]')!;
    expect(twoHours.getAttribute("datetime")).toEqual("PT2H");
  });
});
