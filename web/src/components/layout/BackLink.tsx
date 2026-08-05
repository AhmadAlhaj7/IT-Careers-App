import Link from "next/link";

type BackLinkProps = {
  href: string;
  label: string;
};

// Arrow is an SVG (not a "←" glyph) with an rtl: rotation so it visually points toward
// "back" correctly in both directions — a literal arrow character doesn't flip with dir.
export function BackLink({ href, label }: BackLinkProps) {
  return (
    <Link href={href} className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-[#0F6E56]">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rtl:rotate-180">
        <path d="M19 12H5M11 18l-6-6 6-6" />
      </svg>
      {label}
    </Link>
  );
}
