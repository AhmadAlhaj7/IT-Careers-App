"use client";

import { useState } from "react";
import { deleteRoadmapAction } from "@/app/admin/actions";
import { DeleteButton } from "./DeleteButton";

type RoadmapSettingsTabProps = {
  roadmapId: string;
  phaseCount: number;
  sequentialUnlockEnabled: boolean;
  pending: boolean;
};

// The only toggle here is real and enforced (GetPhaseAsync now checks it). The design's other
// three settings — manual project review, capping quiz retries, emailing students on new
// content — were dropped: none of those have any backing system today (no submission/review
// workflow, no attempt-limit infrastructure, no email service), so a toggle for them would
// silently do nothing.
export function RoadmapSettingsTab({ roadmapId, phaseCount, sequentialUnlockEnabled, pending }: RoadmapSettingsTabProps) {
  const [checked, setChecked] = useState(sequentialUnlockEnabled);

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm shadow-neutral-900/5">
        <h2 className="text-lg font-bold text-neutral-900">إعدادات المسار</h2>
        <p className="mt-1 mb-2 text-sm text-neutral-500">تتحكم في سلوك المسار بعد النشر.</p>

        <div className="flex items-center justify-between gap-6 border-t border-neutral-100 py-4">
          <div>
            <p className="mb-1 text-sm font-semibold text-neutral-900">فتح المراحل بالترتيب</p>
            <p className="text-xs leading-[1.7] text-neutral-500">
              يمنع الطالب من فتح مرحلة قبل إنهاء اختبار وما قبلها من مراحل. عند التعطيل، أي مرحلة تُفتح فور الاشتراك.
            </p>
          </div>
          <button
            type="button"
            disabled={pending}
            onClick={() => setChecked((v) => !v)}
            aria-pressed={checked}
            className="flex h-[26px] w-[46px] shrink-0 items-center rounded-full p-0.5 transition disabled:opacity-50"
            style={{ backgroundColor: checked ? "#0F6E56" : "rgba(28,27,25,.18)", justifyContent: checked ? "flex-start" : "flex-end" }}
          >
            <span className="h-5 w-5 rounded-full bg-white shadow" />
          </button>
          <input form="roadmap-details-form" type="checkbox" name="sequentialUnlockEnabled" checked={checked} readOnly hidden />
        </div>

        <div className="mt-2 flex items-center justify-between gap-6 rounded-xl border border-red-200 bg-red-50/50 p-4">
          <div>
            <p className="mb-1 text-sm font-bold text-red-700">حذف المسار</p>
            <p className="text-xs leading-[1.7] text-red-900/70">لا يمكن التراجع. الطلاب المشتركون سيفقدون الوصول ويحتفظون بشهاداتهم الصادرة.</p>
          </div>
          <DeleteButton
            action={deleteRoadmapAction}
            hiddenFields={{ id: roadmapId }}
            confirmMessage={
              phaseCount > 0
                ? `سيتم حذف هذا المسار و${phaseCount} مرحلة تابعة له. هل أنت متأكد؟`
                : "سيتم حذف هذا المسار نهائيًا. هل أنت متأكد؟"
            }
            label="حذف نهائياً"
          />
        </div>
      </div>
    </div>
  );
}
