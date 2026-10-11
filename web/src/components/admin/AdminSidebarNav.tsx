"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type AdminSidebarNavItem = {
  href: string;
  label: string;
  count: number | null;
  // Show a non-zero count as a coloured pill instead of grey text (e.g. unhandled leads).
  highlight?: boolean;
};

// Client-only for usePathname() — everything else about the sidebar (counts, "this week"
// stats) is fetched server-side in admin/layout.tsx and passed down as plain props.
export function AdminSidebarNav({ items }: { items: AdminSidebarNavItem[] }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-1">
      {items.map((item) => {
        const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-sm transition ${
              active ? "bg-primary/10 font-bold text-primary" : "font-medium text-neutral-600 hover:bg-neutral-50"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-primary" : "bg-neutral-300"}`} />
              {item.label}
            </span>
            {item.count !== null &&
              (item.highlight && item.count > 0 ? (
                <span className="rounded-full bg-accent px-2 py-0.5 font-mono text-[11px] font-bold text-white">{item.count}</span>
              ) : (
                <span className="font-mono text-xs text-neutral-400">{item.count}</span>
              ))}
          </Link>
        );
      })}
    </div>
  );
}
