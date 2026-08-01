import { notFound } from "next/navigation";
import { getPhase } from "@/lib/admin-api";
import { AdminForbidden } from "@/components/admin/AdminForbidden";
import { CreateProjectForm } from "./CreateProjectForm";

export default async function NewProjectPage({
  params,
}: {
  params: Promise<{ id: string; phaseId: string }>;
}) {
  const { id, phaseId } = await params;
  const result = await getPhase(phaseId);

  if (result.status === "forbidden") {
    return <AdminForbidden />;
  }

  if (result.status === "not_found") {
    notFound();
  }

  const phase = result.data;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <p className="text-sm text-neutral-500">{phase.title.ar}</p>
      <h1 className="text-2xl font-semibold text-neutral-900">مشروع جديد</h1>
      <CreateProjectForm roadmapId={id} phaseId={phase.id} />
    </div>
  );
}
