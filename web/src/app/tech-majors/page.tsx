import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/locale";
import { listSpecializations } from "@/lib/api";
import { BackLink } from "@/components/layout/BackLink";
import { TechMajorsGrid } from "@/components/tech-majors/TechMajorsGrid";

export default async function TechMajorsPage() {
  const [locale, specializations] = await Promise.all([getLocale(), listSpecializations()]);
  const dict = getDictionary(locale);
  const t = dict.techMajorsPage;

  return (
    <div className="mx-auto w-full max-w-7xl px-3 py-10 sm:px-6 sm:py-16">
      <BackLink href="/" label={dict.nav.home} />

      <div className="mt-4 text-center">
        <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">{t.title}</h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-[1.8] text-neutral-600 sm:text-base">{t.intro}</p>
      </div>

      <TechMajorsGrid
        specializations={specializations}
        locale={locale}
        filterAllLabel={t.filterAll}
        countSuffix={t.countSuffix}
        exploreMoreLabel={t.exploreMore}
        readMinutesSuffix={t.readMinutesSuffix}
        emptyLabel={t.empty}
        emptyFilteredLabel={t.emptyFiltered}
      />
    </div>
  );
}
