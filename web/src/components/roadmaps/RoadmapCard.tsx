"use client";

import Link from "next/link";
import { BuyButton } from "./BuyButton";
import type { Locale } from "@/lib/i18n/locale";
import type { LocalizedText } from "@/lib/types";

type RoadmapCardProps = {
  id: string;
  slug: string;
  title: LocalizedText;
  locale: Locale;
  price: number;
  paddlePriceId: string | null;
  imageUrl: string | null;
  userId: string | null;
  buyNowLabel: string;
};

// Whole card navigates to the roadmap page; the Buy now button is a nested interactive
// element that stops the click from bubbling to the wrapping Link, so it can trigger
// checkout directly from the catalog without a full navigation first.
export function RoadmapCard({ id, slug, title, locale, price, paddlePriceId, imageUrl, userId, buyNowLabel }: RoadmapCardProps) {
  return (
    <Link
      href={`/roadmaps/${slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl bg-white p-3 shadow-lg shadow-neutral-900/5 transition hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white p-4">
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

      <div className="flex items-center justify-between gap-2 px-2 pt-4">
        <h3 className="font-semibold text-neutral-900">{title[locale]}</h3>
        <span className="shrink-0 rounded-lg bg-[#0F6E56] px-3 py-1 text-xs font-medium text-white">${price.toFixed(2)}</span>
      </div>

      {paddlePriceId && (
        <div className="px-2 pt-4 pb-1" onClick={(event) => event.stopPropagation()}>
          <BuyButton
            paddlePriceId={paddlePriceId}
            roadmapId={id}
            userId={userId}
            label={buyNowLabel}
            className="block w-full rounded-xl bg-[#E8764A] px-4 py-2.5 text-center text-sm font-medium text-white transition hover:bg-[#d35f35] disabled:opacity-50"
          />
        </div>
      )}
    </Link>
  );
}
