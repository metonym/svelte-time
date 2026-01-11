import dayjs from "dayjs";
import { SvelteComponent } from "svelte";
import SvelteTimeWithSuffixTest from "./SvelteTimeWithSuffix.test.svelte";

describe("Time component with withoutSuffix prop", () => {
  let instance: null | SvelteComponent = null;
  const FIXED_DATE = new Date("2024-01-01T00:00:00.000Z");

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(FIXED_DATE);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    if (instance) {
      instance.$destroy();
    }
    instance = null;
    document.body.innerHTML = "";
  });

  const getElement = (selector: string) => {
    return document.querySelector(selector) as HTMLElement;
  };

  test("displays relative time with suffix by default", async () => {
    const target = document.body;
    instance = new SvelteTimeWithSuffixTest({ target });

    const withSuffix = getElement('[data-test="relative-with-suffix"]');
    expect(withSuffix).toBeTruthy();
    const expected = dayjs("2021-02-02").from(dayjs(FIXED_DATE));
    expect(withSuffix.innerHTML).toEqual(expected);
    expect(withSuffix.innerHTML).toContain("ago");
  });

  test("displays relative time without suffix when withoutSuffix is true (past)", async () => {
    const target = document.body;
    instance = new SvelteTimeWithSuffixTest({ target });

    const withoutSuffix = getElement('[data-test="relative-without-suffix"]');
    expect(withoutSuffix).toBeTruthy();
    // Use dayjs's built-in from() with withoutSuffix parameter
    const expected = dayjs("2021-02-02").from(dayjs(FIXED_DATE), true);
    expect(withoutSuffix.innerHTML).toEqual(expected);
    expect(withoutSuffix.innerHTML).not.toContain("ago");
  });

  test("displays future time with suffix by default", async () => {
    const target = document.body;
    instance = new SvelteTimeWithSuffixTest({ target });

    const withSuffix = getElement('[data-test="future-with-suffix"]');
    expect(withSuffix).toBeTruthy();
    const expected = dayjs("2025-02-02").from(dayjs(FIXED_DATE));
    expect(withSuffix.innerHTML).toEqual(expected);
    expect(withSuffix.innerHTML).toContain("in");
  });

  test("displays future time without suffix when withoutSuffix is true (future)", async () => {
    const target = document.body;
    instance = new SvelteTimeWithSuffixTest({ target });

    const withoutSuffix = getElement('[data-test="future-without-suffix"]');
    expect(withoutSuffix).toBeTruthy();
    // Use dayjs's built-in from() with withoutSuffix parameter
    const expected = dayjs("2025-02-02").from(dayjs(FIXED_DATE), true);
    expect(withoutSuffix.innerHTML).toEqual(expected);
    expect(withoutSuffix.innerHTML).not.toContain("in ");
  });
});
