import Link from "next/link";
import { listAdminTracks } from "@/lib/admin-api";
import { deleteTrackAction } from "@/app/admin/actions";
import { AdminForbidden } from "@/components/admin/AdminForbidden";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/Button";

export default async function AdminTracksPage() {
  const result = await listAdminTracks();

  if (result.status === "forbidden") {
    return <AdminForbidden />;
  }

  const tracks = result.status === "ok" ? result.data : [];

  return (
    <div className="mx-auto w-full max-w-2xl px-3 py-10 sm:px-6 sm:py-16">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">المسارات الرئيسية</h1>
        <Link href="/admin/tracks/new" className={buttonVariants({ size: "sm" })}>
          + مسار رئيسي جديد
        </Link>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {tracks.length === 0 && <p className="text-sm text-neutral-500">لا توجد مسارات رئيسية بعد.</p>}
        {tracks.map((track) => (
          <Card key={track.id} padding="md" shadow="subtle" radius="panel">
            <div className="flex items-center justify-between gap-3">
              <span className="font-medium text-neutral-900">{track.name.ar}</span>
              <Badge variant={track.published ? "primary" : "accent"}>{track.published ? "منشور" : "مسودة"}</Badge>
            </div>
            <span dir="ltr" className="font-mono text-xs text-neutral-400">
              {track.slug}
            </span>
            <div className="mt-3 flex items-center gap-4 border-t border-neutral-100 pt-3">
              <Link href={`/admin/tracks/${track.id}/edit`} className="text-xs font-semibold text-primary hover:text-primary-hover">
                تعديل
              </Link>
              <DeleteButton
                action={deleteTrackAction}
                hiddenFields={{ id: track.id }}
                confirmMessage="سيتم حذف هذا المسار الرئيسي نهائيًا. هل أنت متأكد؟"
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
