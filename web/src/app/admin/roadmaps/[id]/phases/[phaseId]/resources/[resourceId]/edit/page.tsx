import { notFound } from "next/navigation";
import { getPhase } from "@/lib/admin-api";
import { AdminForbidden } from "@/components/admin/AdminForbidden";
import { EditResourceForm } from "./EditResourceForm";

export default async function EditResourcePage({
  params,
}: {
  params: Promise<{ id: string; phaseId: string; resourceId: string }>;
}) {
  const { phaseId, resourceId } = await params;
  const result = await getPhase(phaseId);

  if (result.status === "forbidden") {
    return <AdminForbidden />;
  }

  if (result.status === "not_found") {
    notFound();
  }

  const resource = result.data.resources.find((r) => r.id === resourceId);

  if (!resource) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-semibold text-neutral-900">تعديل المورد</h1>
      <EditResourceForm resource={resource} roadmapId={result.data.roadmapId} phaseId={phaseId} />
    </div>
  );
}
