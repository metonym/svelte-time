import { test, expect, describe, afterEach, vi } from "vitest";
import dayjs from "dayjs";
import SvelteTime from "./SvelteTime.test.svelte";
import { tick } from "svelte";

describe("svelte-time", () => {
  let instance = null;

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    instance?.$destroy();
    instance = null;
    document.body.innerHTML = "";
  });

  test("SvelteTime.test.svelte", async () => {
    const target = document.body;

    instance = new SvelteTime({
      target,
    });

    const DEFAULT_TIME = dayjs(new Date().toISOString()).format("MMM DD, YYYY");

    const defaultComponent = target.querySelector('[data-test="default"]');
    expect(defaultComponent.innerHTML).toEqual(DEFAULT_TIME);
    expect(defaultComponent.innerHTML).toEqual(dayjs().format("MMM DD, YYYY"));

    const timestampString = target.querySelector('[data-test="timestamp-string"]');
    expect(timestampString.innerHTML).toEqual("Feb 01, 2020");

    const timestampDate = target.querySelector('[data-test="timestamp-date"]');
    expect(timestampDate.innerHTML).toEqual(dayjs(new Date()).format("dddd @ h:mm a"));

    const timestampNumber = target.querySelector('[data-test="timestamp-number"]');
    expect(timestampNumber.innerHTML).toEqual(dayjs(1e10).format("dddd @ h:mm A · MMMM D, YYYY"));

    const relative = target.querySelector('[data-test="relative"]');
    expect(relative.innerHTML).toEqual("a few seconds ago");

    const relativeTimestamp = target.querySelector('[data-test="relative-timestamp"]');
    expect(relativeTimestamp.innerHTML).toEqual("a year ago");

    const relativeTimestampNumber = target.querySelector('[data-test="relative-timestamp-number"]');
    expect(relativeTimestampNumber.innerHTML).toEqual("52 years ago");

    const relativeLive = target.querySelector('[data-test="relative-live"]');
    const actionRelativeLive = target.querySelector('[data-test="action-relative-live"]');

    expect(relativeLive.innerHTML).toEqual("a few seconds ago");
    expect(actionRelativeLive.innerText).toEqual("a few seconds ago");

    vi.runOnlyPendingTimers();
    await tick();
    expect(relativeLive.innerHTML).toEqual("a minute ago");
    expect(actionRelativeLive.innerText).toEqual("a minute ago");

    vi.runOnlyPendingTimers();
    await tick();
    expect(relativeLive.innerHTML).toEqual("2 minutes ago");
    expect(actionRelativeLive.innerText).toEqual("2 minutes ago");

    const action = target.querySelector('[data-test="action"]');
    expect(action.innerText).toEqual(DEFAULT_TIME);

    const actionTimestampFormat = target.querySelector('[data-test="action-timestamp-format"]');
    expect(actionTimestampFormat.innerText).toEqual(
      dayjs("2021-02-02").format("dddd @ h:mm A · MMMM D, YYYY")
    );

    const dayjsOnly = target.querySelector('[data-test="dayjs"]');
    expect(dayjsOnly.innerHTML).toEqual(DEFAULT_TIME);
  });
});
