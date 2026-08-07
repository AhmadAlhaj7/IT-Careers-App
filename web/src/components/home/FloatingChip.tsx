import type { CSSProperties } from "react";

type FloatingChipProps = {
  label: string;
  className: string;
  wrapperClassName: string;
  rotate: number;
  duration: string;
  delay: string;
};

// Small decorative floating pill, styled after the reference (Miro's floating collaborator
// badges). Purely decorative — hidden on small screens since there's no side margin to float
// them in without overlapping the hero text.
export function FloatingChip({ label, className, wrapperClassName, rotate, duration, delay }: FloatingChipProps) {
  const style = {
    "--chip-rotate": `${rotate}deg`,
    "--chip-duration": duration,
    "--chip-delay": delay,
  } as CSSProperties;

  return (
    <div className={`floating-chip pointer-events-none absolute hidden md:block ${wrapperClassName}`} style={style}>
      <span className={`inline-flex items-center gap-1 rounded-full px-4 py-1.5 text-sm font-semibold shadow-md ${className}`}>
        {label}
      </span>
    </div>
  );
}
