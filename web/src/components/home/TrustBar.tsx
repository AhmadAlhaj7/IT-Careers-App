import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { PublicStats } from "@/lib/types";

type TrustBarProps = {
  stats: PublicStats;
  dict: Dictionary["homePage"];
};

// All four numbers are real, computed server-side (see /api/stats) — no vanity placeholders.
// Early on these may look small (or zero); that's honest, not a bug.
export function TrustBar({ stats, dict }: TrustBarProps) {
  const cells = [
    { value: stats.roadmapCount, label: dict.trustRoadmaps, color: "text-neutral-900" },
    { value: stats.learnerCount, label: dict.trustLearners, color: "text-[#0F6E56]" },
    { value: stats.certificatesIssuedCount, label: dict.trustCertificates, color: "text-[#0F6E56]" },
    { value: `${Math.round(stats.phase1CompletionRate * 100)}%`, label: dict.trustPhase1, color: "text-[#E8764A]" },
  ];

  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-neutral-100 bg-neutral-100 shadow-lg shadow-neutral-900/5 sm:grid-cols-4">
      {cells.map((cell) => (
        <div key={cell.label} className="bg-white px-4 py-6 text-center sm:px-6">
          <p dir="ltr" className={`font-mono text-2xl font-bold sm:text-3xl ${cell.color}`}>
            {cell.value}
          </p>
          <p className="mt-1 text-xs text-neutral-500 sm:text-sm">{cell.label}</p>
        </div>
      ))}
    </div>
  );
}
