import { render } from "svelte/server";
import { Stopwatch } from "svelte-time";
import StopwatchAttachment from "../StopwatchAttachment.test.svelte";

describe("Stopwatch (SSR)", () => {
  const TS = "2024-01-01T00:00:00.000Z";

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(TS));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("renders a populated <time> element on the server", () => {
    const since = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const { body } = render(Stopwatch, { props: { since, live: false } });
    expect(body).toContain("<time");
    expect(body).toContain("00:05:00");
    expect(body).toContain('datetime="PT5M"');
  });

  test("humanize renders on the server", () => {
    const since = new Date(Date.now() - 3600000).toISOString();
    const { body } = render(Stopwatch, {
      props: { since, humanize: true, live: false },
    });
    expect(body).toContain("an hour");
  });

  test("default live mode starts no timers on the server", () => {
    const spy = vi.spyOn(global, "setInterval");
    render(Stopwatch, { props: { since: new Date().toISOString() } });
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});

describe("stopwatch attachment (SSR)", () => {
  test("attachments do not run during server rendering", () => {
    const { body } = render(StopwatchAttachment);
    expect(body).toContain('<time data-test="basic"></time>');
    expect(body).not.toContain("datetime=");
  });

  test("default live mode starts no timers on the server", () => {
    const spy = vi.spyOn(global, "setInterval");
    render(StopwatchAttachment);
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});
