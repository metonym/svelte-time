import dayjs from "dayjs";
import { flushSync, mount, unmount } from "svelte";
import Time, { svelteTime } from "svelte-time";

describe("datetime attribute contract", () => {
  const ISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
  let instance: null | ReturnType<typeof mount> = null;

  afterEach(() => {
    if (instance) {
      unmount(instance);
    }
    instance = null;
    document.body.innerHTML = "";
  });

  function renderComponent(timestamp: unknown) {
    instance = mount(Time, {
      target: document.body,
      props: {
        timestamp,
        format: "YYYY-MM-DD",
        "data-test": "component",
      },
    });
    flushSync();
    return document.querySelector('[data-test="component"]') as HTMLElement;
  }

  function renderAction(timestamp: unknown) {
    const node = document.createElement("time");
    node.setAttribute("data-test", "action");
    document.body.appendChild(node);
    svelteTime(node, {
      timestamp,
      format: "YYYY-MM-DD",
    });
    return node;
  }

  test.each([
    ["Date", new Date("2024-01-01T00:00:00.000Z")],
    ["Dayjs", dayjs("2024-01-01T00:00:00.000Z")],
    ["number", 1e10],
  ])("%s inputs are normalized to ISO 8601 in both render paths", (_, timestamp) => {
    const component = renderComponent(timestamp);
    expect(component.getAttribute("datetime")).toMatch(ISO);

    if (instance) {
      unmount(instance);
      instance = null;
    }
    document.body.innerHTML = "";

    const action = renderAction(timestamp);
    expect(action.getAttribute("datetime")).toMatch(ISO);
  });

  test("string inputs pass through as-is in both render paths", () => {
    const timestamp = "2020-02-01";

    const component = renderComponent(timestamp);
    expect(component.getAttribute("datetime")).toEqual(timestamp);

    if (instance) {
      unmount(instance);
      instance = null;
    }
    document.body.innerHTML = "";

    const action = renderAction(timestamp);
    expect(action.getAttribute("datetime")).toEqual(timestamp);
  });

  test("invalid inputs omit the datetime attribute in both render paths", () => {
    const timestamp = "not a date";

    const component = renderComponent(timestamp);
    expect(component.hasAttribute("datetime")).toEqual(false);

    if (instance) {
      unmount(instance);
      instance = null;
    }
    document.body.innerHTML = "";

    const action = renderAction(timestamp);
    expect(action.hasAttribute("datetime")).toEqual(false);
  });
});
