import { LocalizedTextInput } from "./LocalizedTextInput";
import type { AdminSpecializationDetail } from "@/lib/types";

// PDF filename shown here always comes straight from what was actually uploaded — there's no
// admin-typed page-count/size field, since nothing in the system computes either honestly.
export function SpecializationMediaFields({ specialization, pending }: { specialization: AdminSpecializationDetail; pending: boolean }) {
  return (
    <fieldset disabled={pending} className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm shadow-neutral-900/5">
      <h2 className="text-lg font-bold text-neutral-900">الوسائط</h2>
      <p className="mt-1 mb-4 text-sm text-neutral-500">يظهران قبل الأسئلة الشائعة مباشرة. اتركهما فارغين ليختفي القسم.</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-neutral-200 p-4">
          <p className="mb-3 text-sm font-bold text-neutral-900">فيديو تعريفي</p>
          <label className="mb-3 flex flex-col gap-1">
            <span className="text-xs text-neutral-500">رابط الفيديو</span>
            <input
              name="introVideoUrl"
              dir="ltr"
              defaultValue={specialization.introVideoUrl ?? ""}
              placeholder="https://youtu.be/xxxxxxxx"
              className="rounded-md border border-neutral-300 px-3 py-2 font-mono text-xs"
            />
          </label>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <LocalizedTextInput label="وصف الفيديو" name="introVideoCaption" defaultValue={specialization.introVideoCaption ?? undefined} />
            <label className="flex flex-col gap-1">
              <span className="text-xs text-neutral-500">المدة</span>
              <input
                name="introVideoDurationLabel"
                defaultValue={specialization.introVideoDurationLabel ?? ""}
                placeholder="8 دقائق"
                className="rounded-md border border-neutral-300 px-3 py-2 text-sm"
              />
            </label>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-200 p-4">
          <p className="mb-3 text-sm font-bold text-neutral-900">ملف PDF</p>
          <input type="hidden" name="currentPdfUrl" value={specialization.pdfUrl ?? ""} />
          <input type="hidden" name="currentPdfFileName" value={specialization.pdfFileName ?? ""} />

          {specialization.pdfUrl && (
            <div className="mb-3 flex items-center gap-3 rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2">
              <span className="flex h-8 w-7 shrink-0 items-end justify-center rounded bg-white pb-1 text-[9px] font-bold text-[#E8764A] shadow-sm">
                PDF
              </span>
              <span className="min-w-0 flex-1 truncate text-sm">{specialization.pdfFileName ?? "ملف مرفوع"}</span>
              <label className="flex shrink-0 items-center gap-1.5 text-xs text-red-600">
                <input name="removePdf" type="checkbox" className="h-3.5 w-3.5" />
                إزالة
              </label>
            </div>
          )}

          <input
            name="pdfFile"
            type="file"
            accept="application/pdf"
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm file:me-3 file:rounded-md file:border-0 file:bg-neutral-100 file:px-3 file:py-1.5 file:text-sm file:font-medium"
          />
        </div>
      </div>
    </fieldset>
  );
}
