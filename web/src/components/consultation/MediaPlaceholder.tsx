import { cn } from "@/lib/cn";

// Every photo/video slot on the consultation page is unshot content — a clearly-marked
// placeholder here beats guessing at fake imagery, and keeps it obvious what still needs
// to be swapped in before this page goes live.
export function MediaPlaceholder({
  label,
  aspect = "video",
  icon = "video",
  className,
}: {
  label: string;
  aspect?: "video" | "square" | "portrait";
  icon?: "video" | "photo";
  className?: string;
}) {
  const aspectClass = aspect === "video" ? "aspect-video" : aspect === "portrait" ? "aspect-[3/4]" : "aspect-square";

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-panel border-2 border-dashed border-neutral-300 bg-neutral-50 text-neutral-400",
        aspectClass,
        className,
      )}
    >
      {icon === "video" ? (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M10 9l5 3-5 3z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="8.5" cy="9.5" r="1.5" />
          <path d="M21 16l-5.5-5.5L4 21" />
        </svg>
      )}
      <span className="px-3 text-center text-xs font-medium">{label}</span>
    </div>
  );
}
