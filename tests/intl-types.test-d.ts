import type { Attachment } from "svelte/attachments";
import type { SvelteTimeOptions, TimeInput, TimeProps } from "svelte-time/intl";
import {
  formatDuration,
  formatRange,
  formatTime,
  relativeTime,
  time,
  toISODuration,
} from "svelte-time/intl";
import { expectTypeOf, test } from "vitest";

test("intl format helpers return strings", () => {
  expectTypeOf(formatTime(0)).toEqualTypeOf<string>();
  expectTypeOf(formatRange(0, 1)).toEqualTypeOf<string>();
  expectTypeOf(relativeTime(0, { numeric: "always" })).toEqualTypeOf<string>();
  expectTypeOf(formatDuration(0, { style: "long" })).toEqualTypeOf<string>();
  expectTypeOf(toISODuration(0)).toEqualTypeOf<string>();
  expectTypeOf<TimeInput>().toEqualTypeOf<Date | number | string>();
});

test("intl time attachment returns an Attachment<HTMLElement>", () => {
  expectTypeOf(time()).toEqualTypeOf<Attachment<HTMLElement>>();
  expectTypeOf(time)
    .parameter(0)
    .toEqualTypeOf<Partial<SvelteTimeOptions> | undefined>();
  expectTypeOf<TimeProps["options"]>().toEqualTypeOf<
    Intl.DateTimeFormatOptions | undefined
  >();
});
