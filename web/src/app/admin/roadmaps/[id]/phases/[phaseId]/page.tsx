import Link from "next/link";
import { notFound } from "next/navigation";
import { getPhase } from "@/lib/admin-api";
import { AdminForbidden } from "@/components/admin/AdminForbidden";

export default async function AdminPhaseDetailPage({
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
      <Link href={`/admin/roadmaps/${id}`} className="text-sm text-neutral-500">
        ← رجوع إلى المسار
      </Link>

      <h1 className="mt-2 text-2xl font-semibold text-neutral-900">
        #{phase.orderIndex} {phase.title.ar}
      </h1>
      <p className="mt-1 text-sm text-neutral-500">{phase.phaseType}</p>

      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-sm font-medium text-neutral-500">الموارد</h2>
        <Link href={`/admin/roadmaps/${id}/phases/${phase.id}/resources/new`} className="text-sm text-[#0F6E56]">
          + مورد جديد
        </Link>
      </div>
      <div className="mt-3 flex flex-col gap-2">
        {phase.resources.length === 0 && <p className="text-sm text-neutral-500">لا توجد موارد بعد.</p>}
        {phase.resources.map((resource) => (
          <div key={resource.id} className="rounded-lg border border-neutral-200 px-4 py-3">
            <div className="flex items-center justify-between">
              <span className="font-medium text-neutral-900">{resource.title.ar}</span>
              <span className="text-xs text-neutral-500">
                {resource.resourceType} · {resource.accessType}
              </span>
            </div>
            <span className="text-xs text-neutral-400">{resource.url}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-sm font-medium text-neutral-500">المشاريع</h2>
        <Link href={`/admin/roadmaps/${id}/phases/${phase.id}/projects/new`} className="text-sm text-[#0F6E56]">
          + مشروع جديد
        </Link>
      </div>
      <div className="mt-3 flex flex-col gap-2">
        {phase.projects.length === 0 && <p className="text-sm text-neutral-500">لا توجد مشاريع بعد.</p>}
        {phase.projects.map((project) => (
          <div key={project.id} className="rounded-lg border border-neutral-200 px-4 py-3">
            <div className="flex items-center justify-between">
              <span className="font-medium text-neutral-900">{project.title.ar}</span>
              {project.isCapstone && <span className="text-xs text-[#0F6E56]">مشروع ختامي</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
