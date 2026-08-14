import Link from "next/link";
import { getAdminAnalytics, listAdminCareerQuizQuestions, listRoadmaps, listSpecializations, listTracks } from "@/lib/admin-api";
import { AdminSidebarNav } from "@/components/admin/AdminSidebarNav";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const [roadmapsResult, specializationsResult, tracksResult, quizQuestionsResult, analyticsResult] = await Promise.all([
    listRoadmaps(),
    listSpecializations(),
    listTracks(),
    listAdminCareerQuizQuestions(),
    getAdminAnalytics(),
  ]);

  const roadmapCount = roadmapsResult.status === "ok" ? roadmapsResult.data.length : null;
  const specializationCount = specializationsResult.status === "ok" ? specializationsResult.data.length : null;
  const trackCount = tracksResult.status === "ok" ? tracksResult.data.length : null;
  const quizQuestionCount = quizQuestionsResult.status === "ok" ? quizQuestionsResult.data.length : null;
  const analytics = analyticsResult.status === "ok" ? analyticsResult.data : null;

  const navItems = [
    { href: "/admin", label: "المسارات", count: roadmapCount },
    { href: "/admin/specializations", label: "التخصصات", count: specializationCount },
    { href: "/admin/tracks", label: "المسارات الرئيسية", count: trackCount },
    { href: "/admin/career-quiz-questions", label: "بوصلة المهنة", count: quizQuestionCount },
    { href: "/admin/analytics", label: "الإحصائيات", count: null },
  ];

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-8 lg:grid-cols-[250px_1fr] lg:items-start">
      <aside className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-lg shadow-neutral-900/5 lg:sticky lg:top-6">
        <Link
          href="/admin/roadmaps/new"
          className="mb-4 block w-full rounded-xl bg-[#0F6E56] px-4 py-3 text-center text-sm font-bold text-white transition active:scale-95"
        >
          + مسار جديد
        </Link>

        <p className="px-3 pb-2 text-xs font-semibold tracking-wide text-neutral-400">إدارة المحتوى</p>
        <AdminSidebarNav items={navItems} />

        {analytics && (
          <div className="mt-4 border-t border-neutral-100 pt-4">
            <p className="px-3 pb-2 text-xs font-semibold tracking-wide text-neutral-400">هذا الأسبوع</p>
            <div className="flex flex-col gap-2 px-3">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-neutral-600">اشتراكات جديدة</span>
                <span className="font-mono text-sm font-bold text-[#0F6E56]">{analytics.newEnrollmentsThisWeek}</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-neutral-600">شهادات صدرت</span>
                <span className="font-mono text-sm font-bold text-[#0F6E56]">{analytics.certificatesIssuedThisWeek}</span>
              </div>
            </div>
          </div>
        )}
      </aside>

      <div className="min-w-0">{children}</div>
    </div>
  );
}
