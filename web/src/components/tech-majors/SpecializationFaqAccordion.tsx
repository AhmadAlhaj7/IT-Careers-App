import { Accordion } from "@/components/ui/Accordion";
import type { Locale } from "@/lib/i18n/locale";
import { localize } from "@/lib/localize";
import type { SpecializationFaq } from "@/lib/types";

type SpecializationFaqAccordionProps = {
  faqs: SpecializationFaq[];
  locale: Locale;
};

// Same single-open accordion primitive as the home page's Faq.tsx, generalized to take real
// admin-authored Q&A instead of static dictionary content.
export function SpecializationFaqAccordion({ faqs, locale }: SpecializationFaqAccordionProps) {
  const items = faqs.map((faq, index) => ({
    id: String(index),
    question: localize(faq.question, locale),
    answer: localize(faq.answer, locale),
  }));

  return <Accordion items={items} defaultOpenId="0" />;
}
