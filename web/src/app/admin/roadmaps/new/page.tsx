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
    <div className="mx-auto w-full max-w-2xl px-3 py-10 sm:px-6 sm:py-16">
      <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">مسار جديد</h1>
      <CreateRoadmapForm tracks={tracks} />
    </div>
  );
}
