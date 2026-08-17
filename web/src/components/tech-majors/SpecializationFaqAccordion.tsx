"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n/locale";
import { localize } from "@/lib/localize";
import type { SpecializationFaq } from "@/lib/types";

type SpecializationFaqAccordionProps = {
  faqs: SpecializationFaq[];
  locale: Locale;
};

// Same single-open accordion interaction as the home page's Faq.tsx, generalized to take real
// admin-authored Q&A instead of static dictionary content.
export function SpecializationFaqAccordion({ faqs, locale }: SpecializationFaqAccordionProps) {
  const [open, setOpen] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      {faqs.map((faq, index) => {
        const isOpen = open === index;
        return (
          <div
            key={index}
            className={`rounded-2xl border bg-white shadow-sm shadow-neutral-900/5 transition ${isOpen ? "border-[#0F6E56]/35" : "border-neutral-100"}`}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start"
            >
              <span className="text-sm font-semibold text-neutral-900 sm:text-base">{localize(faq.question, locale)}</span>
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-base font-bold leading-none ${
                  isOpen ? "bg-[#0F6E56]/10 text-[#0F6E56]" : "bg-neutral-100 text-neutral-500"
                }`}
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && <p className="px-5 pb-4 text-sm leading-[1.9] text-neutral-600">{localize(faq.answer, locale)}</p>}
          </div>
        );
      })}
    </div>
  );
}
