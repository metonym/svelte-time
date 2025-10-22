import dayjs from "dayjs";
import { flushSync, mount, tick, unmount } from "svelte";
import Time from "svelte-time";

describe("svelte-time-edge-cases", () => {
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

  describe("live interval edge cases", () => {
    test("live with negative interval should use absolute value", async () => {
      const target = document.body;

      instance = mount(Time, {
        target,
        props: {
          "data-test": "live-negative",
          relative: true,
          live: -5000,
        },
      });
      flushSync();

      const element = getElement('[data-test="live-negative"]');
      expect(element.innerHTML).toEqual("a few seconds ago");

      vi.advanceTimersByTime(5000);
      await tick();
      expect(element.innerHTML).toEqual("a few seconds ago");
    });

    test("live with very large interval", async () => {
      const target = document.body;
      const setIntervalSpy = vi.spyOn(global, "setInterval");

      instance = mount(Time, {
        target,
        props: {
          "data-test": "live-large",
          relative: true,
          live: 1000000,
        },
      });
      flushSync();

      const element = getElement('[data-test="live-large"]');
      expect(element.innerHTML).toEqual("a few seconds ago");

      expect(setIntervalSpy).toHaveBeenCalledWith(
        expect.any(Function),
        1000000,
      );
      setIntervalSpy.mockRestore();
    });

    test("live without relative should not create interval", async () => {
      const setIntervalSpy = vi.spyOn(global, "setInterval");

      const target = document.body;

      instance = mount(Time, {
        target,
        props: {
          "data-test": "live-no-relative",
          relative: false,
          live: true,
        },
      });
      flushSync();
      expect(setIntervalSpy).not.toHaveBeenCalled();
      setIntervalSpy.mockRestore();
    });
  });

  describe("memory leak / interval cleanup", () => {
    test("should clear interval on unmount", async () => {
      const clearIntervalSpy = vi.spyOn(global, "clearInterval");

      const target = document.body;

      instance = mount(Time, {
        target,
        props: {
          "data-test": "cleanup",
          relative: true,
          live: true,
        },
      });
      flushSync();

      const element = getElement('[data-test="cleanup"]');
      expect(element.innerHTML).toEqual("a few seconds ago");

      unmount(instance);
      instance = null;

      expect(clearIntervalSpy).toHaveBeenCalled();
      clearIntervalSpy.mockRestore();
    });

    test("multiple components should each manage their own intervals", async () => {
      const target = document.body;

      const instance1 = mount(Time, {
        target,
        props: {
          "data-test": "multi-1",
          relative: true,
          live: 30000,
        },
      });
      flushSync();

      const instance2 = mount(Time, {
        target,
        props: {
          "data-test": "multi-2",
          relative: true,
          live: 15000,
        },
      });
      flushSync();

      const element1 = getElement('[data-test="multi-1"]');
      const element2 = getElement('[data-test="multi-2"]');

      expect(element1.innerHTML).toEqual("a few seconds ago");
      expect(element2.innerHTML).toEqual("a few seconds ago");

      vi.advanceTimersByTime(15000);
      await tick();

      expect(element1.innerHTML).toEqual("a few seconds ago");
      expect(element2.innerHTML).toEqual("a few seconds ago");

      vi.advanceTimersByTime(15000);
      await tick();

      expect(element1.innerHTML).toEqual("a few seconds ago");
      expect(element2.innerHTML).toEqual("a few seconds ago");

      unmount(instance1);
      unmount(instance2);
    });

    test("no memory leak with many component creates and destroys", async () => {
      const target = document.body;
      const clearIntervalSpy = vi.spyOn(global, "clearInterval");

      for (let i = 0; i < 100; i++) {
        const inst = mount(Time, {
          target,
          props: {
            "data-test": `leak-test-${i}`,
            relative: true,
            live: true,
          },
        });
        flushSync();
        unmount(inst);
        document.body.innerHTML = "";
      }

      expect(clearIntervalSpy).toHaveBeenCalledTimes(100);
      clearIntervalSpy.mockRestore();
    });
  });

  describe("timestamp edge cases", () => {
    test("very far future date", async () => {
      const target = document.body;
      const futureDate = dayjs().add(100, "years").toISOString();

      instance = mount(Time, {
        target,
        props: {
          "data-test": "far-future",
          timestamp: futureDate,
          relative: true,
        },
      });
      flushSync();

      const element = getElement('[data-test="far-future"]');
      expect(/in/.test(element.innerHTML)).toEqual(true);
    });

    test("very far past date", async () => {
      const target = document.body;
      const pastDate = dayjs().subtract(1000, "years").toISOString();

      instance = mount(Time, {
        target,
        props: {
          "data-test": "far-past",
          timestamp: pastDate,
          relative: true,
        },
      });
      flushSync();

      const element = getElement('[data-test="far-past"]');
      expect(/ago/.test(element.innerHTML)).toEqual(true);
    });

    test("date near epoch (1970)", async () => {
      const target = document.body;

      instance = mount(Time, {
        target,
        props: {
          "data-test": "epoch",
          timestamp: 0,
          format: "YYYY-MM-DD",
        },
      });
      flushSync();

      const element = getElement('[data-test="epoch"]');
      const formattedDate = dayjs(0).format("YYYY-MM-DD");
      expect(element.innerHTML).toEqual(formattedDate);
      expect(element.getAttribute("datetime")).toEqual("0");
    });

    test("undefined timestamp should use default (current date)", async () => {
      const target = document.body;

      instance = mount(Time, {
        target,
        props: {
          "data-test": "undefined-timestamp",
        },
      });
      flushSync();

      const element = getElement('[data-test="undefined-timestamp"]');
      expect(element.innerHTML).toEqual(
        dayjs(FIXED_DATE).format("MMM DD, YYYY"),
      );
    });
  });

  describe("format edge cases", () => {
    test("empty format string", async () => {
      const target = document.body;

      instance = mount(Time, {
        target,
        props: {
          "data-test": "empty-format",
          timestamp: "2020-02-01",
          format: "",
        },
      });
      flushSync();

      const element = getElement('[data-test="empty-format"]');
      expect(element.innerHTML).toBeTruthy();
    });

    test("complex format with escaped characters", async () => {
      const target = document.body;

      instance = mount(Time, {
        target,
        props: {
          "data-test": "escaped-format",
          timestamp: "2020-02-01",
          format: "[Today is] YYYY-MM-DD [at] HH:mm",
        },
      });
      flushSync();

      const element = getElement('[data-test="escaped-format"]');
      expect(element.innerHTML).toContain("Today is");
      expect(element.innerHTML).toContain("2020-02-01");
      expect(element.innerHTML).toContain("at");
    });
  });

  describe("custom HTML attributes", () => {
    test("should pass through custom HTML attributes", async () => {
      const target = document.body;

      instance = mount(Time, {
        target,
        props: {
          "data-test": "custom-attrs",
          "data-custom": "custom-value",
          id: "time-element",
          class: "time-class",
          timestamp: "2020-02-01",
        },
      });
      flushSync();

      const element = getElement('[data-test="custom-attrs"]');
      expect(element.getAttribute("data-custom")).toEqual("custom-value");
      expect(element.id).toEqual("time-element");
      expect(element.className).toEqual("time-class");
    });

    test("should pass through aria attributes", async () => {
      const target = document.body;

      instance = mount(Time, {
        target,
        props: {
          "data-test": "aria-attrs",
          "aria-label": "Event time",
          "aria-describedby": "time-description",
          timestamp: "2020-02-01",
        },
      });
      flushSync();

      const element = getElement('[data-test="aria-attrs"]');
      expect(element.getAttribute("aria-label")).toEqual("Event time");
      expect(element.getAttribute("aria-describedby")).toEqual(
        "time-description",
      );
    });
  });
});
