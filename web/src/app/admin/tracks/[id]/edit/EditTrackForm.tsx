"use client";

import { useActionState, useEffect, useRef } from "react";
import { updateTrackAction, type ActionState } from "@/app/admin/actions";
import { LocalizedTextInput } from "@/components/admin/LocalizedTextInput";
import { restoreFormValues } from "@/lib/restoreFormValues";
import { Input } from "@/components/ui/Input";
import { Switch } from "@/components/ui/Switch";
import { Button } from "@/components/ui/Button";
import type { AdminTrack } from "@/lib/types";

const initialState: ActionState = {};

export function EditTrackForm({ track }: { track: AdminTrack }) {
  const [state, formAction, pending] = useActionState(updateTrackAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.values) {
      restoreFormValues(formRef.current, state.values);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="mt-6 flex flex-col gap-5">
      <input type="hidden" name="id" value={track.id} />

      <Input label="الرابط المختصر (Slug)" name="slug" defaultValue={track.slug} required dir="ltr" />

      <LocalizedTextInput label="الاسم" name="name" defaultValue={track.name} required />
      <LocalizedTextInput label="الوصف" name="description" defaultValue={track.description} multiline required />

      <Switch name="published" label="منشور" defaultChecked={track.published} />

      {state.message && <p className="text-sm text-danger">{state.message}</p>}

      <Button type="submit" loading={pending}>
        {pending ? "جارٍ الحفظ..." : "حفظ التعديلات"}
      </Button>
    </form>
  );
}
