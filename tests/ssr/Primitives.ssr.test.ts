import dayjs from "dayjs";
import { formatTime, now, relativeTime } from "svelte-time";

describe("Primitives (SSR)", () => {
  const TS = "2024-01-01T00:00:00.000Z";

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(TS));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("now() returns the current fake-clock time and starts no timers", () => {
    const spy = vi.spyOn(global, "setInterval");
    const value = now();

    expect(dayjs.isDayjs(value)).toEqual(true);
    expect(value.isSame(dayjs(TS))).toEqual(true);
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  test("now() reflects current server time on every call, not a stale module value", () => {
    expect(now().isSame(dayjs(TS))).toEqual(true);

    vi.advanceTimersByTime(60_000);

    expect(now().isSame(dayjs(TS).add(60_000, "millisecond"))).toEqual(true);
  });

  test("formatTime works in the node project", () => {
    expect(formatTime(TS)).toEqual(dayjs(TS).format("MMM DD, YYYY"));
  });

  test("relativeTime works in the node project", () => {
    expect(relativeTime(TS)).toEqual(dayjs(TS).from(dayjs()));
  });
});
