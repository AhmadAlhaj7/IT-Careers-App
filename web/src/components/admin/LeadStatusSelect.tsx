"use client";

import { useState, useTransition } from "react";
import { changeLeadStatusAction } from "@/app/admin/actions";
import { LEAD_STATUSES, type LeadKind } from "@/lib/leads";
import type { LeadStatus } from "@/lib/types";
import { cn } from "@/lib/cn";

// Saves on change — moving a lead along the pipeline is a one-click action, no separate Save button.
// The select shows the new stage straight away and snaps back if the API refuses it.
export function LeadStatusSelect({ kind, id, status }: { kind: LeadKind; id: string; status: LeadStatus }) {
  const [value, setValue] = useState(status);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const current = LEAD_STATUSES.find((s) => s.value === value) ?? LEAD_STATUSES[0];

  function handleChange(next: LeadStatus) {
    const previous = value;
    setValue(next);
    setError(null);

    startTransition(async () => {
      const result = await changeLeadStatusAction(kind, id, next);
      if (result.message) {
        setValue(previous);
        setError(result.message);
      }
    });
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <select
        value={value}
        disabled={pending}
        onChange={(event) => handleChange(event.target.value as LeadStatus)}
        aria-label="حالة الطلب"
        className={cn(
          "cursor-pointer rounded-full border-0 px-3 py-1 text-xs font-semibold transition focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:outline-none disabled:opacity-60",
          current.className,
        )}
      >
        {LEAD_STATUSES.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}
