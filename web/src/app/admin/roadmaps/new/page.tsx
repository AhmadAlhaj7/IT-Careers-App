import { listTracks } from "@/lib/admin-api";
import { AdminForbidden } from "@/components/admin/AdminForbidden";
import { CreateRoadmapForm } from "./CreateRoadmapForm";

export default async function NewRoadmapPage() {
  const result = await listTracks();

  if (result.status === "forbidden") {
    return <AdminForbidden />;
  }

  const tracks = result.status === "ok" ? result.data : [];

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-semibold text-neutral-900">مسار جديد</h1>
      <CreateRoadmapForm tracks={tracks} />
    </div>
  );
}
