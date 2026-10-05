"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { IconButton } from "@/components/ui/IconButton";
import { buttonVariants } from "@/components/ui/Button";
import { useLocale } from "@/lib/i18n/LocaleContext";

type NavBarProps = {
  isAdmin: boolean;
};

// Standalone landing pages get a quiet nav: no nav links, no sign-in CTA — a booking/sales page
// should offer exactly one path (the thing it's selling), not compete with itself for attention.
const QUIET_NAV_PATHS = ["/book-consultation"];

export function NavBar({ isAdmin }: NavBarProps) {
  const { dict } = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const quiet = QUIET_NAV_PATHS.includes(pathname);

  const navLinks = [
    { href: "/", label: dict.nav.home },
    { href: "/roadmaps", label: dict.nav.roadmaps },
  ];

  if (quiet) {
    return (
      <div className="sticky top-0 z-40 pt-3 pe-3 ps-20 sm:pt-6 sm:pe-6 sm:ps-28">
        <header className="mx-auto flex max-w-5xl items-center justify-between gap-3 rounded-panel border border-neutral-100 bg-white/90 px-4 py-2.5 shadow-panel backdrop-blur sm:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold text-neutral-500">
            <span>{dict.brand}</span>
          </Link>
          <LanguageSwitcher />
        </header>
      </div>
    );
  }

  return (
    <div className="sticky top-0 z-40 pt-3 pe-3 ps-20 sm:pt-6 sm:pe-6 sm:ps-28">
      <header className="mx-auto flex max-w-5xl items-center justify-between gap-3 rounded-panel border border-neutral-100 bg-white/90 px-4 py-2.5 shadow-panel backdrop-blur sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold text-neutral-900">
          <span>{dict.brand}</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-neutral-600 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-primary">
              {link.label}
            </Link>
          ))}
          <Show when="signed-in">
            <Link href="/dashboard" className="hover:text-primary">
              {dict.nav.dashboard}
            </Link>
          </Show>
          {isAdmin && (
            <Link href="/admin" className="hover:text-primary">
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
                <button className={buttonVariants({ variant: "accent", size: "sm" })}>{dict.nav.signIn}</button>
              </SignInButton>
            </Show>
          </div>

          <IconButton
            icon={open ? X : Menu}
            label={dict.nav.menu}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="md:hidden"
          />
        </div>
      </header>

      {open && (
        <nav className="mx-auto mt-2 flex max-w-5xl flex-col gap-1 rounded-panel border border-neutral-100 bg-white p-3 text-sm text-neutral-700 shadow-panel md:hidden">
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
              <button className={buttonVariants({ variant: "accent", className: "w-full" })}>{dict.nav.signIn}</button>
            </SignInButton>
          </Show>
        </nav>
      )}
    </div>
  );
}
