import { render } from "svelte/server";
import { Countdown } from "svelte-time";
import CountdownAttachment from "../CountdownAttachment.test.svelte";

describe("Countdown (SSR)", () => {
  const TS = "2024-01-01T00:00:00.000Z";

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(TS));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("renders a populated <time> element on the server", () => {
    const to = new Date(Date.now() + 5 * 60 * 1000).toISOString();
    const { body } = render(Countdown, { props: { to, live: false } });
    expect(body).toContain("<time");
    expect(body).toContain("00:05:00");
    expect(body).toContain('datetime="PT5M"');
  });

  test("humanize renders on the server", () => {
    const to = new Date(Date.now() + 3600000).toISOString();
    const { body } = render(Countdown, {
      props: { to, humanize: true, live: false },
    });
    expect(body).toContain("an hour");
  });

  test("default live mode starts no timers on the server", () => {
    const spy = vi.spyOn(global, "setInterval");
    render(Countdown, { props: { to: new Date().toISOString() } });
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});

describe("countdown attachment (SSR)", () => {
  test("attachments do not run during server rendering", () => {
    const { body } = render(CountdownAttachment);
    expect(body).toContain('<time data-test="basic"></time>');
    expect(body).not.toContain("datetime=");
  });

  test("default live mode starts no timers on the server", () => {
    const spy = vi.spyOn(global, "setInterval");
    render(CountdownAttachment);
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});
