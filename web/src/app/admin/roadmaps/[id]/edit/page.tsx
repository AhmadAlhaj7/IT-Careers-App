import { notFound } from "next/navigation";
import { getRoadmap } from "@/lib/admin-api";
import { AdminForbidden } from "@/components/admin/AdminForbidden";
import { BackLink } from "@/components/layout/BackLink";
import { EditRoadmapForm } from "./EditRoadmapForm";

export default async function EditRoadmapPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await getRoadmap(id);

  if (result.status === "forbidden") {
    return <AdminForbidden />;
  }

  if (result.status === "not_found") {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <BackLink href={`/admin/roadmaps/${id}`} label="المسار" />
      <h1 className="mt-2 text-2xl font-semibold text-neutral-900">تعديل المسار</h1>
      <EditRoadmapForm roadmap={result.data} />
    </div>
  );
}
