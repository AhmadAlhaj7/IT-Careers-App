import { Logo } from "@/components/layout/Logo";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type CertificateShowcaseProps = {
  dict: Dictionary["homePage"];
};

// The learner-name and roadmap-title lines in the preview are abstract placeholder bars, not
// a specific real certificate — same illustrative treatment the admin panel's exam tab uses
// for its certificate preview. The verify-code shown is an example of the URL pattern, not a
// real issued code.
export function CertificateShowcase({ dict }: CertificateShowcaseProps) {
  return (
    <section id="certificate" className="mt-20 overflow-hidden rounded-3xl bg-[#0F6E56]">
      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="p-8 text-[#eef5f2] sm:p-12">
          <p className="mb-3 text-xs font-semibold tracking-wide text-white/60">{dict.certificateEyebrow}</p>
          <h2 className="mb-3.5 max-w-xl text-2xl leading-tight font-bold text-white sm:text-3xl">{dict.certificateTitle}</h2>
          <p className="mb-6 max-w-md text-sm leading-[1.9] text-white/80 sm:text-base">{dict.certificateBody}</p>
          <div className="flex flex-wrap gap-2">
            {[dict.certificateChip1, dict.certificateChip2, dict.certificateChip3].map((chip) => (
              <span key={chip} className="rounded-full bg-white/15 px-3.5 py-2 text-xs font-medium text-white sm:text-sm">
                {chip}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center bg-black/10 p-8 sm:p-10">
          <div className="w-full max-w-xs -rotate-2 rounded-2xl bg-[#fdfcf9] p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <Logo size={22} />
              <span dir="ltr" className="font-mono text-[10px] font-semibold tracking-wide text-neutral-400">
                CERTIFICATE
              </span>
            </div>
            <div className="mb-1 text-xs text-neutral-400">{dict.certificateAwardedTo}</div>
            <div className="mb-1 h-2.5 w-[72%] rounded-full bg-neutral-900/10" />
            <div className="mb-5 h-2.5 w-[46%] rounded-full bg-neutral-900/[0.06]" />
            <div className="flex items-center justify-between border-t border-dashed border-neutral-900/15 pt-3.5">
              <span dir="ltr" className="font-mono text-[10px] text-neutral-400">
                verify/ITC-8F2K-4Q
              </span>
              <span className="h-8 w-8 rounded-full border border-dashed border-[#0F6E56]/45 bg-[#0F6E56]/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
