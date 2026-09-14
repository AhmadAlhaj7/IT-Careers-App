"use client";

import type { ChangeEvent } from "react";
import { cn } from "@/lib/cn";

type SwitchProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  name?: string;
  id?: string;
  disabled?: boolean;
  label?: string;
  className?: string;
  /** Associates the underlying checkbox with a <form> elsewhere in the DOM, same as the
   * native `form` attribute — needed when the switch lives outside the form it submits with. */
  form?: string;
};

// One shared toggle for the whole app — previously reinvented twice (an inline-`style`
// hand-rolled version in RoadmapSettingsTab, a proper Tailwind peer-checked version in
// SpecializationSectionsFieldset). This adopts the peer-checked pattern as canonical since
// it was already correct. Works both controlled (`checked`+`onCheckedChange`, for client
// state driving a later form submit) and uncontrolled (`defaultChecked`, for a plain
// checkbox living directly inside a Server Action <form>) — same real <input
// type="checkbox"> underneath either way, so native form submission just works.
export function Switch({ checked, defaultChecked, onCheckedChange, name, id, disabled, label, className, form }: SwitchProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => onCheckedChange?.(event.target.checked);

  const control = (
    <span className="relative inline-flex shrink-0 items-center">
      <input
        type="checkbox"
        id={id}
        name={name}
        form={form}
        disabled={disabled}
        className="peer sr-only"
        {...(checked !== undefined ? { checked, onChange: handleChange } : { defaultChecked, onChange: handleChange })}
      />
      <span className="h-[25px] w-[44px] rounded-tag bg-neutral-200 transition peer-checked:bg-primary peer-disabled:opacity-50" />
      <span className="absolute start-[3px] h-[19px] w-[19px] rounded-tag bg-white shadow transition peer-checked:translate-x-[19px] rtl:peer-checked:-translate-x-[19px]" />
    </span>
  );

  if (!label) return control;

  return (
    <label className={cn("inline-flex cursor-pointer items-center gap-2.5", disabled && "cursor-not-allowed opacity-50", className)}>
      {control}
      <span className="text-sm text-neutral-700">{label}</span>
    </label>
  );
}
