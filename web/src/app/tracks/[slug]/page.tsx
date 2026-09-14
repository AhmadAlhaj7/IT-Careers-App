import { notFound } from "next/navigation";
import Link from "next/link";
import { getTrack } from "@/lib/api";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/locale";
import { BackLink } from "@/components/layout/BackLink";
import { Logo } from "@/components/layout/Logo";
import { paletteFor } from "@/lib/cardPalette";

export default async function TrackPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [locale, track] = await Promise.all([getLocale(), getTrack(slug)]);

  if (!track) {
    notFound();
  }

  const dict = getDictionary(locale);
  const t = dict.trackDetailPage;

  return (
    <div className="mx-auto w-full max-w-4xl px-3 py-10 sm:px-6 sm:py-16">
      <BackLink href="/tracks" label={dict.tracksPage.title} />
      <h1 className="mt-4 text-2xl font-bold text-neutral-900 sm:text-3xl">{track.name[locale]}</h1>
      <p className="mt-3 max-w-2xl text-sm leading-[1.8] text-neutral-600 sm:text-base">{track.description[locale]}</p>

      <div className="mt-8">
        <h2 className="mb-4 text-sm font-semibold font-accent tracking-wide text-primary">{t.roadmapsTitle}</h2>

        {track.roadmaps.length === 0 ? (
          <p className="text-sm text-neutral-500">{t.empty}</p>
        ) : (
          <div className="flex flex-col gap-3">
            {/* Not RoadmapCard here on purpose: /api/tracks doesn't carry per-user
                enrollment/progress data (unlike /api/roadmaps), so showing a Buy/Owned/Continue
                button here could lie about ownership. This is a plain discovery link — the real
                buy/enroll state lives on the roadmap detail page it points to. */}
            {track.roadmaps.map((roadmap) => {
              const { tint } = paletteFor(roadmap.slug);
              return (
                <Link
                  key={roadmap.slug}
                  href={`/roadmaps/${roadmap.slug}`}
                  className="group flex items-center gap-4 rounded-panel border border-neutral-100 bg-white p-5 shadow-subtle transition hover:-translate-y-0.5 hover:shadow-panel"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-control" style={{ backgroundColor: tint }}>
                    <Logo size={22} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold text-neutral-900">{roadmap.title[locale]}</span>
                    {roadmap.description && <span className="block truncate text-sm text-neutral-500">{roadmap.description[locale]}</span>}
                  </span>
                  <span dir="ltr" className="shrink-0 font-mono text-sm font-bold text-primary">
                    ${roadmap.price.toFixed(2)}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
