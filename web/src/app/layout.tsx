import type { Metadata } from "next";
import { Geist, Geist_Mono, Reem_Kufi } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { arSA } from "@clerk/localizations";
import { NavBar } from "@/components/layout/NavBar";
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
// carry the same meaning in Arabic type.
const reemKufi = Reem_Kufi({
  variable: "--font-reem-kufi",
  subsets: ["arabic"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "IT Careers",
  description: "مسارات تعليمية عربية منظمة في البرمجة وتقنية المعلومات",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { sessionClaims } = await auth();
  const role = (sessionClaims as { role?: string } | null)?.role;
  const isAdmin = role === "admin";

  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${geistSans.variable} ${geistMono.variable} ${reemKufi.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="app-background" />
        <ClerkProvider localization={arSA}>
          <NavBar isAdmin={isAdmin} />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
