import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { render } from "svelte/server";
import Time, { dayjs } from "svelte-time";
import TimeChildren from "./TimeChildren.ssr.test.svelte";

dayjs.extend(utc);
dayjs.extend(timezone);

describe("Time (SSR)", () => {
  const TS = "2024-01-01T00:00:00.000Z";

  test("renders a populated <time> element on the server", () => {
    const { body } = render(Time, { props: { timestamp: TS } });
    expect(body).toContain("<time");
    expect(body).toContain(dayjs(TS).format("MMM DD, YYYY"));
    expect(body).toContain(`datetime="${TS}"`);
  });

  test("normalizes Date inputs to ISO in the server-rendered datetime attribute", () => {
    const date = new Date(TS);
    const { body } = render(Time, { props: { timestamp: date } });
    expect(body).toContain(`datetime="${date.toISOString()}"`);
  });

  test("relative mode renders text and a title on the server", () => {
    const { body } = render(Time, { props: { timestamp: TS, relative: true } });
    expect(body).toContain(dayjs(TS).from(dayjs()));
    expect(body).toContain(`title="${dayjs(TS).format("MMM DD, YYYY")}"`);
  });

  test("live mode starts no timers on the server", () => {
    const spy = vi.spyOn(global, "setInterval");
    render(Time, { props: { timestamp: TS, relative: true, live: true } });
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  test("children snippet renders custom markup in the server HTML", () => {
    const { body } = render(TimeChildren, { props: { timestamp: TS } });
    expect(body).toContain(
      `<strong>${dayjs(TS).format("MMM DD, YYYY")}</strong>`,
    );
  });

  test("never renders 'Invalid Date' for valid inputs", () => {
    for (const timestamp of [TS, 0, new Date(TS), dayjs(TS)]) {
      expect(render(Time, { props: { timestamp } }).body).not.toContain(
        "Invalid Date",
      );
    }
  });

  test("tz prop renders the zoned wall-clock time in the server HTML", () => {
    const zone = "America/Toronto";
    const format = "YYYY-MM-DDTHH:mm:ss";
    const expected = dayjs(TS).tz(zone).format(format);

    const { body } = render(Time, {
      props: { timestamp: TS, tz: zone, format },
    });

    expect(body).toContain(expected);
    // Sanity: the conversion actually changed the wall-clock value.
    expect(expected).not.toEqual(dayjs(TS).format(format));
  });

  test('relativeStyle="micro" renders a compact unit in the server HTML', () => {
    const timestamp = dayjs().subtract(4, "day").toISOString();

    const { body } = render(Time, {
      props: { timestamp, relative: true, relativeStyle: "micro" },
    });

    expect(body).toContain(">4d<");
  });

  test("relativeThreshold: under the threshold still renders relative text with a title, server-side", () => {
    const threshold = 60 * 60 * 1_000; // 1 hour
    const timestamp = dayjs().subtract(5, "minute").toISOString();
    const format = "h:mm a";

    const { body } = render(Time, {
      props: {
        timestamp,
        relative: true,
        relativeThreshold: threshold,
        format,
      },
    });

    expect(body).toContain(dayjs(timestamp).from(dayjs()));
    expect(body).toContain(`title="${dayjs(timestamp).format(format)}"`);
  });

  test("relativeThreshold: renders the absolute format server-side once already past the threshold", () => {
    const threshold = 60 * 60 * 1_000; // 1 hour
    const timestamp = dayjs().subtract(2, "hour").toISOString();
    const format = "h:mm a";
    const expected = dayjs(timestamp).format(format);

    const { body } = render(Time, {
      props: {
        timestamp,
        relative: true,
        relativeThreshold: threshold,
        format,
      },
    });

    expect(body).toContain(`>${expected}<`);
    expect(body).not.toContain("title=");
  });
});
