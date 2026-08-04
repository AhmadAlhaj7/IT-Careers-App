import Link from "next/link";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";

type NavBarProps = {
  isAdmin: boolean;
};

// Brand name is a placeholder ("IT Careers", matching the repo name) — the real product
// name/brand is still an open decision, this is just text and trivial to swap later.
export function NavBar({ isAdmin }: NavBarProps) {
  return (
    <header className="flex items-center justify-between border-b border-neutral-100 px-4 py-3">
      <Link href="/" className="font-semibold text-neutral-900">
        IT Careers
      </Link>

      <nav className="flex items-center gap-5 text-sm text-neutral-600">
        <Link href="/" className="hover:text-[#0F6E56]">
          الرئيسية
        </Link>
        <Show when="signed-in">
          <Link href="/dashboard" className="hover:text-[#0F6E56]">
            لوحتي
          </Link>
        </Show>
        {isAdmin && (
          <Link href="/admin" className="hover:text-[#0F6E56]">
            الإدارة
          </Link>
        )}

        <Show when="signed-in">
          <UserButton />
        </Show>
        <Show when="signed-out">
          <SignInButton />
        </Show>
      </nav>
    </header>
  );
}
