"use server";

import { cookies } from "next/headers";
import { LOCALE_COOKIE, type Locale } from "./locale";

// Setting a cookie is only possible from a Server Function (not during Server Component
// rendering) — this is that Server Function, called by the client-side LanguageSwitcher.
export async function setLocaleAction(locale: Locale): Promise<void> {
  const store = await cookies();
  store.set(LOCALE_COOKIE, locale, {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
  });
}
