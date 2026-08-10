import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type SiteFooterProps = {
  dict: Dictionary;
};

// Only items with a real destination become links (المسارات, التخصصات, لوحتي, the FAQ/
// certificate anchors on this same page, and the new /certificates lookup page). Everything
// else from the original design — pricing page, contact page, refund policy page, status
// page, a "for companies" page — doesn't exist yet, so it renders as plain text instead of a
// dead link. The source design itself treats every footer item as inert (no href/onClick
// anywhere), so this isn't a downgrade, just a faithful reading of it.
export function SiteFooter({ dict }: SiteFooterProps) {
  return (
    <footer className="mt-20 border-t border-neutral-200/70 pt-12 pb-10">
      <div className="grid grid-cols-1 gap-8 border-b border-neutral-200/70 pb-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="mb-3.5 flex items-center gap-2.5">
            <Logo size={22} />
            <span className="font-bold text-neutral-900">IT Careers</span>
          </div>
          <p className="max-w-xs text-sm leading-[1.9] text-neutral-500">{dict.homePage.footerBlurb}</p>
        </div>

        <div>
          <p className="mb-3.5 text-sm font-bold text-neutral-900">{dict.homePage.footerPlatformTitle}</p>
          <div className="flex flex-col gap-2.5 text-sm text-neutral-500">
            <Link href="/roadmaps" className="w-fit hover:text-[#0F6E56]">
              {dict.nav.roadmaps}
            </Link>
            <Link href="/tech-majors" className="w-fit hover:text-[#0F6E56]">
              {dict.home.techMajorsCta}
            </Link>
            <Link href="/dashboard" className="w-fit hover:text-[#0F6E56]">
              {dict.nav.dashboard}
            </Link>
          </div>
        </div>

        <div>
          <p className="mb-3.5 text-sm font-bold text-neutral-900">{dict.homePage.footerSupportTitle}</p>
          <div className="flex flex-col gap-2.5 text-sm text-neutral-500">
            <a href="#faq" className="w-fit hover:text-[#0F6E56]">
              {dict.homePage.faqEyebrow}
            </a>
            <span>{dict.homePage.footerContactUs}</span>
            <span>{dict.homePage.footerRefundPolicy}</span>
            <span>{dict.homePage.footerServiceStatus}</span>
          </div>
        </div>

        <div>
          <p className="mb-3.5 text-sm font-bold text-neutral-900">{dict.homePage.footerCertificatesTitle}</p>
          <div className="flex flex-col gap-2.5 text-sm text-neutral-500">
            <Link href="/certificates" className="w-fit hover:text-[#0F6E56]">
              {dict.homePage.footerVerifyCertificate}
            </Link>
            <a href="#certificate" className="w-fit hover:text-[#0F6E56]">
              {dict.homePage.footerHowCertificateWorks}
            </a>
            <span>{dict.homePage.footerForCompanies}</span>
          </div>
        </div>
      </div>

      <p className="pt-6 text-center text-xs text-neutral-400 sm:text-start">{dict.homePage.footerCopyright}</p>
    </footer>
  );
}
