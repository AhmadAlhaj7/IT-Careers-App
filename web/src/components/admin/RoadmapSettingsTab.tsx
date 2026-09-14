"use client";

import { deleteRoadmapAction } from "@/app/admin/actions";
import { DeleteButton } from "./DeleteButton";
import { Card } from "@/components/ui/Card";
import { Switch } from "@/components/ui/Switch";

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
  return (
    <div className="flex flex-col gap-4">
      <Card padding="lg" shadow="subtle" radius="panel">
        <h2 className="text-lg font-bold text-neutral-900">إعدادات المسار</h2>
        <p className="mt-1 mb-2 text-sm text-neutral-500">تتحكم في سلوك المسار بعد النشر.</p>

        <div className="flex items-center justify-between gap-6 border-t border-neutral-100 py-4">
          <div>
            <p className="mb-1 text-sm font-semibold text-neutral-900">فتح المراحل بالترتيب</p>
            <p className="text-xs leading-[1.7] text-neutral-500">
              يمنع الطالب من فتح مرحلة قبل إنهاء اختبار وما قبلها من مراحل. عند التعطيل، أي مرحلة تُفتح فور الاشتراك.
            </p>
          </div>
          {/* The switch lives inside the "Settings" tab panel but submits with the "Details"
              tab's form — `form=` associates it across the DOM, same as the editor's own
              header submit buttons already do. */}
          <Switch name="sequentialUnlockEnabled" defaultChecked={sequentialUnlockEnabled} disabled={pending} form="roadmap-details-form" />
        </div>

        <div className="mt-2 flex items-center justify-between gap-6 rounded-panel border border-danger/25 bg-danger-subtle p-4">
          <div>
            <p className="mb-1 text-sm font-bold text-danger">حذف المسار</p>
            <p className="text-xs leading-[1.7] text-danger/70">لا يمكن التراجع. الطلاب المشتركون سيفقدون الوصول ويحتفظون بشهاداتهم الصادرة.</p>
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
      </Card>
    </div>
  );
}
