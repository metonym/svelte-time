import { $ } from "bun";
import localeDayjs from "dayjs/locale.json" with { type: "json" };

const locales: string[] = [];

for (const { key, name } of localeDayjs) {
  if (key === "en") {
    locales.unshift(`'${key}' /* ${name} */`);
  } else {
    locales.push(`'${key}' /* ${name} */`);
  }
}

const localesType = `/** @default "en" */\nexport type Locales = ${locales.join(" | ")};\n`;

await Bun.write("src/locales.d.ts", localesType);
await $`bunx biome format --write src/locales.d.ts`;
