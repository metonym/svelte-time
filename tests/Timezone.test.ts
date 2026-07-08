import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { flushSync, mount, unmount } from "svelte";
import Time, { dayjs, svelteTime, time } from "svelte-time";

dayjs.extend(utc);
dayjs.extend(timezone);

describe("tz prop", () => {
  const TIMESTAMP = "2013-11-18T11:55:20Z";
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

  function render(props: Record<string, unknown>) {
    instance = mount(Time, {
      target: document.body,
      props: { "data-test": "component", ...props },
    });
    flushSync();
    return document.querySelector('[data-test="component"]') as HTMLElement;
  }

  test("basic conversion: renders the zone's local wall-clock time", () => {
    const expected = dayjs(TIMESTAMP).tz(ZONE).format(FORMAT);

    const element = render({ timestamp: TIMESTAMP, tz: ZONE, format: FORMAT });

    expect(element.textContent).toEqual(expected);
    // Sanity: the conversion actually changed the wall-clock value, so this
    // assertion isn't vacuously true against the un-zoned format.
    expect(expected).not.toEqual(dayjs(TIMESTAMP).format(FORMAT));
  });

  test("no tz: renders using plain dayjs(timestamp), unaffected", () => {
    const expected = dayjs(TIMESTAMP).format(FORMAT);

    const element = render({ timestamp: TIMESTAMP, format: FORMAT });

    expect(element.textContent).toEqual(expected);
  });

  test("datetime attribute is unaffected by tz", () => {
    const withoutTz = render({ timestamp: TIMESTAMP, format: FORMAT });
    const datetimeWithoutTz = withoutTz.getAttribute("datetime");

    unmount(instance as ReturnType<typeof mount>);
    instance = null;
    document.body.innerHTML = "";

    const withTz = render({ timestamp: TIMESTAMP, tz: ZONE, format: FORMAT });
    const datetimeWithTz = withTz.getAttribute("datetime");

    expect(datetimeWithTz).toEqual(datetimeWithoutTz);
    expect(datetimeWithTz).toEqual(TIMESTAMP);
  });

  // With the plugins extended (unlike TimezoneMissingPlugin.test.ts), an
  // unrecognized IANA zone name is a distinct, previously-untested failure
  // mode: it's dayjs/Intl's own RangeError, not svelte-time's "requires the
  // utc/timezone plugins" message. Pin what actually happens so a future
  // change can't silently swallow or reword it without a test noticing.
  test("unknown zone name: propagates dayjs/Intl's own RangeError, not our plugin-guard message", () => {
    const props = { timestamp: TIMESTAMP, tz: "Not/AZone", format: FORMAT };

    expect(() => render(props)).toThrow(RangeError);
    expect(() => render(props)).toThrow(/invalid time zone/i);

    const actionNode = document.createElement("time");
    document.body.appendChild(actionNode);
    expect(() => svelteTime(actionNode, props)).toThrow(RangeError);

    const attachmentNode = document.createElement("time");
    document.body.appendChild(attachmentNode);
    expect(() => time(props)(attachmentNode)).toThrow(RangeError);
  });
});
