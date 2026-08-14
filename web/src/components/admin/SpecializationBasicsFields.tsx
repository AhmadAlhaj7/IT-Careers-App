import { LocalizedTextInput } from "./LocalizedTextInput";
import type { AdminSpecializationDetail } from "@/lib/types";

const CATEGORY_OPTIONS: { value: AdminSpecializationDetail["category"]; label: string }[] = [
  { value: "Development", label: "تطوير" },
  { value: "Data", label: "بيانات" },
  { value: "Security", label: "أمن" },
  { value: "Infrastructure", label: "بنية تحتية" },
];

const DEMAND_OPTIONS: { value: AdminSpecializationDetail["demandLevel"]; label: string }[] = [
  { value: "High", label: "طلب مرتفع" },
  { value: "Good", label: "طلب جيد" },
  { value: "Stable", label: "طلب مستقر" },
];

// The "الأساسيات" card — everything that shows on the specialization's grid card and the
// top of its own page. No <form>/useActionState here (both live in SpecializationEditor).
export function SpecializationBasicsFields({ specialization, pending }: { specialization: AdminSpecializationDetail; pending: boolean }) {
  return (
    <fieldset disabled={pending} className="flex flex-col gap-5">
      <input type="hidden" name="id" value={specialization.id} />

      <LocalizedTextInput label="الاسم" name="name" defaultValue={specialization.name} required />

      <div className="flex flex-col gap-1">
        <LocalizedTextInput label="جملة البطاقة القصيرة" name="cardSentence" defaultValue={specialization.cardSentence} required />
        <span className="text-xs text-neutral-400">تظهر في شبكة التخصصات — سطر واحد.</span>
      </div>

      <div className="flex flex-col gap-1">
        <LocalizedTextInput label="الملخّص أعلى الصفحة" name="summary" defaultValue={specialization.summary} multiline required />
        <span className="text-xs text-neutral-400">اشرحه لشخص لا يعرف شيئاً عن التقنية.</span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-neutral-700">الرابط المختصر (Slug)</span>
          <input
            name="slug"
            required
            dir="ltr"
            defaultValue={specialization.slug}
            className="rounded-md border border-neutral-300 px-3 py-2 text-sm"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-neutral-700">التصنيف</span>
          <select name="category" defaultValue={specialization.category} className="rounded-md border border-neutral-300 px-3 py-2 text-sm">
            {CATEGORY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-neutral-700">مؤشّر الطلب</span>
          <select name="demandLevel" defaultValue={specialization.demandLevel} className="rounded-md border border-neutral-300 px-3 py-2 text-sm">
            {DEMAND_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-neutral-700">صورة الغلاف (اختياري)</span>
        <input type="hidden" name="currentImageUrl" value={specialization.coverImageUrl ?? ""} />

        {specialization.coverImageUrl && (
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element -- admin-supplied external URL */}
            <img
              src={specialization.coverImageUrl}
              alt=""
              className="h-20 w-28 rounded-lg border border-neutral-200 bg-white object-contain p-1"
            />
            <label className="flex items-center gap-2 text-xs text-neutral-600">
              <input name="removeImage" type="checkbox" className="h-4 w-4" />
              إزالة الصورة الحالية
            </label>
          </div>
        )}

        <input
          name="imageFile"
          type="file"
          accept="image/*"
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm file:me-3 file:rounded-md file:border-0 file:bg-neutral-100 file:px-3 file:py-1.5 file:text-sm file:font-medium"
        />
        <span className="text-xs text-neutral-400">1200×800 موصى بها — الصور بدون خلفية (PNG شفاف) تناسبها أكثر.</span>
      </div>

      <div>
        <span className="text-sm font-medium text-neutral-700">بطاقات المعلومات السريعة (اختياري)</span>
        <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <LocalizedTextInput label="الطلب في السوق" name="demandFact" defaultValue={specialization.demandQuickFact ?? undefined} />
          <LocalizedTextInput label="الراتب المبتدئ" name="salaryFact" defaultValue={specialization.salaryQuickFact ?? undefined} />
          <LocalizedTextInput label="حتى أول وظيفة" name="timeToJobFact" defaultValue={specialization.timeToJobQuickFact ?? undefined} />
          <LocalizedTextInput label="صعوبة البداية" name="difficultyFact" defaultValue={specialization.difficultyQuickFact ?? undefined} />
        </div>
      </div>
    </fieldset>
  );
}
