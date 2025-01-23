import dayjs from "dayjs";
import { flushSync, mount, tick, unmount } from "svelte";
import { dayjs as dayjsExported } from "svelte-time";
import SvelteTime from "./SvelteTime.test.svelte";
import SvelteTimeLive from "./SvelteTimeLive.test.svelte";
import SvelteTimeCustomTitle from "./SvelteTimeCustomTitle.test.svelte";

describe("svelte-time", () => {
  let instance: null | Record<string, any> = null;

  // Use a fixed date for testing to avoid drift.
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
    return document.querySelector(selector) as HTMLElement;
  };

  const DEFAULT_TIME = dayjs(FIXED_DATE).format("MMM DD, YYYY");

  test("SvelteTime.test.svelte", async () => {
    const target = document.body;

    instance = mount(SvelteTime, { target });
    flushSync();

    const date = new Date();
    const timestamp = date.toISOString();

    const defaultComponent = getElement('[data-test="default"]')!;
    expect(defaultComponent.innerHTML).toEqual(DEFAULT_TIME);
    expect(defaultComponent.innerHTML).toEqual(dayjs().format("MMM DD, YYYY"));

    const timestampString = getElement('[data-test="timestamp-string"]')!;
    expect(timestampString.innerHTML).toEqual("Feb 01, 2020");
    expect(timestampString.getAttribute("datetime")).toEqual("2020-02-01");

    const timestampDate = getElement('[data-test="timestamp-date"]')!;
    expect(timestampDate.innerHTML).toEqual(
      dayjs(date).format("dddd @ h:mm a"),
    );
    expect(timestampDate.getAttribute("datetime")).toEqual(date + "");

    const timestampNumber = getElement('[data-test="timestamp-number"]')!;
    expect(timestampNumber.innerHTML).toEqual(
      dayjs(1e10).format("dddd @ h:mm A · MMMM D, YYYY"),
    );
    expect(timestampNumber.getAttribute("datetime")).toEqual(1e10 + "");

    const relative = getElement('[data-test="relative"]')!;
    expect(relative.innerHTML).toEqual("a few seconds ago");
    expect(relative.getAttribute("datetime")).toEqual(timestamp);

    const relativeTimestamp = getElement('[data-test="relative-timestamp"]')!;
    expect(/ago/.test(relativeTimestamp.innerHTML)).toEqual(true);
    expect(relativeTimestamp.getAttribute("datetime")).toEqual("2021-02-02");

    const relativeTimestampNumber = getElement(
      '[data-test="relative-timestamp-number"]',
    )!;
    expect(relativeTimestampNumber.innerHTML).toEqual("54 years ago");
    expect(relativeTimestampNumber.getAttribute("datetime")).toEqual(1e10 + "");

    const relativeLive = getElement('[data-test="relative-live"]');
    const actionRelativeLive = getElement('[data-test="action-relative-live"]');

    expect(relativeLive.title).toEqual(DEFAULT_TIME);
    expect(actionRelativeLive.title).toEqual(DEFAULT_TIME);
    expect(relativeLive.innerHTML).toEqual("a few seconds ago");
    expect(actionRelativeLive.innerText).toEqual("a few seconds ago");
    expect(relativeLive.getAttribute("datetime")).toEqual(timestamp);
    expect(actionRelativeLive.getAttribute("datetime")).toEqual(timestamp);

    vi.runOnlyPendingTimers();
    await tick();
    expect(relativeLive.title).toEqual(DEFAULT_TIME);
    expect(actionRelativeLive.title).toEqual(DEFAULT_TIME);
    expect(relativeLive.innerHTML).toEqual("a minute ago");
    expect(actionRelativeLive.innerText).toEqual("a minute ago");
    expect(actionRelativeLive.title).toEqual(DEFAULT_TIME);
    expect(relativeLive.getAttribute("datetime")).toEqual(timestamp);
    expect(actionRelativeLive.getAttribute("datetime")).toEqual(timestamp);

    vi.runOnlyPendingTimers();
    await tick();
    expect(relativeLive.title).toEqual(DEFAULT_TIME);
    expect(actionRelativeLive.title).toEqual(DEFAULT_TIME);
    expect(relativeLive.innerHTML).toEqual("2 minutes ago");
    expect(actionRelativeLive.innerText).toEqual("2 minutes ago");
    expect(actionRelativeLive.title).toEqual(DEFAULT_TIME);
    expect(relativeLive.getAttribute("datetime")).toEqual(timestamp);
    expect(actionRelativeLive.getAttribute("datetime")).toEqual(timestamp);

    const action = getElement('[data-test="action"]');
    expect(action.innerText).toEqual(DEFAULT_TIME);
    expect(action.getAttribute("datetime")).toEqual(timestamp);

    const actionTimestampFormat = getElement(
      '[data-test="action-timestamp-format"]',
    );
    expect(actionTimestampFormat.innerText).toEqual(
      dayjs("2021-02-02").format("dddd @ h:mm A · MMMM D, YYYY"),
    );
    expect(actionTimestampFormat.getAttribute("datetime")).toEqual(
      "2021-02-02",
    );

    const dayjsOnly = getElement('[data-test="dayjs"]')!;
    expect(dayjsOnly.innerHTML).toEqual(DEFAULT_TIME);

    const dayjsOnlyRelative = getElement('[data-test="dayjs-relative"]')!;
    expect(dayjsOnlyRelative.innerHTML).toEqual("a few seconds ago");
  });

  test("SvelteTimeLive.test.svelte", async () => {
    const target = document.body;

    instance = mount(SvelteTimeLive, { target });
    flushSync();

    const date = new Date();
    const timestamp = date.toISOString();

    const relativeLive = getElement('[data-test="relative-live"]');
    const actionRelativeLive = getElement('[data-test="action-relative-live"]');

    expect(relativeLive.title).toEqual(DEFAULT_TIME);
    expect(actionRelativeLive.title).toEqual(DEFAULT_TIME);
    expect(relativeLive.innerHTML).toEqual("a few seconds ago");
    expect(actionRelativeLive.innerText).toEqual("a few seconds ago");
    expect(relativeLive.getAttribute("datetime")).toEqual(timestamp);
    expect(actionRelativeLive.getAttribute("datetime")).toEqual(timestamp);

    vi.runOnlyPendingTimers(); // 30 seconds
    await tick();
    expect(relativeLive.title).toEqual(DEFAULT_TIME);
    expect(actionRelativeLive.title).toEqual(DEFAULT_TIME);
    expect(relativeLive.innerHTML).toEqual("a few seconds ago");
    expect(actionRelativeLive.innerText).toEqual("a few seconds ago");
    expect(relativeLive.getAttribute("datetime")).toEqual(timestamp);
    expect(actionRelativeLive.getAttribute("datetime")).toEqual(timestamp);

    vi.runOnlyPendingTimers(); // 60 seconds
    await tick();
    expect(relativeLive.title).toEqual(DEFAULT_TIME);
    expect(actionRelativeLive.title).toEqual(DEFAULT_TIME);
    expect(relativeLive.innerHTML).toEqual("a minute ago");
    expect(actionRelativeLive.innerText).toEqual("a minute ago");
    expect(relativeLive.getAttribute("datetime")).toEqual(timestamp);
    expect(actionRelativeLive.getAttribute("datetime")).toEqual(timestamp);

    vi.runOnlyPendingTimers(); // 90 seconds
    await tick();
    expect(relativeLive.title).toEqual(DEFAULT_TIME);
    expect(actionRelativeLive.title).toEqual(DEFAULT_TIME);
    expect(relativeLive.innerHTML).toEqual("2 minutes ago");
    expect(actionRelativeLive.innerText).toEqual("2 minutes ago");
    expect(relativeLive.getAttribute("datetime")).toEqual(timestamp);
    expect(actionRelativeLive.getAttribute("datetime")).toEqual(timestamp);

    vi.runOnlyPendingTimers(); // 120 seconds
    await tick();
    expect(relativeLive.title).toEqual(DEFAULT_TIME);
    expect(actionRelativeLive.title).toEqual(DEFAULT_TIME);
    expect(relativeLive.innerHTML).toEqual("2 minutes ago");
    expect(actionRelativeLive.innerText).toEqual("2 minutes ago");
    expect(relativeLive.getAttribute("datetime")).toEqual(timestamp);
    expect(actionRelativeLive.getAttribute("datetime")).toEqual(timestamp);
  });

  test("SvelteTimeCustomTitle.test.svelte", async () => {
    const target = document.body;

    instance = mount(SvelteTimeCustomTitle, { target });
    flushSync();

    const relativeLive = getElement('[data-test="custom-title"]');
    const relativeLiveOmit = getElement('[data-test="custom-title-omit"]');
    const actionRelativeLive = getElement('[data-test="action-custom-title"]');
    const actionRelativeOmit = getElement(
      '[data-test="action-custom-title-omit"]',
    );

    expect(relativeLiveOmit.title).toEqual("");
    expect(relativeLive.title).toEqual("Custom title");
    expect(actionRelativeLive.title).toEqual("Custom title");
    expect(actionRelativeOmit.title).toEqual("");
  });

  test("exported dayjs", () => {
    expect(dayjsExported().from(dayjsExported())).toEqual("a few seconds ago");
  });
});
