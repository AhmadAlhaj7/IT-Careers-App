import Link from "next/link";
import type { LocalizedText } from "@/lib/types";

type SidebarPhase = {
  orderIndex: number;
  title: LocalizedText;
};

type PhaseSidebarProps = {
  roadmapSlug: string;
  phases: SidebarPhase[];
  currentOrderIndex: number;
};

export function PhaseSidebar({ roadmapSlug, phases, currentOrderIndex }: PhaseSidebarProps) {
  return (
    <nav className="flex shrink-0 flex-row gap-1 overflow-x-auto lg:w-56 lg:flex-col lg:overflow-visible">
      {phases.map((phase) => {
        const isActive = phase.orderIndex === currentOrderIndex;
        return (
          <Link
            key={phase.orderIndex}
            href={`/roadmaps/${roadmapSlug}/phases/${phase.orderIndex}`}
            className={
              isActive
                ? "shrink-0 rounded-md bg-[#0F6E56]/10 px-3 py-2 text-sm font-medium whitespace-nowrap text-[#0F6E56]"
                : "shrink-0 rounded-md px-3 py-2 text-sm whitespace-nowrap text-neutral-600 hover:bg-neutral-50"
            }
          >
            <span className="text-xs text-neutral-400">{phase.orderIndex}</span> {phase.title.ar}
          </Link>
        );
      })}
    </nav>
  );
}
