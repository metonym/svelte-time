import type { Snippet } from "svelte";
import type { Attachment } from "svelte/attachments";
import type {
  DurationProps,
  Locales,
  SvelteDurationOptions,
  SvelteTimeOptions,
  TimeProps,
} from "svelte-time";
import { duration, time } from "svelte-time";
import { expectTypeOf, test } from "vitest";

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

test("Duration value accepts number, string, object, or a dayjs Duration", () => {
  expectTypeOf<number>().toExtend<DurationProps["value"]>();
  expectTypeOf<string>().toExtend<DurationProps["value"]>();
  expectTypeOf<undefined>().toExtend<DurationProps["value"]>();
});

test("Duration children accepts a snippet receiving the formatted string", () => {
  expectTypeOf<DurationProps["children"]>().toEqualTypeOf<
    Snippet<[string]> | undefined
  >();
});

test("svelteDuration action options are exported", () => {
  expectTypeOf<SvelteDurationOptions["since"]>().not.toBeNever();
  expectTypeOf<SvelteDurationOptions["withSuffix"]>().toEqualTypeOf<
    boolean | undefined
  >();
});

test("duration attachment returns an Attachment<HTMLElement>", () => {
  expectTypeOf(duration()).toEqualTypeOf<Attachment<HTMLElement>>();
  expectTypeOf(duration)
    .parameter(0)
    .toEqualTypeOf<Partial<SvelteDurationOptions> | undefined>();
});
