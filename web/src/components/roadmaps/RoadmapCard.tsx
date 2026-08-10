"use client";

import Link from "next/link";
import { BuyButton } from "./BuyButton";
import { Logo } from "@/components/layout/Logo";
import type { Locale } from "@/lib/i18n/locale";
import type { LocalizedText } from "@/lib/types";

type RoadmapCardProps = {
  id: string;
  slug: string;
  title: LocalizedText;
  description: LocalizedText | null;
  locale: Locale;
  price: number;
  paddlePriceId: string | null;
  imageUrl: string | null;
  level: LocalizedText | null;
  phaseCount: number;
  isEnrolled: boolean;
  completedPhaseCount: number;
  userId: string | null;
  buyNowLabel: string;
  discoverMoreLabel: string;
  continueLabel: string;
  ownedLabel: string;
  phasesLabel: string;
};

// A small fixed palette, picked deterministically from the slug so a given roadmap always
// gets the same tint/accent regardless of list order — purely cosmetic variety between cards,
// not stored data (see the redesign plan's "explicit scope trims").
const CARD_PALETTE = [
  { tint: "#EEF3F1", accent: "#0F6E56" },
  { tint: "#F1EEF8", accent: "#5B3FC4" },
  { tint: "#F7EFE9", accent: "#E8764A" },
] as const;

function paletteFor(slug: string) {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return CARD_PALETTE[hash % CARD_PALETTE.length];
}

// Whole card navigates to the roadmap page; the Buy now button is a nested interactive
// element, so its wrapper needs BOTH preventDefault (cancels the anchor's native
// navigate-on-click default action) and stopPropagation (stops Link's own click handler from
// still running client-side routing) — stopPropagation alone doesn't stop the anchor's
// default action, so checkout/sign-in used to open for an instant and then get navigated away
// from anyway. "Discover more" and the owned-state "Continue" pill are deliberately NOT
// separate links/handlers — styled like buttons but just let their click bubble up to the
// same card Link, since they go to the exact same place.
export function RoadmapCard({
  id,
  slug,
  title,
  description,
  locale,
  price,
  paddlePriceId,
  imageUrl,
  level,
  phaseCount,
  isEnrolled,
  completedPhaseCount,
  userId,
  buyNowLabel,
  discoverMoreLabel,
  continueLabel,
  ownedLabel,
  phasesLabel,
}: RoadmapCardProps) {
  const { tint, accent } = paletteFor(slug);
  const progressPercent = phaseCount > 0 ? Math.round((completedPhaseCount / phaseCount) * 100) : 0;

  return (
    <Link
      href={`/roadmaps/${slug}`}
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
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- admin-supplied external URLs, not a fixed set of domains next/image can allowlist
          <img
            src={imageUrl}
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

        {isEnrolled && (
          <span
            className="absolute top-3 end-3 rounded-full border border-neutral-900/5 bg-white/90 px-2.5 py-1 text-[11px] font-bold"
            style={{ color: accent }}
          >
            {ownedLabel}
          </span>
        )}
        <span className="absolute bottom-3 start-3 rounded-full border border-neutral-900/5 bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-neutral-600">
          {phaseCount} {phasesLabel}
        </span>
      </div>

      <div className="flex items-start justify-between gap-2 px-2 pt-4">
        <h3 className="font-semibold text-neutral-900">{title[locale]}</h3>
        {!isEnrolled && <span className="shrink-0 text-base font-bold text-[#0F6E56]">${price.toFixed(2)}</span>}
      </div>

      {description && <p className="line-clamp-2 px-2 pt-1 text-sm leading-[1.6] text-neutral-500">{description[locale]}</p>}

      {level && (
        <div className="flex flex-wrap gap-1.5 px-2 pt-2">
          <span className="rounded-lg bg-neutral-100 px-2.5 py-1 text-[11px] font-semibold text-neutral-600">
            {level[locale]}
          </span>
        </div>
      )}

      {isEnrolled && (
        <div className="px-2 pt-3">
          <div className="h-1.5 overflow-hidden rounded-full bg-neutral-100">
            <div className="h-full rounded-full bg-[#0F6E56]" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      )}

      <div className="flex gap-2 px-2 pt-4 pb-1">
        <span className="flex-1 rounded-xl border border-neutral-200 px-4 py-2.5 text-center text-sm font-medium text-neutral-700 transition active:scale-95 group-hover:border-[#0F6E56] group-hover:text-[#0F6E56]">
          {discoverMoreLabel}
        </span>

        {isEnrolled ? (
          <span className="flex-1 rounded-xl bg-[#0F6E56] px-4 py-2.5 text-center text-sm font-medium text-white transition active:scale-95">
            {continueLabel}
          </span>
        ) : (
          paddlePriceId && (
            <div
              className="flex-1"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
            >
              <BuyButton
                paddlePriceId={paddlePriceId}
                roadmapId={id}
                userId={userId}
                label={buyNowLabel}
                className="block w-full rounded-xl bg-[#E8764A] px-4 py-2.5 text-center text-sm font-medium text-white transition active:scale-95 hover:bg-[#d35f35] disabled:opacity-50 disabled:active:scale-100"
              />
            </div>
          )
        )}
      </div>
    </Link>
  );
}
