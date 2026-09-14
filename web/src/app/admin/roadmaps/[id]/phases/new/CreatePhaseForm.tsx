"use client";

import { useActionState, useEffect, useRef } from "react";
import { createPhaseAction, type ActionState } from "@/app/admin/actions";
import { LocalizedTextInput } from "@/components/admin/LocalizedTextInput";
import { restoreFormValues } from "@/lib/restoreFormValues";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

const initialState: ActionState = {};

export function CreatePhaseForm({ roadmapId, nextOrderIndex }: { roadmapId: string; nextOrderIndex: number }) {
  const [state, formAction, pending] = useActionState(createPhaseAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.values) {
      restoreFormValues(formRef.current, state.values);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="mt-6 flex flex-col gap-5">
      <input type="hidden" name="roadmapId" value={roadmapId} />

      <LocalizedTextInput label="العنوان" name="title" required />

      <Input label="الترتيب" name="orderIndex" type="number" min="0" required defaultValue={nextOrderIndex} dir="ltr" />

      <LocalizedTextInput label="الشرح" name="explanation" multiline required />

      <Input label="رابط PDF (اختياري)" name="pdfUrl" dir="ltr" />

      <Select label="نوع المرحلة" name="phaseType" defaultValue="Standard">
        <option value="Standard">عادية (Standard)</option>
        <option value="FindAJob">البحث عن عمل (Find a Job)</option>
      </Select>

      <div className="flex flex-col gap-1">
        <LocalizedTextInput label="وسم المرحلة (اختياري)" name="tag" />
        <span className="text-xs text-neutral-400">مثال: نقطة البداية، الخطوة الأخيرة</span>
      </div>

      <Input
        label="المهارات (اختياري)"
        name="skills"
        dir="ltr"
        placeholder="Git, Terminal, Pseudocode"
        hint="افصل بين المهارات بفاصلة."
      />

      {state.message && <p className="text-sm text-danger">{state.message}</p>}

      <Button type="submit" loading={pending}>
        {pending ? "جارٍ الحفظ..." : "حفظ"}
      </Button>
    </form>
  );
}
