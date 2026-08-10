import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/locale";
import { BackLink } from "@/components/layout/BackLink";
import { PageCard } from "@/components/layout/PageCard";
import { CertificateLookupForm } from "@/components/certificates/CertificateLookupForm";

export default async function CertificateLookupPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const t = dict.certificateLookupPage;

  return (
    <PageCard maxWidth="2xl">
      <BackLink href="/" label={t.backLabel} />
      <h1 className="mt-4 text-2xl font-bold text-neutral-900">{t.title}</h1>
      <p className="mt-2 text-sm text-neutral-500">{t.subtitle}</p>
      <div className="mt-6">
        <CertificateLookupForm placeholder={t.placeholder} submitLabel={t.submitLabel} />
      </div>
    </PageCard>
  );
}
