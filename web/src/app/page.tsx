import Link from "next/link";
import { listRoadmaps } from "@/lib/api";

export default async function Home() {
  const roadmaps = await listRoadmaps();

  return (
    <div className="mx-auto max-w-5xl px-3 py-10 sm:px-6 sm:py-16">
      <section className="text-center">
        <span className="inline-block rounded-full border border-neutral-200 bg-white/70 px-4 py-1.5 text-xs text-neutral-600 shadow-sm backdrop-blur">
          منصة عربية لتعلّم البرمجة والتقنية
        </span>
        <h1 className="mt-6 text-3xl leading-tight font-bold text-neutral-900 sm:text-5xl">
          ابدأ <span className="font-accent text-[#E8764A]">مسارك</span> في عالم التقنية
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-[1.7] text-neutral-600 sm:text-lg">
          مسارات تعليمية منظمة، مرحلة بمرحلة، تأخذك من الأساسيات إلى الاحتراف.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="#roadmaps"
            className="w-full rounded-full bg-[#E8764A] px-6 py-3 text-sm font-medium text-white shadow-lg shadow-[#E8764A]/30 transition hover:bg-[#d35f35] sm:w-auto"
          >
            استعرض المسارات
          </Link>
          <Link
            href="/quiz"
            className="w-full rounded-full border border-neutral-200 bg-white px-6 py-3 text-sm font-medium text-neutral-800 transition hover:border-[#0F6E56] hover:text-[#0F6E56] sm:w-auto"
          >
            لا تعرف من أين تبدأ؟ جرّب بوصلة المهنة
          </Link>
        </div>
      </section>

      <section
        id="roadmaps"
        className="mt-14 rounded-2xl border border-neutral-100 bg-white p-5 shadow-lg shadow-neutral-900/5 sm:mt-20 sm:rounded-3xl sm:p-8"
      >
        <h2 className="text-sm font-medium text-neutral-500">المسارات المتاحة</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {roadmaps.length === 0 && <p className="text-sm text-neutral-500">لا توجد مسارات متاحة حاليًا.</p>}
          {roadmaps.map((roadmap) => (
            <Link
              key={roadmap.slug}
              href={`/roadmaps/${roadmap.slug}`}
              className="group flex items-center justify-between rounded-2xl border border-neutral-100 bg-neutral-50/60 px-5 py-4 transition hover:border-[#0F6E56] hover:bg-white hover:shadow-md"
            >
              <span className="font-medium text-neutral-900">{roadmap.title.ar}</span>
              <span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-[#0F6E56] shadow-sm ring-1 ring-neutral-100 group-hover:ring-[#0F6E56]/30">
                ${roadmap.price.toFixed(2)}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
