import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Download, Lock } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { buttonVariants } from "@/components/ui/Button";
import { BackLink } from "@/components/layout/BackLink";
import { AccessChip } from "@/components/files/AccessChip";
import { FileTypeIcon } from "@/components/files/FileTypeIcon";
import { getLearningFile } from "@/lib/api";
import { getLocale } from "@/lib/i18n/locale";
import { filesContent } from "@/lib/i18n/content/files";
import { localize } from "@/lib/localize";
import { fileContentUrl, fileDownloadUrl, formatFileSize, previewKind } from "@/lib/learningFiles";

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const file = await getLearningFile(id);
  if (!file) return {};
  return { title: localize(file.title, await getLocale()) };
}

export default async function FileViewerPage({ params }: PageProps) {
  const { id } = await params;
  const [file, locale] = await Promise.all([getLearningFile(id), getLocale()]);

  if (!file) {
    notFound();
  }

  const t = filesContent[locale];
  const kind = file.canPreview ? previewKind(file.contentType) : "none";
  const contentUrl = fileContentUrl(file.id);
  const description = localize(file.description, locale);

  return (
    <div className="mx-auto w-full max-w-4xl px-3 py-10 sm:px-6 sm:py-16">
      <BackLink href="/files" label={t.viewer.back} />

      <div className="mt-6 flex items-start gap-4">
        <FileTypeIcon contentType={file.contentType} className="h-14 w-14" />
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl leading-tight font-bold text-neutral-900 sm:text-3xl">{localize(file.title, locale)}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-neutral-400">
            <AccessChip allowDownload={file.allowDownload} labels={t.chips} />
            <span>{localize(file.category, locale)}</span>
            <span dir="ltr">{formatFileSize(file.sizeBytes)}</span>
          </div>
        </div>
      </div>

      {description && <p className="mt-5 text-base leading-[1.8] text-neutral-600">{description}</p>}

      <Card padding="sm" shadow="panel" radius="card" className="mt-6 overflow-hidden">
        {kind === "pdf" && (
          // View-only PDFs hide the viewer's own toolbar (which carries a download button). That is a
          // deterrent, not protection — the real gate is the API refusing /download.
          <iframe
            src={file.allowDownload ? contentUrl : `${contentUrl}#toolbar=0&navpanes=0`}
            title={t.viewer.previewTitle}
            className="h-[75vh] w-full rounded-lg bg-neutral-50"
          />
        )}
        {kind === "image" && (
          // eslint-disable-next-line @next/next/no-img-element -- bytes come from the API, not a static asset
          <img src={contentUrl} alt={localize(file.title, locale)} draggable={file.allowDownload} className="mx-auto max-h-[75vh] w-auto max-w-full rounded-lg" />
        )}
        {kind === "video" && (
          <video src={contentUrl} controls controlsList={file.allowDownload ? undefined : "nodownload"} className="w-full rounded-lg bg-black" />
        )}
        {kind === "audio" && (
          <audio src={contentUrl} controls controlsList={file.allowDownload ? undefined : "nodownload"} className="w-full" />
        )}
        {kind === "text" && (
          <iframe src={contentUrl} title={t.viewer.previewTitle} className="h-[60vh] w-full rounded-lg bg-white" />
        )}
        {kind === "none" && <p className="p-6 text-center text-sm text-neutral-600">{t.viewer.noPreview}</p>}
      </Card>

      <div className="mt-6">
        {file.allowDownload ? (
          <a href={fileDownloadUrl(file.id)} className={buttonVariants({ variant: "accent", size: "lg", className: "w-full sm:w-auto" })}>
            <Download className="h-4 w-4" aria-hidden />
            {t.viewer.download}
          </a>
        ) : (
          <p className="flex items-center gap-2 rounded-xl bg-secondary/10 px-4 py-3 text-sm font-medium text-secondary">
            <Lock className="h-4 w-4 shrink-0" aria-hidden />
            {t.viewer.viewOnlyNotice}
          </p>
        )}
      </div>
    </div>
  );
}
