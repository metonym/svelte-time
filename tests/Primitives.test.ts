import dayjs from "dayjs";
import "dayjs/locale/de"; // German
import relativeTimePlugin from "dayjs/plugin/relativeTime";
import { flushSync, mount, unmount } from "svelte";
import Time, { formatTime, now, relativeTime } from "svelte-time";
import PrimitivesNow from "./PrimitivesNow.test.svelte";

dayjs.extend(relativeTimePlugin);

describe("Primitives", () => {
  const FIXED_DATE = new Date("2024-01-01T00:00:00.000Z");

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(FIXED_DATE);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = "";
  });

  const getElement = (selector: string) => {
    const element = document.querySelector(selector);
    assert(element instanceof HTMLElement);
    return element;
  };

  describe("formatTime / relativeTime parity with <Time>", () => {
    const CASES: Array<[name: string, timestamp: unknown]> = [
      ["ISO string", "2020-02-01T00:00:00.000Z"],
      ["epoch (0)", 0],
      ["Date instance", new Date("2020-02-01T00:00:00.000Z")],
      ["dayjs instance with locale", dayjs("2020-02-01").locale("de")],
    ];

    for (const [name, timestamp] of CASES) {
      test(`formatTime output equals component output — ${name}`, () => {
        const instance = mount(Time, {
          target: document.body,
          props: { "data-test": "component", timestamp },
        });
        flushSync();

        const expected = getElement('[data-test="component"]').textContent;
        expect(formatTime(timestamp)).toEqual(expected);

        unmount(instance);
      });

      test(`relativeTime output equals component output — ${name}`, () => {
        const instance = mount(Time, {
          target: document.body,
          props: { "data-test": "component", timestamp, relative: true },
        });
        flushSync();

        const expected = getElement('[data-test="component"]').textContent;
        expect(relativeTime(timestamp)).toEqual(expected);

        unmount(instance);
      });
    }
  });

  describe("relativeTime options", () => {
    test("past timestamp includes an 'ago' suffix", () => {
      const timestamp = dayjs(FIXED_DATE).subtract(2, "day");
      expect(relativeTime(timestamp)).toEqual(timestamp.fromNow());
    });

    test("future timestamp includes an 'in' prefix", () => {
      const timestamp = dayjs(FIXED_DATE).add(2, "day");
      expect(relativeTime(timestamp)).toEqual(timestamp.fromNow());
    });

    test("withoutSuffix strips the suffix", () => {
      const timestamp = dayjs(FIXED_DATE).subtract(2, "day");
      expect(relativeTime(timestamp, { withoutSuffix: true })).toEqual(
        timestamp.fromNow(true),
      );
    });

    test("explicit `from` sets the reference point", () => {
      const timestamp = FIXED_DATE.toISOString();
      const from = dayjs(timestamp).add(3, "hour");
      expect(relativeTime(timestamp, { from })).toEqual(
        dayjs(timestamp).from(from),
      );
    });

    test("locale option changes the output", () => {
      const timestamp = dayjs(FIXED_DATE).subtract(2, "day");
      expect(relativeTime(timestamp, { locale: "de" })).toEqual(
        timestamp.locale("de").fromNow(),
      );
    });
  });

  describe("now()", () => {
    test("shares one timer across multiple readers of the same interval", () => {
      const spy = vi.spyOn(global, "setInterval");
      const instance = mount(PrimitivesNow, { target: document.body });
      flushSync();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(expect.any(Function), 30_000);

      const a = getElement('[data-test="now-a"]').textContent;
      const b = getElement('[data-test="now-b"]').textContent;
      expect(a).toEqual(b);

      vi.runOnlyPendingTimers();
      flushSync();

      const nextA = getElement('[data-test="now-a"]').textContent;
      const nextB = getElement('[data-test="now-b"]').textContent;
      expect(nextA).toEqual(nextB);
      expect(nextA).not.toEqual(a);

      spy.mockRestore();
      unmount(instance);
    });

    test("returns a valid dayjs instance outside a reactive context", () => {
      expect(() => now()).not.toThrow();
      const value = now();
      expect(dayjs.isDayjs(value)).toEqual(true);
      expect(value.isValid()).toEqual(true);
    });
  });
});
