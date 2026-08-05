import Link from "next/link";
import { listAdminTracks } from "@/lib/admin-api";
import { deleteTrackAction } from "@/app/admin/actions";
import { AdminForbidden } from "@/components/admin/AdminForbidden";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function AdminTracksPage() {
  const result = await listAdminTracks();

  if (result.status === "forbidden") {
    return <AdminForbidden />;
  }

  const tracks = result.status === "ok" ? result.data : [];

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-neutral-900">المسارات الرئيسية</h1>
        <Link href="/admin/tracks/new" className="text-sm text-[#0F6E56]">
          + مسار رئيسي جديد
        </Link>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {tracks.length === 0 && <p className="text-sm text-neutral-500">لا توجد مسارات رئيسية بعد.</p>}
        {tracks.map((track) => (
          <div key={track.id} className="rounded-lg border border-neutral-200 px-4 py-3">
            <div className="flex items-center justify-between">
              <span className="font-medium text-neutral-900">{track.name.ar}</span>
              <span className="text-xs text-neutral-500">{track.published ? "منشور" : "مسودة"}</span>
            </div>
            <span className="text-xs text-neutral-400">{track.slug}</span>
            <div className="mt-2 flex items-center gap-3">
              <Link href={`/admin/tracks/${track.id}/edit`} className="text-xs text-[#0F6E56]">
                تعديل
              </Link>
              <DeleteButton
                action={deleteTrackAction}
                hiddenFields={{ id: track.id }}
                confirmMessage="سيتم حذف هذا المسار الرئيسي نهائيًا. هل أنت متأكد؟"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
