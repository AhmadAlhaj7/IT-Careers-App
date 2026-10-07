"use client";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Switch } from "@/components/ui/Switch";
import { LocalizedTextInput } from "@/components/admin/LocalizedTextInput";
import { PUBLIC_API_URL, MAX_FILE_BYTES, canPreviewType, formatFileSize } from "@/lib/learningFiles";
import type { AdminLearningFile } from "@/lib/types";

const NOT_PREVIEWABLE_MESSAGE = "هذا النوع من الملفات لا يمكن عرضه في المتصفح، فيجب السماح بالتحميل وإلا لن يتمكن أحد من فتحه.";

// Create + edit in one place. The file goes straight from the browser to the API (Vercel won't pass
// a large body through the Next.js server), authenticated with the admin's Clerk token — so this is
// a plain fetch rather than a Server Action. Typed values survive a failed upload since the form
// is never remounted.
export function LearningFileForm({ file }: { file?: AdminLearningFile }) {
  const router = useRouter();
  const { getToken } = useAuth();
  const formRef = useRef<HTMLFormElement>(null);
  const [picked, setPicked] = useState<File | null>(null);
  const [allowDownload, setAllowDownload] = useState(file?.allowDownload ?? true);
  const [published, setPublished] = useState(file?.published ?? true);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const isEdit = Boolean(file);

  function pick(next: File | null) {
    setPicked(next);
    setError(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const form = new FormData(event.currentTarget);

    if (!String(form.get("titleAr") ?? "").trim() || !String(form.get("categoryAr") ?? "").trim()) {
      setError("العنوان والتصنيف بالعربية مطلوبان.");
      return;
    }

    if (!isEdit && !picked) {
      setError("اختر ملفًا للرفع.");
      return;
    }

    if (picked && picked.size > MAX_FILE_BYTES) {
      setError(`حجم الملف ${formatFileSize(picked.size)} يتجاوز الحد الأقصى (${formatFileSize(MAX_FILE_BYTES)}).`);
      return;
    }

    // Same rule the API enforces: a file the browser can't display must be downloadable.
    const effectiveType = picked ? picked.type : (file?.contentType ?? "");
    if (!allowDownload && !canPreviewType(effectiveType)) {
      setError(NOT_PREVIEWABLE_MESSAGE);
      return;
    }

    form.set("allowDownload", String(allowDownload));
    form.set("published", String(published));
    form.delete("file");
    if (picked) form.set("file", picked);

    setSubmitting(true);
    try {
      const token = await getToken();
      const response = await fetch(`${PUBLIC_API_URL}/api/admin/files${file ? `/${file.id}` : ""}`, {
        method: file ? "PUT" : "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { message?: string } | null;
        setError(body?.message ?? (response.status === 413 ? "حجم الملف أكبر من المسموح." : "تعذّر الحفظ، حاول مرة أخرى."));
        return;
      }

      router.push("/admin/files");
      router.refresh();
    } catch {
      setError("تعذّر الاتصال بالخادم، حاول مرة أخرى.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5 rounded-card border border-neutral-100 bg-white p-5 shadow-panel sm:p-8">
      <div>
        <p className="mb-2 text-sm font-medium text-neutral-700">الملف{isEdit && " (اتركه فارغًا للإبقاء على الملف الحالي)"}</p>
        <label
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => {
            event.preventDefault();
            setDragging(false);
            pick(event.dataTransfer.files[0] ?? null);
          }}
          className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed px-4 py-8 text-center transition ${
            dragging ? "border-primary bg-primary-subtle" : "border-neutral-300 hover:border-primary"
          }`}
        >
          <Upload className="h-6 w-6 text-primary" aria-hidden />
          <span className="text-sm text-neutral-700">{picked ? picked.name : "اسحب الملف هنا أو اضغط للاختيار"}</span>
          <span className="text-xs text-neutral-400" dir="ltr">
            {picked ? formatFileSize(picked.size) : file ? `${file.fileName} · ${formatFileSize(file.sizeBytes)}` : `max ${formatFileSize(MAX_FILE_BYTES)}`}
          </span>
          <input type="file" className="sr-only" onChange={(event) => pick(event.target.files?.[0] ?? null)} />
        </label>
      </div>

      <LocalizedTextInput label="العنوان" name="title" defaultValue={file?.title} />
      <LocalizedTextInput label="الوصف" name="description" defaultValue={file?.description} multiline />
      <LocalizedTextInput label="التصنيف" name="category" defaultValue={file?.category} />

      <div className="flex flex-col gap-3 border-t border-neutral-100 pt-5">
        <Switch checked={allowDownload} onCheckedChange={setAllowDownload} label="السماح بالتحميل" />
        <p className="-mt-1 text-xs text-neutral-400">
          عند الإيقاف يكون الملف للعرض فقط: لا يظهر زر التحميل ويرفض الخادم طلبات التحميل. (يبقى ضبطًا مرنًا — من يستطيع رؤية الملف في متصفحه يمكنه حفظه بطرق أخرى.)
        </p>
        <Switch checked={published} onCheckedChange={setPublished} label="منشور" />
      </div>

      {error && (
        <p role="alert" className="rounded-lg bg-danger-subtle px-3 py-2 text-sm text-danger">
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <Button type="submit" variant="accent" loading={submitting}>
          {isEdit ? "حفظ التعديلات" : "رفع الملف"}
        </Button>
        <Button type="button" variant="outline" disabled={submitting} onClick={() => router.push("/admin/files")}>
          إلغاء
        </Button>
      </div>
    </form>
  );
}
