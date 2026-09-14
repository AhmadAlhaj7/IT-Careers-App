"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type AccordionItem = {
  id: string;
  question: ReactNode;
  answer: ReactNode;
};

// Single shared implementation of the single-open FAQ accordion — previously duplicated
// byte-for-byte between the home page's static-content Faq.tsx and the tech-major detail
// page's DB-backed SpecializationFaqAccordion.tsx. Both keep their own data shaping (dictionary
// lookup vs. localize() over a Specialization's FAQs) and just render through this.
export function Accordion({ items, defaultOpenId, className }: { items: AccordionItem[]; defaultOpenId?: string; className?: string }) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? items[0]?.id ?? null);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className={cn(
              "rounded-panel border bg-white shadow-subtle transition",
              isOpen ? "border-primary/35" : "border-neutral-100",
            )}
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start"
            >
              <span className="text-sm font-semibold text-neutral-900 sm:text-base">{item.question}</span>
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-tag text-base leading-none font-bold",
                  isOpen ? "bg-primary/10 text-primary" : "bg-neutral-100 text-neutral-500",
                )}
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && <p className="px-5 pb-4 text-sm leading-[1.9] text-neutral-600">{item.answer}</p>}
          </div>
        );
      })}
    </div>
  );
}
