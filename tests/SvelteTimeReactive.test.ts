import dayjs from "dayjs";
import { flushSync, mount, tick, unmount } from "svelte";
import SvelteTimeReactive from "./SvelteTimeReactive.test.svelte";

describe("svelte-time-reactive", () => {
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

  test("timestamp prop changes should update display", async () => {
    const target = document.body;
    instance = mount(SvelteTimeReactive, { target });
    flushSync();

    const element = getElement('[data-test="reactive-timestamp"]');
    expect(element.innerHTML).toEqual("Feb 01, 2020");
    expect(element.getAttribute("datetime")).toEqual("2020-02-01");

    const button = getElement('[data-test="btn-timestamp"]');
    button.click();
    flushSync();

    expect(element.getAttribute("datetime")).toEqual("2021-03-15");
    expect(element.innerHTML).toEqual("Mar 15, 2021");
  });

  test("format prop changes should update display", async () => {
    const target = document.body;
    instance = mount(SvelteTimeReactive, { target });
    flushSync();

    const element = getElement('[data-test="reactive-format"]');
    expect(element.innerHTML).toEqual("Feb 01, 2020");

    const button = getElement('[data-test="btn-format"]');
    button.click();
    flushSync();

    expect(element.innerHTML).toEqual("2020-02-01");
  });

  test("relative prop changes should toggle display mode", async () => {
    const target = document.body;
    instance = mount(SvelteTimeReactive, { target });
    flushSync();

    const element = getElement('[data-test="reactive-relative"]');
    expect(element.innerHTML).toEqual("Feb 02, 2021");
    expect(element.title).toBeFalsy();

    const button = getElement('[data-test="btn-relative"]');
    button.click();
    flushSync();

    expect(/ago/.test(element.innerHTML)).toEqual(true);
    expect(element.title).toEqual("Feb 02, 2021");

    button.click();
    flushSync();

    expect(element.innerHTML).toEqual("Feb 02, 2021");
    expect(element.title).toBeFalsy();
  });

  test("live prop changes should start/stop updates", async () => {
    const target = document.body;
    instance = mount(SvelteTimeReactive, { target });
    flushSync();

    const element = getElement('[data-test="reactive-live"]');
    const DEFAULT_TIME = dayjs(FIXED_DATE).format("MMM DD, YYYY");

    expect(element.innerHTML).toEqual(DEFAULT_TIME);

    const relativeBtn = getElement('[data-test="btn-relative"]');
    relativeBtn.click();
    flushSync();

    const initialText = element.innerHTML;
    expect(initialText).toEqual("a few seconds ago");

    const liveBtn = getElement('[data-test="btn-live"]');
    liveBtn.click();
    flushSync();
    expect(element.innerHTML).toEqual("a few seconds ago");

    vi.runOnlyPendingTimers();
    await tick();
    expect(element.innerHTML).toEqual("a minute ago");

    vi.runOnlyPendingTimers();
    await tick();
    expect(element.innerHTML).toEqual("2 minutes ago");
  });
});
