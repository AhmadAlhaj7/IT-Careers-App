import { notFound } from "next/navigation";
import { getSpecialization, listRoadmaps } from "@/lib/admin-api";
import { AdminForbidden } from "@/components/admin/AdminForbidden";
import { BackLink } from "@/components/layout/BackLink";
import { SpecializationEditor } from "@/components/admin/SpecializationEditor";

export default async function AdminSpecializationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [result, roadmapsResult] = await Promise.all([getSpecialization(id), listRoadmaps()]);

  if (result.status === "forbidden") {
    return <AdminForbidden />;
  }

  if (result.status === "not_found") {
    notFound();
  }

  const roadmaps = roadmapsResult.status === "ok" ? roadmapsResult.data : [];

  return (
    <div>
      <BackLink href="/admin/specializations" label="التخصصات" />
      <div className="mt-3">
        <SpecializationEditor specialization={result.data} roadmaps={roadmaps} />
      </div>
    </div>
  );
}
