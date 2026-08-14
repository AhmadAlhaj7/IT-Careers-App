import { LocalizedTextInput } from "./LocalizedTextInput";
import type { AdminRoadmapSummary, AdminSpecializationDetail } from "@/lib/types";

// The last button on the (future) public page takes the visitor straight to the paid
// roadmap — this card just picks which one, reusing the same roadmap list the admin
// roadmaps page already fetches, no new endpoint needed.
export function SpecializationRoadmapLinkFields({
  specialization,
  roadmaps,
  pending,
}: {
  specialization: AdminSpecializationDetail;
  roadmaps: AdminRoadmapSummary[];
  pending: boolean;
}) {
  const linkedRoadmap = roadmaps.find((r) => r.id === specialization.linkedRoadmapId);

  return (
    <fieldset disabled={pending} className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm shadow-neutral-900/5">
      <h2 className="text-lg font-bold text-neutral-900">الربط بالمسار</h2>
      <p className="mt-1 mb-4 text-sm text-neutral-500">الزر الأخير في الصفحة يأخذ الزائر مباشرة إلى المسار المدفوع.</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-neutral-700">المسار المرتبط</span>
          <select
            name="linkedRoadmapId"
            defaultValue={specialization.linkedRoadmapId ?? ""}
            className="rounded-md border border-neutral-300 px-3 py-2 text-sm"
          >
            <option value="">بدون ربط (يخفي الزر)</option>
            {roadmaps.map((roadmap) => (
              <option key={roadmap.id} value={roadmap.id}>
                {roadmap.title.ar} — {roadmap.phaseCount} مراحل — ${roadmap.price.toFixed(0)}
              </option>
            ))}
          </select>
        </label>

        <LocalizedTextInput label="نص الزر (اختياري)" name="roadmapButtonText" defaultValue={specialization.roadmapButtonText ?? undefined} />
      </div>

      {linkedRoadmap && (
        <div className="mt-4 flex items-center gap-3 rounded-xl bg-[#EEF3F1] px-4 py-3">
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#0F6E56]" />
          <div className="min-w-0 text-sm">
            <p className="font-semibold text-neutral-900">مربوطة بمسار «{linkedRoadmap.title.ar}»</p>
            <p className="text-xs text-[#5f7d73]">أي تعديل على سعر المسار أو عدد مراحله يظهر تلقائياً هنا.</p>
          </div>
        </div>
      )}
    </fieldset>
  );
}
