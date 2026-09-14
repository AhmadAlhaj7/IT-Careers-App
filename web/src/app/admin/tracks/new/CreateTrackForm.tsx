"use client";

import { useActionState, useEffect, useRef } from "react";
import { createTrackAction, type ActionState } from "@/app/admin/actions";
import { LocalizedTextInput } from "@/components/admin/LocalizedTextInput";
import { restoreFormValues } from "@/lib/restoreFormValues";
import { Input } from "@/components/ui/Input";
import { Switch } from "@/components/ui/Switch";
import { Button } from "@/components/ui/Button";

const initialState: ActionState = {};

export function CreateTrackForm() {
  const [state, formAction, pending] = useActionState(createTrackAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.values) {
      restoreFormValues(formRef.current, state.values);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="mt-6 flex flex-col gap-5">
      <Input label="الرابط المختصر (Slug)" name="slug" required dir="ltr" />

      <LocalizedTextInput label="الاسم" name="name" required />
      <LocalizedTextInput label="الوصف" name="description" multiline required />

      <Switch name="published" label="منشور" />

      {state.message && <p className="text-sm text-danger">{state.message}</p>}

      <Button type="submit" loading={pending}>
        {pending ? "جارٍ الحفظ..." : "حفظ"}
      </Button>
    </form>
  );
}
