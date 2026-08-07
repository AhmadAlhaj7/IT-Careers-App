"use client";

import { useState } from "react";
import Link from "next/link";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLocale } from "@/lib/i18n/LocaleContext";

type NavBarProps = {
  isAdmin: boolean;
};

// Brand name is a placeholder ("IT Careers", matching the repo name) — the real product
// name/brand is still an open decision, this is just text and trivial to swap later.
export function NavBar({ isAdmin }: NavBarProps) {
  const { dict } = useLocale();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: "/", label: dict.nav.home },
    { href: "/roadmaps", label: dict.nav.roadmaps },
    { href: "/quiz", label: dict.nav.quiz },
  ];

  return (
    <div className="sticky top-0 z-40 pt-3 pr-3 pl-20 sm:pt-6 sm:pr-6 sm:pl-28">
      <header className="mx-auto flex max-w-5xl items-center justify-between gap-3 rounded-2xl border border-neutral-100 bg-white/90 px-4 py-2.5 shadow-lg shadow-neutral-900/5 backdrop-blur sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold text-neutral-900">
          <span>IT Careers</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-neutral-600 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-[#0F6E56]">
              {link.label}
            </Link>
          ))}
          <Show when="signed-in">
            <Link href="/dashboard" className="hover:text-[#0F6E56]">
              {dict.nav.dashboard}
            </Link>
          </Show>
          {isAdmin && (
            <Link href="/admin" className="hover:text-[#0F6E56]">
              {dict.nav.admin}
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>

          <div className="hidden sm:block">
            <Show when="signed-in">
              <UserButton />
            </Show>
            <Show when="signed-out">
              <SignInButton>
                <button className="rounded-xl bg-[#E8764A] px-4 py-1.5 text-sm font-medium text-white transition active:scale-95 hover:bg-[#d35f35]">
                  {dict.nav.signIn}
                </button>
              </SignInButton>
            </Show>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={dict.nav.menu}
            aria-expanded={open}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-neutral-700 transition active:scale-90 hover:bg-neutral-50 md:hidden"
          >
            {open ? (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {open && (
        <nav className="mx-auto mt-2 flex max-w-5xl flex-col gap-1 rounded-2xl border border-neutral-100 bg-white p-3 text-sm text-neutral-700 shadow-lg md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 hover:bg-neutral-50"
            >
              {link.label}
            </Link>
          ))}
          <Show when="signed-in">
            <Link href="/dashboard" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 hover:bg-neutral-50">
              {dict.nav.dashboard}
            </Link>
          </Show>
          {isAdmin && (
            <Link href="/admin" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 hover:bg-neutral-50">
              {dict.nav.admin}
            </Link>
          )}
          <div className="mt-1 flex items-center justify-between border-t border-neutral-100 pt-2">
            <LanguageSwitcher />
          </div>
          <Show when="signed-in">
            <div className="px-3 py-1">
              <UserButton />
            </div>
          </Show>
          <Show when="signed-out">
            <SignInButton>
              <button className="w-full rounded-xl bg-[#E8764A] px-4 py-2 text-sm font-medium text-white transition active:scale-95">
                {dict.nav.signIn}
              </button>
            </SignInButton>
          </Show>
        </nav>
      )}
    </div>
  );
}
