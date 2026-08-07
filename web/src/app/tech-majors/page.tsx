import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/locale";
import { BackLink } from "@/components/layout/BackLink";

export default async function TechMajorsPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto max-w-5xl px-3 py-10 sm:px-6 sm:py-16">
      <BackLink href="/" label={dict.nav.home} />
      <h1 className="mt-4 text-2xl font-bold text-neutral-900 sm:text-3xl">{dict.techMajorsPage.title}</h1>
      <p className="mt-3 max-w-2xl text-sm leading-[1.8] text-neutral-600 sm:text-base">{dict.techMajorsPage.intro}</p>
    </div>
  );
}
