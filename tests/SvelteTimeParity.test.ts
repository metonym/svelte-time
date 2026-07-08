import type { ConfigType } from "dayjs";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { flushSync, mount, tick, unmount } from "svelte";
import Time, { svelteTime, time } from "svelte-time";
import RelativeThreshold from "./RelativeThreshold.test.svelte";

dayjs.extend(utc);
dayjs.extend(timezone);

describe("component/action parity for edge-case timestamps", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-01-01T00:00:00.000Z"));
  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = "";
  });

  const FORMAT = "YYYY-MM-DD";
  const CASES: Array<[name: string, timestamp: ConfigType, expected: string]> =
    [
      ["epoch (0)", 0, dayjs(0).format(FORMAT)],
      ["empty string", "", "Invalid Date"],
      ["date string", "2020-02-01", dayjs("2020-02-01").format(FORMAT)],
    ];

  for (const [name, timestamp, expected] of CASES) {
    test(`${name}: component and action agree`, () => {
      const instance = mount(Time, {
        target: document.body,
        props: { "data-test": "component", timestamp, format: FORMAT },
      });
      flushSync();

      const node = document.createElement("time");
      document.body.appendChild(node);
      const action = svelteTime(node, { timestamp, format: FORMAT });

      const componentText = document
        .querySelector('[data-test="component"]')
        ?.textContent?.trim();
      expect(componentText).toEqual(expected);
      expect(node.innerText?.trim()).toEqual(expected);

      action?.destroy?.();
      unmount(instance);
    });
  }
});

describe('component/action/attachment parity for relativeStyle="micro"', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-01-01T00:00:00.000Z"));
  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = "";
  });

  test("component, action, and attachment render the same micro output", () => {
    const options = {
      relative: true,
      relativeStyle: "micro",
      timestamp: "2023-12-28T00:00:00.000Z",
    } as const;

    const instance = mount(Time, {
      target: document.body,
      props: { "data-test": "component", ...options },
    });
    flushSync();

    const actionNode = document.createElement("time");
    document.body.appendChild(actionNode);
    const action = svelteTime(actionNode, options);

    const attachmentNode = document.createElement("time");
    document.body.appendChild(attachmentNode);
    time(options)(attachmentNode);

    const componentText = document
      .querySelector('[data-test="component"]')
      ?.textContent?.trim();

    expect(componentText).toEqual("4d");
    expect(actionNode.textContent?.trim()).toEqual("4d");
    expect(attachmentNode.textContent?.trim()).toEqual("4d");

    action?.destroy?.();
    unmount(instance);
  });
});

describe("component/action/attachment parity for edge-case timestamps", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-01-01T00:00:00.000Z"));
  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = "";
  });

  const FORMAT = "YYYY-MM-DD";
  const CASES: Array<[name: string, timestamp: ConfigType, expected: string]> =
    [
      ["epoch (0)", 0, dayjs(0).format(FORMAT)],
      ["empty string", "", "Invalid Date"],
      ["date string", "2020-02-01", dayjs("2020-02-01").format(FORMAT)],
    ];

  for (const [name, timestamp, expected] of CASES) {
    test(`${name}: component and action agree`, () => {
      const instance = mount(Time, {
        target: document.body,
        props: { "data-test": "component", timestamp, format: FORMAT },
      });
      flushSync();

      const node = document.createElement("time");
      document.body.appendChild(node);
      const action = svelteTime(node, { timestamp, format: FORMAT });

      const componentText = document
        .querySelector('[data-test="component"]')
        ?.textContent?.trim();
      expect(componentText).toEqual(expected);
      expect(node.innerText?.trim()).toEqual(expected);

      action?.destroy?.();
      unmount(instance);
    });
  }
});

describe("component/action/attachment parity for the tz prop", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  test("all three surfaces render an identical zoned value", () => {
    const timestamp = "2013-11-18T11:55:20Z";
    const format = "YYYY-MM-DDTHH:mm:ss";
    const tz = "America/Toronto";
    const expected = dayjs(timestamp).tz(tz).format(format);

    const instance = mount(Time, {
      target: document.body,
      props: { "data-test": "component", timestamp, tz, format },
    });
    flushSync();

    const actionNode = document.createElement("time");
    document.body.appendChild(actionNode);
    const action = svelteTime(actionNode, { timestamp, tz, format });

    const attachmentNode = document.createElement("time");
    document.body.appendChild(attachmentNode);
    time({ timestamp, tz, format })(attachmentNode);

    const componentText = document
      .querySelector('[data-test="component"]')
      ?.textContent?.trim();

    expect(componentText).toEqual(expected);
    expect(actionNode.textContent?.trim()).toEqual(expected);
    expect(attachmentNode.textContent?.trim()).toEqual(expected);

    action?.destroy?.();
    unmount(instance);
  });
});

describe("component/action/attachment parity for relativeThreshold", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-01-01T00:00:00.000Z"));
  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = "";
  });

  const FORMAT = "h:mm a";
  const THRESHOLD = 2 * 60 * 1_000;

  test("static: component and action agree once already past the threshold", () => {
    const timestamp = dayjs()
      .subtract(2 * THRESHOLD, "millisecond")
      .toISOString();
    const expected = dayjs(timestamp).format(FORMAT);

    const instance = mount(Time, {
      target: document.body,
      props: {
        "data-test": "component",
        timestamp,
        format: FORMAT,
        relative: true,
        relativeThreshold: THRESHOLD,
      },
    });
    flushSync();

    const node = document.createElement("time");
    document.body.appendChild(node);
    const action = svelteTime(node, {
      timestamp,
      format: FORMAT,
      relative: true,
      relativeThreshold: THRESHOLD,
    });

    const componentNode = document.querySelector('[data-test="component"]');
    assert(componentNode instanceof HTMLElement);

    expect(componentNode.textContent).toEqual(expected);
    expect(componentNode.title).toBeFalsy();
    expect(node.textContent).toEqual(expected);
    expect(node.title).toBeFalsy();

    action?.destroy?.();
    unmount(instance);
  });

  test("live: component, action, and attachment all flip together mid-tick", async () => {
    const instance = mount(RelativeThreshold, { target: document.body });
    flushSync();

    const getElement = (selector: string) => {
      const element = document.querySelector(selector);
      assert(element instanceof HTMLElement);
      return element;
    };

    const component = getElement('[data-test="component-threshold"]');
    const action = getElement('[data-test="action-threshold"]');
    const attachment = getElement('[data-test="attachment-threshold"]');

    expect(/ago/.test(component.textContent ?? "")).toEqual(true);
    expect(/ago/.test(action.textContent ?? "")).toEqual(true);
    expect(/ago/.test(attachment.textContent ?? "")).toEqual(true);

    vi.advanceTimersByTime(THRESHOLD * 1.5);
    await tick();

    expect(component.textContent).toEqual(action.textContent);
    expect(action.textContent).toEqual(attachment.textContent);
    expect(component.title).toBeFalsy();
    expect(action.title).toBeFalsy();
    expect(attachment.title).toBeFalsy();

    unmount(instance);
  });
});

// tz, relativeStyle, and relativeThreshold each shipped independently
// (#87, #89, #88) and are well covered in isolation above, but nothing
// exercises them together on one element — this pins the interaction.
describe("component/action/attachment parity for tz + relativeStyle + relativeThreshold combined", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-01-01T00:00:00.000Z"));
  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = "";
  });

  const FORMAT = "YYYY-MM-DDTHH:mm:ss";
  const TZ = "America/Toronto";
  const THRESHOLD = 2 * 60 * 60 * 1_000; // 2 hours

  test("under threshold: all three surfaces render a micro value with a tz-formatted title", () => {
    const timestamp = dayjs().subtract(1, "hour").toISOString();
    const options = {
      relative: true,
      relativeStyle: "micro",
      relativeThreshold: THRESHOLD,
      tz: TZ,
      format: FORMAT,
      timestamp,
    } as const;
    const expectedTitle = dayjs(timestamp).tz(TZ).format(FORMAT);

    const instance = mount(Time, {
      target: document.body,
      props: { "data-test": "component", ...options },
    });
    flushSync();

    const actionNode = document.createElement("time");
    document.body.appendChild(actionNode);
    const action = svelteTime(actionNode, options);

    const attachmentNode = document.createElement("time");
    document.body.appendChild(attachmentNode);
    time(options)(attachmentNode);

    const component = document.querySelector(
      '[data-test="component"]',
    ) as HTMLElement;

    expect(component.textContent?.trim()).toEqual("1h");
    expect(actionNode.textContent?.trim()).toEqual("1h");
    expect(attachmentNode.textContent?.trim()).toEqual("1h");

    expect(component.title).toEqual(expectedTitle);
    expect(actionNode.title).toEqual(expectedTitle);
    expect(attachmentNode.title).toEqual(expectedTitle);

    action?.destroy?.();
    unmount(instance);
  });

  test("past threshold: all three surfaces fall back to the tz-formatted absolute value, no title", () => {
    const timestamp = dayjs().subtract(3, "hour").toISOString();
    const options = {
      relative: true,
      relativeStyle: "micro",
      relativeThreshold: THRESHOLD,
      tz: TZ,
      format: FORMAT,
      timestamp,
    } as const;
    const expected = dayjs(timestamp).tz(TZ).format(FORMAT);

    const instance = mount(Time, {
      target: document.body,
      props: { "data-test": "component", ...options },
    });
    flushSync();

    const actionNode = document.createElement("time");
    document.body.appendChild(actionNode);
    const action = svelteTime(actionNode, options);

    const attachmentNode = document.createElement("time");
    document.body.appendChild(attachmentNode);
    time(options)(attachmentNode);

    const component = document.querySelector(
      '[data-test="component"]',
    ) as HTMLElement;

    expect(component.textContent?.trim()).toEqual(expected);
    expect(actionNode.textContent?.trim()).toEqual(expected);
    expect(attachmentNode.textContent?.trim()).toEqual(expected);

    expect(component.title).toBeFalsy();
    expect(actionNode.title).toBeFalsy();
    expect(attachmentNode.title).toBeFalsy();

    action?.destroy?.();
    unmount(instance);
  });
});
