"use client";

import { useState } from "react";
import { LocalizedTextInput } from "./LocalizedTextInput";
import { MAX_SECTION_ITEMS, SPECIALIZATION_SECTION_DEFS } from "@/lib/specializationSections";
import type { AdminSpecializationDetail, SpecializationSectionKey } from "@/lib/types";

// Every field here is a plain descendant of the page's single <form> (no tab-hiding, unlike
// RoadmapEditor), so no `form=` attribute juggling is needed — nesting alone is enough.
export function SpecializationSectionsFieldset({ specialization, pending }: { specialization: AdminSpecializationDetail; pending: boolean }) {
  const [openKey, setOpenKey] = useState<SpecializationSectionKey | "">(SPECIALIZATION_SECTION_DEFS[0].key);
  const activeCount = specialization.sections.filter((s) => s.enabled).length;

  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm shadow-neutral-900/5">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-neutral-900">أقسام الصفحة</h2>
          <p className="mt-1 text-sm text-neutral-500">فعّل ما تحتاجه فقط، وأطفئ الباقي — كل قسم مطفأ يختفي من الصفحة تماماً.</p>
        </div>
        <span className="text-xs text-neutral-500">
          {activeCount} من {SPECIALIZATION_SECTION_DEFS.length} أقسام مفعّلة
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {SPECIALIZATION_SECTION_DEFS.map((def, index) => {
          const section = specialization.sections.find((s) => s.key === def.key);
          const open = openKey === def.key;
          const prefix = `section_${def.key}_`;

          return (
            <div key={def.key} className={`overflow-hidden rounded-xl border ${open ? "border-[#0F6E56]/40" : "border-neutral-200"}`}>
              <div className={`flex items-center gap-3 px-4 py-3 ${open ? "bg-white" : "bg-neutral-50/70"}`}>
                <button
                  type="button"
                  onClick={() => setOpenKey(open ? "" : def.key)}
                  className="flex min-w-0 flex-1 items-center gap-3 text-start"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-white font-mono text-xs font-bold text-[#0F6E56]">
                    {index + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-neutral-900">{def.defaultTitle}</span>
                    <span className="block truncate text-xs text-neutral-500">{def.hint}</span>
                  </span>
                </button>

                {def.hasImage && (
                  <span className="hidden shrink-0 rounded-full bg-[#5B3FC4]/10 px-2.5 py-1 text-[11px] font-semibold text-[#5B3FC4] sm:inline">
                    يدعم صورة
                  </span>
                )}
                {def.required && (
                  <span className="hidden shrink-0 rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-semibold text-neutral-500 sm:inline">
                    إلزامي
                  </span>
                )}

                <label className="relative inline-flex shrink-0 cursor-pointer items-center">
                  <input
                    type="checkbox"
                    name={`${prefix}enabled`}
                    defaultChecked={section?.enabled ?? true}
                    disabled={pending}
                    className="peer sr-only"
                  />
                  <span className="h-[25px] w-[44px] rounded-full bg-neutral-200 transition peer-checked:bg-[#0F6E56]" />
                  <span className="absolute start-[3px] h-[19px] w-[19px] rounded-full bg-white shadow transition peer-checked:translate-x-[19px] rtl:peer-checked:-translate-x-[19px]" />
                </label>

                <button
                  type="button"
                  onClick={() => setOpenKey(open ? "" : def.key)}
                  aria-label={open ? "طيّ القسم" : "فتح القسم"}
                  className="flex h-6 w-6 shrink-0 items-center justify-center text-neutral-400"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="12"
                    height="12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .15s ease" }}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              </div>

              {open && (
                <div className="flex flex-col gap-4 border-t border-neutral-100 bg-neutral-50/40 p-4">
                  <fieldset disabled={pending} className="flex flex-col gap-4">
                    <LocalizedTextInput
                      label="عنوان القسم كما يظهر للزائر"
                      name={`${prefix}title`}
                      defaultValue={section?.title ?? { ar: def.defaultTitle, en: "" }}
                    />
                    <div className="flex flex-col gap-1">
                      <LocalizedTextInput label="النص" name={`${prefix}body`} defaultValue={section?.body ?? undefined} multiline />
                      <span className="text-xs text-neutral-400">{def.writeHint}</span>
                    </div>

                    {def.hasList && (
                      <div>
                        <span className="text-sm font-medium text-neutral-700">العناصر (اختياري)</span>
                        <div className="mt-2 flex flex-col gap-3">
                          {Array.from({ length: MAX_SECTION_ITEMS }, (_, itemIndex) => (
                            <div key={itemIndex} className="grid grid-cols-1 gap-2 rounded-lg border border-neutral-200 bg-white p-3 sm:grid-cols-2">
                              <LocalizedTextInput
                                label={`عنصر ${itemIndex + 1} — العنوان`}
                                name={`${prefix}item${itemIndex}Title`}
                                defaultValue={section?.items[itemIndex]?.title}
                              />
                              <LocalizedTextInput
                                label={`عنصر ${itemIndex + 1} — الشرح`}
                                name={`${prefix}item${itemIndex}Body`}
                                defaultValue={section?.items[itemIndex]?.body}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {def.hasImage && (
                      <div>
                        <span className="text-sm font-medium text-neutral-700">صورة توضيحية (اختياري)</span>
                        <input type="hidden" name={`${prefix}currentImageUrl`} value={section?.imageUrl ?? ""} />
                        {section?.imageUrl && (
                          <div className="mt-2 flex items-center gap-3">
                            {/* eslint-disable-next-line @next/next/no-img-element -- admin-supplied external URL */}
                            <img src={section.imageUrl} alt="" className="h-16 w-24 rounded-lg border border-neutral-200 bg-white object-contain p-1" />
                            <label className="flex items-center gap-2 text-xs text-neutral-600">
                              <input name={`${prefix}removeImage`} type="checkbox" className="h-4 w-4" />
                              إزالة الصورة
                            </label>
                          </div>
                        )}
                        <input
                          name={`${prefix}imageFile`}
                          type="file"
                          accept="image/*"
                          className="mt-2 rounded-md border border-neutral-300 px-3 py-2 text-sm file:me-3 file:rounded-md file:border-0 file:bg-neutral-100 file:px-3 file:py-1.5 file:text-sm file:font-medium"
                        />
                        <div className="mt-2">
                          <LocalizedTextInput
                            label="شرح الصورة (يظهر تحتها)"
                            name={`${prefix}imageCaption`}
                            defaultValue={section?.imageCaption ?? undefined}
                          />
                        </div>
                      </div>
                    )}
                  </fieldset>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
