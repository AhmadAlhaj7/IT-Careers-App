import { useId } from "react";
import { LOGO_GRADIENT_FROM, LOGO_GRADIENT_TO } from "@/lib/theme";

type LogoProps = {
  size?: number;
  className?: string;
};

// Signature mark: two incomplete circles — one dark, one in the brand gradient. The inner ring
// spins clockwise into place, then the outer ring spins counter-clockwise into place — a
// one-time entrance that plays on mount and settles (see .logo-inner/.logo-outer in
// globals.css), not a persistent loop.
export function Logo({ size = 32, className }: LogoProps) {
  // The mark renders many times on one page (nav, footer, every roadmap/certificate card) —
  // each instance needs its own gradient id, since SVG ids are global to the document.
  const gradientId = useId();

  return (
    <svg width={size} height={size} viewBox="0 0 200 200" role="img" aria-hidden="true" className={className}>
      <defs>
        {/* objectBoundingBox (SVG default) scales to each ring's own box, so the diagonal
            reads correctly no matter the rendered size — a fixed userSpace box wouldn't. */}
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={LOGO_GRADIENT_FROM} />
          <stop offset="100%" stopColor={LOGO_GRADIENT_TO} />
        </linearGradient>
      </defs>
      <g transform="translate(100, 100)">
        <g className="logo-outer">
          <path d="M 0 -62 A 62 62 0 1 1 -43 -43" fill="none" stroke="#1a1a1a" strokeWidth="9" strokeLinecap="round" />
        </g>
        <g className="logo-inner">
          <path d="M 0 34 A 34 34 0 1 1 24 -24" fill="none" stroke={`url(#${gradientId})`} strokeWidth="9" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}
