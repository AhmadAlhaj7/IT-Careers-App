import { BackLink } from "@/components/layout/BackLink";
import { LearningFileForm } from "@/components/admin/LearningFileForm";

export default function NewLearningFilePage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-3 py-10 sm:px-6 sm:py-16">
      <BackLink href="/admin/files" label="الملفات التعليمية" />
      <h1 className="mt-4 text-2xl font-bold text-neutral-900 sm:text-3xl">ملف جديد</h1>
      <LearningFileForm />
    </div>
  );
}
