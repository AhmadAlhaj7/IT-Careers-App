import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { listTracks } from "@/lib/api";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/locale";
import { BackLink } from "@/components/layout/BackLink";
import { Logo } from "@/components/layout/Logo";
import { paletteFor } from "@/lib/cardPalette";

export default async function TracksPage() {
  const [locale, tracks] = await Promise.all([getLocale(), listTracks()]);
  const dict = getDictionary(locale);
  const t = dict.tracksPage;

  return (
    <div className="mx-auto w-full max-w-3xl px-3 py-10 sm:px-6 sm:py-16">
      <BackLink href="/" label={dict.nav.home} />
      <h1 className="mt-4 text-2xl font-bold text-neutral-900 sm:text-3xl">{t.title}</h1>
      <p className="mt-3 text-sm leading-[1.8] text-neutral-600 sm:text-base">{t.intro}</p>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {tracks.length === 0 && <p className="text-sm text-neutral-500">{t.empty}</p>}
        {tracks.map((track) => {
          const { tint } = paletteFor(track.slug);
          return (
            <Link
              key={track.slug}
              href={`/tracks/${track.slug}`}
              className="group flex items-center gap-4 rounded-panel border border-neutral-100 bg-white p-5 shadow-subtle transition hover:-translate-y-0.5 hover:shadow-panel"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-control" style={{ backgroundColor: tint }}>
                <Logo size={22} />
              </span>
              <span className="min-w-0 flex-1 truncate font-semibold text-neutral-900">{track.name[locale]}</span>
              <ChevronRight className="size-4 shrink-0 text-neutral-300 transition rtl:rotate-180 group-hover:text-primary" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
