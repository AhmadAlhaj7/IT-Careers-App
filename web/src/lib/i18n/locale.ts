import { cookies } from "next/headers";

export type Locale = "ar" | "en";

export const LOCALE_COOKIE = "locale";
export const DEFAULT_LOCALE: Locale = "ar";

// Server Components only — reads the visitor's saved preference, defaulting to Arabic
// (the product's primary language) for a first-time visit with no cookie yet.
export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  const value = store.get(LOCALE_COOKIE)?.value;
  return value === "en" ? "en" : DEFAULT_LOCALE;
}
