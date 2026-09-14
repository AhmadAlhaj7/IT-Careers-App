"use client";

import { useActionState, useEffect, useRef } from "react";
import { createSpecializationAction, type ActionState } from "@/app/admin/actions";
import { LocalizedTextInput } from "@/components/admin/LocalizedTextInput";
import { restoreFormValues } from "@/lib/restoreFormValues";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

const initialState: ActionState = {};

export function CreateSpecializationForm() {
  const [state, formAction, pending] = useActionState(createSpecializationAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  // Same fix as the editors: a failed save (a duplicate slug) would otherwise wipe every
  // field the admin just typed, since React resets uncontrolled fields once the action
  // completes regardless of whether it succeeded.
  useEffect(() => {
    if (state.values) {
      restoreFormValues(formRef.current, state.values);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="mt-6 flex flex-col gap-5">
      <LocalizedTextInput label="الاسم" name="name" required />

      <Input label="الرابط المختصر (Slug)" name="slug" required dir="ltr" />

      <Select label="التصنيف" name="category" defaultValue="Development">
        <option value="Development">تطوير</option>
        <option value="Data">بيانات</option>
        <option value="Security">أمن</option>
        <option value="Infrastructure">بنية تحتية</option>
      </Select>

      <Select label="مؤشّر الطلب" name="demandLevel" defaultValue="Good">
        <option value="High">طلب مرتفع</option>
        <option value="Good">طلب جيد</option>
        <option value="Stable">طلب مستقر</option>
      </Select>

      <Select label="الحالة" name="status" defaultValue="Draft">
        <option value="Draft">مسودة (Draft)</option>
        <option value="Published">منشور (Published)</option>
      </Select>

      {state.message && <p className="text-sm text-danger">{state.message}</p>}

      <Button type="submit" loading={pending}>
        {pending ? "جارٍ الحفظ..." : "حفظ"}
      </Button>
    </form>
  );
}
