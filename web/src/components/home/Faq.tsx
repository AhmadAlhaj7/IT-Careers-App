import { Accordion } from "@/components/ui/Accordion";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type FaqProps = {
  dict: Dictionary["homePage"];
};

// The original design's 5th question was a specific refund policy ("7 days, unless over half
// the roadmap is done") that isn't a confirmed real policy anywhere in this app or business —
// dropped rather than publish an unverified commitment about customers' money.
export function Faq({ dict }: FaqProps) {
  const items = [
    { id: "faq1", question: dict.faq1Q, answer: dict.faq1A },
    { id: "faq2", question: dict.faq2Q, answer: dict.faq2A },
    { id: "faq3", question: dict.faq3Q, answer: dict.faq3A },
    { id: "faq4", question: dict.faq4Q, answer: dict.faq4A },
  ];

  return (
    <section id="faq" className="mt-20">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="mb-2 text-xs font-semibold tracking-wide text-primary">{dict.faqEyebrow}</p>
          <h2 className="mb-3.5 text-2xl font-bold text-neutral-900 sm:text-3xl">{dict.faqTitle}</h2>
          <p className="max-w-sm text-sm leading-[1.9] text-neutral-600">{dict.faqSubtitle}</p>
        </div>
        <Accordion items={items} defaultOpenId="faq1" />
      </div>
    </section>
  );
}
