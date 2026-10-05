import { listAdminConsultationBookings } from "@/lib/admin-api";
import { deleteConsultationBookingAction } from "@/app/admin/actions";
import { AdminForbidden } from "@/components/admin/AdminForbidden";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default async function AdminConsultationBookingsPage() {
  const result = await listAdminConsultationBookings();

  if (result.status === "forbidden") {
    return <AdminForbidden />;
  }

  const bookings = result.status === "ok" ? result.data : [];

  return (
    <div className="mx-auto w-full max-w-3xl px-3 py-10 sm:px-6 sm:py-16">
      <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">طلبات حجز الاستشارة</h1>
      <p className="mt-1 text-sm text-neutral-500">التسجيلات الواردة من صفحة حجز الاستشارة العامة.</p>

      <div className="mt-6 flex flex-col gap-3">
        {bookings.length === 0 && <p className="text-sm text-neutral-500">لا توجد طلبات بعد.</p>}
        {bookings.map((booking) => (
          <Card key={booking.id} padding="md" shadow="subtle" radius="panel">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-semibold text-neutral-900">{booking.fullName}</span>
              <span className="text-xs text-neutral-400">{new Date(booking.submittedAt).toLocaleString("ar")}</span>
            </div>

            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-neutral-600">
              <span dir="ltr">{booking.phone}</span>
              <span dir="ltr">{booking.email}</span>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant={booking.hasPriorExperience ? "primary" : "neutral"} size="sm">
                {booking.hasPriorExperience ? "لديه خبرة سابقة" : "بدون خبرة سابقة"}
              </Badge>
            </div>

            {booking.websiteIdea && (
              <p className="mt-3 border-t border-neutral-100 pt-3 text-sm text-neutral-700">
                <span className="font-semibold text-neutral-900">فكرة الموقع: </span>
                {booking.websiteIdea}
              </p>
            )}

            <p className="mt-2 text-sm text-neutral-600">الوقت المناسب للتواصل: {booking.preferredContactTime}</p>

            <div className="mt-3">
              <DeleteButton
                action={deleteConsultationBookingAction}
                hiddenFields={{ id: booking.id }}
                confirmMessage="سيتم حذف هذا الطلب نهائيًا. هل أنت متأكد؟"
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
