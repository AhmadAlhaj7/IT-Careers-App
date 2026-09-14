import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type CardPadding = "sm" | "md" | "lg";
export type CardShadow = "subtle" | "panel" | "card";
export type CardRadius = "panel" | "card";

const PADDING_CLASSES: Record<CardPadding, string> = {
  sm: "p-4",
  md: "p-5",
  lg: "p-8",
};

const SHADOW_CLASSES: Record<CardShadow, string> = {
  subtle: "shadow-subtle",
  panel: "shadow-panel",
  card: "shadow-card",
};

const RADIUS_CLASSES: Record<CardRadius, string> = {
  panel: "rounded-panel",
  card: "rounded-card",
};

// Exported so a non-<div> element that needs the same "white panel" look (most commonly a
// <form>, which can't be nested inside a wrapping Card without producing invalid/awkward
// markup) can apply the identical classes directly.
export function cardVariants(opts?: { padding?: CardPadding; shadow?: CardShadow; radius?: CardRadius; className?: string }): string {
  const { padding = "md", shadow = "panel", radius = "card", className } = opts ?? {};
  return cn("border border-neutral-100 bg-white", PADDING_CLASSES[padding], SHADOW_CLASSES[shadow], RADIUS_CLASSES[radius], className);
}

// The "white panel floating over the dotted background" pattern repeated by hand across the
// app — one shared primitive instead of retyping border/shadow/radius per component.
export function Card({
  padding = "md",
  shadow = "panel",
  radius = "card",
  className,
  children,
}: {
  padding?: CardPadding;
  shadow?: CardShadow;
  radius?: CardRadius;
  className?: string;
  children: ReactNode;
}) {
  return <div className={cardVariants({ padding, shadow, radius, className })}>{children}</div>;
}
