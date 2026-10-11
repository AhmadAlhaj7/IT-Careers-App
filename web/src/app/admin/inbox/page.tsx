import Link from "next/link";
import { listAdminConsultationBookings, listAdminWebsiteOrders } from "@/lib/admin-api";
import { LEAD_KIND_LABELS, LEAD_STATUSES, isLeadStatus, type InboxLead, type LeadKind } from "@/lib/leads";
import { AdminForbidden } from "@/components/admin/AdminForbidden";
import { LeadCard } from "@/components/admin/LeadCard";
import { cn } from "@/lib/cn";

type InboxSearchParams = { type?: string; status?: string };

export default async function AdminInboxPage({ searchParams }: { searchParams: Promise<InboxSearchParams> }) {
  const params = await searchParams;
  const [bookingsResult, ordersResult] = await Promise.all([listAdminConsultationBookings(), listAdminWebsiteOrders()]);

  if (bookingsResult.status === "forbidden" || ordersResult.status === "forbidden") {
    return <AdminForbidden />;
  }

  const leads: InboxLead[] = [
    ...(bookingsResult.status === "ok" ? bookingsResult.data.map((b) => ({ kind: "consultation" as const, ...b })) : []),
    ...(ordersResult.status === "ok" ? ordersResult.data.map((o) => ({ kind: "website" as const, ...o })) : []),
  ].sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));

  const activeKind: LeadKind | undefined = params.type === "consultation" || params.type === "website" ? params.type : undefined;
  const activeStatus = isLeadStatus(params.status) ? params.status : undefined;

  const ofKind = activeKind ? leads.filter((lead) => lead.kind === activeKind) : leads;
  const visible = activeStatus ? ofKind.filter((lead) => lead.status === activeStatus) : ofKind;

  // Filters are plain links, so a filtered view can be bookmarked and survives a refresh.
  const href = (next: InboxSearchParams) => {
    const query = new URLSearchParams();
    if (next.type) query.set("type", next.type);
    if (next.status) query.set("status", next.status);
    const qs = query.toString();
    return qs ? `/admin/inbox?${qs}` : "/admin/inbox";
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-3 py-10 sm:px-6 sm:py-16">
      <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">صندوق الطلبات</h1>
      <p className="mt-1 text-sm text-neutral-500">كل طلبات الاستشارة وبناء المواقع في مكان واحد. غيّر الحالة لتتبّع كل طلب.</p>

      <div className="mt-6 flex flex-wrap gap-2">
        <FilterChip href={href({ status: activeStatus })} active={!activeKind} label="الكل" count={leads.length} />
        {(Object.keys(LEAD_KIND_LABELS) as LeadKind[]).map((kind) => (
          <FilterChip
            key={kind}
            href={href({ type: kind, status: activeStatus })}
            active={activeKind === kind}
            label={LEAD_KIND_LABELS[kind]}
            count={leads.filter((lead) => lead.kind === kind).length}
          />
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <FilterChip href={href({ type: activeKind })} active={!activeStatus} label="كل الحالات" count={ofKind.length} subtle />
        {LEAD_STATUSES.map((status) => (
          <FilterChip
            key={status.value}
            href={href({ type: activeKind, status: status.value })}
            active={activeStatus === status.value}
            label={status.label}
            count={ofKind.filter((lead) => lead.status === status.value).length}
            subtle
          />
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {visible.length === 0 && <p className="text-sm text-neutral-500">لا توجد طلبات هنا.</p>}
        {visible.map((lead) => (
          <LeadCard key={`${lead.kind}-${lead.id}`} lead={lead} />
        ))}
      </div>
    </div>
  );
}

function FilterChip({ href, active, label, count, subtle = false }: { href: string; active: boolean; label: string; count: number; subtle?: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border transition",
        subtle ? "px-3 py-1 text-xs" : "px-4 py-1.5 text-sm font-medium",
        active ? "border-primary bg-primary text-white" : "border-neutral-200 bg-white text-neutral-600 hover:border-primary hover:text-primary",
      )}
    >
      {label}
      <span className={cn("font-mono text-[11px]", active ? "text-white/80" : "text-neutral-400")}>{count}</span>
    </Link>
  );
}
