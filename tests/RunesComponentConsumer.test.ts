import { flushSync, mount, unmount } from "svelte";
import RunesComponentConsumer from "./RunesComponentConsumer.test.svelte";

describe("runes component consumer (explicit runes={true})", () => {
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

  test("Time re-renders when a $state prop changes", () => {
    instance = mount(RunesComponentConsumer, { target: document.body });
    flushSync();

    const el = getElement('[data-test="time"]');
    expect(el.innerHTML).toEqual("Feb 01, 2020");

    getElement('[data-test="btn-time"]').click();
    flushSync();

    expect(el.innerHTML).toEqual("Mar 15, 2021");
  });

  test("Duration re-renders when `since` changes", () => {
    instance = mount(RunesComponentConsumer, { target: document.body });
    flushSync();

    const el = getElement('[data-test="duration"]');
    expect(el.textContent).toEqual("00:01:00");

    getElement('[data-test="btn-duration"]').click();
    flushSync();

    expect(el.textContent).toEqual("00:10:00");
  });

  test("Countdown fires `oncomplete` once when `to` moves into the past", () => {
    instance = mount(RunesComponentConsumer, { target: document.body });
    flushSync();

    expect(
      getElement('[data-test="countdown-oncomplete-calls"]').textContent,
    ).toEqual("0");

    getElement('[data-test="btn-countdown"]').click();
    flushSync();

    expect(
      getElement('[data-test="countdown-oncomplete-calls"]').textContent,
    ).toEqual("1");
  });

  test("multiple component instances stay independently reactive", () => {
    instance = mount(RunesComponentConsumer, { target: document.body });
    flushSync();

    expect(getElement('[data-test="time-a"]').innerHTML).toEqual(
      "Jan 01, 2020",
    );
    expect(getElement('[data-test="time-b"]').innerHTML).toEqual(
      "Jan 01, 2021",
    );
  });
});
