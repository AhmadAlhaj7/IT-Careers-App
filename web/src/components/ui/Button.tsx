import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Spinner } from "./Spinner";

export type ButtonVariant = "primary" | "accent" | "secondary" | "outline" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-control font-semibold transition active:scale-95 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white shadow-subtle hover:bg-primary-hover focus-visible:ring-primary/40",
  accent: "bg-accent text-white shadow-subtle hover:bg-accent-hover focus-visible:ring-accent/40",
  secondary: "bg-secondary text-white shadow-subtle hover:bg-secondary-hover focus-visible:ring-secondary/40",
  outline:
    "border border-neutral-200 bg-white text-neutral-700 hover:border-primary hover:text-primary focus-visible:ring-primary/30",
  ghost: "text-neutral-600 hover:bg-neutral-100 focus-visible:ring-neutral-300",
  danger: "border border-danger/30 text-danger hover:bg-danger-subtle focus-visible:ring-danger/30",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3 text-sm",
};

// Exported so non-<button> elements that need identical styling (e.g. a <Link> or <span>
// standing in for a button inside a larger interactive card) can apply the same classes
// without wrapping in an actual <button>.
export function buttonVariants(opts?: { variant?: ButtonVariant; size?: ButtonSize; className?: string }): string {
  const { variant = "primary", size = "md", className } = opts ?? {};
  return cn(BASE, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className);
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children?: ReactNode;
};

export function Button({ variant = "primary", size = "md", loading = false, disabled, className, children, ...rest }: ButtonProps) {
  return (
    <button className={buttonVariants({ variant, size, className })} disabled={disabled || loading} {...rest}>
      {loading && <Spinner size="sm" />}
      {children}
    </button>
  );
}
