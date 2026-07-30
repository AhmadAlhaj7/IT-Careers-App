import { notFound } from "next/navigation";
import { getRoadmap } from "@/lib/api";
import { PhaseListItem } from "@/components/roadmaps/PhaseListItem";

export default async function RoadmapPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const roadmap = await getRoadmap(slug);

  if (!roadmap) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-semibold text-neutral-900">{roadmap.title.ar}</h1>
      <p className="mt-2 text-lg text-[#0F6E56]">${roadmap.price.toFixed(2)}</p>

      <h2 className="mt-10 text-sm font-medium text-neutral-500">المراحل</h2>
      <div className="mt-3 flex flex-col gap-3">
        {roadmap.phases.map((phase) => (
          <PhaseListItem
            key={phase.orderIndex}
            roadmapSlug={roadmap.slug}
            orderIndex={phase.orderIndex}
            title={phase.title}
          />
        ))}
      </div>
    </div>
  );
}
