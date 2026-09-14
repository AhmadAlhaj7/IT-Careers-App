import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type BadgeVariant = "primary" | "accent" | "secondary" | "neutral" | "danger";
export type BadgeSize = "sm" | "md";

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent/10 text-accent",
  secondary: "bg-secondary/10 text-secondary",
  neutral: "bg-neutral-100 text-neutral-600",
  danger: "bg-danger/10 text-danger",
};

const SIZE_CLASSES: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-2.5 py-1 text-[11px]",
};

export function Badge({
  variant = "neutral",
  size = "md",
  className,
  children,
}: {
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span className={cn("inline-flex items-center rounded-tag font-semibold", VARIANT_CLASSES[variant], SIZE_CLASSES[size], className)}>
      {children}
    </span>
  );
}
