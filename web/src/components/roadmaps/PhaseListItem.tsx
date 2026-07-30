import Link from "next/link";
import type { LocalizedText } from "@/lib/types";

type PhaseListItemProps = {
  roadmapSlug: string;
  orderIndex: number;
  title: LocalizedText;
};

export function PhaseListItem({ roadmapSlug, orderIndex, title }: PhaseListItemProps) {
  return (
    <Link
      href={`/roadmaps/${roadmapSlug}/phases/${orderIndex}`}
      className="flex items-center gap-4 rounded-lg border border-neutral-200 px-5 py-4 transition-colors hover:border-[#0F6E56]"
    >
      <span className="text-sm text-neutral-400">{orderIndex}</span>
      <span className="font-medium text-neutral-900">{title.ar}</span>
    </Link>
  );
}
