import type { Locale } from "./i18n/locale";
import type { LocalizedText } from "./types";

// Section/FAQ/item text isn't marked required in the admin editor (only Name/CardSentence/
// Summary are) — an admin filling only Arabic shouldn't leave English readers staring at a
// blank heading. Falls back to Arabic, the one language every content field is realistically
// filled in for on this Arabic-first product.
export function localize(text: LocalizedText, locale: Locale): string {
  return text[locale].length > 0 ? text[locale] : text.ar;
}
