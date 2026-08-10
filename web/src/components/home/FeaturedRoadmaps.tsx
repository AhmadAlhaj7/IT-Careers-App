import Link from "next/link";
import { RoadmapCard } from "@/components/roadmaps/RoadmapCard";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/locale";
import type { RoadmapSummary } from "@/lib/types";

type FeaturedRoadmapsProps = {
  roadmaps: RoadmapSummary[];
  locale: Locale;
  userId: string | null;
  dict: Dictionary;
};

const FEATURED_COUNT = 3;

// Featured = the top 3 by real enrollment count (falls back to the catalog's own slug order
// for zero-enrollment roadmaps), not an arbitrary slice — makes "which 3 to show" meaningful
// instead of just whatever happened to load first.
export function FeaturedRoadmaps({ roadmaps, locale, userId, dict }: FeaturedRoadmapsProps) {
  const featured = [...roadmaps]
    .sort((a, b) => Number(b.isMostPopular) - Number(a.isMostPopular))
    .slice(0, FEATURED_COUNT);

  return (
    <section className="mt-20">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-wide text-[#0F6E56]">{dict.homePage.featuredEyebrow}</p>
          <h2 className="mt-2 text-2xl font-bold text-neutral-900 sm:text-3xl">{dict.homePage.featuredTitle}</h2>
        </div>
        <Link href="/roadmaps" className="text-sm font-semibold text-[#0F6E56] hover:text-[#0c5945]">
          {dict.homePage.featuredViewAll}
        </Link>
      </div>

      {featured.length === 0 ? (
        <p className="text-sm text-neutral-500">{dict.homePage.featuredEmpty}</p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((roadmap) => (
            <RoadmapCard
              key={roadmap.slug}
              id={roadmap.id}
              slug={roadmap.slug}
              title={roadmap.title}
              description={roadmap.description}
              locale={locale}
              price={roadmap.price}
              paddlePriceId={roadmap.paddlePriceId}
              imageUrl={roadmap.imageUrl}
              level={roadmap.level}
              phaseCount={roadmap.phaseCount}
              isEnrolled={roadmap.isEnrolled}
              completedPhaseCount={roadmap.completedPhaseCount}
              isMostPopular={roadmap.isMostPopular}
              userId={userId}
              buyNowLabel={dict.roadmapsPage.buyNow}
              discoverMoreLabel={dict.roadmapsPage.discoverMore}
              continueLabel={dict.roadmapsPage.continue}
              ownedLabel={dict.roadmapsPage.owned}
              phasesLabel={dict.roadmapsPage.phases}
              popularLabel={dict.roadmapsPage.popularBadge}
            />
          ))}
        </div>
      )}
    </section>
  );
}
