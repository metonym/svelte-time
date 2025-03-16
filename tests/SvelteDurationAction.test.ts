import { flushSync, mount, tick, unmount } from "svelte";
import SvelteDurationAction from "./SvelteDurationAction.test.svelte";

describe("svelteDuration action", () => {
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

  test("works with time element and sets datetime attribute", async () => {
    const target = document.body;
    instance = mount(SvelteDurationAction, { target });
    flushSync();

    const timeElement = getElement('[data-test="basic"]')!;
    expect(timeElement.tagName).toEqual("TIME");
    // Default behavior: raw milliseconds
    expect(timeElement.innerText).toEqual("3600000");
    expect(timeElement.getAttribute("datetime")).toEqual("PT1H");
  });

  test("works with span element", async () => {
    const target = document.body;
    instance = mount(SvelteDurationAction, { target });
    flushSync();

    const spanElement = getElement('[data-test="basic-span"]')!;
    expect(spanElement.tagName).toEqual("SPAN");
    // Default behavior: raw milliseconds
    expect(spanElement.innerText).toEqual("3600000");
  });

  test("formats duration correctly", async () => {
    const target = document.body;
    instance = mount(SvelteDurationAction, { target });
    flushSync();

    const withUnit = getElement('[data-test="with-unit"]')!;
    // Default behavior: raw milliseconds (90 seconds = 90000 ms)
    expect(withUnit.innerText).toEqual("90000");
    expect(withUnit.getAttribute("datetime")).toEqual("PT1M30S");

    const withFormat = getElement('[data-test="with-format"]')!;
    expect(withFormat.innerText).toEqual("01:00:00");
    expect(withFormat.getAttribute("datetime")).toEqual("PT1H");
  });

  test("locale formatting", async () => {
    // Import locales
    await import("dayjs/locale/de");

    const target = document.body;
    instance = mount(SvelteDurationAction, { target });
    flushSync();

    const withLocale = getElement('[data-test="with-locale"]')!;
    expect(withLocale.innerText).toEqual("eine Stunde");
    expect(withLocale.getAttribute("datetime")).toEqual("PT1H");
  });

  test("live updates", async () => {
    const target = document.body;
    instance = mount(SvelteDurationAction, { target });
    flushSync();

    const live = getElement('[data-test="live"]')!;
    expect(live.innerText).toEqual("an hour");
    expect(live.getAttribute("datetime")).toEqual("PT1H");

    // Advance time by 60 seconds (default interval)
    vi.advanceTimersByTime(60 * 1000);
    await tick();
    expect(live.innerText).toEqual("an hour");
    expect(live.getAttribute("datetime")).toEqual("PT1H");
  });
});
