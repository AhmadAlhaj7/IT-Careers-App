import { getAdminAnalytics, listRoadmaps } from "@/lib/admin-api";
import { AdminForbidden } from "@/components/admin/AdminForbidden";
import { AdminRoadmapsTable } from "@/components/admin/AdminRoadmapsTable";

export default async function AdminPage() {
  const [roadmapsResult, analyticsResult] = await Promise.all([listRoadmaps(), getAdminAnalytics()]);

  if (roadmapsResult.status === "forbidden") {
    return <AdminForbidden />;
  }

  const roadmaps = roadmapsResult.status === "ok" ? roadmapsResult.data : [];
  const publishedCount = roadmaps.filter((r) => r.status === "Published").length;
  const draftCount = roadmaps.filter((r) => r.status === "Draft").length;
  const activeSubscribers = analyticsResult.status === "ok" ? analyticsResult.data.totalLearners : 0;

  const stats = [
    { label: "إجمالي المسارات", value: roadmaps.length, note: "", color: "#1c1b19" },
    { label: "منشورة", value: publishedCount, note: "مرئية للطلاب", color: "#0F6E56" },
    { label: "مسودات", value: draftCount, note: "بحاجة لإكمال", color: "#E8764A" },
    { label: "مشتركون نشطون", value: activeSubscribers, note: "", color: "#1c1b19" },
  ];

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">المسارات التعليمية</h1>
          <p className="mt-1 text-sm text-neutral-500">أنشئ المسار، رتّب مراحله، وانشره للطلاب.</p>
        </div>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm shadow-neutral-900/5">
            <p className="mb-2 text-xs text-neutral-500">{stat.label}</p>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-2xl font-bold" style={{ color: stat.color }}>
                {stat.value}
              </span>
              {stat.note && <span className="text-xs text-neutral-400">{stat.note}</span>}
            </div>
          </div>
        ))}
      </div>

      <AdminRoadmapsTable roadmaps={roadmaps} />
    </div>
  );
}
