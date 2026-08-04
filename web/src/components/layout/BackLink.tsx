import Link from "next/link";

type BackLinkProps = {
  href: string;
  label: string;
};

export function BackLink({ href, label }: BackLinkProps) {
  return (
    <Link href={href} className="inline-block text-sm text-neutral-500 hover:text-[#0F6E56]">
      ← {label}
    </Link>
  );
}
