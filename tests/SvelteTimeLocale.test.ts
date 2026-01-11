import dayjs from "dayjs";
import "dayjs/locale/de"; // German
import "dayjs/locale/es"; // Spanish
import "dayjs/locale/fr"; // French
import "dayjs/locale/ja"; // Japanese
import relativeTime from "dayjs/plugin/relativeTime";
import { SvelteComponent } from "svelte";
import SvelteTimeLocale from "./SvelteTimeLocale.test.svelte";

// Extend dayjs with required plugins
dayjs.extend(relativeTime);

describe("svelte-time-locale", () => {
  let instance: null | SvelteComponent = null;
  const FIXED_DATE = new Date("2024-01-01T12:00:00.000Z");

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(FIXED_DATE);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    if (instance) {
      instance.$destroy();
    }
    instance = null;
    document.body.innerHTML = "";
  });

  const getElement = (selector: string) => {
    return document.querySelector(selector) as HTMLElement;
  };

  test("handles German locale formatting", async () => {
    const target = document.body;
    instance = new SvelteTimeLocale({ target });

    // Full format
    const germanFull = getElement('[data-test="german-full"]');
    const germanFormatted = getElement('[data-test="german-formatted"]');
    expect(germanFull.innerHTML).toEqual(germanFormatted.innerHTML);

    // Short format
    const germanShort = getElement('[data-test="german-short"]');
    expect(germanShort.innerHTML).toEqual(
      dayjs(FIXED_DATE).locale("de").format("dd., D. MMM YYYY"),
    );

    // Month year format
    const germanMonthYear = getElement('[data-test="german-month-year"]');
    expect(germanMonthYear.innerHTML).toEqual(
      dayjs(FIXED_DATE).locale("de").format("MMMM YYYY"),
    );
  });

  test("handles Spanish locale formatting", async () => {
    const target = document.body;
    instance = new SvelteTimeLocale({ target });

    // Full format
    const spanishFull = getElement('[data-test="spanish-full"]');
    const spanishFormatted = getElement('[data-test="spanish-formatted"]');
    expect(spanishFull.innerHTML).toEqual(spanishFormatted.innerHTML);

    // Short format
    const spanishShort = getElement('[data-test="spanish-short"]');
    expect(spanishShort.innerHTML).toEqual(
      dayjs(FIXED_DATE).locale("es").format("dd., D MMM YYYY"),
    );
  });

  test("handles French locale formatting", async () => {
    const target = document.body;
    instance = new SvelteTimeLocale({ target });

    // Full format
    const frenchFull = getElement('[data-test="french-full"]');
    const frenchFormatted = getElement('[data-test="french-formatted"]');
    expect(frenchFull.innerHTML).toEqual(frenchFormatted.innerHTML);

    // Short format
    const frenchShort = getElement('[data-test="french-short"]');
    expect(frenchShort.innerHTML).toEqual(
      dayjs(FIXED_DATE).locale("fr").format("dd. D MMM YYYY"),
    );
  });

  test("handles Japanese locale formatting", async () => {
    const target = document.body;
    instance = new SvelteTimeLocale({ target });

    // Full format
    const japaneseFull = getElement('[data-test="japanese-full"]');
    const japaneseFormatted = getElement('[data-test="japanese-formatted"]');
    expect(japaneseFull.innerHTML).toEqual(japaneseFormatted.innerHTML);

    // Short format
    const japaneseShort = getElement('[data-test="japanese-short"]');
    expect(japaneseShort.innerHTML).toEqual(
      dayjs(FIXED_DATE).locale("ja").format("YYYY年M月D日"),
    );
  });

  test("handles relative time in different locales", async () => {
    const target = document.body;
    instance = new SvelteTimeLocale({ target });

    // German relative time
    const germanRelative = getElement('[data-test="german-relative"]');
    expect(germanRelative.innerHTML).toEqual(
      dayjs(FIXED_DATE).locale("de").fromNow(),
    );

    // Spanish relative time
    const spanishRelative = getElement('[data-test="spanish-relative"]');
    expect(spanishRelative.innerHTML).toEqual(
      dayjs(FIXED_DATE).locale("es").fromNow(),
    );

    // French relative time
    const frenchRelative = getElement('[data-test="french-relative"]');
    expect(frenchRelative.innerHTML).toEqual(
      dayjs(FIXED_DATE).locale("fr").fromNow(),
    );

    // Japanese relative time
    const japaneseRelative = getElement('[data-test="japanese-relative"]');
    expect(japaneseRelative.innerHTML).toEqual(
      dayjs(FIXED_DATE).locale("ja").fromNow(),
    );
  });

  test("handles action locale formatting", async () => {
    const target = document.body;
    instance = new SvelteTimeLocale({ target });

    const actionLocaleEs = getElement('[data-test="action-locale-es"]');
    expect(actionLocaleEs.innerText).toEqual(
      dayjs().locale("es").format("MMM DD, YYYY"),
    );

    const actionLocaleFr = getElement('[data-test="action-locale-fr"]');
    expect(actionLocaleFr.innerText).toEqual(
      dayjs().locale("fr").format("MMM DD, YYYY"),
    );

    const actionLocaleJa = getElement('[data-test="action-locale-ja"]');
    expect(actionLocaleJa.innerText).toEqual(
      dayjs().locale("ja").format("MMM DD, YYYY"),
    );

    const actionLocaleDe = getElement('[data-test="action-locale-de"]');
    expect(actionLocaleDe.innerText).toEqual(
      dayjs().locale("de").format("MMM DD, YYYY"),
    );
  });

  test("preserves locale from dayjs instance (legacy behavior)", async () => {
    const target = document.body;
    instance = new SvelteTimeLocale({ target });

    // Legacy: passing dayjs instance with locale set should preserve it
    const legacyLocaleDe = getElement('[data-test="legacy-locale-de"]');
    expect(legacyLocaleDe.innerHTML).toEqual(
      dayjs(FIXED_DATE).locale("de").format("dddd, MMMM D, YYYY"),
    );

    const legacyLocaleEs = getElement('[data-test="legacy-locale-es"]');
    expect(legacyLocaleEs.innerHTML).toEqual(
      dayjs(FIXED_DATE).locale("es").format("dddd, D [de] MMMM [de] YYYY"),
    );

    const legacyLocaleRelativeDe = getElement(
      '[data-test="legacy-locale-relative-de"]',
    );
    expect(legacyLocaleRelativeDe.innerHTML).toEqual(
      dayjs(FIXED_DATE).locale("de").fromNow(),
    );
  });
});
