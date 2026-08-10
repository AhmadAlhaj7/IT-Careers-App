"use client";

import { useState } from "react";
import Link from "next/link";
import { deletePhaseAction, deleteProjectAction, deleteQuizQuestionAction, deleteResourceAction, reorderPhaseAction } from "@/app/admin/actions";
import { DeleteButton } from "./DeleteButton";
import type { AdminPhaseDetail } from "@/lib/types";

type Item = {
  key: string;
  kind: "مصدر" | "مشروع" | "اختبار";
  title: string;
  meta: string;
  editHref: string;
  deleteAction: (prevState: { message?: string }, formData: FormData) => Promise<{ message?: string }>;
  deleteHiddenFields: Record<string, string>;
};

const KIND_STYLE: Record<Item["kind"], string> = {
  مصدر: "bg-[#5B3FC4]/10 text-[#5B3FC4]",
  مشروع: "bg-[#E8764A]/10 text-[#E8764A]",
  اختبار: "bg-neutral-100 text-neutral-600",
};

function itemsFor(roadmapId: string, phase: AdminPhaseDetail): Item[] {
  const base = `/admin/roadmaps/${roadmapId}/phases/${phase.id}`;
  return [
    ...phase.resources.map((r) => ({
      key: `r-${r.id}`,
      kind: "مصدر" as const,
      title: r.title.ar,
      meta: r.resourceType,
      editHref: `${base}/resources/${r.id}/edit`,
      deleteAction: deleteResourceAction,
      deleteHiddenFields: { id: r.id, roadmapId, phaseId: phase.id },
    })),
    ...phase.projects.map((p) => ({
      key: `p-${p.id}`,
      kind: "مشروع" as const,
      title: p.title.ar,
      meta: p.isCapstone ? "مشروع تخرّج" : "مشروع",
      editHref: `${base}/projects/${p.id}/edit`,
      deleteAction: deleteProjectAction,
      deleteHiddenFields: { id: p.id, roadmapId, phaseId: phase.id },
    })),
    ...phase.quizQuestions.map((q) => ({
      key: `q-${q.id}`,
      kind: "اختبار" as const,
      title: q.text.ar,
      meta: `سؤال ${q.orderIndex}`,
      editHref: `${base}/quiz-questions/${q.id}/edit`,
      deleteAction: deleteQuizQuestionAction,
      deleteHiddenFields: { id: q.id, roadmapId, phaseId: phase.id },
    })),
  ];
}

function ReorderButton({ roadmapId, phaseId, direction, disabled }: { roadmapId: string; phaseId: string; direction: "up" | "down"; disabled: boolean }) {
  return (
    <form action={reorderPhaseAction}>
      <input type="hidden" name="roadmapId" value={roadmapId} />
      <input type="hidden" name="phaseId" value={phaseId} />
      <input type="hidden" name="direction" value={direction} />
      <button
        type="submit"
        disabled={disabled}
        aria-label={direction === "up" ? "نقل لأعلى" : "نقل لأسفل"}
        className="flex h-6 w-6 items-center justify-center rounded-md border border-neutral-200 text-neutral-500 transition hover:bg-neutral-50 disabled:opacity-30"
      >
        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d={direction === "up" ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
        </svg>
      </button>
    </form>
  );
}

export function RoadmapPhasesTab({ roadmapId, phases }: { roadmapId: string; phases: AdminPhaseDetail[] }) {
  const [openPhaseId, setOpenPhaseId] = useState<string | null>(phases[0]?.id ?? null);

  const totalResources = phases.reduce((sum, p) => sum + p.resources.length, 0);
  const totalProjects = phases.reduce((sum, p) => sum + p.projects.length, 0);
  const totalQuizQuestions = phases.reduce((sum, p) => sum + p.quizQuestions.length, 0);
  const gaps = phases.filter((p) => p.projects.length === 0 || p.quizQuestions.length === 0);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm shadow-neutral-900/5">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-neutral-900">مراحل المسار</h2>
            <p className="text-sm text-neutral-500">استخدم الأسهم لإعادة ترتيب المراحل — الترتيب هو ما يتبعه الطالب.</p>
          </div>
          <Link
            href={`/admin/roadmaps/${roadmapId}/phases/new`}
            className="rounded-lg border border-[#0F6E56]/35 bg-[#0F6E56]/5 px-3 py-2 text-sm font-bold text-[#0F6E56] transition active:scale-95"
          >
            + مرحلة جديدة
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          {phases.length === 0 && <p className="py-6 text-center text-sm text-neutral-500">لا توجد مراحل بعد.</p>}
          {phases.map((phase, index) => {
            const incomplete = phase.projects.length === 0 || phase.quizQuestions.length === 0;
            const open = openPhaseId === phase.id;
            const items = itemsFor(roadmapId, phase);

            return (
              <div key={phase.id} className={`overflow-hidden rounded-xl border ${open ? "border-[#0F6E56]/35" : "border-neutral-200"}`}>
                <div className="flex items-center gap-3 p-3">
                  <div className="flex flex-col gap-1">
                    <ReorderButton roadmapId={roadmapId} phaseId={phase.id} direction="up" disabled={index === 0} />
                    <ReorderButton roadmapId={roadmapId} phaseId={phase.id} direction="down" disabled={index === phases.length - 1} />
                  </div>

                  <button
                    type="button"
                    onClick={() => setOpenPhaseId(open ? null : phase.id)}
                    className="flex flex-1 items-center gap-3 text-start"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-neutral-200 font-mono text-sm font-bold text-[#0F6E56]">
                      {phase.orderIndex}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-semibold text-neutral-900">{phase.title.ar}</span>
                      <span className="block text-xs text-neutral-500">
                        {phase.resources.length} مصادر · {phase.projects.length} مشاريع · {phase.quizQuestions.length ? "اختبار" : "بلا اختبار"}
                      </span>
                    </span>
                  </button>

                  {incomplete && (
                    <span className="shrink-0 rounded-full bg-[#E8764A]/10 px-2.5 py-1 text-[11px] font-semibold text-[#E8764A]">ناقصة</span>
                  )}

                  <div className="flex shrink-0 gap-2">
                    <Link
                      href={`/admin/roadmaps/${roadmapId}/phases/${phase.id}/edit`}
                      className="rounded-lg border border-neutral-200 px-2.5 py-1.5 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-50"
                    >
                      تعديل
                    </Link>
                    <DeleteButton
                      action={deletePhaseAction}
                      hiddenFields={{ id: phase.id, roadmapId }}
                      confirmMessage="سيتم حذف هذه المرحلة وكل محتواها نهائيًا. هل أنت متأكد؟"
                    />
                  </div>
                </div>

                {open && (
                  <div className="border-t border-neutral-100 bg-neutral-50/60 p-3">
                    {items.length === 0 && <p className="px-2 py-2 text-sm text-neutral-500">لا يوجد محتوى في هذه المرحلة بعد.</p>}
                    <div className="flex flex-col gap-2">
                      {items.map((item) => (
                        <div key={item.key} className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-white px-3 py-2">
                          <span className={`shrink-0 rounded-md px-2 py-1 text-[10px] font-bold ${KIND_STYLE[item.kind]}`}>{item.kind}</span>
                          <span className="min-w-0 flex-1 truncate text-sm font-medium">{item.title}</span>
                          <span className="shrink-0 text-xs text-neutral-400">{item.meta}</span>
                          <Link href={item.editHref} className="shrink-0 text-xs font-semibold text-[#0F6E56]">
                            تحرير
                          </Link>
                          <DeleteButton
                            action={item.deleteAction}
                            hiddenFields={item.deleteHiddenFields}
                            confirmMessage="سيتم حذف هذا العنصر نهائيًا. هل أنت متأكد؟"
                            label="×"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Link
                        href={`/admin/roadmaps/${roadmapId}/phases/${phase.id}/resources/new`}
                        className="rounded-lg border border-dashed border-[#5B3FC4]/35 bg-[#5B3FC4]/5 px-3 py-2 text-xs font-semibold text-[#5B3FC4]"
                      >
                        + مصدر
                      </Link>
                      <Link
                        href={`/admin/roadmaps/${roadmapId}/phases/${phase.id}/projects/new`}
                        className="rounded-lg border border-dashed border-[#E8764A]/35 bg-[#E8764A]/5 px-3 py-2 text-xs font-semibold text-[#E8764A]"
                      >
                        + مشروع
                      </Link>
                      <Link
                        href={`/admin/roadmaps/${roadmapId}/phases/${phase.id}/quiz-questions/new`}
                        className="rounded-lg border border-dashed border-neutral-300 bg-neutral-50 px-3 py-2 text-xs font-semibold text-neutral-600"
                      >
                        + اختبار قصير
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm shadow-neutral-900/5">
          <p className="mb-3 text-sm font-bold text-neutral-900">ملخّص المحتوى</p>
          <div className="flex flex-col gap-2.5 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-neutral-600">المراحل</span>
              <span className="font-mono font-bold text-[#0F6E56]">{phases.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-600">المصادر</span>
              <span className="font-mono font-bold text-[#5B3FC4]">{totalResources}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-600">المشاريع</span>
              <span className="font-mono font-bold text-[#E8764A]">{totalProjects}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-600">الاختبارات القصيرة</span>
              <span className="font-mono font-bold text-neutral-900">{totalQuizQuestions}</span>
            </div>
          </div>
        </div>

        {gaps.length > 0 && (
          <div className="rounded-2xl border border-[#E8764A]/25 bg-[#E8764A]/5 p-4">
            <p className="mb-1.5 text-sm font-bold text-[#b0552f]">تنبيه قبل النشر</p>
            <p className="text-xs leading-[1.8] text-[#8a5638]">
              {gaps.map((p) => `المرحلة ${p.orderIndex} (${p.title.ar})`).join("، ")} — بلا{" "}
              {gaps.some((p) => p.quizQuestions.length === 0) && gaps.some((p) => p.projects.length === 0)
                ? "اختبار أو مشروع"
                : gaps.some((p) => p.quizQuestions.length === 0)
                  ? "اختبار قصير"
                  : "مشروع"}
              . يمكنك النشر، لكن الطالب سينتقل بينها دون تقييم.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
