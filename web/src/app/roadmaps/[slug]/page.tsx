import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getFinalExam, getRoadmap } from "@/lib/api";
import { PhaseListItem } from "@/components/roadmaps/PhaseListItem";
import { BackLink } from "@/components/layout/BackLink";
import { BuyButton } from "@/components/roadmaps/BuyButton";
import { FinalExamForm } from "@/components/roadmaps/FinalExamForm";

export default async function RoadmapPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [roadmap, { userId }] = await Promise.all([getRoadmap(slug), auth()]);

  if (!roadmap) {
    notFound();
  }

  const examResult = await getFinalExam(slug);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <BackLink href="/" label="الرئيسية" />
      <h1 className="mt-2 text-2xl font-semibold text-neutral-900">{roadmap.title.ar}</h1>
      <p className="mt-2 text-lg text-[#0F6E56]">${roadmap.price.toFixed(2)}</p>

      {roadmap.paddlePriceId && (
        <div className="mt-4">
          <BuyButton paddlePriceId={roadmap.paddlePriceId} roadmapId={roadmap.id} userId={userId} />
        </div>
      )}

      <h2 className="mt-10 text-sm font-medium text-neutral-500">المراحل</h2>
      <div className="mt-3 flex flex-col gap-3">
        {roadmap.phases.map((phase) => (
          <PhaseListItem
            key={phase.orderIndex}
            roadmapSlug={roadmap.slug}
            orderIndex={phase.orderIndex}
            title={phase.title}
          />
        ))}
      </div>

      {examResult.status === "granted" && examResult.questions.length > 0 && (
        <div className="mt-10">
          <FinalExamForm slug={roadmap.slug} questions={examResult.questions} />
        </div>
      )}

      {examResult.status === "locked" && userId && (
        <div className="mt-10 rounded-lg border border-neutral-200 p-6 text-center">
          <p className="text-sm text-neutral-600">أكمل الاشتراك في المسار للوصول إلى الامتحان النهائي والحصول على شهادتك.</p>
        </div>
      )}
    </div>
  );
}
