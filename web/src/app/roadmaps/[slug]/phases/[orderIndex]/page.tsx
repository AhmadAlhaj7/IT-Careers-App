import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { SignInButton } from "@clerk/nextjs";
import { getPhase, getRoadmap } from "@/lib/api";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/locale";
import { ResourceListItem } from "@/components/roadmaps/ResourceListItem";
import { ProjectCard } from "@/components/roadmaps/ProjectCard";
import { PhaseSidebar } from "@/components/roadmaps/PhaseSidebar";
import { LockedPhaseNotice } from "@/components/roadmaps/LockedPhaseNotice";
import { QuizForm } from "@/components/roadmaps/QuizForm";
import { BackLink } from "@/components/layout/BackLink";
import { Card } from "@/components/ui/Card";
import { buttonVariants } from "@/components/ui/Button";

export default async function PhasePage({
  params,
}: {
  params: Promise<{ slug: string; orderIndex: string }>;
}) {
  const { slug, orderIndex } = await params;
  const orderIndexNum = Number(orderIndex);

  const [locale, result, roadmap, { userId }] = await Promise.all([
    getLocale(),
    getPhase(slug, orderIndexNum),
    getRoadmap(slug),
    auth(),
  ]);

  if (result.status === "not_found" || !roadmap) {
    notFound();
  }

  const dict = getDictionary(locale);
  const t = dict.phaseDetailPage;

  return (
    <div className="mx-auto w-full max-w-4xl px-3 py-10 sm:px-6 sm:py-16">
      <BackLink href={`/roadmaps/${slug}`} label={roadmap.title[locale]} />

      <div className="mt-4 flex flex-col gap-8 lg:flex-row">
        <PhaseSidebar roadmapSlug={slug} phases={roadmap.phases} currentOrderIndex={orderIndexNum} locale={locale} />

        <div className="min-w-0 flex-1">
          {result.status === "locked" ? (
            <LockedPhaseNotice
              title={result.title}
              locale={locale}
              roadmapId={roadmap.id}
              paddlePriceId={roadmap.paddlePriceId}
              userId={userId}
              lockedLabel={t.lockedTitle}
              lockedBody={t.lockedBody}
              enrollLabel={dict.roadmapDetailPage.enrollCta}
              signInLabel={dict.roadmapDetailPage.signInToBuy}
            />
          ) : (
            <>
              <Card padding="lg" shadow="subtle" radius="panel">
                <p className="text-sm text-neutral-400">
                  {t.phaseLabel} {result.phase.orderIndex}
                </p>
                <h1 className="mt-1 text-xl font-semibold text-neutral-900">{result.phase.title[locale]}</h1>
                <p className="mt-3 leading-[1.7] text-neutral-600">{result.phase.explanation[locale]}</p>

                {result.phase.resources.length > 0 && (
                  <div className="mt-6 border-t border-neutral-100 pt-2">
                    {result.phase.resources.map((resource) => (
                      <ResourceListItem key={resource.url} resource={resource} locale={locale} />
                    ))}
                  </div>
                )}
              </Card>

              {result.phase.projects.length > 0 && (
                <div className="mt-6 flex flex-col gap-4">
                  {result.phase.projects.map((project) => (
                    <ProjectCard key={project.title[locale]} project={project} locale={locale} label={t.projectLabel} />
                  ))}
                </div>
              )}

              {result.phase.quizQuestions.length > 0 && (
                <div className="mt-6">
                  {userId ? (
                    <QuizForm slug={slug} orderIndex={orderIndexNum} questions={result.phase.quizQuestions} locale={locale} dict={dict} />
                  ) : (
                    <Card padding="lg" shadow="subtle" radius="panel" className="text-center">
                      <p className="text-sm text-neutral-600">{t.signInToTakeQuiz}</p>
                      <div className="mt-4 flex justify-center">
                        <SignInButton mode="modal">
                          <button className={buttonVariants()}>{dict.nav.signIn}</button>
                        </SignInButton>
                      </div>
                    </Card>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
