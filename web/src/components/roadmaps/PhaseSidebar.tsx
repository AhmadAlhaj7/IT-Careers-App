import Link from "next/link";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/i18n/locale";
import type { LocalizedText } from "@/lib/types";

type SidebarPhase = {
  orderIndex: number;
  title: LocalizedText;
};

type PhaseSidebarProps = {
  roadmapSlug: string;
  phases: SidebarPhase[];
  currentOrderIndex: number;
  locale: Locale;
};

export function PhaseSidebar({ roadmapSlug, phases, currentOrderIndex, locale }: PhaseSidebarProps) {
  return (
    <nav className="flex shrink-0 flex-row gap-1 overflow-x-auto lg:w-56 lg:flex-col lg:overflow-visible">
      {phases.map((phase) => {
        const isActive = phase.orderIndex === currentOrderIndex;
        return (
          <Link
            key={phase.orderIndex}
            href={`/roadmaps/${roadmapSlug}/phases/${phase.orderIndex}`}
            className={cn(
              "shrink-0 rounded-control px-3 py-2 text-sm whitespace-nowrap transition",
              isActive ? "bg-primary/10 font-medium text-primary" : "text-neutral-600 hover:bg-neutral-50",
            )}
          >
            <span className="text-xs text-neutral-400">{phase.orderIndex}</span> {phase.title[locale]}
          </Link>
        );
      })}
    </nav>
  );
}
