import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8 lg:flex-row lg:items-start">
      <aside className="flex shrink-0 flex-row gap-1 overflow-x-auto lg:w-48 lg:flex-col lg:overflow-visible">
        <Link
          href="/admin"
          className="shrink-0 rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap text-neutral-700 hover:bg-neutral-50"
        >
          المسارات
        </Link>
        <Link
          href="/admin/roadmaps/new"
          className="shrink-0 rounded-md px-3 py-2 text-sm whitespace-nowrap text-[#0F6E56] hover:bg-neutral-50"
        >
          + مسار جديد
        </Link>
      </aside>

      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
