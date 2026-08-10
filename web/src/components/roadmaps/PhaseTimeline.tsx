import Link from "next/link";
import type { Locale } from "@/lib/i18n/locale";
import type { PhaseSummary } from "@/lib/types";

type PhaseTimelineProps = {
  roadmapSlug: string;
  phases: PhaseSummary[];
  locale: Locale;
  completedLabel: string;
  currentLabel: string;
  lockedLabel: string;
};

const STATUS_STYLE = {
  Completed: { dot: "bg-[#0F6E56] border-[#0F6E56] text-white", tag: "bg-[#0F6E56]/10 text-[#0F6E56]" },
  Current: { dot: "bg-white border-[#E8764A] text-[#E8764A]", tag: "bg-[#E8764A]/10 text-[#E8764A]" },
  Locked: { dot: "bg-white border-neutral-200 text-neutral-400", tag: "bg-neutral-100 text-neutral-500" },
} as const;

// Every row is a real Link, even for a Locked phase — the phase page itself already shows a
// clear "enroll to unlock" notice with its own buy CTA (LockedPhaseNotice), so there's no
// dead-end to avoid by disabling the click. No expand/collapse: the roadmap detail page's
// PhaseSummaryDto deliberately only carries counts, not individual resource/project titles
// (those live behind the phase page itself), so there's nothing extra a click-to-expand would
// reveal that isn't already shown here.
export function PhaseTimeline({ roadmapSlug, phases, locale, completedLabel, currentLabel, lockedLabel }: PhaseTimelineProps) {
  const statusLabel = { Completed: completedLabel, Current: currentLabel, Locked: lockedLabel };

  return (
    <div className="relative">
      <div className="absolute bottom-6 top-6 start-6 w-px bg-neutral-200" />
      <div className="flex flex-col gap-3">
        {phases.map((phase) => {
          const style = STATUS_STYLE[phase.status];
          const countParts = [
            phase.resourceCount > 0 ? `${phase.resourceCount}` : null,
            phase.projectCount > 0 ? `${phase.projectCount}` : null,
            phase.hasQuiz ? "✓" : null,
          ].filter(Boolean);

          return (
            <Link
              key={phase.orderIndex}
              href={`/roadmaps/${roadmapSlug}/phases/${phase.orderIndex}`}
              className="relative flex items-start gap-4 rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm shadow-neutral-900/5 transition hover:border-[#0F6E56]/30 hover:shadow-md active:scale-[0.99]"
            >
              <span
                className={`z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold ${style.dot}`}
              >
                {phase.orderIndex}
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-neutral-900">{phase.title[locale]}</h3>
                  {phase.tag && (
                    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${style.tag}`}>
                      {phase.tag[locale]}
                    </span>
                  )}
                  <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${style.tag}`}>
                    {statusLabel[phase.status]}
                  </span>
                </div>

                <p className="mt-1 line-clamp-2 text-sm text-neutral-500">{phase.summary[locale]}</p>

                {phase.skills.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {phase.skills.map((skill) => (
                      <span key={skill} dir="ltr" className="rounded-md bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-600">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {countParts.length > 0 && (
                <span dir="ltr" className="shrink-0 self-center text-xs font-medium text-neutral-400">
                  {countParts.join(" · ")}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
