import { notFound } from "next/navigation";
import { getPhase } from "@/lib/admin-api";
import { AdminForbidden } from "@/components/admin/AdminForbidden";
import { BackLink } from "@/components/layout/BackLink";
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
    <div className="mx-auto w-full max-w-2xl px-3 py-10 sm:px-6 sm:py-16">
      <BackLink href={`/admin/roadmaps/${result.data.roadmapId}/phases/${phaseId}`} label="المرحلة" />
      <h1 className="mt-4 text-2xl font-bold text-neutral-900 sm:text-3xl">تعديل المورد</h1>
      <EditResourceForm resource={resource} roadmapId={result.data.roadmapId} phaseId={phaseId} />
    </div>
  );
}
