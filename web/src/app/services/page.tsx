import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { buttonVariants } from "@/components/ui/Button";
import { BackLink } from "@/components/layout/BackLink";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/locale";
import { servicesContent } from "@/lib/i18n/content/services";

// Same order as the packages in the content: consultation first, website second.
const PACKAGE_LINKS = ["/book-consultation", "/build-website"];

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = servicesContent[await getLocale()];
  return { title: meta.title, description: meta.description };
}

export default async function ServicesPage() {
  const locale = await getLocale();
  const t = servicesContent[locale];

  return (
    <div className="mx-auto w-full max-w-4xl px-3 py-10 sm:px-6 sm:py-16">
      <BackLink href="/" label={getDictionary(locale).nav.home} />

      <section className="mt-6 text-center">
        <h1 className="text-3xl leading-tight font-bold text-neutral-900 sm:text-4xl">
          {t.titleStart} <span className="text-accent">{t.titleAccent}</span>
          {t.titleEnd}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-[1.8] text-neutral-600">{t.subtitle}</p>
      </section>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {t.packages.map((pkg, index) => (
          <Card key={PACKAGE_LINKS[index]} padding="lg" shadow="panel" radius="card" className="flex flex-col">
            <p className="text-xs font-semibold text-neutral-400">{pkg.eyebrow}</p>
            <h2 className="mt-2 text-xl font-bold text-neutral-900">{pkg.title}</h2>
            <p className="mt-2 text-sm leading-[1.8] text-neutral-600">{pkg.description}</p>

            <ul className="mt-5 mb-8 flex flex-col gap-2.5">
              {pkg.points.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-neutral-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    ✓
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            <Link href={PACKAGE_LINKS[index]} className={buttonVariants({ variant: "accent", size: "lg", className: "mt-auto w-full" })}>
              {pkg.cta}
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
