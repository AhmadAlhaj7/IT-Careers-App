"use client";

import { useActionState } from "react";
import { updatePhaseAction, type ActionState } from "@/app/admin/actions";
import { LocalizedTextInput } from "@/components/admin/LocalizedTextInput";
import type { AdminPhaseDetail } from "@/lib/types";

const initialState: ActionState = {};

export function EditPhaseForm({ phase }: { phase: AdminPhaseDetail }) {
  const [state, formAction, pending] = useActionState(updatePhaseAction, initialState);

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-5">
      <input type="hidden" name="id" value={phase.id} />
      <input type="hidden" name="roadmapId" value={phase.roadmapId} />

      <LocalizedTextInput label="العنوان" name="title" defaultValue={phase.title} required />

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-neutral-700">الترتيب</span>
        <input
          name="orderIndex"
          type="number"
          min="0"
          required
          defaultValue={phase.orderIndex}
          dir="ltr"
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm"
        />
      </label>

      <LocalizedTextInput label="الشرح" name="explanation" defaultValue={phase.explanation} multiline required />

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-neutral-700">رابط PDF (اختياري)</span>
        <input
          name="pdfUrl"
          dir="ltr"
          defaultValue={phase.pdfUrl ?? ""}
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm"
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-neutral-700">نوع المرحلة</span>
        <select
          name="phaseType"
          defaultValue={phase.phaseType}
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm"
        >
          <option value="Standard">عادية (Standard)</option>
          <option value="FindAJob">البحث عن عمل (Find a Job)</option>
        </select>
      </label>

      <div className="flex flex-col gap-1">
        <LocalizedTextInput label="وسم المرحلة (اختياري)" name="tag" defaultValue={phase.tag ?? undefined} />
        <span className="text-xs text-neutral-400">مثال: نقطة البداية، الخطوة الأخيرة</span>
      </div>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-neutral-700">المهارات (اختياري)</span>
        <input
          name="skills"
          dir="ltr"
          defaultValue={phase.skills ?? ""}
          placeholder="Git, Terminal, Pseudocode"
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm"
        />
        <span className="text-xs text-neutral-400">افصل بين المهارات بفاصلة.</span>
      </label>

      {state.message && <p className="text-sm text-red-600">{state.message}</p>}

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-[#0F6E56] px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {pending ? "جارٍ الحفظ..." : "حفظ التعديلات"}
      </button>
    </form>
  );
}
