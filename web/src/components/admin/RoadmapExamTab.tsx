import Link from "next/link";
import { deleteFinalExamQuestionAction } from "@/app/admin/actions";
import { DeleteButton } from "./DeleteButton";
import type { AdminFinalExamQuestion } from "@/lib/types";

const RECOMMENDED_MIN_QUESTIONS = 10;

type RoadmapExamTabProps = {
  roadmapId: string;
  passThresholdPercent: number;
  pending: boolean;
  questions: AdminFinalExamQuestion[];
};

// The pass-threshold input below joins the Details tab's form via the `form` attribute (see
// RoadmapEditor.tsx) — it's a real per-roadmap setting (FinalExamSubmissionService now reads
// it instead of a hardcoded global constant). Duration/attempt-limit fields from the original
// design were deliberately dropped: neither is enforced anywhere, so shipping inputs for them
// would just be misleading.
export function RoadmapExamTab({ roadmapId, passThresholdPercent, pending, questions }: RoadmapExamTabProps) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className="flex flex-col gap-4">
        <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm shadow-neutral-900/5">
          <h2 className="text-lg font-bold text-neutral-900">إعدادات الاختبار النهائي</h2>
          <p className="mt-1 mb-4 text-sm text-neutral-500">يُفتح للطالب بعد إنهاء كل المراحل، ونجاحه يُصدر الشهادة تلقائياً.</p>

          <label className="flex max-w-xs flex-col gap-1">
            <span className="text-sm font-medium text-neutral-700">نسبة النجاح</span>
            <div className="flex items-center rounded-md border border-neutral-300">
              <input
                form="roadmap-details-form"
                name="passThresholdPercent"
                type="number"
                min="1"
                max="100"
                required
                disabled={pending}
                dir="ltr"
                defaultValue={passThresholdPercent}
                className="w-full rounded-md bg-transparent px-3 py-2 text-sm"
              />
              <span className="ps-1 pe-3 text-sm text-neutral-400">%</span>
            </div>
            <span className="text-xs text-neutral-400">الحد الأدنى من الإجابات الصحيحة للنجاح والحصول على الشهادة.</span>
          </label>
        </div>

        <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm shadow-neutral-900/5">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-neutral-900">بنك الأسئلة</h2>
              <p className="text-sm text-neutral-500">
                {questions.length} من {RECOMMENDED_MIN_QUESTIONS} سؤالاً موصى بها
              </p>
            </div>
            <Link
              href={`/admin/roadmaps/${roadmapId}/final-exam-questions/new`}
              className="rounded-lg border border-[#0F6E56]/35 bg-[#0F6E56]/5 px-3 py-2 text-sm font-bold text-[#0F6E56] transition active:scale-95"
            >
              + سؤال جديد
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {questions.length === 0 && <p className="py-6 text-center text-sm text-neutral-500">لا توجد أسئلة بعد.</p>}
            {questions.map((question, index) => (
              <div key={question.id} className="rounded-xl border border-neutral-200 bg-neutral-50/60 p-4">
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-white font-mono text-xs font-bold text-neutral-500">
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="mb-2.5 font-medium text-neutral-900">{question.text.ar}</p>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                            option.isCorrect ? "border-[#0F6E56]/35 bg-[#0F6E56]/5 text-[#0F6E56]" : "border-neutral-200 bg-white text-neutral-600"
                          }`}
                        >
                          <span
                            className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border-2 ${
                              option.isCorrect ? "border-[#0F6E56]" : "border-neutral-300"
                            }`}
                          >
                            {option.isCorrect && <span className="h-1.5 w-1.5 rounded-full bg-[#0F6E56]" />}
                          </span>
                          {option.text.ar}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Link
                      href={`/admin/roadmaps/${roadmapId}/final-exam-questions/${question.id}/edit`}
                      className="rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-neutral-700"
                    >
                      تحرير
                    </Link>
                    <DeleteButton
                      action={deleteFinalExamQuestionAction}
                      hiddenFields={{ id: question.id, roadmapId }}
                      confirmMessage="سيتم حذف هذا السؤال نهائيًا. هل أنت متأكد؟"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="rounded-2xl bg-[#0F6E56] p-5 text-[#eef5f2]">
          <p className="mb-2.5 text-xs font-semibold tracking-wide text-white/60">الشهادة</p>
          <p className="mb-2 text-base font-bold text-white">تصدر تلقائياً عند النجاح</p>
          <p className="mb-4 text-xs leading-[1.85] text-white/80">
            تحمل اسم الطالب واسم المسار ورقم تحقّق عام. لا حاجة لأي إجراء يدوي منك.
          </p>
          <div dir="ltr" className="rounded-lg bg-black/15 px-3.5 py-3 font-mono text-[11px] text-white/90">
            /certificates/ITC-8F2K-4Q
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm shadow-neutral-900/5">
          <p className="mb-3 text-sm font-bold text-neutral-900">حالة الاختبار</p>
          <div className="flex items-baseline justify-between text-sm">
            <span className="text-neutral-600">أسئلة مضافة</span>
            <span className="font-mono font-bold text-[#E8764A]">
              {questions.length} / {RECOMMENDED_MIN_QUESTIONS}
            </span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-neutral-100">
            <div
              className="h-full rounded-full bg-[#E8764A]"
              style={{ width: `${Math.min(100, Math.round((questions.length / RECOMMENDED_MIN_QUESTIONS) * 100))}%` }}
            />
          </div>
          <p className="mt-2.5 text-xs leading-[1.7] text-neutral-500">
            هذا رقم موصى به وليس شرطاً — الاختبار يعمل بأي عدد أسئلة أضفته.
          </p>
        </div>
      </div>
    </div>
  );
}
