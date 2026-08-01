import Link from "next/link";
import { notFound } from "next/navigation";
import { getRoadmap } from "@/lib/admin-api";
import { AdminForbidden } from "@/components/admin/AdminForbidden";

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

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-semibold text-neutral-900">{roadmap.title.ar}</h1>
      <p className="mt-1 text-sm text-neutral-500">
        {roadmap.slug} · {roadmap.status} · ${roadmap.price.toFixed(2)}
      </p>

      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-sm font-medium text-neutral-500">المراحل</h2>
        <Link href={`/admin/roadmaps/${roadmap.id}/phases/new`} className="text-sm text-[#0F6E56]">
          + مرحلة جديدة
        </Link>
      </div>

      <div className="mt-3 flex flex-col gap-3">
        {roadmap.phases.length === 0 && <p className="text-sm text-neutral-500">لا توجد مراحل بعد.</p>}
        {roadmap.phases.map((phase) => (
          <Link
            key={phase.id}
            href={`/admin/roadmaps/${roadmap.id}/phases/${phase.id}`}
            className="rounded-lg border border-neutral-200 px-4 py-3 hover:border-neutral-300"
          >
            <span className="text-xs text-neutral-400">#{phase.orderIndex}</span>{" "}
            <span className="font-medium text-neutral-900">{phase.title.ar}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
