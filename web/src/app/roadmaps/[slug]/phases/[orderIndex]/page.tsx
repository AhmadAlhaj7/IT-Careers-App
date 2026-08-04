import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getPhase, getRoadmap } from "@/lib/api";
import { ResourceListItem } from "@/components/roadmaps/ResourceListItem";
import { ProjectCard } from "@/components/roadmaps/ProjectCard";
import { PhaseSidebar } from "@/components/roadmaps/PhaseSidebar";
import { LockedPhaseNotice } from "@/components/roadmaps/LockedPhaseNotice";
import { BackLink } from "@/components/layout/BackLink";

export default async function PhasePage({
  params,
}: {
  params: Promise<{ slug: string; orderIndex: string }>;
}) {
  const { slug, orderIndex } = await params;
  const orderIndexNum = Number(orderIndex);

  const [result, roadmap, { userId }] = await Promise.all([getPhase(slug, orderIndexNum), getRoadmap(slug), auth()]);

  if (result.status === "not_found" || !roadmap) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <BackLink href={`/roadmaps/${slug}`} label={roadmap.title.ar} />

      <div className="mt-4 flex flex-col gap-8 lg:flex-row">
        <PhaseSidebar roadmapSlug={slug} phases={roadmap.phases} currentOrderIndex={orderIndexNum} />

        <div className="min-w-0 flex-1">
          {result.status === "locked" ? (
            <LockedPhaseNotice
              title={result.title}
              roadmapId={roadmap.id}
              paddlePriceId={roadmap.paddlePriceId}
              userId={userId}
            />
          ) : (
            <>
              <div className="rounded-lg border border-neutral-200 p-6">
                <p className="text-sm text-neutral-400">المرحلة {result.phase.orderIndex}</p>
                <h1 className="mt-1 text-xl font-semibold text-neutral-900">{result.phase.title.ar}</h1>
                <p className="mt-3 leading-[1.7] text-neutral-600">{result.phase.explanation.ar}</p>

                {result.phase.resources.length > 0 && (
                  <div className="mt-6 border-t border-neutral-100 pt-2">
                    {result.phase.resources.map((resource) => (
                      <ResourceListItem key={resource.url} resource={resource} />
                    ))}
                  </div>
                )}
              </div>

              {result.phase.projects.length > 0 && (
                <div className="mt-6 flex flex-col gap-4">
                  {result.phase.projects.map((project) => (
                    <ProjectCard key={project.title.ar} project={project} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
