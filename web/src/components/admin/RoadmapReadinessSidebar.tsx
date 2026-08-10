import { paletteFor } from "@/lib/cardPalette";
import { Logo } from "@/components/layout/Logo";
import type { AdminRoadmapDetail } from "@/lib/types";

const RECOMMENDED_MIN_QUESTIONS = 10;

// The "as of last save" preview + readiness checklist are both computed straight from the
// already-loaded roadmap — no live-as-you-type reactivity (that would need converting the
// form to controlled client state, not worth it for a sidebar preview panel).
export function RoadmapReadinessSidebar({ roadmap }: { roadmap: AdminRoadmapDetail }) {
  const { tint } = paletteFor(roadmap.slug);

  const checklist = [
    { label: "العنوان والوصف بالعربية", done: roadmap.title.ar.length > 0 && !!roadmap.description?.ar },
    { label: "صورة المسار", done: !!roadmap.imageUrl },
    { label: `${roadmap.phases.length} ${roadmap.phases.length === 1 ? "مرحلة" : "مراحل"} مرتّبة`, done: roadmap.phases.length > 0 },
    {
      label: `${RECOMMENDED_MIN_QUESTIONS} سؤالاً للاختبار النهائي على الأقل`,
      done: roadmap.finalExamQuestions.length >= RECOMMENDED_MIN_QUESTIONS,
    },
    { label: "السعر ومعرّف Paddle", done: roadmap.price > 0 && !!roadmap.paddlePriceId },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm shadow-neutral-900/5">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-bold text-neutral-900">معاينة البطاقة</span>
          <span className="text-xs text-neutral-400">كما آخر حفظ</span>
        </div>
        <div className="overflow-hidden rounded-xl border border-neutral-100 shadow-sm">
          <div className="relative flex h-28 items-center justify-center" style={{ backgroundColor: tint }}>
            {roadmap.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element -- admin-supplied external URL
              <img src={roadmap.imageUrl} alt="" className="h-full w-full object-contain p-3" />
            ) : (
              <div className="rounded-xl bg-white p-2.5 shadow-sm">
                <Logo size={26} />
              </div>
            )}
            <span className="absolute bottom-2 start-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-neutral-600">
              {roadmap.phases.length} مراحل
            </span>
          </div>
          <div className="p-3">
            <div className="mb-1 flex items-baseline justify-between gap-2">
              <span className="truncate text-sm font-bold text-neutral-900">{roadmap.title.ar || "بلا عنوان"}</span>
              <span dir="ltr" className="shrink-0 font-mono text-sm font-bold text-[#0F6E56]">
                ${roadmap.price.toFixed(2)}
              </span>
            </div>
            {roadmap.description?.ar && <p className="line-clamp-2 text-xs text-neutral-500">{roadmap.description.ar}</p>}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm shadow-neutral-900/5">
        <p className="mb-1 text-sm font-bold text-neutral-900">جاهزية النشر</p>
        <p className="mb-3 text-xs text-neutral-500">أكمل العناصر التالية قبل النشر</p>
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
    </div>
  );
}
