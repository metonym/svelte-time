import { expectTypeOf, test } from "vitest";
import type { Snippet } from "svelte";
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

test("children accepts a snippet receiving the formatted string", () => {
  expectTypeOf<TimeProps["children"]>().toEqualTypeOf<
    Snippet<[string]> | undefined
  >();

  // @ts-expect-error — a Snippet<[number]> is not assignable to Snippet<[string]>
  const props: TimeProps = { children: (() => {}) as Snippet<[number]> };
  void props;
});

test("time attachment returns an Attachment<HTMLElement>", () => {
  expectTypeOf(time()).toEqualTypeOf<Attachment<HTMLElement>>();
  expectTypeOf(time)
    .parameter(0)
    .toEqualTypeOf<Partial<SvelteTimeOptions> | undefined>();
});
