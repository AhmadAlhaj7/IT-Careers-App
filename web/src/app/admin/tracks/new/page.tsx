import { BackLink } from "@/components/layout/BackLink";
import { CreateTrackForm } from "./CreateTrackForm";

export default function NewTrackPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <BackLink href="/admin/tracks" label="المسارات الرئيسية" />
      <h1 className="mt-2 text-2xl font-semibold text-neutral-900">مسار رئيسي جديد</h1>
      <CreateTrackForm />
    </div>
  );
}
