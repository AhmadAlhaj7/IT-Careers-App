import type { AdminSpecializationDetail } from "@/lib/types";

const MIN_FAQS_RECOMMENDED = 3;

// A real, computed checklist from the already-loaded specialization — not the mockup's
// static example, same spirit as RoadmapReadinessSidebar.
export function SpecializationReadinessSidebar({ specialization }: { specialization: AdminSpecializationDetail }) {
  const hasAnyQuickFact = Boolean(
    specialization.demandQuickFact?.ar || specialization.salaryQuickFact?.ar || specialization.timeToJobQuickFact?.ar || specialization.difficultyQuickFact?.ar,
  );

  const checklist = [
    { label: "الاسم والملخّص بالعربية", done: specialization.name.ar.length > 0 && specialization.summary.ar.length > 0 },
    { label: "صورة الغلاف", done: !!specialization.coverImageUrl },
    { label: "بطاقة معلومات سريعة واحدة على الأقل", done: hasAnyQuickFact },
    {
      label: `${MIN_FAQS_RECOMMENDED} أسئلة شائعة على الأقل`,
      done: specialization.faqs.filter((f) => f.question.ar.length > 0).length >= MIN_FAQS_RECOMMENDED,
    },
    { label: "مربوطة بمسار", done: !!specialization.linkedRoadmapId },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm shadow-neutral-900/5">
        <p className="mb-1 text-sm font-bold text-neutral-900">جاهزية النشر</p>
        <p className="mb-3 text-xs text-neutral-500">صفحة مقنعة تحتوي على هذه العناصر</p>
        <div className="flex flex-col gap-2.5">
          {checklist.map((item) => (
            <div key={item.label} className="flex items-center gap-2.5">
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${item.done ? "bg-[#0F6E56]/15" : "bg-[#E8764A]/15"}`}
              >
                {item.done ? (
                  <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="#0F6E56" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E8764A]" />
                )}
              </span>
              <span className={`text-sm ${item.done ? "text-neutral-600" : "text-neutral-800"}`}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-[#5B3FC4]/25 bg-[#5B3FC4]/[0.06] p-5">
        <p className="mb-1.5 text-sm font-bold text-[#4a32a8]">نصيحة تحرير</p>
        <p className="text-xs leading-[1.85] text-[#5a4a92]">
          اكتب كأنك تشرح لابن عمك في الثانوية: جملة قصيرة، مثال ملموس، وبدون مصطلح إنجليزي بلا تفسير. الصفحة هدفها القرار، لا التعليم.
        </p>
      </div>
    </div>
  );
}
