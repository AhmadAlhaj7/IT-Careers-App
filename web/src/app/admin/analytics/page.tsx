import { getAdminAnalytics } from "@/lib/admin-api";
import { AdminForbidden } from "@/components/admin/AdminForbidden";

export default async function AdminAnalyticsPage() {
  const result = await getAdminAnalytics();

  if (result.status === "forbidden") {
    return <AdminForbidden />;
  }

  if (result.status !== "ok") {
    return null;
  }

  const { data } = result;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-semibold text-neutral-900">الإحصائيات</h1>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-neutral-200 p-4 text-center">
          <p className="text-2xl font-semibold text-neutral-900">{data.totalLearners}</p>
          <p className="mt-1 text-xs text-neutral-500">متعلمون</p>
        </div>
        <div className="rounded-lg border border-neutral-200 p-4 text-center">
          <p className="text-2xl font-semibold text-neutral-900">{data.totalEnrollments}</p>
          <p className="mt-1 text-xs text-neutral-500">عمليات شراء</p>
        </div>
        <div className="rounded-lg border border-neutral-200 p-4 text-center">
          <p className="text-2xl font-semibold text-neutral-900">${data.estimatedRevenue.toFixed(2)}</p>
          <p className="mt-1 text-xs text-neutral-500">إيراد تقديري</p>
        </div>
      </div>
      <p className="mt-2 text-xs text-neutral-400">
        الإيراد تقديري: يُحسب من السعر الحالي لكل مسار × عدد المشتركين فيه، وليس السعر الفعلي وقت كل عملية شراء.
      </p>

      <h2 className="mt-10 text-sm font-medium text-neutral-500">المبيعات حسب المسار</h2>
      <div className="mt-3 flex flex-col gap-2">
        {data.roadmapSales.length === 0 && <p className="text-sm text-neutral-500">لا توجد بيانات بعد.</p>}
        {data.roadmapSales.map((sale) => (
          <div
            key={sale.roadmapTitle.ar}
            className="flex items-center justify-between rounded-lg border border-neutral-200 px-4 py-3"
          >
            <span className="font-medium text-neutral-900">{sale.roadmapTitle.ar}</span>
            <span className="text-sm text-neutral-500">
              {sale.enrollmentCount} مشترك · ${sale.estimatedRevenue.toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-sm font-medium text-neutral-500">معدلات إكمال المراحل</h2>
      <p className="mt-1 text-xs text-neutral-400">من بين المشتركين المدفوعين في كل مسار — لتحديد أين يتوقف المتعلمون.</p>
      <div className="mt-3 flex flex-col gap-2">
        {data.phaseCompletionRates.length === 0 && <p className="text-sm text-neutral-500">لا توجد بيانات بعد.</p>}
        {data.phaseCompletionRates.map((rate) => (
          <div key={`${rate.roadmapTitle.ar}-${rate.phaseOrderIndex}`} className="rounded-lg border border-neutral-200 px-4 py-3">
            <div className="flex items-center justify-between">
              <span className="font-medium text-neutral-900">
                {rate.roadmapTitle.ar} · #{rate.phaseOrderIndex} {rate.phaseTitle.ar}
              </span>
              <span className="text-sm text-[#0F6E56]">{Math.round(rate.completionRate * 100)}%</span>
            </div>
            <span className="text-xs text-neutral-400">
              {rate.completedCount} من {rate.enrolledCount} أكملوا هذه المرحلة
            </span>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-sm font-medium text-neutral-500">تحويل بوصلة المهنة إلى شراء</h2>
      <p className="mt-1 text-xs text-neutral-400">فقط الإجابات المرتبطة بمستخدم مسجّل يمكن تتبعها حتى الشراء.</p>
      <div className="mt-3 flex flex-col gap-2">
        {data.trackConversions.length === 0 && <p className="text-sm text-neutral-500">لا توجد بيانات بعد.</p>}
        {data.trackConversions.map((conversion) => (
          <div key={conversion.trackName.ar} className="rounded-lg border border-neutral-200 px-4 py-3">
            <div className="flex items-center justify-between">
              <span className="font-medium text-neutral-900">{conversion.trackName.ar}</span>
              <span className="text-sm text-[#0F6E56]">{Math.round(conversion.conversionRate * 100)}%</span>
            </div>
            <span className="text-xs text-neutral-400">
              {conversion.convertedCount} من {conversion.recommendationCount} اشتروا بعد التوصية
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
