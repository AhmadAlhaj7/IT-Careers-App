import Link from "next/link";
import { listAdminLearningFiles } from "@/lib/admin-api";
import { deleteLearningFileAction } from "@/app/admin/actions";
import { formatFileSize } from "@/lib/learningFiles";
import { AdminForbidden } from "@/components/admin/AdminForbidden";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { FileTypeIcon } from "@/components/files/FileTypeIcon";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/Button";

export default async function AdminLearningFilesPage() {
  const result = await listAdminLearningFiles();

  if (result.status === "forbidden") {
    return <AdminForbidden />;
  }

  const files = result.status === "ok" ? result.data : [];

  return (
    <div className="mx-auto w-full max-w-3xl px-3 py-10 sm:px-6 sm:py-16">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">الملفات التعليمية</h1>
          <p className="mt-1 text-sm text-neutral-500">الملفات التي تظهر للزوار في صفحة «ملفات تعليمية».</p>
        </div>
        <Link href="/admin/files/new" className={buttonVariants({ variant: "accent" })}>
          + ملف جديد
        </Link>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {files.length === 0 && <p className="text-sm text-neutral-500">لا توجد ملفات بعد.</p>}
        {files.map((file) => (
          <Card key={file.id} padding="md" shadow="subtle" radius="panel">
            <div className="flex items-start gap-3">
              <FileTypeIcon contentType={file.contentType} />
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-neutral-900">{file.title.ar}</p>
                <p className="mt-0.5 truncate text-xs text-neutral-400" dir="ltr">
                  {file.fileName} · {formatFileSize(file.sizeBytes)}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Badge variant="accent" size="sm">
                    {file.category.ar}
                  </Badge>
                  <span className="text-xs text-neutral-500">{file.allowDownload ? "تحميل متاح" : "عرض فقط"}</span>
                  {!file.published && <span className="text-xs font-semibold text-danger">مسودة</span>}
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2 border-t border-neutral-100 pt-3">
              <Link href={`/admin/files/${file.id}/edit`} className={buttonVariants({ variant: "outline", size: "sm" })}>
                تعديل
              </Link>
              <DeleteButton
                action={deleteLearningFileAction}
                hiddenFields={{ id: file.id }}
                confirmMessage="سيتم حذف هذا الملف نهائيًا. هل أنت متأكد؟"
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
