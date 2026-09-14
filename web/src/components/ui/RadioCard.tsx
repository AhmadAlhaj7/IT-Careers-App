import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type RadioCardProps = {
  name: string;
  value: string;
  label: ReactNode;
  defaultChecked?: boolean;
  required?: boolean;
  disabled?: boolean;
  className?: string;
};

// A selectable-answer control styled as a bordered card, built on a visually-hidden native
// radio input so keyboard nav/form semantics stay correct. Replaces the literal unstyled
// browser <input type="radio"> previously used for every quiz/exam question option.
export function RadioCard({ name, value, label, defaultChecked, required, disabled, className }: RadioCardProps) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-panel border border-neutral-200 px-4 py-3 text-sm text-neutral-700 transition",
        "has-[:checked]:border-primary has-[:checked]:bg-primary-subtle has-[:checked]:text-primary",
        "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary/30",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        required={required}
        disabled={disabled}
        className="peer sr-only"
      />
      <span
        className={cn(
          "relative flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-neutral-300 transition peer-checked:border-primary",
          "after:h-2 after:w-2 after:rounded-full after:bg-primary after:opacity-0 after:transition peer-checked:after:opacity-100",
        )}
      />
      <span>{label}</span>
    </label>
  );
}
