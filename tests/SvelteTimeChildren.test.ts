import dayjs from "dayjs";
import { flushSync, mount, unmount } from "svelte";
import SvelteTimeChildren from "./SvelteTimeChildren.test.svelte";

describe("svelte-time-children", () => {
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

  test("renders custom markup inside <time> without changing datetime/title", () => {
    const target = document.body;
    instance = mount(SvelteTimeChildren, { target });
    flushSync();

    const el = getElement('[data-test="children-markup"]');
    const strong = el.querySelector("strong");

    expect(strong).not.toBeNull();
    expect(strong!.textContent).toEqual(
      dayjs("2024-01-01T00:00:00.000Z").format("MMM DD, YYYY"),
    );
    expect(el.getAttribute("datetime")).toEqual("2024-01-01T00:00:00.000Z");
    expect(el.hasAttribute("title")).toEqual(false);
  });

  test("snippet stays live", () => {
    const target = document.body;
    instance = mount(SvelteTimeChildren, { target });
    flushSync();

    const el = getElement('[data-test="children-live"]');
    const text = () => el.querySelector("em")!.textContent;

    expect(text()).toEqual(dayjs(FIXED_DATE).from(dayjs(FIXED_DATE)));

    vi.runOnlyPendingTimers();
    flushSync();

    expect(text()).toEqual(dayjs(FIXED_DATE).from(dayjs()));
  });

  test("without a snippet, renders the plain formatted text as before", () => {
    const target = document.body;
    instance = mount(SvelteTimeChildren, { target });
    flushSync();

    const el = getElement('[data-test="no-children"]');

    expect(el.querySelector("strong, em")).toBeNull();
    expect(el.innerHTML.trim()).toEqual(
      dayjs("2024-01-01T00:00:00.000Z").format("MMM DD, YYYY"),
    );
  });
});
