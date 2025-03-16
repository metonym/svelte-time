import dayjs from "dayjs";
import { mount, unmount } from "svelte";
import SvelteTimeAdvanced from "./SvelteTimeAdvanced.test.svelte";

describe("svelte-time-advanced", () => {
  let instance: null | Record<string, any> = null;
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

  test("handles edge cases gracefully", async () => {
    const target = document.body;
    instance = mount(SvelteTimeAdvanced, { target });

    // Invalid date should show original value
    const invalidDate = getElement('[data-test="invalid-date"]');
    expect(invalidDate.innerHTML).toEqual("Invalid Date");

    // Future date relative format
    const futureDate = getElement('[data-test="future-date"]');
    expect(futureDate.innerHTML).toEqual("in 2 days");

    // Far past date relative format
    const farPastDate = getElement('[data-test="far-past-date"]');
    expect(farPastDate.innerHTML).toEqual("5 years ago");

    // Empty timestamp
    const emptyTimestamp = getElement('[data-test="empty-timestamp"]');
    expect(emptyTimestamp.innerHTML).toBeTruthy();
  });

  test("handles custom formatting", async () => {
    const target = document.body;
    instance = mount(SvelteTimeAdvanced, { target });

    const customFormat = getElement('[data-test="custom-format-function"]');
    expect(customFormat.innerHTML).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  test("handles different time formats", async () => {
    const target = document.body;
    instance = mount(SvelteTimeAdvanced, { target });

    const differentFormat = getElement('[data-test="different-locale"]');
    const formattedDate = differentFormat.innerHTML;
    expect(formattedDate).toMatch(/\d{2} de \w+ de \d{4}/);
  });

  test("handles standard format", async () => {
    const target = document.body;
    instance = mount(SvelteTimeAdvanced, { target });

    const standardFormat = getElement('[data-test="multiple-formats"]');
    expect(standardFormat.innerHTML).toEqual(
      dayjs(FIXED_DATE).format("MMM DD, YYYY"),
    );
  });
});
