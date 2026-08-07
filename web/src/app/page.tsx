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
          className="bg-[#E6DFF9] text-[#5B21B6]"
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
          className="border border-[#E8764A] bg-white text-neutral-800"
          rotate={-2}
          duration="6.5s"
          delay="2s"
        />
        <span className="inline-block rounded-xl border border-neutral-200 bg-white/70 px-4 py-1.5 text-xs text-neutral-600 shadow-sm backdrop-blur">
          {dict.home.badge}
        </span>
        <h1 className="mt-6 text-3xl leading-tight font-bold text-neutral-900 sm:text-5xl">
          {dict.home.titleStart} <span className="font-accent text-[#E8764A]">{dict.home.titleAccent}</span>{" "}
          {dict.home.titleEnd}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-[1.7] text-neutral-600 sm:text-lg">{dict.home.subtitle}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <div className="relative w-full sm:w-auto">
            <Link
              href="/roadmaps"
              className="w-full rounded-xl bg-[#E8764A] px-6 py-3 text-sm font-medium text-white shadow-lg shadow-[#E8764A]/30 transition active:scale-95 hover:bg-[#d35f35] sm:w-auto"
            >
              {dict.home.browseCta}
            </Link>
            <GuideArrow label="جاهز اتعلم" flip className="top-full right-2 mt-2" duration="6.5s" delay="0.6s" />
          </div>
          <div className="relative w-full sm:w-auto">
            <Link
              href="/tech-majors"
              className="w-full rounded-xl border border-neutral-200 bg-white px-6 py-3 text-sm font-medium text-neutral-800 transition active:scale-95 hover:border-[#0F6E56] hover:text-[#0F6E56] sm:w-auto"
            >
              {dict.home.techMajorsCta}
            </Link>
            <GuideArrow label="لسا محتار" className="top-full left-2 mt-2" duration="7s" delay="1.5s" />
          </div>
        </div>
      </section>
    </div>
  );
}
