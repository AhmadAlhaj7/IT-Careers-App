import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: ReactNode;
  error?: string;
  hint?: string;
  wrapperClassName?: string;
};

// The one styled text-input shell for the whole app — previously every <input> was a
// hand-typed "rounded-md border border-neutral-300 px-3 py-2 text-sm" with no focus-ring
// styling anywhere (the app had zero focus-visible treatment on any control before this).
export function Input({ label, error, hint, className, wrapperClassName, id, ...rest }: InputProps) {
  const field = (
    <input
      id={id}
      className={cn(
        "w-full rounded-control border px-3 py-2 text-sm text-neutral-900 transition placeholder:text-neutral-400",
        "focus-visible:outline-none focus-visible:ring-2",
        error
          ? "border-danger focus-visible:border-danger focus-visible:ring-danger/30"
          : "border-neutral-300 focus-visible:border-primary focus-visible:ring-primary/30",
        className,
      )}
      {...rest}
    />
  );

  if (!label && !hint && !error) return field;

  return (
    <label className={cn("flex flex-col gap-1", wrapperClassName)}>
      {label && <span className="text-sm font-medium text-neutral-700">{label}</span>}
      {field}
      {error ? <span className="text-xs text-danger">{error}</span> : hint ? <span className="text-xs text-neutral-400">{hint}</span> : null}
    </label>
  );
}
