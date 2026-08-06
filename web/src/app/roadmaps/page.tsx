import { auth } from "@clerk/nextjs/server";
import { listRoadmaps } from "@/lib/api";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/locale";
import { BackLink } from "@/components/layout/BackLink";
import { RoadmapCard } from "@/components/roadmaps/RoadmapCard";

export default async function RoadmapsPage() {
  const [locale, { userId }] = await Promise.all([getLocale(), auth()]);
  const dict = getDictionary(locale);
  const roadmaps = await listRoadmaps();

  return (
    <div className="mx-auto max-w-5xl px-3 py-10 sm:px-6 sm:py-16">
      <BackLink href="/" label={dict.nav.home} />
      <h1 className="mt-4 text-2xl font-bold text-neutral-900 sm:text-3xl">{dict.roadmapsPage.title}</h1>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {roadmaps.length === 0 && <p className="text-sm text-neutral-500">{dict.roadmapsPage.empty}</p>}
        {roadmaps.map((roadmap) => (
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
            userId={userId}
            buyNowLabel={dict.roadmapsPage.buyNow}
            discoverMoreLabel={dict.roadmapsPage.discoverMore}
          />
        ))}
      </div>
    </div>
  );
}
