import { expectTypeOf, test } from "vitest";
import { time } from "svelte-time";
import type { Attachment } from "svelte/attachments";
import type { TimeProps, SvelteTimeOptions, Locales } from "svelte-time";

test("format is a plain string", () => {
  expectTypeOf<TimeProps["format"]>().toEqualTypeOf<string | undefined>();
});

test("formatted is not a prop", () => {
  // @ts-expect-error — formatted was removed; it is not a component prop
  const props: TimeProps = { formatted: "" };
  void props;
});

test("action options are exported and include title", () => {
  expectTypeOf<SvelteTimeOptions["title"]>().not.toBeNever();
  expectTypeOf<Locales>().toExtend<string>();
});

test("time attachment returns an Attachment<HTMLElement>", () => {
  expectTypeOf(time()).toEqualTypeOf<Attachment<HTMLElement>>();
  expectTypeOf(time)
    .parameter(0)
    .toEqualTypeOf<Partial<SvelteTimeOptions> | undefined>();
});
