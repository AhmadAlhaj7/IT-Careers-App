import { notFound } from "next/navigation";
import { getPhase } from "@/lib/admin-api";
import { AdminForbidden } from "@/components/admin/AdminForbidden";
import { BackLink } from "@/components/layout/BackLink";
import { CreateResourceForm } from "./CreateResourceForm";

export default async function NewResourcePage({
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
      <BackLink href={`/admin/roadmaps/${id}/phases/${phase.id}`} label={phase.title.ar} />
      <h1 className="mt-2 text-2xl font-semibold text-neutral-900">مورد جديد</h1>
      <CreateResourceForm roadmapId={id} phaseId={phase.id} />
    </div>
  );
}
