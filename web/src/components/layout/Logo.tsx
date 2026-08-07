type LogoProps = {
  size?: number;
  className?: string;
};

// Signature mark: two incomplete circles — one dark, one in the brand orange. The inner
// ring spins clockwise into place, holds, then the outer ring spins counter-clockwise into
// place and holds — alternating forever (see .logo-inner/.logo-outer in globals.css).
export function Logo({ size = 32, className }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" role="img" aria-hidden="true" className={className}>
      <g transform="translate(100, 100)">
        <g className="logo-outer">
          <path d="M 0 -62 A 62 62 0 1 1 -43 -43" fill="none" stroke="#1a1a1a" strokeWidth="9" strokeLinecap="round" />
        </g>
        <g className="logo-inner">
          <path d="M 0 34 A 34 34 0 1 1 24 -24" fill="none" stroke="#E8764A" strokeWidth="9" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}
