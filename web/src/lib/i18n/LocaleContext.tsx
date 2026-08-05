"use client";

import { createContext, useContext } from "react";
import type { Dictionary } from "./dictionaries";
import type { Locale } from "./locale";

type LocaleContextValue = {
  locale: Locale;
  dict: Dictionary;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

// Server Components (most pages) call getLocale()/getDictionary() directly — this context
// exists only so Client Components (NavBar, LanguageSwitcher) can reach the same values
// without every server page having to thread them down as props.
export function LocaleProvider({ locale, dict, children }: LocaleContextValue & { children: React.ReactNode }) {
  return <LocaleContext.Provider value={{ locale, dict }}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
