"use client";

import Link from "next/link";
import { BuyButton } from "./BuyButton";
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
  userId: string | null;
  buyNowLabel: string;
  discoverMoreLabel: string;
};

// Whole card navigates to the roadmap page; the Buy now button is a nested interactive
// element that stops the click from bubbling to the wrapping Link, so it can trigger
// checkout directly from the catalog without a full navigation first. "Discover more" is
// deliberately NOT a separate link/handler — it's styled like a button but just lets its
// click bubble up to the same card Link, since it goes to the exact same place.
export function RoadmapCard({
  id,
  slug,
  title,
  description,
  locale,
  price,
  paddlePriceId,
  imageUrl,
  userId,
  buyNowLabel,
  discoverMoreLabel,
}: RoadmapCardProps) {
  return (
    <Link
      href={`/roadmaps/${slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl bg-white p-3 shadow-xl shadow-neutral-900/10 transition active:scale-[0.98] hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-neutral-900/15"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#F8F7F3] p-4">
        {imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element -- admin-supplied external URLs, not a fixed set of domains next/image can allowlist
          <img
            src={imageUrl}
            alt=""
            loading="lazy"
            className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
          />
        )}
      </div>

      <div className="flex items-start justify-between gap-2 px-2 pt-4">
        <h3 className="font-semibold text-neutral-900">{title[locale]}</h3>
        <span className="shrink-0 text-base font-bold text-[#0F6E56]">${price.toFixed(2)}</span>
      </div>

      {description && <p className="line-clamp-2 px-2 pt-1 text-sm leading-[1.6] text-neutral-500">{description[locale]}</p>}

      <div className="flex gap-2 px-2 pt-4 pb-1">
        <span className="flex-1 rounded-xl border border-neutral-200 px-4 py-2.5 text-center text-sm font-medium text-neutral-700 transition active:scale-95 group-hover:border-[#0F6E56] group-hover:text-[#0F6E56]">
          {discoverMoreLabel}
        </span>

        {paddlePriceId && (
          <div className="flex-1" onClick={(event) => event.stopPropagation()}>
            <BuyButton
              paddlePriceId={paddlePriceId}
              roadmapId={id}
              userId={userId}
              label={buyNowLabel}
              className="block w-full rounded-xl bg-[#E8764A] px-4 py-2.5 text-center text-sm font-medium text-white transition active:scale-95 hover:bg-[#d35f35] disabled:opacity-50 disabled:active:scale-100"
            />
          </div>
        )}
      </div>
    </Link>
  );
}
