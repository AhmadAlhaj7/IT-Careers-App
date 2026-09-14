import { BackLink } from "@/components/layout/BackLink";
import { CreateTrackForm } from "./CreateTrackForm";

export default function NewTrackPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-3 py-10 sm:px-6 sm:py-16">
      <BackLink href="/admin/tracks" label="المسارات الرئيسية" />
      <h1 className="mt-4 text-2xl font-bold text-neutral-900 sm:text-3xl">مسار رئيسي جديد</h1>
      <CreateTrackForm />
    </div>
  );
}
