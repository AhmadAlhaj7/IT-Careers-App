"use client";

import { useActionState } from "react";
import { updateProjectAction, type ActionState } from "@/app/admin/actions";
import { LocalizedTextInput } from "@/components/admin/LocalizedTextInput";
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

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-5">
      <input type="hidden" name="id" value={project.id} />
      <input type="hidden" name="roadmapId" value={roadmapId} />
      <input type="hidden" name="phaseId" value={phaseId} />

      <LocalizedTextInput label="العنوان" name="title" defaultValue={project.title} required />
      <LocalizedTextInput label="الوصف" name="description" defaultValue={project.description} multiline required />

      <label className="flex items-center gap-2">
        <input type="checkbox" name="isCapstone" defaultChecked={project.isCapstone} className="h-4 w-4" />
        <span className="text-sm font-medium text-neutral-700">مشروع ختامي (Capstone)</span>
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
