import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { buttonVariants } from "@/components/ui/Button";
import { ScrollToSectionLink } from "@/components/ui/ScrollToSectionLink";
import { Accordion } from "@/components/ui/Accordion";
import { BackLink } from "@/components/layout/BackLink";
import { MediaPlaceholder } from "@/components/consultation/MediaPlaceholder";
import { ConsultationBookingForm } from "@/components/consultation/ConsultationBookingForm";
import { AboutMeSection } from "@/components/services/AboutMeSection";
import { NumberedCardGrid } from "@/components/services/NumberedCardGrid";
import { CheckList } from "@/components/services/CheckList";
import { getLocale } from "@/lib/i18n/locale";
import { consultationContent } from "@/lib/i18n/content/consultation";
import { sharedContent } from "@/lib/i18n/content/shared";

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = consultationContent[await getLocale()];
  return { title: meta.title, description: meta.description };
}

export default async function BookConsultationPage() {
  const locale = await getLocale();
  const t = consultationContent[locale];
  const shared = sharedContent[locale];

  return (
    <div className="mx-auto w-full max-w-3xl px-3 py-10 sm:px-6 sm:py-16">
      <BackLink href="/services" label={shared.backToServices} />

      {/* Hero */}
      <section className="mt-6 text-center">
        <span className="inline-block rounded-tag border border-neutral-200 bg-white px-4 py-1.5 text-xs text-neutral-600 shadow-subtle">
          {t.hero.eyebrow}
        </span>
        <h1 className="mt-6 text-3xl leading-tight font-bold text-neutral-900 sm:text-4xl">
          {t.hero.titleStart} <span className="text-accent">{t.hero.titleAccent}</span>
          {t.hero.titleEnd}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-[1.8] text-neutral-600">{t.hero.subtitle}</p>
        <p className="mt-3 text-sm font-bold text-accent">{t.hero.seats}</p>
        <ScrollToSectionLink targetId="register" className={buttonVariants({ variant: "accent", size: "lg", className: "mt-6" })}>
          {t.hero.cta}
        </ScrollToSectionLink>
      </section>

      {/* Intro video */}
      <section className="mt-16">
        <p className="mb-4 text-center text-sm font-semibold text-neutral-500">{t.video.heading}</p>
        <MediaPlaceholder label={t.video.placeholder} aspect="video" icon="video" />
      </section>

      <AboutMeSection t={shared.about} />

      {/* What you get + package & price */}
      <section className="mt-20">
        <NumberedCardGrid title={shared.sections.whatYouGet} items={t.features} />

        <Card padding="lg" shadow="panel" radius="card" className="mx-auto mt-6 max-w-xl text-center">
          <p className="text-sm font-semibold text-neutral-500">{shared.sections.packageLabel}</p>
          <p className="mt-2 text-2xl font-bold text-accent">{t.pkg.price}</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-neutral-700">
            {t.pkg.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </Card>
      </section>

      <section className="mt-20">
        <NumberedCardGrid title={shared.sections.process} items={t.process} badgeVariant="primary" />
      </section>

      <section className="mt-20">
        <CheckList title={shared.sections.terms} items={t.terms} />
      </section>

      {/* FAQ */}
      <section className="mt-20">
        <h2 className="text-center text-2xl font-bold text-neutral-900">{shared.sections.faq}</h2>
        <Accordion items={t.faqs} defaultOpenId="price" className="mx-auto mt-6 max-w-xl" />
      </section>

      {/* Registration form */}
      <section id="register" className="mt-20 scroll-mt-24">
        <h2 className="text-center text-2xl font-bold text-neutral-900">{t.register.heading}</h2>
        <p className="mx-auto mt-2 max-w-md text-center text-sm text-neutral-500">{t.register.subtitle}</p>
        <Card padding="lg" shadow="panel" radius="card" className="mx-auto mt-8 max-w-lg">
          <ConsultationBookingForm t={t.form} />
        </Card>
      </section>
    </div>
  );
}
