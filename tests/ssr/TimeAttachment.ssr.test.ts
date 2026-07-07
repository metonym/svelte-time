import { render } from "svelte/server";
import TimeAttachment from "../examples/TimeAttachment.svelte";
import SvelteTimeAttachmentLive from "../SvelteTimeAttachmentLive.test.svelte";

describe("time attachment (SSR)", () => {
  test("renders an empty <time> element on the server", () => {
    const { body } = render(TimeAttachment);
    expect(body).toContain("<time></time>");
  });

  test("live mode starts no timers on the server", () => {
    const spy = vi.spyOn(global, "setInterval");
    render(SvelteTimeAttachmentLive);
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});
