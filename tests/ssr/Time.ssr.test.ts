import { render } from "svelte/server";
import Time, { dayjs } from "svelte-time";

describe("Time (SSR)", () => {
  const TS = "2024-01-01T00:00:00.000Z";

  test("renders a populated <time> element on the server", () => {
    const { body } = render(Time, { props: { timestamp: TS } });
    expect(body).toContain("<time");
    expect(body).toContain(dayjs(TS).format("MMM DD, YYYY"));
    expect(body).toContain(`datetime="${TS}"`);
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

  test("never renders 'Invalid Date' for valid inputs", () => {
    for (const timestamp of [TS, 0, new Date(TS), dayjs(TS)]) {
      expect(render(Time, { props: { timestamp } }).body).not.toContain(
        "Invalid Date",
      );
    }
  });
});
