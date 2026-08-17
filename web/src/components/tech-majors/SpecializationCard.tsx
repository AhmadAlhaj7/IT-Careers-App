import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { paletteFor } from "@/lib/cardPalette";
import { DEMAND_LABELS } from "@/lib/specializationLabels";
import { localize } from "@/lib/localize";
import type { Locale } from "@/lib/i18n/locale";
import type { SpecializationSummary } from "@/lib/types";

type SpecializationCardProps = {
  specialization: SpecializationSummary;
  locale: Locale;
  exploreMoreLabel: string;
  readMinutesSuffix: string;
};

// Same visual language as RoadmapCard (tinted dotted-texture image box, paletteFor tint/accent)
// but simpler — no nested interactive elements, so none of RoadmapCard's prevent-default
// handling is needed; the whole card is just one plain Link.
export function SpecializationCard({ specialization, locale, exploreMoreLabel, readMinutesSuffix }: SpecializationCardProps) {
  const { tint, accent } = paletteFor(specialization.slug);

  return (
    <Link
      href={`/tech-majors/${specialization.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl bg-white p-3 shadow-xl shadow-neutral-900/10 transition active:scale-[0.98] hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-neutral-900/15"
    >
      <div
        className="relative aspect-[4/3] overflow-hidden rounded-2xl"
        style={{
          backgroundColor: tint,
          backgroundImage: "radial-gradient(rgba(28,27,25,0.1) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      >
        {specialization.coverImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- admin-supplied external URLs
          <img
            src={specialization.coverImageUrl}
            alt=""
            loading="lazy"
            className="h-full w-full object-contain p-4 transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-2xl bg-white p-4 shadow-md shadow-neutral-900/20">
              <Logo size={40} />
            </div>
          </div>
        )}

        <span
          className="absolute top-3 start-3 rounded-full border border-neutral-900/5 bg-white/90 px-2.5 py-1 text-[11px] font-semibold"
          style={{ color: accent }}
        >
          {DEMAND_LABELS[specialization.demandLevel][locale]}
        </span>
      </div>

      <div className="flex items-start justify-between gap-2 px-2 pt-4">
        <h3 className="font-semibold text-neutral-900">{localize(specialization.name, locale)}</h3>
      </div>

      <p className="line-clamp-2 px-2 pt-1 text-sm leading-[1.6] text-neutral-500">{localize(specialization.cardSentence, locale)}</p>

      <div className="mt-auto flex items-center justify-between gap-2 px-2 pt-4 pb-1">
        <span className="text-sm font-medium text-neutral-700 transition group-hover:text-[#0F6E56]">{exploreMoreLabel}</span>
        <span className="text-xs text-neutral-400">
          {specialization.estimatedReadMinutes} {readMinutesSuffix}
        </span>
      </div>
    </Link>
  );
}
