import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Geist_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { arSA, enUS } from "@clerk/localizations";
import { NavBar } from "@/components/layout/NavBar";
import { LocaleProvider } from "@/lib/i18n/LocaleContext";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/locale";
import "./globals.css";

// The one typeface for the whole app — Arabic-first (needs the "arabic" subset; "latin" too,
// since English words like brand/product names appear inline regardless of locale). Replaces
// the previous Geist Sans (Latin-only — Arabic text was silently falling back to whatever
// generic font the visitor's OS/browser picked) plus a separate Reem Kufi "accent" face for
// emphasized headline words; emphasis now comes from weight (font-bold) and color alone, same
// single-family look as the brand's own reference designs.
const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex-sans-arabic",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return locale === "en"
    ? { title: "Halaqa", description: "Structured Arabic-first roadmaps for learning programming and tech" }
    : { title: "حلقة", description: "مسارات تعليمية عربية منظمة في البرمجة وتقنية المعلومات" };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [{ sessionClaims }, locale] = await Promise.all([auth(), getLocale()]);
  const role = (sessionClaims as { role?: string } | null)?.role;
  const isAdmin = role === "admin";
  const dict = getDictionary(locale);

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${ibmPlexSansArabic.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="app-background" />
        <Link href="/" aria-label={dict.brand} className="fixed top-3 start-3 z-50 sm:top-6 sm:start-6">
          <Image src="/logo-wordmark.svg" alt={dict.brand} width={62} height={40} priority className="h-10 w-auto" />
        </Link>
        <ClerkProvider localization={locale === "ar" ? arSA : enUS}>
          <LocaleProvider locale={locale} dict={dict}>
            <NavBar isAdmin={isAdmin} />
            {children}
          </LocaleProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
