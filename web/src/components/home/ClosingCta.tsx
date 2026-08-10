import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type ClosingCtaProps = {
  dict: Dictionary["homePage"];
};

export function ClosingCta({ dict }: ClosingCtaProps) {
  return (
    <section className="mt-20">
      <div
        className="relative overflow-hidden rounded-3xl border border-neutral-100 bg-white p-8 text-center shadow-lg shadow-neutral-900/5 sm:p-14"
        style={{
          backgroundImage: "radial-gradient(rgba(28,27,25,0.07) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      >
        <div className="relative mx-auto max-w-xl">
          <h2 className="mb-3.5 text-2xl leading-tight font-bold text-neutral-900 sm:text-4xl">{dict.closingCtaTitle}</h2>
          <p className="mb-7 text-sm leading-[1.85] text-neutral-600 sm:text-base">{dict.closingCtaBody}</p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/roadmaps"
              className="w-full rounded-xl bg-[#E8764A] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#E8764A]/30 transition active:scale-95 hover:bg-[#d35f35] sm:w-auto"
            >
              {dict.closingCtaPrimary}
            </Link>
            <Link
              href="/tech-majors"
              className="w-full rounded-xl border border-neutral-200 bg-white px-7 py-3.5 text-sm font-semibold text-neutral-800 transition active:scale-95 hover:border-[#0F6E56] hover:text-[#0F6E56] sm:w-auto"
            >
              {dict.closingCtaSecondary}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
