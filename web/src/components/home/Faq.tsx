"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type FaqProps = {
  dict: Dictionary["homePage"];
};

// The original design's 5th question was a specific refund policy ("7 days, unless over half
// the roadmap is done") that isn't a confirmed real policy anywhere in this app or business —
// dropped rather than publish an unverified commitment about customers' money.
export function Faq({ dict }: FaqProps) {
  const [open, setOpen] = useState(0);

  const items = [
    { q: dict.faq1Q, a: dict.faq1A },
    { q: dict.faq2Q, a: dict.faq2A },
    { q: dict.faq3Q, a: dict.faq3A },
    { q: dict.faq4Q, a: dict.faq4A },
  ];

  return (
    <section id="faq" className="mt-20">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="mb-2 text-xs font-semibold tracking-wide text-[#0F6E56]">{dict.faqEyebrow}</p>
          <h2 className="mb-3.5 text-2xl font-bold text-neutral-900 sm:text-3xl">{dict.faqTitle}</h2>
          <p className="max-w-sm text-sm leading-[1.9] text-neutral-600">{dict.faqSubtitle}</p>
        </div>
        <div className="flex flex-col gap-3">
          {items.map((item, index) => {
            const isOpen = open === index;
            return (
              <div
                key={item.q}
                className={`rounded-2xl border bg-white shadow-sm shadow-neutral-900/5 transition ${isOpen ? "border-[#0F6E56]/35" : "border-neutral-100"}`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start"
                >
                  <span className="text-sm font-semibold text-neutral-900 sm:text-base">{item.q}</span>
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-base font-bold leading-none ${
                      isOpen ? "bg-[#0F6E56]/10 text-[#0F6E56]" : "bg-neutral-100 text-neutral-500"
                    }`}
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && <p className="px-5 pb-4 text-sm leading-[1.9] text-neutral-600">{item.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
