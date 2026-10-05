import { Card } from "@/components/ui/Card";
import { MediaPlaceholder } from "@/components/consultation/MediaPlaceholder";
import type { SharedContent } from "@/lib/i18n/content/shared";

// Shared by both service pages — with a one-person service the trust-building "who am I"
// block is the same wherever the visitor lands.
export function AboutMeSection({ t }: { t: SharedContent["about"] }) {
  return (
    <section className="mt-20">
      <h2 className="text-center text-2xl font-bold text-neutral-900">{t.title}</h2>
      <Card padding="lg" shadow="panel" radius="card" className="mt-8">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-start">
          <MediaPlaceholder label={t.photoLabel} aspect="square" icon="photo" className="h-24 w-24 shrink-0 rounded-full" />
          <div>
            <p className="font-bold text-neutral-900">{t.name}</p>
            <p className="mt-2 text-sm leading-[1.9] text-neutral-600">{t.bio}</p>
          </div>
        </div>

        <div className="mt-6 border-t border-neutral-100 pt-6">
          <p className="text-sm font-semibold text-neutral-700">{t.worksLead}</p>
          <div className="mt-4">
            <MediaPlaceholder label={t.screenshotLabel} aspect="video" icon="photo" />
          </div>
        </div>
      </Card>
    </section>
  );
}
