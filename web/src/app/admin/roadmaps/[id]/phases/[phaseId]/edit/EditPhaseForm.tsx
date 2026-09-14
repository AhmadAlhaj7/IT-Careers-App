"use client";

import { useActionState, useEffect, useRef } from "react";
import { updatePhaseAction, type ActionState } from "@/app/admin/actions";
import { LocalizedTextInput } from "@/components/admin/LocalizedTextInput";
import { restoreFormValues } from "@/lib/restoreFormValues";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import type { AdminPhaseDetail } from "@/lib/types";

const initialState: ActionState = {};

export function EditPhaseForm({ phase }: { phase: AdminPhaseDetail }) {
  const [state, formAction, pending] = useActionState(updatePhaseAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.values) {
      restoreFormValues(formRef.current, state.values);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="mt-6 flex flex-col gap-5">
      <input type="hidden" name="id" value={phase.id} />
      <input type="hidden" name="roadmapId" value={phase.roadmapId} />

      <LocalizedTextInput label="العنوان" name="title" defaultValue={phase.title} required />

      <Input label="الترتيب" name="orderIndex" type="number" min="0" required defaultValue={phase.orderIndex} dir="ltr" />

      <LocalizedTextInput label="الشرح" name="explanation" defaultValue={phase.explanation} multiline required />

      <Input label="رابط PDF (اختياري)" name="pdfUrl" dir="ltr" defaultValue={phase.pdfUrl ?? ""} />

      <Select label="نوع المرحلة" name="phaseType" defaultValue={phase.phaseType}>
        <option value="Standard">عادية (Standard)</option>
        <option value="FindAJob">البحث عن عمل (Find a Job)</option>
      </Select>

      <div className="flex flex-col gap-1">
        <LocalizedTextInput label="وسم المرحلة (اختياري)" name="tag" defaultValue={phase.tag ?? undefined} />
        <span className="text-xs text-neutral-400">مثال: نقطة البداية، الخطوة الأخيرة</span>
      </div>

      <Input
        label="المهارات (اختياري)"
        name="skills"
        dir="ltr"
        defaultValue={phase.skills ?? ""}
        placeholder="Git, Terminal, Pseudocode"
        hint="افصل بين المهارات بفاصلة."
      />

      {state.message && <p className="text-sm text-danger">{state.message}</p>}

      <Button type="submit" loading={pending}>
        {pending ? "جارٍ الحفظ..." : "حفظ التعديلات"}
      </Button>
    </form>
  );
}
