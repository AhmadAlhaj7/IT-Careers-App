"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { setLocaleAction } from "@/lib/i18n/actions";
import { useLocale } from "@/lib/i18n/LocaleContext";
import type { Locale } from "@/lib/i18n/locale";

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.6 2.4 4 5.6 4 9s-1.4 6.6-4 9c-2.6-2.4-4-5.6-4-9s1.4-6.6 4-9z" />
    </svg>
  );
}

export function LanguageSwitcher() {
  const { locale, dict } = useLocale();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // A "fixed inset-0" click-away overlay would normally handle this, but the nav bar's
  // backdrop-blur (backdrop-filter) establishes a containing block for its fixed-position
  // descendants, so that overlay would only ever cover the header's own bounds — never the
  // rest of the page. A document-level listener sidesteps that entirely.
  useEffect(() => {
    if (!open) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  async function selectLocale(next: Locale) {
    if (next === locale) {
      setOpen(false);
      return;
    }
    setPending(true);
    await setLocaleAction(next);
    setOpen(false);
    setPending(false);
    router.refresh();
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-sm text-neutral-700 hover:bg-neutral-50"
      >
        <GlobeIcon />
        {dict.languageSwitcher.trigger}
      </button>

      {open && (
        <div className="absolute end-0 top-full z-50 mt-2 w-36 overflow-hidden rounded-xl border border-neutral-100 bg-white py-1 shadow-lg">
          <button
            type="button"
            disabled={pending}
            onClick={() => selectLocale("en")}
            className={
              locale === "en"
                ? "block w-full px-4 py-2 text-start text-sm font-medium text-[#0F6E56] disabled:opacity-60"
                : "block w-full px-4 py-2 text-start text-sm text-neutral-700 hover:bg-neutral-50 disabled:opacity-60"
            }
          >
            {dict.languageSwitcher.english}
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={() => selectLocale("ar")}
            className={
              locale === "ar"
                ? "block w-full px-4 py-2 text-start text-sm font-medium text-[#0F6E56] disabled:opacity-60"
                : "block w-full px-4 py-2 text-start text-sm text-neutral-700 hover:bg-neutral-50 disabled:opacity-60"
            }
          >
            {dict.languageSwitcher.arabic}
          </button>
        </div>
      )}
    </div>
  );
}
