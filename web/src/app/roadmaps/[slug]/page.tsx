import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { getFinalExam, getRoadmap } from "@/lib/api";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/locale";
import { PhaseTimeline } from "@/components/roadmaps/PhaseTimeline";
import { BackLink } from "@/components/layout/BackLink";
import { BuyButton } from "@/components/roadmaps/BuyButton";
import { FinalExamForm } from "@/components/roadmaps/FinalExamForm";

export default async function RoadmapPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [locale, roadmap, { userId }] = await Promise.all([getLocale(), getRoadmap(slug), auth()]);

  if (!roadmap) {
    notFound();
  }

  const [dict, examResult] = await Promise.all([Promise.resolve(getDictionary(locale)), getFinalExam(slug)]);
  const t = dict.roadmapDetailPage;

  const currentPhase = roadmap.phases.find((p) => p.status === "Current") ?? roadmap.phases[0];

  return (
    <div className="mx-auto max-w-5xl px-3 py-10 sm:px-6 sm:py-16">
      <BackLink href="/roadmaps" label={t.backLabel} />

      {/* Hero */}
      <div className="mt-4 grid grid-cols-1 gap-0 overflow-hidden rounded-3xl bg-white shadow-xl shadow-neutral-900/10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="flex flex-col justify-center p-6 sm:p-10">
          {roadmap.level && (
            <span className="mb-3 w-fit rounded-full bg-[#0F6E56]/10 px-3 py-1 text-xs font-semibold text-[#0F6E56]">
              {roadmap.level[locale]}
            </span>
          )}
          <h1 className="text-3xl leading-tight font-bold text-neutral-900 sm:text-4xl">{roadmap.title[locale]}</h1>
          {roadmap.description && (
            <p className="mt-4 max-w-xl text-base leading-[1.8] text-neutral-600">{roadmap.description[locale]}</p>
          )}

          <div className="mt-6 flex flex-wrap gap-2">
            <div className="flex items-center gap-1.5 rounded-xl border border-neutral-200 px-3 py-2 text-sm text-neutral-600">
              <span className="font-bold text-[#0F6E56]">{roadmap.phases.length}</span> {dict.roadmapsPage.phases}
            </div>
            {roadmap.totalResourceCount > 0 && (
              <div className="flex items-center gap-1.5 rounded-xl border border-neutral-200 px-3 py-2 text-sm text-neutral-600">
                <span className="font-bold text-[#0F6E56]">{roadmap.totalResourceCount}</span> {t.resourcesLabel}
              </div>
            )}
            {roadmap.totalProjectCount > 0 && (
              <div className="flex items-center gap-1.5 rounded-xl border border-neutral-200 px-3 py-2 text-sm text-neutral-600">
                <span className="font-bold text-[#0F6E56]">{roadmap.totalProjectCount}</span> {t.projectsLabel}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-center gap-4 bg-[#FBFAF7] p-6 sm:p-10">
          {roadmap.isEnrolled ? (
            <div>
              <div className="mb-2 flex items-baseline justify-between text-sm">
                <span className="font-medium text-neutral-700">{t.unlockNoteEnrolled}</span>
                <span className="font-bold text-[#0F6E56]">
                  {roadmap.completedPhaseCount}/{roadmap.phases.length}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-neutral-200">
                <div
                  className="h-full rounded-full bg-[#0F6E56]"
                  style={{ width: `${roadmap.phases.length > 0 ? Math.round((roadmap.completedPhaseCount / roadmap.phases.length) * 100) : 0}%` }}
                />
              </div>
              {currentPhase && (
                <Link
                  href={`/roadmaps/${roadmap.slug}/phases/${currentPhase.orderIndex}`}
                  className="mt-4 block rounded-xl bg-[#0F6E56] px-4 py-3 text-center text-sm font-bold text-white transition active:scale-95"
                >
                  {t.continueCta}
                </Link>
              )}
            </div>
          ) : (
            <div>
              <div className="flex items-baseline gap-2" dir="ltr">
                <span className="text-2xl font-bold text-[#0F6E56]">${roadmap.price.toFixed(2)}</span>
                {roadmap.originalPrice && roadmap.originalPrice > roadmap.price && (
                  <span className="text-base text-neutral-400 line-through">${roadmap.originalPrice.toFixed(2)}</span>
                )}
              </div>
              <p className="mt-1 text-xs font-semibold text-[#E8764A]">{t.lifetimeAccess}</p>

              {roadmap.paddlePriceId && (
                <div className="mt-4">
                  <BuyButton
                    paddlePriceId={roadmap.paddlePriceId}
                    roadmapId={roadmap.id}
                    userId={userId}
                    label={t.enrollCta}
                    className="block w-full rounded-xl bg-[#E8764A] px-4 py-3 text-center text-sm font-bold text-white transition active:scale-95 hover:bg-[#d35f35] disabled:opacity-50 disabled:active:scale-100"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Outcomes */}
      {roadmap.outcomes.length > 0 && (
        <div className="mt-14">
          <p className="text-xs font-semibold tracking-wide text-[#0F6E56]">{t.outcomesEyebrow}</p>
          <h2 className="mt-2 text-xl font-bold text-neutral-900 sm:text-2xl">{t.outcomesTitle}</h2>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {roadmap.outcomes.map((outcome, index) => (
              <div key={index} className="flex items-start gap-2.5 rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm shadow-neutral-900/5">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#E8764A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span className="text-sm leading-[1.6] text-neutral-700">{outcome[locale]}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Phases */}
      <div className="mt-14">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="text-xs font-semibold tracking-wide text-[#0F6E56]">{t.contentEyebrow}</p>
            <h2 className="mt-2 text-xl font-bold text-neutral-900 sm:text-2xl">{t.contentTitle}</h2>
          </div>
          <span className="text-sm text-neutral-500">{roadmap.isEnrolled ? t.unlockNoteEnrolled : t.unlockNoteLocked}</span>
        </div>

        <PhaseTimeline
          roadmapSlug={roadmap.slug}
          phases={roadmap.phases}
          locale={locale}
          completedLabel={t.completedTag}
          currentLabel={t.currentTag}
          lockedLabel={t.lockedTag}
        />
      </div>

      {/* Final exam + certificate */}
      <div className="mt-14 overflow-hidden rounded-3xl bg-[#0F6E56] p-6 sm:p-10">
        <p className="text-xs font-semibold tracking-wide text-white/60">{t.examEyebrow}</p>
        <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">{t.examTitle}</h2>
        <p className="mt-3 max-w-xl text-sm leading-[1.8] text-white/80">{t.examIntro}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {roadmap.finalExamQuestionCount > 0 && (
            <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white">
              {roadmap.finalExamQuestionCount} {t.examQuestionsSuffix}
            </span>
          )}
          <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white">{t.examPassChip}</span>
          <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white">{t.examAttemptsChip}</span>
          <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white">{t.examCertificateChip}</span>
        </div>

        {examResult.status === "granted" && examResult.questions.length > 0 && (
          <div className="mt-6 rounded-2xl bg-white p-6">
            <FinalExamForm slug={roadmap.slug} questions={examResult.questions} />
          </div>
        )}

        {examResult.status === "locked" && (
          <div className="mt-6 rounded-2xl bg-black/15 p-4 text-center text-sm text-white/90">{t.examLockedNote}</div>
        )}
      </div>

      {/* Closing CTA */}
      {!roadmap.isEnrolled && roadmap.paddlePriceId && (
        <div className="relative mt-14 overflow-hidden rounded-3xl bg-white p-6 shadow-xl shadow-neutral-900/10 sm:p-10">
          <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:justify-between sm:text-start">
            <div>
              <h2 className="text-xl font-bold text-neutral-900 sm:text-2xl">{t.closingTitle}</h2>
              <p className="mt-2 max-w-md text-sm leading-[1.7] text-neutral-600">{t.closingSubtitle}</p>
            </div>
            <div className="flex flex-col items-center gap-2 sm:items-end">
              <div className="flex items-baseline gap-2" dir="ltr">
                <span className="text-xl font-bold text-[#0F6E56]">${roadmap.price.toFixed(2)}</span>
                {roadmap.originalPrice && roadmap.originalPrice > roadmap.price && (
                  <span className="text-sm text-neutral-400 line-through">${roadmap.originalPrice.toFixed(2)}</span>
                )}
              </div>
              <BuyButton
                paddlePriceId={roadmap.paddlePriceId}
                roadmapId={roadmap.id}
                userId={userId}
                label={t.enrollCta}
                className="rounded-xl bg-[#E8764A] px-6 py-3 text-sm font-bold text-white transition active:scale-95 hover:bg-[#d35f35] disabled:opacity-50 disabled:active:scale-100"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
