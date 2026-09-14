import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Merges conditional class lists AND resolves conflicting Tailwind utilities (e.g. a
// consumer passing className="rounded-md" into a component that already applies
// "rounded-xl" — plain string concatenation would emit both and let source order decide
// the winner; this keeps the last one that's actually meant to win).
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
