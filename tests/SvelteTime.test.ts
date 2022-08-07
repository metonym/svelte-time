import { test, expect, describe, beforeEach, afterEach, vi } from "vitest";
import dayjs from "dayjs";
import { SvelteComponent, tick } from "svelte";
import { dayjs as dayjsExported } from "../src";
import SvelteTime from "./SvelteTime.test.svelte";
import SvelteTimeLive from "./SvelteTimeLive.test.svelte";

describe("svelte-time", () => {
  let instance: null | SvelteComponent = null;

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    instance?.$destroy();
    instance = null;
    document.body.innerHTML = "";
  });

  const DEFAULT_TIME = dayjs(new Date().toISOString()).format("MMM DD, YYYY");

  test("SvelteTime.test.svelte", async () => {
    const target = document.body;

    instance = new SvelteTime({
      target,
    });

    const date = new Date();
    const timestamp = date.toISOString();

    const defaultComponent = target.querySelector('[data-test="default"]')!;
    expect(defaultComponent.innerHTML).toEqual(DEFAULT_TIME);
    expect(defaultComponent.innerHTML).toEqual(dayjs().format("MMM DD, YYYY"));

    const timestampString = target.querySelector('[data-test="timestamp-string"]')!;
    expect(timestampString.innerHTML).toEqual("Feb 01, 2020");
    expect(timestampString.getAttribute("datetime")).toEqual("2020-02-01");

    const timestampDate = target.querySelector('[data-test="timestamp-date"]')!;
    expect(timestampDate.innerHTML).toEqual(dayjs(date).format("dddd @ h:mm a"));
    expect(timestampDate.getAttribute("datetime")).toEqual(date + "");

    const timestampNumber = target.querySelector('[data-test="timestamp-number"]')!;
    expect(timestampNumber.innerHTML).toEqual(dayjs(1e10).format("dddd @ h:mm A · MMMM D, YYYY"));
    expect(timestampNumber.getAttribute("datetime")).toEqual(1e10 + "");

    const relative = target.querySelector('[data-test="relative"]')!;
    expect(relative.innerHTML).toEqual("a few seconds ago");
    expect(relative.getAttribute("datetime")).toEqual(timestamp);

    const relativeTimestamp = target.querySelector('[data-test="relative-timestamp"]')!;
    expect(/ago/.test(relativeTimestamp.innerHTML)).toEqual(true);
    expect(relativeTimestamp.getAttribute("datetime")).toEqual("2021-02-02");

    const relativeTimestampNumber = target.querySelector(
      '[data-test="relative-timestamp-number"]'
    )!;
    expect(relativeTimestampNumber.innerHTML).toEqual("52 years ago");
    expect(relativeTimestampNumber.getAttribute("datetime")).toEqual(1e10 + "");

    const relativeLive = target.querySelector('[data-test="relative-live"]') as HTMLTimeElement;
    const actionRelativeLive = target.querySelector(
      '[data-test="action-relative-live"]'
    ) as HTMLTimeElement;

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

    const action = target.querySelector('[data-test="action"]') as HTMLTimeElement;
    expect(action.innerText).toEqual(DEFAULT_TIME);
    expect(action.getAttribute("datetime")).toEqual(timestamp);

    const actionTimestampFormat = target.querySelector(
      '[data-test="action-timestamp-format"]'
    ) as HTMLTimeElement;
    expect(actionTimestampFormat.innerText).toEqual(
      dayjs("2021-02-02").format("dddd @ h:mm A · MMMM D, YYYY")
    );
    expect(actionTimestampFormat.getAttribute("datetime")).toEqual("2021-02-02");

    const dayjsOnly = target.querySelector('[data-test="dayjs"]')!;
    expect(dayjsOnly.innerHTML).toEqual(DEFAULT_TIME);

    const dayjsOnlyRelative = target.querySelector('[data-test="dayjs-relative"]')!;
    expect(dayjsOnlyRelative.innerHTML).toEqual("a few seconds ago");
  });

  test("SvelteTimeLive.test.svelte", async () => {
    const target = document.body;

    instance = new SvelteTimeLive({
      target,
    });

    const date = new Date();
    const timestamp = date.toISOString();

    const relativeLive = target.querySelector('[data-test="relative-live"]') as HTMLTimeElement;
    const actionRelativeLive = target.querySelector(
      '[data-test="action-relative-live"]'
    ) as HTMLTimeElement;

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
    expect(relativeLive.getAttribute("datetime")).toEqual(timestamp);
    expect(actionRelativeLive.getAttribute("datetime")).toEqual(timestamp);

    vi.runOnlyPendingTimers();
    await tick();
    expect(relativeLive.title).toEqual(DEFAULT_TIME);
    expect(actionRelativeLive.title).toEqual(DEFAULT_TIME);
    expect(relativeLive.innerHTML).toEqual("2 minutes ago");
    expect(actionRelativeLive.innerText).toEqual("2 minutes ago");
    expect(relativeLive.getAttribute("datetime")).toEqual(timestamp);
    expect(actionRelativeLive.getAttribute("datetime")).toEqual(timestamp);
  });

  test("exported dayjs", () => {
    expect(dayjsExported().from(dayjsExported())).toEqual("a few seconds ago");
  });
});
