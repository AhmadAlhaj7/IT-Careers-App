import type { ButtonHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

export type IconButtonVariant = "ghost" | "outline";
export type IconButtonSize = "sm" | "md";

const VARIANT_CLASSES: Record<IconButtonVariant, string> = {
  ghost: "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900",
  outline: "border border-neutral-200 text-neutral-600 hover:border-primary hover:text-primary",
};

const SIZE_CLASSES: Record<IconButtonSize, { button: string; icon: number }> = {
  sm: { button: "h-8 w-8", icon: 16 },
  md: { button: "h-10 w-10", icon: 20 },
};

type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  icon: LucideIcon;
  label: string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
};

// A consistent circular hit target for icon-only actions — replaces the hand-drawn
// hamburger/close SVGs and admin row-action icons, each of which previously had its own
// ad hoc sizing/hover treatment. `label` is required, not optional: an icon-only button
// with no accessible name is unusable for screen-reader users, so there's no way to skip it.
export function IconButton({ icon: Icon, label, variant = "ghost", size = "md", className, ...rest }: IconButtonProps) {
  const { button, icon } = SIZE_CLASSES[size];
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex items-center justify-center rounded-control transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-50",
        button,
        VARIANT_CLASSES[variant],
        className,
      )}
      {...rest}
    >
      <Icon size={icon} strokeWidth={2} />
    </button>
  );
}
