import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { flushSync, mount, unmount } from "svelte";
import Time, { svelteTime, time } from "svelte-time";

dayjs.extend(utc);
dayjs.extend(timezone);

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
  const CASES: Array<[name: string, timestamp: unknown, expected: string]> = [
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
