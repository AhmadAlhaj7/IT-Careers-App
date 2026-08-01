import Link from "next/link";
import { listRoadmaps } from "@/lib/admin-api";
import { AdminForbidden } from "@/components/admin/AdminForbidden";

export default async function AdminPage() {
  const result = await listRoadmaps();

  if (result.status === "forbidden") {
    return <AdminForbidden />;
  }

  const roadmaps = result.status === "ok" ? result.data : [];

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-neutral-900">المسارات التعليمية</h1>
        <Link href="/admin/roadmaps/new" className="text-sm text-[#0F6E56]">
          + مسار جديد
        </Link>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {roadmaps.length === 0 && <p className="text-sm text-neutral-500">لا توجد مسارات بعد.</p>}
        {roadmaps.map((roadmap) => (
          <Link
            key={roadmap.id}
            href={`/admin/roadmaps/${roadmap.id}`}
            className="rounded-lg border border-neutral-200 px-4 py-3 hover:border-neutral-300"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-neutral-900">{roadmap.title.ar}</span>
              <span className="text-xs text-neutral-500">{roadmap.status}</span>
            </div>
            <span className="text-xs text-neutral-400">{roadmap.slug}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
