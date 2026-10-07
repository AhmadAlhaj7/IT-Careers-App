import { notFound } from "next/navigation";
import { getAdminLearningFile } from "@/lib/admin-api";
import { AdminForbidden } from "@/components/admin/AdminForbidden";
import { BackLink } from "@/components/layout/BackLink";
import { LearningFileForm } from "@/components/admin/LearningFileForm";

export default async function EditLearningFilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await getAdminLearningFile(id);

  if (result.status === "forbidden") {
    return <AdminForbidden />;
  }

  if (result.status === "not_found") {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-3 py-10 sm:px-6 sm:py-16">
      <BackLink href="/admin/files" label="الملفات التعليمية" />
      <h1 className="mt-4 text-2xl font-bold text-neutral-900 sm:text-3xl">تعديل الملف</h1>
      <LearningFileForm file={result.data} />
    </div>
  );
}
