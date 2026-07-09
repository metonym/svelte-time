import dayjs from "dayjs";
import { flushSync, mount, unmount } from "svelte";
import TimeRange from "./TimeRange.test.svelte";

describe("TimeRange", () => {
  let instance: null | ReturnType<typeof mount> = null;

  const START = "2024-01-05";
  const END = "2024-01-10T00:00:00.000Z";

  afterEach(() => {
    if (instance) {
      unmount(instance);
    }
    instance = null;
    document.body.innerHTML = "";
  });

  const getElement = (selector: string) => {
    return document.querySelector(selector) as HTMLElement;
  };

  test("default render: two <time> elements with correct datetime and formatted text", () => {
    instance = mount(TimeRange, { target: document.body });
    flushSync();

    const times = getElement('[data-test="default"]').querySelectorAll("time");
    expect(times.length).toEqual(2);

    expect(times[0]!.getAttribute("datetime")).toEqual(START);
    expect(times[0]!.textContent).toEqual(dayjs(START).format("MMM DD, YYYY"));

    expect(times[1]!.getAttribute("datetime")).toEqual(END);
    expect(times[1]!.textContent).toEqual(dayjs(END).format("MMM DD, YYYY"));

    expect(getElement('[data-test="default"]').textContent).toEqual(
      `${dayjs(START).format("MMM DD, YYYY")} – ${dayjs(END).format("MMM DD, YYYY")}`,
    );
  });

  test("custom format applies independently to both endpoints", () => {
    instance = mount(TimeRange, { target: document.body });
    flushSync();

    const times = getElement('[data-test="custom-format"]').querySelectorAll(
      "time",
    );
    expect(times[0]!.textContent).toEqual("2024-01-05");
    expect(times[1]!.textContent).toEqual(dayjs(END).format("YYYY-MM-DD"));
  });

  test("custom separator", () => {
    instance = mount(TimeRange, { target: document.body });
    flushSync();

    expect(getElement('[data-test="custom-separator"]').textContent).toEqual(
      `${dayjs(START).format("MMM DD, YYYY")} to ${dayjs(END).format("MMM DD, YYYY")}`,
    );
  });

  test("locale applies independently to both endpoints", () => {
    instance = mount(TimeRange, { target: document.body });
    flushSync();

    const times = getElement('[data-test="locale"]').querySelectorAll("time");
    expect(times[0]!.textContent).toEqual(
      dayjs(START).locale("de").format("MMMM"),
    );
    expect(times[1]!.textContent).toEqual(
      dayjs(END).locale("de").format("MMMM"),
    );
  });

  test("...rest props spread onto both <time> elements", () => {
    instance = mount(TimeRange, { target: document.body });
    flushSync();

    const times = getElement('[data-test="rest-props"]').querySelectorAll(
      "time",
    );
    for (const time of times) {
      expect(time.getAttribute("class")).toEqual("range");
      expect(time.getAttribute("data-foo")).toEqual("bar");
    }
  });

  test("children snippet receives all four arguments and fully replaces default markup", () => {
    instance = mount(TimeRange, { target: document.body });
    flushSync();

    expect(
      getElement('[data-test="children"]').querySelectorAll("time").length,
    ).toEqual(0);

    expect(getElement('[data-test="children-start"]').textContent).toEqual(
      dayjs(START).format("MMM DD, YYYY"),
    );
    expect(getElement('[data-test="children-end"]').textContent).toEqual(
      dayjs(END).format("MMM DD, YYYY"),
    );
    expect(
      getElement('[data-test="children-start-datetime"]').textContent,
    ).toEqual(START);
    expect(
      getElement('[data-test="children-end-datetime"]').textContent,
    ).toEqual(END);
  });
});

// Isolated: dayjs plugin extension mutates the shared `dayjs` singleton for
// the lifetime of the Vitest worker, so a fresh, unextended copy is needed
// to test the missing-plugin error path. See TimezoneMissingPlugin.test.ts.
describe("TimeRange tz prop without utc/timezone plugins extended", () => {
  test("throws a clear, actionable error", async () => {
    vi.resetModules();

    const { dayjs } = await import("../src/dayjs.js");
    expect(typeof (dayjs() as any).tz).not.toEqual("function");

    const { default: TimeRange } = await import("../src/TimeRange.svelte");
    const { mount, flushSync, unmount } = await import("svelte");

    let thrown: unknown;
    let instance: ReturnType<typeof mount> | undefined;
    try {
      instance = mount(TimeRange, {
        target: document.body,
        props: {
          start: "2013-11-18T11:55:20Z",
          end: "2013-11-19T11:55:20Z",
          tz: "America/Toronto",
        },
      });
      flushSync();
    } catch (error) {
      thrown = error;
    } finally {
      if (instance) unmount(instance);
      document.body.innerHTML = "";
    }

    expect(thrown).toBeInstanceOf(Error);
    expect((thrown as Error).message).toMatch(
      /svelte-time: the `tz` prop requires the dayjs `utc` and `timezone` plugins/,
    );
  }, 15_000);
});
