import { notFound } from "next/navigation";
import { getPhase, getRoadmap } from "@/lib/admin-api";
import { AdminForbidden } from "@/components/admin/AdminForbidden";
import { BackLink } from "@/components/layout/BackLink";
import { RoadmapEditor } from "@/components/admin/RoadmapEditor";
import type { AdminPhaseDetail } from "@/lib/types";

export default async function AdminRoadmapDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await getRoadmap(id);

  if (result.status === "forbidden") {
    return <AdminForbidden />;
  }

  if (result.status === "not_found") {
    notFound();
  }

  const roadmap = result.data;

  // Full per-phase detail (resources/projects/quiz-questions) is fetched upfront for every
  // phase rather than lazily on expand — fine at this scale (a handful of phases per
  // roadmap), and keeps the Phases tab a plain client-side expand/collapse with no data
  // fetching of its own.
  const phaseDetailResults = await Promise.all(roadmap.phases.map((phase) => getPhase(phase.id)));
  const phaseDetails: AdminPhaseDetail[] = phaseDetailResults
    .filter((r) => r.status === "ok")
    .map((r) => r.data)
    .sort((a, b) => a.orderIndex - b.orderIndex);

  return (
    <div>
      <BackLink href="/admin" label="المسارات" />
      <div className="mt-3">
        <RoadmapEditor roadmap={roadmap} phaseDetails={phaseDetails} />
      </div>
    </div>
  );
}
