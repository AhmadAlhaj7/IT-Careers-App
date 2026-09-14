import { notFound } from "next/navigation";
import { getRoadmap } from "@/lib/admin-api";
import { AdminForbidden } from "@/components/admin/AdminForbidden";
import { BackLink } from "@/components/layout/BackLink";
import { CreatePhaseForm } from "./CreatePhaseForm";

export default async function NewPhasePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await getRoadmap(id);

  if (result.status === "forbidden") {
    return <AdminForbidden />;
  }

  if (result.status === "not_found") {
    notFound();
  }

  const roadmap = result.data;

  return (
    <div className="mx-auto w-full max-w-2xl px-3 py-10 sm:px-6 sm:py-16">
      <BackLink href={`/admin/roadmaps/${roadmap.id}`} label={roadmap.title.ar} />
      <h1 className="mt-4 text-2xl font-bold text-neutral-900 sm:text-3xl">مرحلة جديدة</h1>
      <CreatePhaseForm roadmapId={roadmap.id} nextOrderIndex={roadmap.phases.length} />
    </div>
  );
}
