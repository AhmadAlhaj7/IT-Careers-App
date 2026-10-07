import Link from "next/link";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/locale";
import { FloatingChip } from "@/components/home/FloatingChip";
import { GuideArrow } from "@/components/home/GuideArrow";

export default async function Home() {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto w-full max-w-5xl px-3 py-10 sm:px-6 sm:py-16">
      <section className="relative text-center">
        <FloatingChip
          label="Think"
          wrapperClassName="top-0 start-6"
          className="bg-secondary-subtle text-secondary"
          rotate={-4}
          duration="6s"
          delay="0s"
        />
        <FloatingChip
          label="Act"
          wrapperClassName="top-44 start-0"
          className="bg-[#FDE68A] text-[#78350F]"
          rotate={3}
          duration="7s"
          delay="1.1s"
        />
        <FloatingChip
          label="Win"
          wrapperClassName="top-20 end-4"
          className="border border-accent bg-white text-neutral-800"
          rotate={-2}
          duration="6.5s"
          delay="2s"
        />
        <span className="inline-block rounded-xl border border-neutral-200 bg-white/70 px-4 py-1.5 text-xs text-neutral-600 shadow-sm backdrop-blur">
          {dict.home.badge}
        </span>
        <h1 className="mt-6 text-3xl leading-tight font-bold text-neutral-900 sm:text-5xl">
          {dict.home.titleStart} <span className="text-accent">{dict.home.titleAccent}</span>{" "}
          {dict.home.titleEnd}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-[1.7] text-neutral-600 sm:text-lg">{dict.home.subtitle}</p>

        {/* sm:w-fit makes this wrapper exactly as wide as the main button row, so the Learning
            Files button below can simply be w-full and line up with it in either language. */}
        <div className="mx-auto mt-8 w-full sm:w-fit">
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <div className="relative w-full sm:w-auto">
              <Link
                href="/book-consultation"
                className="w-full rounded-xl bg-accent-gradient px-6 py-3 text-sm font-medium text-white shadow-lg shadow-accent/30 transition active:scale-95 hover:brightness-95 max-sm:block max-sm:text-center sm:w-auto"
              >
                {dict.home.consultationCta}
              </Link>
              <GuideArrow label={dict.home.guideLearn} flip className="top-full right-2 mt-2" duration="6.5s" delay="0.6s" />
            </div>
            <div className="relative w-full sm:w-auto">
              <Link
                href="/build-website"
                className="w-full rounded-xl border border-neutral-200 bg-white px-6 py-3 text-sm font-medium text-neutral-800 transition active:scale-95 hover:border-primary hover:text-primary max-sm:block max-sm:text-center sm:w-auto"
              >
                {dict.home.buildWebsiteCta}
              </Link>
              <GuideArrow label={dict.home.guideWebsite} className="top-full left-2 mt-2" duration="7s" delay="1.5s" />
            </div>
          </div>

          {/* md:mt-20 clears the GuideArrow labels pinned below the main buttons above — they are
              hidden below md, so mobile keeps a normal gap. */}
          <Link
            href="/files"
            className="mt-6 block w-full text-center md:mt-20 rounded-xl border border-primary/20 bg-primary-subtle px-6 py-3 text-sm font-medium text-primary transition active:scale-95 hover:bg-primary/10"
          >
            {dict.home.learningFilesCta}
          </Link>
        </div>
      </section>
    </div>
  );
}
