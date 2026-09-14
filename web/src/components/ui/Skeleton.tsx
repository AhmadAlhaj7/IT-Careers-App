import { cn } from "@/lib/cn";

// A generic loading placeholder block — width/height/radius come entirely from the
// className passed in, this just supplies the shimmer treatment.
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-panel bg-neutral-100", className)} />;
}
