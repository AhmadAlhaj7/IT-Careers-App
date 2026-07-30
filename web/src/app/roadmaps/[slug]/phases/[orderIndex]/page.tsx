import { notFound } from "next/navigation";
import { getPhase } from "@/lib/api";
import { ResourceListItem } from "@/components/roadmaps/ResourceListItem";
import { ProjectCard } from "@/components/roadmaps/ProjectCard";

export default async function PhasePage({
  params,
}: {
  params: Promise<{ slug: string; orderIndex: string }>;
}) {
  const { slug, orderIndex } = await params;
  const phase = await getPhase(slug, Number(orderIndex));

  if (!phase) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="rounded-lg border border-neutral-200 p-6">
        <p className="text-sm text-neutral-400">المرحلة {phase.orderIndex}</p>
        <h1 className="mt-1 text-xl font-semibold text-neutral-900">{phase.title.ar}</h1>
        <p className="mt-3 leading-[1.7] text-neutral-600">{phase.explanation.ar}</p>

        {phase.resources.length > 0 && (
          <div className="mt-6 border-t border-neutral-100 pt-2">
            {phase.resources.map((resource) => (
              <ResourceListItem key={resource.url} resource={resource} />
            ))}
          </div>
        )}
      </div>

      {phase.projects.length > 0 && (
        <div className="mt-6 flex flex-col gap-4">
          {phase.projects.map((project) => (
            <ProjectCard key={project.title.ar} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
