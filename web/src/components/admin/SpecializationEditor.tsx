"use client";

import { useActionState, useEffect, useRef } from "react";
import { updateSpecializationAction, type ActionState } from "@/app/admin/actions";
import { restoreFormValues } from "@/lib/restoreFormValues";
import { SpecializationBasicsFields } from "./SpecializationBasicsFields";
import { SpecializationSectionsFieldset } from "./SpecializationSectionsFieldset";
import { SpecializationMediaFields } from "./SpecializationMediaFields";
import { SpecializationFaqFieldset } from "./SpecializationFaqFieldset";
import { SpecializationRoadmapLinkFields } from "./SpecializationRoadmapLinkFields";
import { SpecializationOutlinePanel } from "./SpecializationOutlinePanel";
import { SpecializationReadinessSidebar } from "./SpecializationReadinessSidebar";
import { Logo } from "@/components/layout/Logo";
import { formatRelativeTimeAr } from "@/lib/relativeTime";
import type { AdminRoadmapSummary, AdminSpecializationDetail } from "@/lib/types";

const initialState: ActionState = {};

// Unlike RoadmapEditor, this is a single scrolling form — the mockup itself is one scroll,
// not tabs — so every card is a plain child of the one <form>, no `form=` attribute needed
// anywhere.
export function SpecializationEditor({
  specialization,
  roadmaps,
}: {
  specialization: AdminSpecializationDetail;
  roadmaps: AdminRoadmapSummary[];
}) {
  const [state, formAction, pending] = useActionState(updateSpecializationAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  // React resets every uncontrolled field back to its original defaultValue once the action
  // completes, even on failure — restore whatever was actually submitted so a save error (a
  // blob upload failure, a slug conflict) doesn't force re-filling this entire form.
  useEffect(() => {
    if (state.values) {
      restoreFormValues(formRef.current, state.values);
    }
  }, [state]);

  return (
    <div>
      <div className="sticky top-[70px] z-30 mb-4 rounded-2xl border border-neutral-100 bg-white p-5 shadow-lg shadow-neutral-900/10 sm:top-20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#EEF3F1]">
              <Logo size={26} />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl font-bold text-neutral-900 sm:text-2xl">صفحة تخصص: {specialization.name.ar || "تخصص جديد"}</h1>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    specialization.status === "Published" ? "bg-[#0F6E56]/10 text-[#0F6E56]" : "bg-[#E8764A]/10 text-[#E8764A]"
                  }`}
                >
                  {specialization.status === "Published" ? "منشورة" : "مسودة"}
                </span>
              </div>
              <div className="mt-1 flex items-center gap-2.5 text-xs text-neutral-500">
                <span dir="ltr" className="font-mono">
                  /specializations/{specialization.slug}
                </span>
                <span className="opacity-40">·</span>
                <span>آخر حفظ {formatRelativeTimeAr(specialization.updatedAt)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="submit"
              form="specialization-details-form"
              name="status"
              value="Draft"
              disabled={pending}
              className="rounded-xl border border-neutral-200 px-4 py-2.5 text-sm font-semibold text-neutral-800 transition active:scale-95 disabled:opacity-50"
            >
              حفظ كمسودة
            </button>
            <button
              type="submit"
              form="specialization-details-form"
              name="status"
              value="Published"
              disabled={pending}
              className="rounded-xl bg-[#0F6E56] px-5 py-2.5 text-sm font-bold text-white transition active:scale-95 disabled:opacity-50"
            >
              {pending ? "جارٍ الحفظ..." : specialization.status === "Published" ? "تحديث المنشور" : "نشر التخصص"}
            </button>
          </div>
        </div>
      </div>

      {state.message && <p className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{state.message}</p>}

      <form
        id="specialization-details-form"
        ref={formRef}
        action={formAction}
        className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_320px]"
      >
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm shadow-neutral-900/5">
            <SpecializationBasicsFields specialization={specialization} pending={pending} />
          </div>

          <SpecializationSectionsFieldset specialization={specialization} pending={pending} />

          <SpecializationMediaFields specialization={specialization} pending={pending} />

          <SpecializationFaqFieldset specialization={specialization} pending={pending} />

          <SpecializationRoadmapLinkFields specialization={specialization} roadmaps={roadmaps} pending={pending} />
        </div>

        <div className="flex flex-col gap-4">
          <SpecializationOutlinePanel specialization={specialization} />
          <SpecializationReadinessSidebar specialization={specialization} />
        </div>
      </form>
    </div>
  );
}
