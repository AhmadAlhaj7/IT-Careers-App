import type { ReactNode, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: ReactNode;
  error?: string;
  hint?: string;
  wrapperClassName?: string;
};

export function Textarea({ label, error, hint, className, wrapperClassName, id, rows = 3, ...rest }: TextareaProps) {
  const field = (
    <textarea
      id={id}
      rows={rows}
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
