import { listAdminWebsiteOrders } from "@/lib/admin-api";
import { deleteWebsiteOrderAction } from "@/app/admin/actions";
import { websiteTypeLabel } from "@/lib/websiteOrderOptions";
import { AdminForbidden } from "@/components/admin/AdminForbidden";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default async function AdminWebsiteOrdersPage() {
  const result = await listAdminWebsiteOrders();

  if (result.status === "forbidden") {
    return <AdminForbidden />;
  }

  const orders = result.status === "ok" ? result.data : [];

  return (
    <div className="mx-auto w-full max-w-3xl px-3 py-10 sm:px-6 sm:py-16">
      <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">طلبات بناء المواقع</h1>
      <p className="mt-1 text-sm text-neutral-500">الطلبات الواردة من صفحة «أبني لك موقعك» العامة.</p>

      <div className="mt-6 flex flex-col gap-3">
        {orders.length === 0 && <p className="text-sm text-neutral-500">لا توجد طلبات بعد.</p>}
        {orders.map((order) => (
          <Card key={order.id} padding="md" shadow="subtle" radius="panel">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-semibold text-neutral-900">{order.fullName}</span>
              <span className="text-xs text-neutral-400">{new Date(order.submittedAt).toLocaleString("ar")}</span>
            </div>

            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-neutral-600">
              <span dir="ltr">{order.phone}</span>
              <span dir="ltr">{order.email}</span>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Badge variant="accent" size="sm">
                {websiteTypeLabel(order.websiteType)}
              </Badge>
              <span className="text-sm font-semibold text-neutral-900">{order.projectName}</span>
            </div>

            <p className="mt-3 border-t border-neutral-100 pt-3 text-sm whitespace-pre-line text-neutral-700">{order.description}</p>

            <p className="mt-2 text-sm text-neutral-600">الوقت المناسب للتواصل: {order.preferredContactTime}</p>

            <div className="mt-3">
              <DeleteButton
                action={deleteWebsiteOrderAction}
                hiddenFields={{ id: order.id }}
                confirmMessage="سيتم حذف هذا الطلب نهائيًا. هل أنت متأكد؟"
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
