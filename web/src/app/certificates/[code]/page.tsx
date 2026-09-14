import { notFound } from "next/navigation";
import { getCertificate } from "@/lib/api";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/locale";
import { BackLink } from "@/components/layout/BackLink";
import { Logo } from "@/components/layout/Logo";

export default async function CertificatePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const [locale, certificate] = await Promise.all([getLocale(), getCertificate(code)]);

  if (!certificate) {
    notFound();
  }

  const dict = getDictionary(locale);
  const t = dict.certificatePage;

  const issuedDate = new Date(certificate.issuedAt).toLocaleDateString(locale === "ar" ? "ar" : "en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mx-auto w-full max-w-xl px-3 py-10 sm:px-6 sm:py-16">
      <BackLink href="/" label={dict.nav.home} />

      <div className="mt-6 overflow-hidden rounded-card bg-primary p-3 shadow-card sm:p-4">
        <div className="rounded-panel bg-[#fdfcf9] p-6 text-center sm:p-10">
          <div className="mb-6 flex items-center justify-between">
            <Logo size={28} />
            <span dir="ltr" className="font-mono text-xs font-semibold tracking-wide text-neutral-400">
              CERTIFICATE
            </span>
          </div>

          <p className="text-xs font-semibold tracking-wide text-primary">{t.eyebrow}</p>
          <h1 className="mt-3 text-3xl font-bold text-neutral-900">{certificate.learnerName}</h1>
          <p className="mt-4 text-neutral-600">{t.completedPrefix}</p>
          <p className="mt-1 text-xl font-semibold text-primary">{certificate.roadmapTitle[locale]}</p>
          <p className="mt-6 text-sm text-neutral-400">{issuedDate}</p>

          <div className="mt-8 flex items-center justify-between border-t border-dashed border-neutral-200 pt-5">
            <span className="text-xs text-neutral-400">
              {t.verifyCodeLabel}: <span dir="ltr" className="font-mono text-neutral-600">{code}</span>
            </span>
            <span className="h-10 w-10 shrink-0 rounded-full border border-dashed border-primary/45 bg-primary/10" />
          </div>
        </div>
      </div>
    </div>
  );
}
