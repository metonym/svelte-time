import { expectTypeOf, test } from "vitest";
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
