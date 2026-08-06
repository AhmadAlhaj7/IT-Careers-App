import Link from "next/link";
import { listRoadmaps } from "@/lib/api";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/locale";
import { BackLink } from "@/components/layout/BackLink";

export default async function RoadmapsPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const roadmaps = await listRoadmaps();

  return (
    <div className="mx-auto max-w-5xl px-3 py-10 sm:px-6 sm:py-16">
      <BackLink href="/" label={dict.nav.home} />
      <h1 className="mt-4 text-2xl font-bold text-neutral-900 sm:text-3xl">{dict.roadmapsPage.title}</h1>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {roadmaps.length === 0 && <p className="text-sm text-neutral-500">{dict.roadmapsPage.empty}</p>}
        {roadmaps.map((roadmap) => (
          <Link
            key={roadmap.slug}
            href={`/roadmaps/${roadmap.slug}`}
            className="group flex items-center justify-between rounded-2xl border border-neutral-100 bg-white px-5 py-4 shadow-sm shadow-neutral-900/5 transition hover:border-[#0F6E56] hover:shadow-md"
          >
            <span className="font-medium text-neutral-900">{roadmap.title[locale]}</span>
            <span className="rounded-lg bg-neutral-50 px-3 py-1 text-sm font-medium text-[#0F6E56] shadow-sm ring-1 ring-neutral-100 group-hover:ring-[#0F6E56]/30">
              ${roadmap.price.toFixed(2)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
