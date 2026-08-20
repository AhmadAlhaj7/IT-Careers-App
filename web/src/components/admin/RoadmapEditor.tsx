"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { updateRoadmapAction, type ActionState } from "@/app/admin/actions";
import { restoreFormValues } from "@/lib/restoreFormValues";
import { RoadmapDetailsFields } from "./RoadmapDetailsFields";
import { RoadmapReadinessSidebar } from "./RoadmapReadinessSidebar";
import { RoadmapPhasesTab } from "./RoadmapPhasesTab";
import { RoadmapExamTab } from "./RoadmapExamTab";
import { RoadmapSettingsTab } from "./RoadmapSettingsTab";
import { Logo } from "@/components/layout/Logo";
import { formatRelativeTimeAr } from "@/lib/relativeTime";
import type { AdminPhaseDetail, AdminRoadmapDetail } from "@/lib/types";

const initialState: ActionState = {};

const TABS = ["التفاصيل", "المراحل والمحتوى", "الاختبار النهائي", "الإعدادات"] as const;

export function RoadmapEditor({ roadmap, phaseDetails }: { roadmap: AdminRoadmapDetail; phaseDetails: AdminPhaseDetail[] }) {
  const [state, formAction, pending] = useActionState(updateRoadmapAction, initialState);
  const [tab, setTab] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  // React resets every uncontrolled field back to its original defaultValue once the action
  // completes, even on failure — restore whatever was actually submitted so a save error (an
  // image upload failure, a slug conflict) doesn't force re-filling this entire form.
  useEffect(() => {
    if (state.values) {
      restoreFormValues(formRef.current, state.values);
    }
  }, [state]);

  return (
    <div>
      <div className="mb-4 rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm shadow-neutral-900/5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#EEF3F1]">
              <Logo size={26} />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl font-bold text-neutral-900 sm:text-2xl">{roadmap.title.ar || "مسار جديد"}</h1>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    roadmap.status === "Published" ? "bg-[#0F6E56]/10 text-[#0F6E56]" : "bg-[#E8764A]/10 text-[#E8764A]"
                  }`}
                >
                  {roadmap.status === "Published" ? "منشور" : "مسودة"}
                </span>
              </div>
              <div className="mt-1 flex items-center gap-2.5 text-xs text-neutral-500">
                <span dir="ltr" className="font-mono">
                  /{roadmap.slug}
                </span>
                <span className="opacity-40">·</span>
                <span>آخر حفظ {formatRelativeTimeAr(roadmap.updatedAt)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`/roadmaps/${roadmap.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-neutral-200 px-4 py-2.5 text-sm font-semibold text-neutral-800 transition hover:bg-neutral-50"
            >
              معاينة
            </a>
            <button
              type="submit"
              form="roadmap-details-form"
              name="status"
              value="Draft"
              disabled={pending}
              className="rounded-xl border border-neutral-200 px-4 py-2.5 text-sm font-semibold text-neutral-800 transition active:scale-95 disabled:opacity-50"
            >
              حفظ كمسودة
            </button>
            <button
              type="submit"
              form="roadmap-details-form"
              name="status"
              value="Published"
              disabled={pending}
              className="rounded-xl bg-[#0F6E56] px-5 py-2.5 text-sm font-bold text-white transition active:scale-95 disabled:opacity-50"
            >
              {pending ? "جارٍ الحفظ..." : roadmap.status === "Published" ? "تحديث المنشور" : "نشر المسار"}
            </button>
          </div>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto border-t border-neutral-100 pt-4">
          {TABS.map((label, index) => (
            <button
              key={label}
              type="button"
              onClick={() => setTab(index)}
              className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                tab === index ? "bg-neutral-900 text-white" : "bg-neutral-50 text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full font-mono text-[11px] ${
                  tab === index ? "bg-white/20" : "bg-neutral-900/10"
                }`}
              >
                {index + 1}
              </span>
              {label}
            </button>
          ))}
        </div>
      </div>

      {state.message && <p className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{state.message}</p>}

      <div className={tab === 0 ? "" : "hidden"}>
        <form
          id="roadmap-details-form"
          ref={formRef}
          action={formAction}
          className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_320px]"
        >
          <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm shadow-neutral-900/5">
            <RoadmapDetailsFields roadmap={roadmap} pending={pending} />
          </div>
          <RoadmapReadinessSidebar roadmap={roadmap} />
        </form>
      </div>

      <div className={tab === 1 ? "" : "hidden"}>
        <RoadmapPhasesTab roadmapId={roadmap.id} phases={phaseDetails} />
      </div>

      <div className={tab === 2 ? "" : "hidden"}>
        <RoadmapExamTab
          roadmapId={roadmap.id}
          passThresholdPercent={roadmap.passThresholdPercent}
          pending={pending}
          questions={roadmap.finalExamQuestions}
        />
      </div>

      <div className={tab === 3 ? "" : "hidden"}>
        <RoadmapSettingsTab
          roadmapId={roadmap.id}
          phaseCount={roadmap.phases.length}
          sequentialUnlockEnabled={roadmap.sequentialUnlockEnabled}
          pending={pending}
        />
      </div>
    </div>
  );
}
