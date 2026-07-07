import { flushSync, mount, tick, unmount } from "svelte";
import TimeAttachment from "./examples/TimeAttachment.svelte";
import TimeAttachmentReactive from "./examples/TimeAttachmentReactive.svelte";
import SvelteTimeAttachmentLive from "./SvelteTimeAttachmentLive.test.svelte";
import SvelteTimeAttachmentTitle from "./SvelteTimeAttachmentTitle.test.svelte";

describe("time attachment", () => {
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

  test("basic render: textContent and datetime are correct", () => {
    const target = document.body;
    instance = mount(TimeAttachment, { target });
    flushSync();

    const element = getElement("time");
    expect(element.textContent).toEqual("2021-02-02");
    expect(element.getAttribute("datetime")).toEqual("2021-02-02");
  });

  test("reactivity: re-runs when a reactive value used to build options changes", () => {
    const target = document.body;
    instance = mount(TimeAttachmentReactive, { target });
    flushSync();

    const element = getElement("time");
    expect(element.textContent).toEqual("2021-02-02");
    expect(element.getAttribute("datetime")).toEqual("2021-02-02");

    const button = getElement("button");
    button.click();
    flushSync();

    expect(element.textContent).toEqual("2021-02-03");
    expect(element.getAttribute("datetime")).toEqual("2021-02-03");
  });

  test("relative + title parity: custom title is kept, omitted title clears the attribute", () => {
    const target = document.body;
    instance = mount(SvelteTimeAttachmentTitle, { target });
    flushSync();

    const customTitle = getElement('[data-test="attachment-custom-title"]');
    const omittedTitle = getElement(
      '[data-test="attachment-custom-title-omit"]',
    );

    expect(customTitle.title).toEqual("Custom title");
    expect(omittedTitle.title).toEqual("");
  });

  test("live sharing: two attachment elements with the same interval share one timer", async () => {
    const spy = vi.spyOn(global, "setInterval");
    const target = document.body;
    instance = mount(SvelteTimeAttachmentLive, { target });
    flushSync();

    expect(spy).toHaveBeenCalledTimes(1);

    const elementA = getElement('[data-test="attachment-live-a"]');
    const elementB = getElement('[data-test="attachment-live-b"]');
    expect(elementA.textContent).toEqual("a few seconds ago");
    expect(elementB.textContent).toEqual("a few seconds ago");

    vi.runOnlyPendingTimers(); // 30 seconds
    await tick();
    vi.runOnlyPendingTimers(); // 60 seconds
    await tick();

    expect(elementA.textContent).toEqual("a minute ago");
    expect(elementB.textContent).toEqual("a minute ago");
  });
});
