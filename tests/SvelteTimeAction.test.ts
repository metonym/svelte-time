import dayjs from "dayjs";
import { flushSync, mount, unmount } from "svelte";
import { svelteTime } from "../src/svelte-time.svelte.js";
import SvelteTimeAction from "./examples/SvelteTimeAction.svelte";
import SvelteTimeActionStateRaw from "./examples/SvelteTimeActionStateRaw.svelte";

describe("svelte-time-action", () => {
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

  test("renders time element with svelteTime action", async () => {
    const target = document.body;
    instance = mount(SvelteTimeAction, { target });

    const timeElement = getElement("time");
    expect(timeElement).toBeTruthy();
    expect(timeElement.tagName.toLowerCase()).toBe("time");
  });

  test("displays formatted timestamp correctly", async () => {
    const target = document.body;
    instance = mount(SvelteTimeAction, { target });
    flushSync();

    const timeElement = getElement("time");
    const formattedDate = dayjs("2021-02-02").format(
      "dddd @ h:mm A · MMMM D, YYYY",
    );
    expect(timeElement.innerText).toEqual(formattedDate);
  });

  test("displays initial timestamp correctly", async () => {
    const target = document.body;
    instance = mount(SvelteTimeAction, { target });
    flushSync();

    const timeElement = getElement("time");
    const initialFormattedDate = dayjs("2021-02-02").format(
      "dddd @ h:mm A · MMMM D, YYYY",
    );
    expect(timeElement.innerText).toEqual(initialFormattedDate);
  });

  test("handles custom format string", async () => {
    const target = document.body;
    instance = mount(SvelteTimeAction, { target });
    flushSync();

    const timeElement = getElement("time");
    const expectedFormat = "dddd @ h:mm A · MMMM D, YYYY";
    const formattedDate = dayjs("2021-02-02").format(expectedFormat);

    expect(timeElement.innerText).toEqual(formattedDate);
    expect(timeElement.innerText).toContain("Tuesday"); // dddd
    expect(timeElement.innerText).toContain("·"); // separator
    expect(timeElement.innerText).toContain("February"); // MMMM
  });

  test("maintains time element attributes", async () => {
    const target = document.body;
    instance = mount(SvelteTimeAction, { target });

    const timeElement = getElement("time");
    expect(timeElement.tagName.toLowerCase()).toBe("time");
    // The action should preserve the original element structure
    expect(timeElement.children.length).toBe(0);
  });

  test("writes plain text content (single text node)", () => {
    const node = document.createElement("time");
    document.body.appendChild(node);
    const handle = svelteTime(node, {
      timestamp: "2020-02-01",
      format: "YYYY-MM-DD",
    });
    expect(node.childNodes.length).toBe(1);
    expect(node.childNodes[0].nodeType).toBe(Node.TEXT_NODE);
    expect(node.textContent).toBe("2020-02-01");
    handle?.destroy?.();
  });

  // Regression test for https://github.com/metonym/svelte-time/issues/66
  test("updates when timestamp changes (reactivity)", async () => {
    const target = document.body;
    instance = mount(SvelteTimeAction, { target });
    flushSync();

    const timeElement = getElement("time");
    const initialFormattedDate = dayjs("2021-02-02").format(
      "dddd @ h:mm A · MMMM D, YYYY",
    );
    expect(timeElement.innerText).toEqual(initialFormattedDate);
    expect(timeElement.getAttribute("datetime")).toEqual("2021-02-02");

    const button = getElement("button");
    button.click();
    flushSync();

    const updatedFormattedDate = dayjs("2021-02-03").format(
      "dddd @ h:mm A · MMMM D, YYYY",
    );
    expect(timeElement.innerText).toEqual(updatedFormattedDate);
    expect(timeElement.getAttribute("datetime")).toEqual("2021-02-03");

    // Click again to verify it increments by another day
    button.click();
    flushSync();

    const secondUpdatedFormattedDate = dayjs("2021-02-04").format(
      "dddd @ h:mm A · MMMM D, YYYY",
    );
    expect(timeElement.innerText).toEqual(secondUpdatedFormattedDate);
    expect(timeElement.getAttribute("datetime")).toEqual("2021-02-04");
  });

  // Regression test for https://github.com/metonym/svelte-time/issues/62
  test("updates when the whole options object passed via $state.raw is reassigned", async () => {
    const target = document.body;
    instance = mount(SvelteTimeActionStateRaw, { target });
    flushSync();

    const timeElement = getElement("time");
    const format = "dddd @ h:mm A · MMMM D, YYYY";
    expect(timeElement.innerText).toEqual(dayjs("2021-02-02").format(format));
    expect(timeElement.getAttribute("datetime")).toEqual("2021-02-02");

    const button = getElement("button");
    button.click();
    flushSync();

    expect(timeElement.innerText).toEqual(dayjs("2025-04-02").format(format));
    expect(timeElement.getAttribute("datetime")).toEqual("2025-04-02");
  });
});
