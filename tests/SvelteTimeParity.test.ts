import dayjs from "dayjs";
import { flushSync, mount, unmount } from "svelte";
import Time, { svelteTime } from "svelte-time";

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
