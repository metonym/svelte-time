import dayjs from "dayjs";
import { flushSync, mount, unmount } from "svelte";
import TimeRangeAttachment from "./TimeRangeAttachment.test.svelte";

describe("timeRange attachment", () => {
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

  test("basic render: two <time> children with correct datetime and text", () => {
    instance = mount(TimeRangeAttachment, { target: document.body });
    flushSync();

    const times = getElement('[data-test="basic"]').querySelectorAll("time");
    expect(times.length).toEqual(2);
    expect(times[0]!.getAttribute("datetime")).toEqual(START);
    expect(times[0]!.textContent).toEqual(dayjs(START).format("MMM DD, YYYY"));
    expect(times[1]!.getAttribute("datetime")).toEqual(END);
    expect(times[1]!.textContent).toEqual(dayjs(END).format("MMM DD, YYYY"));
    expect(getElement('[data-test="basic"]').textContent).toEqual(
      `${dayjs(START).format("MMM DD, YYYY")} – ${dayjs(END).format("MMM DD, YYYY")}`,
    );
  });

  test("format controls the displayed template on both endpoints", () => {
    instance = mount(TimeRangeAttachment, { target: document.body });
    flushSync();

    const times = getElement('[data-test="format"]').querySelectorAll("time");
    expect(times[0]!.textContent).toEqual("2024-01-05");
    expect(times[1]!.textContent).toEqual(dayjs(END).format("YYYY-MM-DD"));
  });

  test("separator is rendered between the two <time> elements", () => {
    instance = mount(TimeRangeAttachment, { target: document.body });
    flushSync();

    expect(getElement('[data-test="separator"]').textContent).toEqual(
      `${dayjs(START).format("MMM DD, YYYY")} to ${dayjs(END).format("MMM DD, YYYY")}`,
    );
  });

  test("locale applies to both endpoints", () => {
    instance = mount(TimeRangeAttachment, { target: document.body });
    flushSync();

    const times = getElement('[data-test="locale"]').querySelectorAll("time");
    expect(times[0]!.textContent).toEqual(
      dayjs(START).locale("de").format("MMMM"),
    );
    expect(times[1]!.textContent).toEqual(
      dayjs(END).locale("de").format("MMMM"),
    );
  });

  test("reactivity: re-runs when a reactive value used to build options changes", () => {
    instance = mount(TimeRangeAttachment, { target: document.body });
    flushSync();

    const times = getElement('[data-test="reactive"]').querySelectorAll("time");
    expect(times[0]!.getAttribute("datetime")).toEqual(START);

    getElement("button").click();
    flushSync();

    const updatedTimes = getElement('[data-test="reactive"]').querySelectorAll(
      "time",
    );
    expect(updatedTimes[0]!.getAttribute("datetime")).toEqual("2024-02-05");
    expect(updatedTimes[1]!.getAttribute("datetime")).toEqual(
      "2024-02-10T00:00:00.000Z",
    );
  });
});

// Isolated: dayjs plugin extension mutates the shared `dayjs` singleton for
// the lifetime of the Vitest worker. See TimezoneMissingPlugin.test.ts.
describe("timeRange attachment tz option without utc/timezone plugins extended", () => {
  test("throws a clear, actionable error", async () => {
    vi.resetModules();

    const { dayjs } = await import("../src/dayjs.js");
    expect(typeof (dayjs() as any).tz).not.toEqual("function");

    const { timeRange } = await import("../src/attachment.js");

    const node = document.createElement("span");
    document.body.appendChild(node);

    let thrown: unknown;
    try {
      timeRange({
        start: "2013-11-18T11:55:20Z",
        end: "2013-11-19T11:55:20Z",
        tz: "America/Toronto",
      })(node);
    } catch (error) {
      thrown = error;
    } finally {
      document.body.innerHTML = "";
    }

    expect(thrown).toBeInstanceOf(Error);
    expect((thrown as Error).message).toMatch(
      /svelte-time: the `tz` prop requires the dayjs `utc` and `timezone` plugins/,
    );
  }, 15_000);
});
