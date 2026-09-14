import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { listRoadmaps } from "@/lib/api";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/locale";
import { RoadmapCard } from "@/components/roadmaps/RoadmapCard";
import { buttonVariants } from "@/components/ui/Button";

export default async function DashboardPage() {
  const { userId } = await auth.protect();
  const [locale, roadmaps] = await Promise.all([getLocale(), listRoadmaps()]);
  const dict = getDictionary(locale);
  const t = dict.dashboardPage;

  const enrolledRoadmaps = roadmaps.filter((roadmap) => roadmap.isEnrolled);

  return (
    <div className="mx-auto w-full max-w-7xl px-3 py-10 sm:px-6 sm:py-16">
      <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">{t.title}</h1>
      <p className="mt-2 text-sm text-neutral-500">{t.subtitle}</p>

      <div className="mt-8">
        <h2 className="text-lg font-bold text-neutral-900">{t.myRoadmapsTitle}</h2>

        {enrolledRoadmaps.length === 0 ? (
          <div className="mt-4 rounded-panel border border-dashed border-neutral-200 bg-white p-8 text-center">
            <p className="font-semibold text-neutral-800">{t.emptyTitle}</p>
            <p className="mt-1 text-sm text-neutral-500">{t.emptyBody}</p>
            <Link href="/roadmaps" className={buttonVariants({ variant: "accent", className: "mt-5 inline-block" })}>
              {t.browseCta}
            </Link>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {enrolledRoadmaps.map((roadmap) => (
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
                signInLabel={dict.roadmapDetailPage.signInToBuy}
                discoverMoreLabel={dict.roadmapsPage.discoverMore}
                continueLabel={dict.roadmapsPage.continue}
                ownedLabel={dict.roadmapsPage.owned}
                phasesLabel={dict.roadmapsPage.phases}
                popularLabel={dict.roadmapsPage.popularBadge}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
