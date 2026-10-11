import Image from "next/image";
import { Card } from "@/components/ui/Card";
import type { SharedContent } from "@/lib/i18n/content/shared";

const INSTAGRAM_HANDLE = "ahmadaalhaj";
const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

// Shared by both service pages — with a one-person service the trust-building "who am I"
// block is the same wherever the visitor lands.
export function AboutMeSection({ t }: { t: SharedContent["about"] }) {
  return (
    <section className="mt-20">
      <h2 className="text-center text-2xl font-bold text-neutral-900">{t.title}</h2>
      <Card padding="lg" shadow="panel" radius="card" className="mt-8">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-start">
          <Image
            src="/about/ahmad-profile.jpg"
            alt={t.photoAlt}
            width={96}
            height={96}
            className="h-24 w-24 shrink-0 rounded-full object-cover ring-4 ring-primary-subtle"
          />
          <div>
            <p className="font-bold text-neutral-900">{t.name}</p>
            <p className="mt-2 text-sm leading-[1.9] text-neutral-600">
              {t.bio} {t.instagramLead}{" "}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                dir="ltr"
                className="font-semibold text-primary hover:underline"
              >
                @{INSTAGRAM_HANDLE}
              </a>
              {t.instagramTail}
            </p>
          </div>
        </div>

        <div className="mt-6 border-t border-neutral-100 pt-6">
          <p className="text-sm font-semibold text-neutral-700">{t.worksLead}</p>
          {/* Silent screen recording (no audio track). preload="metadata" so the 3MB file only downloads
              once the visitor presses play; the poster stands in until then. */}
          <video
            src="/about/gym-website-demo.mp4"
            poster="/about/gym-website-demo-poster.jpg"
            aria-label={t.videoLabel}
            controls
            playsInline
            preload="metadata"
            className="mt-4 aspect-[848/432] w-full rounded-xl bg-neutral-900"
          />
        </div>
      </Card>
    </section>
  );
}
