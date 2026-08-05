import { notFound } from "next/navigation";
import { getAdminTrack } from "@/lib/admin-api";
import { AdminForbidden } from "@/components/admin/AdminForbidden";
import { BackLink } from "@/components/layout/BackLink";
import { EditTrackForm } from "./EditTrackForm";

export default async function EditTrackPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await getAdminTrack(id);

  if (result.status === "forbidden") {
    return <AdminForbidden />;
  }

  if (result.status === "not_found") {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <BackLink href="/admin/tracks" label="المسارات الرئيسية" />
      <h1 className="mt-2 text-2xl font-semibold text-neutral-900">تعديل المسار الرئيسي</h1>
      <EditTrackForm track={result.data} />
    </div>
  );
}
