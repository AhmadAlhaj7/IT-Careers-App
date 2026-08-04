import { notFound } from "next/navigation";
import { getPhase } from "@/lib/admin-api";
import { AdminForbidden } from "@/components/admin/AdminForbidden";
import { BackLink } from "@/components/layout/BackLink";
import { EditProjectForm } from "./EditProjectForm";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string; phaseId: string; projectId: string }>;
}) {
  const { phaseId, projectId } = await params;
  const result = await getPhase(phaseId);

  if (result.status === "forbidden") {
    return <AdminForbidden />;
  }

  if (result.status === "not_found") {
    notFound();
  }

  const project = result.data.projects.find((p) => p.id === projectId);

  if (!project) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <BackLink href={`/admin/roadmaps/${result.data.roadmapId}/phases/${phaseId}`} label="المرحلة" />
      <h1 className="mt-2 text-2xl font-semibold text-neutral-900">تعديل المشروع</h1>
      <EditProjectForm project={project} roadmapId={result.data.roadmapId} phaseId={phaseId} />
    </div>
  );
}
