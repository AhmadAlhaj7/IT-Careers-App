import { notFound } from "next/navigation";
import Link from "next/link";
import { getSpecialization } from "@/lib/api";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/locale";
import { BackLink } from "@/components/layout/BackLink";
import { Logo } from "@/components/layout/Logo";
import { paletteFor } from "@/lib/cardPalette";
import { CATEGORY_LABELS, DEMAND_LABELS } from "@/lib/specializationLabels";
import { localize } from "@/lib/localize";
import { hasSectionContent, SpecializationSectionBlock } from "@/components/tech-majors/SpecializationSectionBlock";
import { SpecializationFaqAccordion } from "@/components/tech-majors/SpecializationFaqAccordion";

export default async function SpecializationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [locale, specialization] = await Promise.all([getLocale(), getSpecialization(slug)]);

  if (!specialization) {
    notFound();
  }

  const dict = getDictionary(locale);
  const t = dict.specializationDetailPage;
  const { tint, accent } = paletteFor(specialization.slug);

  const quickFacts = [
    { label: t.demandFactLabel, value: specialization.demandQuickFact },
    { label: t.salaryFactLabel, value: specialization.salaryQuickFact },
    { label: t.timeToJobFactLabel, value: specialization.timeToJobQuickFact },
    { label: t.difficultyFactLabel, value: specialization.difficultyQuickFact },
  ]
    .filter((fact) => fact.value && (fact.value.ar.length > 0 || fact.value.en.length > 0))
    .map((fact) => ({ label: fact.label, value: localize(fact.value!, locale) }));

  const visibleSections = specialization.sections.filter(hasSectionContent);
  const hasMedia = Boolean(specialization.introVideoUrl || specialization.pdfUrl);
  const roadmapButtonLabel = specialization.roadmapButtonText
    ? localize(specialization.roadmapButtonText, locale) || t.goToRoadmapCta
    : t.goToRoadmapCta;

  return (
    <div className="mx-auto max-w-5xl px-3 py-10 sm:px-6 sm:py-16">
      <BackLink href="/tech-majors" label={t.backLabel} />

      {/* Hero */}
      <div className="mt-4 grid grid-cols-1 gap-0 overflow-hidden rounded-3xl bg-white shadow-xl shadow-neutral-900/10 lg:grid-cols-[0.85fr_1.15fr]">
        <div
          className="relative flex aspect-[4/3] items-center justify-center lg:aspect-auto"
          style={{
            backgroundColor: tint,
            backgroundImage: "radial-gradient(rgba(28,27,25,0.1) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        >
          {specialization.coverImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- admin-supplied external URL
            <img src={specialization.coverImageUrl} alt="" className="h-full w-full object-contain p-8" />
          ) : (
            <div className="rounded-2xl bg-white p-5 shadow-md shadow-neutral-900/20">
              <Logo size={48} />
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-10">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: `${accent}1a`, color: accent }}>
              {CATEGORY_LABELS[specialization.category][locale]}
            </span>
            <span className="text-xs text-neutral-400">
              {specialization.estimatedReadMinutes} {dict.techMajorsPage.readMinutesSuffix}
            </span>
          </div>

          <h1 className="text-3xl leading-tight font-bold text-neutral-900 sm:text-4xl">{localize(specialization.name, locale)}</h1>
          {locale === "ar" && specialization.name.en.length > 0 && (
            <p className="mt-1 text-sm text-neutral-400" dir="ltr">
              {specialization.name.en}
            </p>
          )}

          {localize(specialization.summary, locale).length > 0 && (
            <p className="mt-4 max-w-xl text-base leading-[1.8] text-neutral-600">{localize(specialization.summary, locale)}</p>
          )}

          {quickFacts.length > 0 && (
            <div className="mt-6 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
              {quickFacts.map((fact) => (
                <div key={fact.label} className="rounded-xl border border-neutral-200 px-3 py-2">
                  <p className="text-[11px] text-neutral-400">{fact.label}</p>
                  <p className="text-sm font-bold" style={{ color: accent }}>
                    {fact.value}
                  </p>
                </div>
              ))}
            </div>
          )}

          <span className="mt-6 w-fit rounded-full bg-[#0F6E56]/10 px-3 py-1 text-xs font-semibold text-[#0F6E56]">
            {DEMAND_LABELS[specialization.demandLevel][locale]}
          </span>
        </div>
      </div>

      {/* Sections */}
      {visibleSections.map((section, index) => (
        <SpecializationSectionBlock key={section.key} section={section} index={index + 1} locale={locale} />
      ))}

      {/* Media */}
      {hasMedia && (
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {specialization.introVideoUrl && (
            <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm shadow-neutral-900/5">
              <p className="text-sm font-bold text-neutral-900">{t.mediaVideoLabel}</p>
              {specialization.introVideoCaption && localize(specialization.introVideoCaption, locale).length > 0 && (
                <p className="mt-1 text-sm text-neutral-500">
                  {localize(specialization.introVideoCaption, locale)}
                  {specialization.introVideoDurationLabel && ` · ${specialization.introVideoDurationLabel}`}
                </p>
              )}
              <a
                href={specialization.introVideoUrl}
                target="_blank"
                rel="noopener noreferrer"
                dir="ltr"
                className="mt-3 block truncate text-sm font-medium text-[#0F6E56] hover:underline"
              >
                {specialization.introVideoUrl}
              </a>
            </div>
          )}

          {specialization.pdfUrl && (
            <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm shadow-neutral-900/5">
              <p className="text-sm font-bold text-neutral-900">{t.mediaPdfLabel}</p>
              <p className="mt-1 truncate text-sm text-neutral-500">{specialization.pdfFileName}</p>
              <a
                href={specialization.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block rounded-xl border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-[#0F6E56] hover:text-[#0F6E56]"
              >
                {t.mediaPdfDownload}
              </a>
            </div>
          )}
        </div>
      )}

      {/* FAQ */}
      {specialization.faqs.length > 0 && (
        <div className="mt-14">
          <h2 className="mb-5 text-xl font-bold text-neutral-900 sm:text-2xl">{t.faqTitle}</h2>
          <SpecializationFaqAccordion faqs={specialization.faqs} locale={locale} />
        </div>
      )}

      {/* Closing CTA — a linked, published roadmap gets the real enroll pitch; otherwise an
          honest "not built yet" note with a real fallback (browse what does exist) instead of
          just disappearing. */}
      {specialization.linkedRoadmap ? (
        <div className="relative mt-14 overflow-hidden rounded-3xl bg-[#0F6E56] p-6 sm:p-10">
          <p className="text-xs font-semibold tracking-wide text-white/60">{t.closingEyebrow}</p>
          <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">{dict.roadmapDetailPage.closingTitle}</h2>
          <p className="mt-3 max-w-xl text-sm leading-[1.8] text-white/80">{dict.roadmapDetailPage.closingSubtitle}</p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link
              href={`/roadmaps/${specialization.linkedRoadmap.slug}`}
              className="rounded-xl bg-[#E8764A] px-6 py-3 text-sm font-bold text-white transition active:scale-95 hover:bg-[#d35f35]"
            >
              {roadmapButtonLabel}
            </Link>
            <span className="text-xs text-white/70">
              {specialization.linkedRoadmap.phaseCount} {dict.roadmapsPage.phases} · {t.onePaymentLabel}
            </span>
          </div>
        </div>
      ) : (
        <div className="relative mt-14 overflow-hidden rounded-3xl border border-dashed border-neutral-300 bg-neutral-50 p-6 sm:p-10">
          <p className="text-xs font-semibold tracking-wide text-neutral-400">{t.closingEyebrow}</p>
          <h2 className="mt-2 text-xl font-bold text-neutral-900 sm:text-2xl">{t.comingSoonTitle}</h2>
          <p className="mt-3 max-w-xl text-sm leading-[1.8] text-neutral-600">{t.comingSoonBody}</p>

          <Link
            href="/roadmaps"
            className="mt-6 inline-block rounded-xl bg-neutral-900 px-6 py-3 text-sm font-bold text-white transition active:scale-95 hover:bg-neutral-800"
          >
            {t.browseRoadmapsCta}
          </Link>
        </div>
      )}

      {/* Related specializations */}
      {specialization.related.length > 0 && (
        <div className="mt-14">
          <h2 className="mb-5 text-xl font-bold text-neutral-900 sm:text-2xl">{t.relatedTitle}</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {specialization.related.map((related) => {
              const relatedPalette = paletteFor(related.slug);
              return (
                <Link
                  key={related.slug}
                  href={`/tech-majors/${related.slug}`}
                  className="flex items-center gap-3 rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm shadow-neutral-900/5 transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: relatedPalette.tint }}
                  >
                    <Logo size={18} />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-neutral-900">{localize(related.name, locale)}</span>
                    <span className="block truncate text-xs text-neutral-500">{localize(related.cardSentence, locale)}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
