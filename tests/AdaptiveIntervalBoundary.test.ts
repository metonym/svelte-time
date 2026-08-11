import { flushSync, mount, unmount } from "svelte";
import Time from "svelte-time";

describe("adaptive live interval at tier boundaries", () => {
  let instances: ReturnType<typeof mount>[] = [];

  afterEach(() => {
    for (const instance of instances) {
      unmount(instance);
    }
    instances = [];
    document.body.innerHTML = "";
    vi.useRealTimers();
  });

  test("does not enter an infinite update loop when shared clocks disagree about an hour boundary", () => {
    vi.useFakeTimers();

    const base = new Date("2026-08-11T12:00:00Z");
    vi.setSystemTime(base);

    // Activates the 5-minute shared clock with `now` cached at `base`.
    instances.push(
      mount(Time, {
        target: document.body,
        props: {
          live: true,
          relative: true,
          timestamp: new Date(base.getTime() - 2 * 60 * 60 * 1_000),
        },
      }),
    );
    flushSync();

    vi.setSystemTime(new Date(base.getTime() + 2_000));

    // Activates the 30-second shared clock with `now` cached 2s after `base`.
    instances.push(
      mount(Time, {
        target: document.body,
        props: {
          live: true,
          relative: true,
          timestamp: new Date(base.getTime() - 30 * 60 * 1_000),
        },
      }),
    );
    flushSync();

    // Falls between the two shared clocks' views of the one-hour boundary.
    expect(() => {
      instances.push(
        mount(Time, {
          target: document.body,
          props: {
            live: true,
            relative: true,
            timestamp: new Date(base.getTime() - (60 * 60 * 1_000 - 1_000)),
          },
        }),
      );
      flushSync();
    }).not.toThrow();
  });
});
