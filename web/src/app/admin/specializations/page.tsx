import Link from "next/link";
import { listSpecializations } from "@/lib/admin-api";
import { AdminForbidden } from "@/components/admin/AdminForbidden";
import { AdminSpecializationsTable } from "@/components/admin/AdminSpecializationsTable";

export default async function AdminSpecializationsPage() {
  const result = await listSpecializations();

  if (result.status === "forbidden") {
    return <AdminForbidden />;
  }

  const specializations = result.status === "ok" ? result.data : [];

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">صفحات التخصصات</h1>
          <p className="mt-1 text-sm text-neutral-500">الصفحات التعريفية التي يقرأها الزائر ليقرر التخصص المناسب له قبل شراء أي مسار.</p>
        </div>
        <Link
          href="/admin/specializations/new"
          className="rounded-xl bg-[#0F6E56] px-5 py-3 text-sm font-bold text-white transition active:scale-95"
        >
          + تخصص جديد
        </Link>
      </div>

      <AdminSpecializationsTable specializations={specializations} />
    </div>
  );
}
