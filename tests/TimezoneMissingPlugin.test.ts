// Isolated in its own file: dayjs plugin extension mutates the shared
// `dayjs` singleton (src/dayjs.js) for the lifetime of the Vitest worker, so
// once any other test file extends `utc`/`timezone`, later files would see
// those plugins as already present. `vi.resetModules()` + a dynamic import
// gets a fresh, unextended copy regardless of suite execution order.
describe("tz prop without utc/timezone plugins extended", () => {
  // Re-importing Time.svelte/dayjs/svelte fresh after vi.resetModules() is
  // slow under parallel worker contention; give it headroom beyond the 5s
  // default to avoid flaking in CI.
  test("throws a clear, actionable error", async () => {
    vi.resetModules();

    const { dayjs } = await import("../src/dayjs.js");
    expect(typeof (dayjs() as any).tz).not.toEqual("function");

    const { default: Time } = await import("../src/Time.svelte");
    const { mount, flushSync, unmount } = await import("svelte");

    let thrown: unknown;
    let instance: ReturnType<typeof mount> | undefined;
    try {
      instance = mount(Time, {
        target: document.body,
        props: {
          timestamp: "2013-11-18T11:55:20Z",
          tz: "America/Toronto",
        },
      });
      flushSync();
    } catch (error) {
      thrown = error;
    } finally {
      if (instance) unmount(instance);
      document.body.innerHTML = "";
    }

    expect(thrown).toBeInstanceOf(Error);
    expect((thrown as Error).message).toMatch(
      /svelte-time: the `tz` prop requires the dayjs `utc` and `timezone` plugins/,
    );
  }, 15_000);
});
