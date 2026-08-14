import { SPECIALIZATION_SECTION_DEFS } from "@/lib/specializationSections";
import type { AdminSpecializationDetail } from "@/lib/types";

// "As the visitor will read it" — the fixed page structure, with the 9 toggleable sections
// struck through when disabled. The 4 non-toggleable slots (quick facts, media, FAQ, the
// roadmap button) are always shown as active — they're not on/off switches, they just render
// conditionally on the real public page depending on whether their content is filled in.
export function SpecializationOutlinePanel({ specialization }: { specialization: AdminSpecializationDetail }) {
  const items = [
    { label: "الملخّص والمعلومات السريعة", on: true },
    ...SPECIALIZATION_SECTION_DEFS.map((def) => ({
      label: def.defaultTitle,
      on: specialization.sections.find((s) => s.key === def.key)?.enabled ?? true,
    })),
    { label: "فيديو و PDF", on: true },
    { label: "الأسئلة الشائعة", on: true },
    { label: "زر الانتقال إلى المسار", on: true },
  ];

  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm shadow-neutral-900/5">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-bold text-neutral-900">ترتيب الصفحة</span>
        <span className="text-xs text-neutral-400">كما سيقرأها الزائر</span>
      </div>
      <div className="flex flex-col gap-1.5">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2.5">
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md font-mono text-[10.5px] font-bold ${
                item.on ? "bg-[#0F6E56]/10 text-[#0F6E56]" : "bg-neutral-100 text-neutral-300"
              }`}
            >
              {index + 1}
            </span>
            <span className={`text-sm ${item.on ? "text-neutral-600" : "text-neutral-300 line-through"}`}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
