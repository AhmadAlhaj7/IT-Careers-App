import type { CSSProperties } from "react";

type GuideArrowProps = {
  label: string;
  flip?: boolean;
  className?: string;
  duration?: string;
  delay?: string;
};

// Hand-drawn-style pointer used on the home hero to nudge undecided visitors toward one of
// the two CTAs. `flip` mirrors both the arrow's curve and the text alignment for the button
// on the opposite side — hardcoded Arabic like the floating Think/Act/Win chips, not part of
// the i18n dictionary, since it's a purely decorative flourish rather than page content.
// Reuses the same .floating-chip drift animation as those chips for a consistent hero feel.
export function GuideArrow({ label, flip = false, className = "", duration = "6s", delay = "0s" }: GuideArrowProps) {
  const style = {
    "--chip-rotate": "0deg",
    "--chip-duration": duration,
    "--chip-delay": delay,
  } as CSSProperties;

  return (
    <div
      className={`floating-chip pointer-events-none absolute hidden flex-col text-neutral-800 md:flex ${flip ? "items-end" : "items-start"} ${className}`}
      style={style}
    >
      <svg
        width="20"
        height="30"
        viewBox="0 0 50 80"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={flip ? { transform: "scaleX(-1)" } : undefined}
      >
        <path d="M8 72 C14 46 26 24 42 10 M42 10 L31 17 M42 10 L47 25" />
      </svg>
      <span className="mt-0.5 text-xs font-bold whitespace-nowrap">{label}</span>
    </div>
  );
}
