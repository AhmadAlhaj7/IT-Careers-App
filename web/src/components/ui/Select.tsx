import type { ReactNode, SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: ReactNode;
  error?: string;
  hint?: string;
  wrapperClassName?: string;
  children: ReactNode;
};

// Native <select> arrows can't be restyled directly, so this hides the native one
// (appearance-none) and draws a matching chevron on top — every dropdown in the app
// (category, demand level, status, phase type, ...) was previously a totally unstyled
// browser default with no visual consistency with the rest of the form.
export function Select({ label, error, hint, className, wrapperClassName, id, children, ...rest }: SelectProps) {
  const field = (
    <div className="relative">
      <select
        id={id}
        className={cn(
          "w-full appearance-none rounded-control border bg-white px-3 py-2 pe-9 text-sm text-neutral-900 transition",
          "focus-visible:outline-none focus-visible:ring-2",
          error
            ? "border-danger focus-visible:border-danger focus-visible:ring-danger/30"
            : "border-neutral-300 focus-visible:border-primary focus-visible:ring-primary/30",
          className,
        )}
        {...rest}
      >
        {children}
      </select>
      <ChevronDown size={16} className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-neutral-400" />
    </div>
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
