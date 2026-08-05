import type { Metadata } from "next";
import { Geist, Geist_Mono, Reem_Kufi } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { arSA, enUS } from "@clerk/localizations";
import { NavBar } from "@/components/layout/NavBar";
import { LocaleProvider } from "@/lib/i18n/LocaleContext";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/locale";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// The single accent font used for one emphasized word per headline — the Arabic-content
// equivalent of the reference design's italic-serif emphasis word, since true italics don't
// carry the same meaning in Arabic type. Needs both subsets since the accent word appears
// in either language depending on the selected locale.
const reemKufi = Reem_Kufi({
  variable: "--font-reem-kufi",
  subsets: ["arabic", "latin"],
  weight: "400",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return locale === "en"
    ? { title: "IT Careers", description: "Structured Arabic-first roadmaps for learning programming and tech" }
    : { title: "IT Careers", description: "مسارات تعليمية عربية منظمة في البرمجة وتقنية المعلومات" };
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
      className={`${geistSans.variable} ${geistMono.variable} ${reemKufi.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="app-background" />
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
