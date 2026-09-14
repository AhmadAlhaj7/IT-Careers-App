import { cn } from "@/lib/cn";

const SIZE_CLASSES = {
  sm: "h-3.5 w-3.5 border-2",
  md: "h-5 w-5 border-2",
} as const;

export function Spinner({ size = "md", className }: { size?: keyof typeof SIZE_CLASSES; className?: string }) {
  return (
    <span
      role="status"
      aria-label="جارٍ التحميل"
      className={cn("inline-block animate-spin rounded-full border-current border-t-transparent", SIZE_CLASSES[size], className)}
    />
  );
}
