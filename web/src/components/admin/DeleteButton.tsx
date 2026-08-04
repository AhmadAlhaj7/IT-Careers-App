"use client";

import { useActionState } from "react";

type ActionState = { message?: string };

const initialState: ActionState = {};

type DeleteButtonProps = {
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  hiddenFields: Record<string, string>;
  confirmMessage: string;
  label?: string;
};

// Shared by every "delete" control in the admin panel (roadmap, phase, resource, project) —
// deletion is irreversible, so this always confirms first via a plain browser dialog before
// the Server Action ever fires. Good enough for a single-admin internal tool.
export function DeleteButton({ action, hiddenFields, confirmMessage, label = "حذف" }: DeleteButtonProps) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form
      action={formAction}
      onSubmit={(event) => {
        if (!window.confirm(confirmMessage)) {
          event.preventDefault();
        }
      }}
    >
      {Object.entries(hiddenFields).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
      <button
        type="submit"
        disabled={pending}
        className="rounded-md border border-red-300 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
      >
        {pending ? "جارٍ الحذف..." : label}
      </button>
      {state.message && <p className="mt-1 text-xs text-red-600">{state.message}</p>}
    </form>
  );
}
