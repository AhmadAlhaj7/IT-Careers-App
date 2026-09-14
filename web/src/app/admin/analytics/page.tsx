import { Users, ShoppingCart, CircleDollarSign } from "lucide-react";
import { getAdminAnalytics } from "@/lib/admin-api";
import { AdminForbidden } from "@/components/admin/AdminForbidden";
import { Card } from "@/components/ui/Card";

function StatCard({ icon: Icon, value, label }: { icon: typeof Users; value: string; label: string }) {
  return (
    <Card padding="md" shadow="subtle" radius="panel" className="text-center">
      <span className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-control bg-primary/10 text-primary">
        <Icon size={18} />
      </span>
      <p dir="ltr" className="font-mono text-2xl font-bold text-neutral-900">
        {value}
      </p>
      <p className="mt-1 text-xs text-neutral-500">{label}</p>
    </Card>
  );
}

function PercentBar({ percent }: { percent: number }) {
  return (
    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
      <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(100, Math.max(0, percent))}%` }} />
    </div>
  );
}

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
    <div className="mx-auto w-full max-w-2xl px-3 py-10 sm:px-6 sm:py-16">
      <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">الإحصائيات</h1>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatCard icon={Users} value={String(data.totalLearners)} label="متعلمون" />
        <StatCard icon={ShoppingCart} value={String(data.totalEnrollments)} label="عمليات شراء" />
        <StatCard icon={CircleDollarSign} value={`$${data.estimatedRevenue.toFixed(2)}`} label="إيراد تقديري" />
      </div>
      <p className="mt-3 text-xs text-neutral-400">
        الإيراد تقديري: يُحسب من السعر الحالي لكل مسار × عدد المشتركين فيه، وليس السعر الفعلي وقت كل عملية شراء.
      </p>

      <h2 className="mt-10 text-sm font-semibold font-accent tracking-wide text-primary">المبيعات حسب المسار</h2>
      <div className="mt-3 flex flex-col gap-2">
        {data.roadmapSales.length === 0 && <p className="text-sm text-neutral-500">لا توجد بيانات بعد.</p>}
        {data.roadmapSales.map((sale) => (
          <Card key={sale.roadmapTitle.ar} padding="sm" shadow="subtle" radius="panel" className="flex items-center justify-between">
            <span className="font-medium text-neutral-900">{sale.roadmapTitle.ar}</span>
            <span dir="ltr" className="font-mono text-sm text-neutral-500">
              {sale.enrollmentCount} مشترك · ${sale.estimatedRevenue.toFixed(2)}
            </span>
          </Card>
        ))}
      </div>

      <h2 className="mt-10 text-sm font-semibold font-accent tracking-wide text-primary">معدلات إكمال المراحل</h2>
      <p className="mt-1 text-xs text-neutral-400">من بين المشتركين المدفوعين في كل مسار — لتحديد أين يتوقف المتعلمون.</p>
      <div className="mt-3 flex flex-col gap-2">
        {data.phaseCompletionRates.length === 0 && <p className="text-sm text-neutral-500">لا توجد بيانات بعد.</p>}
        {data.phaseCompletionRates.map((rate) => (
          <Card key={`${rate.roadmapTitle.ar}-${rate.phaseOrderIndex}`} padding="sm" shadow="subtle" radius="panel">
            <div className="flex items-center justify-between gap-3">
              <span className="font-medium text-neutral-900">
                {rate.roadmapTitle.ar} · #{rate.phaseOrderIndex} {rate.phaseTitle.ar}
              </span>
              <span dir="ltr" className="shrink-0 font-mono text-sm font-bold text-primary">
                {Math.round(rate.completionRate * 100)}%
              </span>
            </div>
            <PercentBar percent={rate.completionRate * 100} />
            <span className="mt-1.5 block text-xs text-neutral-400">
              {rate.completedCount} من {rate.enrolledCount} أكملوا هذه المرحلة
            </span>
          </Card>
        ))}
      </div>

      <h2 className="mt-10 text-sm font-semibold font-accent tracking-wide text-primary">تحويل بوصلة المهنة إلى شراء</h2>
      <p className="mt-1 text-xs text-neutral-400">فقط الإجابات المرتبطة بمستخدم مسجّل يمكن تتبعها حتى الشراء.</p>
      <div className="mt-3 flex flex-col gap-2">
        {data.trackConversions.length === 0 && <p className="text-sm text-neutral-500">لا توجد بيانات بعد.</p>}
        {data.trackConversions.map((conversion) => (
          <Card key={conversion.trackName.ar} padding="sm" shadow="subtle" radius="panel">
            <div className="flex items-center justify-between gap-3">
              <span className="font-medium text-neutral-900">{conversion.trackName.ar}</span>
              <span dir="ltr" className="shrink-0 font-mono text-sm font-bold text-primary">
                {Math.round(conversion.conversionRate * 100)}%
              </span>
            </div>
            <PercentBar percent={conversion.conversionRate * 100} />
            <span className="mt-1.5 block text-xs text-neutral-400">
              {conversion.convertedCount} من {conversion.recommendationCount} اشتروا بعد التوصية
            </span>
          </Card>
        ))}
      </div>
    </div>
  );
}
