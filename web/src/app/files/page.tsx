import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { BackLink } from "@/components/layout/BackLink";
import { AccessChip } from "@/components/files/AccessChip";
import { FileTypeIcon } from "@/components/files/FileTypeIcon";
import { listLearningFiles } from "@/lib/api";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/locale";
import { filesContent } from "@/lib/i18n/content/files";
import { localize } from "@/lib/localize";
import { formatFileSize } from "@/lib/learningFiles";
import { cn } from "@/lib/cn";

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = filesContent[await getLocale()];
  return { title: meta.title, description: meta.description };
}

export default async function FilesPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const locale = await getLocale();
  const t = filesContent[locale];
  const { category: activeCategory } = await searchParams;
  const files = await listLearningFiles();

  // Categories are free text authored in Arabic; the Arabic value is the stable key, the label
  // follows the visitor's language (falling back to Arabic when no English was written).
  const categories = new Map<string, string>();
  for (const file of files) {
    if (!categories.has(file.category.ar)) {
      categories.set(file.category.ar, localize(file.category, locale));
    }
  }

  const visible = activeCategory ? files.filter((file) => file.category.ar === activeCategory) : files;

  return (
    <div className="mx-auto w-full max-w-5xl px-3 py-10 sm:px-6 sm:py-16">
      <BackLink href="/" label={getDictionary(locale).nav.home} />

      <section className="mt-6 text-center">
        <h1 className="text-3xl leading-tight font-bold text-neutral-900 sm:text-4xl">{t.library.title}</h1>
        <p className="mx-auto mt-3 max-w-xl text-base leading-[1.8] text-neutral-600">{t.library.subtitle}</p>
      </section>

      {categories.size > 0 && (
        <nav className="mt-8 flex flex-wrap justify-center gap-2" aria-label={t.library.title}>
          <CategoryChip href="/files" active={!activeCategory} label={t.library.all} />
          {[...categories].map(([key, label]) => (
            <CategoryChip key={key} href={`/files?category=${encodeURIComponent(key)}`} active={activeCategory === key} label={label} />
          ))}
        </nav>
      )}

      {visible.length === 0 ? (
        <p className="mt-12 text-center text-sm text-neutral-500">{files.length === 0 ? t.library.empty : t.library.emptyCategory}</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((file) => {
            const description = localize(file.description, locale);

            return (
              <Link key={file.id} href={`/files/${file.id}`} className="group block">
                <Card padding="md" shadow="subtle" radius="panel" className="flex h-full flex-col transition group-hover:-translate-y-0.5 group-hover:shadow-panel">
                  <div className="flex items-start justify-between gap-3">
                    <FileTypeIcon contentType={file.contentType} />
                    <AccessChip allowDownload={file.allowDownload} labels={t.chips} />
                  </div>
                  <h2 className="mt-4 text-base font-bold text-neutral-900">{localize(file.title, locale)}</h2>
                  {description && <p className="mt-1.5 line-clamp-2 text-sm leading-[1.7] text-neutral-600">{description}</p>}
                  <div className="mt-auto flex items-center justify-between gap-2 pt-4 text-xs text-neutral-400">
                    <span>{localize(file.category, locale)}</span>
                    <span dir="ltr">{formatFileSize(file.sizeBytes)}</span>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function CategoryChip({ href, active, label }: { href: string; active: boolean; label: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-full border px-4 py-1.5 text-sm font-medium transition",
        active ? "border-primary bg-primary text-white" : "border-neutral-200 bg-white text-neutral-600 hover:border-primary hover:text-primary",
      )}
    >
      {label}
    </Link>
  );
}
