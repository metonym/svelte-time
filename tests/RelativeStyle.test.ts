import dayjs from "dayjs";
import { flushSync, mount, unmount } from "svelte";
import { microFormat } from "../src/micro.js";
import RelativeStyleTest from "./RelativeStyle.test.svelte";

describe("microFormat", () => {
  test.each([
    [0, "0s"],
    [59_000, "59s"],
    [60_000, "1m"],
    [3_599_000, "59m"],
    [3_600_000, "1h"],
    [86_400_000 - 1, "23h"],
    [86_400_000, "1d"],
    [30 * 86_400_000 - 1, "29d"],
    [30 * 86_400_000, "1mo"],
    [365 * 86_400_000 - 1, "12mo"],
    [365 * 86_400_000, "1y"],
  ])("microFormat(%i) === %s", (ms, expected) => {
    expect(microFormat(ms)).toEqual(expected);
  });

  test("ignores sign — magnitude only", () => {
    expect(microFormat(-60_000)).toEqual(microFormat(60_000));
  });
});

describe("Time component with relativeStyle prop", () => {
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
    return document.querySelector(selector) as HTMLElement;
  };

  test('relativeStyle="micro" renders a compact single unit', () => {
    const target = document.body;
    instance = mount(RelativeStyleTest, { target });
    flushSync();

    const element = getElement('[data-test="micro"]');
    expect(element.innerHTML).toEqual("4d");
    // title is unaffected by relativeStyle — still the full absolute format
    expect(element.title).toEqual(
      dayjs("2023-12-28T00:00:00.000Z").format("MMM DD, YYYY"),
    );
  });

  test('relativeStyle="micro" is a no-op without relative', () => {
    const target = document.body;
    instance = mount(RelativeStyleTest, { target });
    flushSync();

    const withMicro = getElement('[data-test="micro-without-relative"]');
    expect(withMicro.innerHTML).toEqual(
      dayjs("2023-12-28T00:00:00.000Z").format("MMM DD, YYYY"),
    );
    expect(withMicro.title).toBeFalsy();
  });

  test('relativeStyle="default" matches the omitted-prop behavior', () => {
    const target = document.body;
    instance = mount(RelativeStyleTest, { target });
    flushSync();

    const defaultStyle = getElement('[data-test="default-style"]');
    const omittedStyle = getElement('[data-test="omitted-style"]');
    expect(defaultStyle.innerHTML).toEqual(omittedStyle.innerHTML);
    expect(defaultStyle.innerHTML).toEqual(
      dayjs("2023-12-28T00:00:00.000Z").from(dayjs(FIXED_DATE)),
    );
  });

  test("unrecognized or undefined relativeStyle falls back to default", () => {
    const target = document.body;
    instance = mount(RelativeStyleTest, { target });
    flushSync();

    const omittedStyle = getElement('[data-test="omitted-style"]');
    const undefinedStyle = getElement('[data-test="undefined-style"]');
    const unknownStyle = getElement('[data-test="unknown-style"]');

    expect(undefinedStyle.innerHTML).toEqual(omittedStyle.innerHTML);
    expect(unknownStyle.innerHTML).toEqual(omittedStyle.innerHTML);
  });
});
