"use client";

import { useActionState, useEffect, useRef } from "react";
import { createResourceAction, type ActionState } from "@/app/admin/actions";
import { LocalizedTextInput } from "@/components/admin/LocalizedTextInput";
import { restoreFormValues } from "@/lib/restoreFormValues";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

const initialState: ActionState = {};

export function CreateResourceForm({ roadmapId, phaseId }: { roadmapId: string; phaseId: string }) {
  const [state, formAction, pending] = useActionState(createResourceAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.values) {
      restoreFormValues(formRef.current, state.values);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="mt-6 flex flex-col gap-5">
      <input type="hidden" name="roadmapId" value={roadmapId} />
      <input type="hidden" name="phaseId" value={phaseId} />

      <LocalizedTextInput label="العنوان" name="title" required />

      <Input label="الرابط" name="url" type="url" required dir="ltr" />

      <Select label="نوع المورد" name="resourceType" defaultValue="Article">
        <option value="Video">فيديو (Video)</option>
        <option value="Article">مقال (Article)</option>
        <option value="Documentation">توثيق (Documentation)</option>
        <option value="Course">دورة (Course)</option>
      </Select>

      <Select label="نوع الوصول" name="accessType" defaultValue="Free">
        <option value="Free">مجاني (Free)</option>
        <option value="Paid">مدفوع (Paid)</option>
      </Select>

      {state.message && <p className="text-sm text-danger">{state.message}</p>}

      <Button type="submit" loading={pending}>
        {pending ? "جارٍ الحفظ..." : "حفظ"}
      </Button>
    </form>
  );
}
