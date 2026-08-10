"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type AdminSidebarNavItem = {
  href: string;
  label: string;
  count: number | null;
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
              active ? "bg-[#0F6E56]/10 font-bold text-[#0F6E56]" : "font-medium text-neutral-600 hover:bg-neutral-50"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-[#0F6E56]" : "bg-neutral-300"}`} />
              {item.label}
            </span>
            {item.count !== null && <span className="font-mono text-xs text-neutral-400">{item.count}</span>}
          </Link>
        );
      })}
    </div>
  );
}
