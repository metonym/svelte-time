import { render } from "svelte/server";
import { Duration } from "svelte-time";
import DurationAttachment from "../DurationAttachment.test.svelte";

describe("Duration (SSR)", () => {
  test("renders a populated <time> element on the server", () => {
    const { body } = render(Duration, { props: { value: 3661000 } });
    expect(body).toContain("<time");
    expect(body).toContain("01:01:01");
    expect(body).toContain('datetime="PT1H1M1S"');
  });

  test("humanize renders on the server", () => {
    const { body } = render(Duration, {
      props: { value: 3600000, humanize: true },
    });
    expect(body).toContain("an hour");
  });

  test("since + live mode starts no timers on the server", () => {
    const spy = vi.spyOn(global, "setInterval");
    render(Duration, {
      props: { since: new Date().toISOString(), live: true },
    });
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});

describe("duration attachment (SSR)", () => {
  test("attachments do not run during server rendering", () => {
    const { body } = render(DurationAttachment);
    expect(body).toContain('<time data-test="basic"></time>');
    expect(body).not.toContain("datetime=");
  });

  test("live mode starts no timers on the server", () => {
    const spy = vi.spyOn(global, "setInterval");
    render(DurationAttachment);
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});
