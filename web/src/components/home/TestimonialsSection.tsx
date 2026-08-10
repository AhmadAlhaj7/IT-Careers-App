import type { Locale } from "@/lib/i18n/locale";
import type { LocalizedText } from "@/lib/types";

export type Testimonial = {
  quote: LocalizedText;
  name: string;
  role: LocalizedText;
  accent: string;
};

type TestimonialsSectionProps = {
  eyebrow: string;
  title: string;
  testimonials: Testimonial[];
  locale: Locale;
};

// Built but deliberately NOT imported into app/page.tsx yet — the uploaded design shipped
// this section with three fabricated names/quotes/job titles, and publishing fake reviews
// presented as real isn't something to do regardless of how the request is framed. Wire this
// in once there are 2-3 real quotes (e.g. sourced from students on Instagram) to pass as the
// `testimonials` prop — the component itself has no hardcoded content.
export function TestimonialsSection({ eyebrow, title, testimonials, locale }: TestimonialsSectionProps) {
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="mt-20">
      <div className="mb-6">
        <p className="text-xs font-semibold tracking-wide text-[#0F6E56]">{eyebrow}</p>
        <h2 className="mt-2 text-2xl font-bold text-neutral-900 sm:text-3xl">{title}</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {testimonials.map((story) => (
          <div key={story.name} className="flex flex-col rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm shadow-neutral-900/5">
            <span className="mb-3 font-mono text-4xl leading-none font-bold" style={{ color: story.accent }}>
              &rdquo;
            </span>
            <p className="mb-5 flex-1 text-sm leading-[1.9] text-neutral-800">{story.quote[locale]}</p>
            <div className="flex items-center gap-3 border-t border-neutral-100 pt-4">
              <span className="h-10 w-10 rounded-full border border-neutral-100" style={{ backgroundColor: story.accent + "22" }} />
              <div>
                <p className="text-sm font-semibold text-neutral-900">{story.name}</p>
                <p className="mt-0.5 text-xs text-neutral-500">{story.role[locale]}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
