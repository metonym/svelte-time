import localeDayjs from "dayjs/locale.json" with { type: "json" };
import { format } from "prettier";

const locales: string[] = [];

for (const { key, name } of localeDayjs) {
  if (key === "en") {
    locales.unshift(`'${key}'`);
  } else {
    locales.push(`'${key}'`);
  }
}

const localesType = await format(
  `/** @default "en" */\nexport type Locales = ${locales.join(" | ")};`,
  { parser: "typescript" },
);
await Bun.write("src/locales.d.ts", localesType);

export {};
