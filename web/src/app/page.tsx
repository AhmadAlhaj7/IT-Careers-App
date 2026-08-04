import Link from "next/link";
import { listRoadmaps } from "@/lib/api";

export default async function Home() {
  const roadmaps = await listRoadmaps();

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <section className="text-center">
        <h1 className="text-3xl font-semibold leading-tight text-neutral-900">
          ابدأ مسارك في عالم التقنية
        </h1>
        <p className="mt-4 text-lg leading-[1.7] text-neutral-600">
          مسارات تعليمية منظمة، مرحلة بمرحلة، تأخذك من الأساسيات إلى الاحتراف.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-sm font-medium text-neutral-500">المسارات المتاحة</h2>
        <div className="mt-3 flex flex-col gap-3">
          {roadmaps.length === 0 && (
            <p className="text-sm text-neutral-500">لا توجد مسارات متاحة حاليًا.</p>
          )}
          {roadmaps.map((roadmap) => (
            <Link
              key={roadmap.slug}
              href={`/roadmaps/${roadmap.slug}`}
              className="flex items-center justify-between rounded-lg border border-neutral-200 px-5 py-4 transition-colors hover:border-[#0F6E56]"
            >
              <span className="font-medium text-neutral-900">{roadmap.title.ar}</span>
              <span className="text-sm text-[#0F6E56]">${roadmap.price.toFixed(2)}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
