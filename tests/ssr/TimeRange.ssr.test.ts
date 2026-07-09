import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { render } from "svelte/server";
import { dayjs, TimeRange } from "svelte-time";

dayjs.extend(utc);
dayjs.extend(timezone);

describe("TimeRange (SSR)", () => {
  const START = "2024-01-05";
  const END = "2024-01-10T00:00:00.000Z";

  test("renders two populated <time> elements on the server", () => {
    const { body } = render(TimeRange, { props: { start: START, end: END } });

    expect(body).toContain(`<time datetime="${START}"`);
    expect(body).toContain(dayjs(START).format("MMM DD, YYYY"));
    expect(body).toContain(`<time datetime="${END}"`);
    expect(body).toContain(dayjs(END).format("MMM DD, YYYY"));
  });

  test("normalizes Date inputs to ISO in the server-rendered datetime attributes", () => {
    const start = new Date(START);
    const end = new Date(END);
    const { body } = render(TimeRange, { props: { start, end } });

    expect(body).toContain(`datetime="${start.toISOString()}"`);
    expect(body).toContain(`datetime="${end.toISOString()}"`);
  });

  test("format applies independently to both endpoints", () => {
    const { body } = render(TimeRange, {
      props: { start: START, end: END, format: "YYYY-MM-DD" },
    });

    expect(body).toContain(">2024-01-05<");
    expect(body).toContain(`>${dayjs(END).format("YYYY-MM-DD")}<`);
  });

  test("separator is rendered between the two <time> elements", () => {
    const { body } = render(TimeRange, {
      props: { start: START, end: END, separator: " to " },
    });

    expect(body).toContain("</time> to <time");
  });

  test("never renders 'Invalid Date' for valid inputs", () => {
    const { body } = render(TimeRange, { props: { start: START, end: END } });
    expect(body).not.toContain("Invalid Date");
  });

  test("tz prop renders the zoned wall-clock time in the server HTML", () => {
    const zone = "America/Toronto";
    const format = "YYYY-MM-DDTHH:mm:ss";
    const expectedStart = dayjs(START).tz(zone).format(format);
    const expectedEnd = dayjs(END).tz(zone).format(format);

    const { body } = render(TimeRange, {
      props: { start: START, end: END, tz: zone, format },
    });

    expect(body).toContain(expectedStart);
    expect(body).toContain(expectedEnd);
  });
});
