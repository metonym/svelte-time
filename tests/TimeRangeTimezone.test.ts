import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { flushSync, mount, unmount } from "svelte";
import { dayjs, svelteTimeRange, TimeRange, timeRange } from "svelte-time";

dayjs.extend(utc);
dayjs.extend(timezone);

// Isolated in its own file, mirroring Timezone.test.ts: keeping the tz
// success path (which requires the utc/timezone plugins extended) separate
// from TimeRange.test.ts's missing-plugin case avoids tainting the shared
// dayjs singleton the missing-plugin test depends on being unextended.
describe("TimeRange tz prop", () => {
  const START = "2013-11-18T11:55:20Z";
  const END = "2013-11-19T11:55:20Z";
  const FORMAT = "YYYY-MM-DDTHH:mm:ss";
  const ZONE = "America/Toronto";

  let instance: null | ReturnType<typeof mount> = null;

  afterEach(() => {
    if (instance) {
      unmount(instance);
    }
    instance = null;
    document.body.innerHTML = "";
  });

  function renderComponent(
    props: { start: string; end: string } & Record<string, unknown>,
  ) {
    instance = mount(TimeRange, { target: document.body, props });
    flushSync();
    return document.body.querySelectorAll("time");
  }

  test("basic conversion: renders the zone's local wall-clock time for both endpoints", () => {
    const expectedStart = dayjs(START).tz(ZONE).format(FORMAT);
    const expectedEnd = dayjs(END).tz(ZONE).format(FORMAT);

    const times = renderComponent({
      start: START,
      end: END,
      tz: ZONE,
      format: FORMAT,
    });

    expect(times[0]!.textContent).toEqual(expectedStart);
    expect(times[1]!.textContent).toEqual(expectedEnd);
    // Sanity: the conversion actually changed the wall-clock value.
    expect(expectedEnd).not.toEqual(dayjs(END).format(FORMAT));
  });

  test("datetime attributes are unaffected by tz", () => {
    const times = renderComponent({ start: START, end: END, tz: ZONE });

    expect(times[0]!.getAttribute("datetime")).toEqual(START);
    expect(times[1]!.getAttribute("datetime")).toEqual(END);
  });

  test("action: renders the zone's local wall-clock time for both endpoints", () => {
    const node = document.createElement("span");
    document.body.appendChild(node);

    svelteTimeRange(node, { start: START, end: END, tz: ZONE, format: FORMAT });
    const times = node.querySelectorAll("time");

    expect(times[0]!.textContent).toEqual(dayjs(START).tz(ZONE).format(FORMAT));
    expect(times[1]!.textContent).toEqual(dayjs(END).tz(ZONE).format(FORMAT));

    document.body.innerHTML = "";
  });

  test("attachment: renders the zone's local wall-clock time for both endpoints", () => {
    const node = document.createElement("span");
    document.body.appendChild(node);

    timeRange({ start: START, end: END, tz: ZONE, format: FORMAT })(node);
    const times = node.querySelectorAll("time");

    expect(times[0]!.textContent).toEqual(dayjs(START).tz(ZONE).format(FORMAT));
    expect(times[1]!.textContent).toEqual(dayjs(END).tz(ZONE).format(FORMAT));

    document.body.innerHTML = "";
  });

  test("unknown zone name: propagates dayjs/Intl's own RangeError, not our plugin-guard message", () => {
    const props = { start: START, end: END, tz: "Not/AZone", format: FORMAT };

    expect(() => renderComponent(props)).toThrow(RangeError);
    expect(() => renderComponent(props)).toThrow(/invalid time zone/i);

    const actionNode = document.createElement("span");
    document.body.appendChild(actionNode);
    expect(() => svelteTimeRange(actionNode, props)).toThrow(RangeError);

    const attachmentNode = document.createElement("span");
    document.body.appendChild(attachmentNode);
    expect(() => timeRange(props)(attachmentNode)).toThrow(RangeError);
  });
});
