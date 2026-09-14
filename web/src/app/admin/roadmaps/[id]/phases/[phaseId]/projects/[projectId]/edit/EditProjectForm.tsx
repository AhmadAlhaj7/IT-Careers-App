"use client";

import { useActionState, useEffect, useRef } from "react";
import { updateProjectAction, type ActionState } from "@/app/admin/actions";
import { LocalizedTextInput } from "@/components/admin/LocalizedTextInput";
import { restoreFormValues } from "@/lib/restoreFormValues";
import { Switch } from "@/components/ui/Switch";
import { Button } from "@/components/ui/Button";
import type { AdminProject } from "@/lib/types";

const initialState: ActionState = {};

export function EditProjectForm({
  project,
  roadmapId,
  phaseId,
}: {
  project: AdminProject;
  roadmapId: string;
  phaseId: string;
}) {
  const [state, formAction, pending] = useActionState(updateProjectAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.values) {
      restoreFormValues(formRef.current, state.values);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="mt-6 flex flex-col gap-5">
      <input type="hidden" name="id" value={project.id} />
      <input type="hidden" name="roadmapId" value={roadmapId} />
      <input type="hidden" name="phaseId" value={phaseId} />

      <LocalizedTextInput label="العنوان" name="title" defaultValue={project.title} required />
      <LocalizedTextInput label="الوصف" name="description" defaultValue={project.description} multiline required />

      <Switch name="isCapstone" label="مشروع ختامي (Capstone)" defaultChecked={project.isCapstone} />

      {state.message && <p className="text-sm text-danger">{state.message}</p>}

      <Button type="submit" loading={pending}>
        {pending ? "جارٍ الحفظ..." : "حفظ التعديلات"}
      </Button>
    </form>
  );
}
