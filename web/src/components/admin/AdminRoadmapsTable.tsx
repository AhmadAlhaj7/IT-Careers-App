"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { paletteFor } from "@/lib/cardPalette";
import { formatRelativeTimeAr } from "@/lib/relativeTime";
import type { AdminRoadmapSummary } from "@/lib/types";

const FILTERS = [
  { label: "الكل", status: null },
  { label: "منشور", status: "Published" as const },
  { label: "مسودة", status: "Draft" as const },
];

export function AdminRoadmapsTable({ roadmaps }: { roadmaps: AdminRoadmapSummary[] }) {
  const [query, setQuery] = useState("");
  const [filterIndex, setFilterIndex] = useState(0);

  const filtered = useMemo(() => {
    const status = FILTERS[filterIndex].status;
    const q = query.trim().toLowerCase();
    return roadmaps.filter((r) => {
      if (status && r.status !== status) {
        return false;
      }
      if (q.length === 0) {
        return true;
      }
      return r.title.ar.toLowerCase().includes(q) || r.slug.toLowerCase().includes(q);
    });
  }, [roadmaps, query, filterIndex]);

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-lg shadow-neutral-900/5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 p-4">
        <div className="flex max-w-sm flex-1 items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#a8a29a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="ابحث باسم المسار أو الرابط المختصر"
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
        <div className="flex gap-2">
          {FILTERS.map((f, index) => (
            <button
              key={f.label}
              type="button"
              onClick={() => setFilterIndex(index)}
              className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                filterIndex === index ? "bg-neutral-900 text-white" : "border border-neutral-200 text-neutral-600 hover:bg-neutral-50"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="hidden grid-cols-[2.4fr_0.9fr_0.7fr_0.8fr_1fr_auto] gap-4 border-b border-neutral-100 bg-neutral-50/70 px-4 py-3 text-xs font-semibold text-neutral-500 sm:grid">
        <span>المسار</span>
        <span>الحالة</span>
        <span>السعر</span>
        <span>المراحل</span>
        <span>آخر تعديل</span>
        <span />
      </div>

      {filtered.length === 0 && <p className="p-6 text-center text-sm text-neutral-500">لا توجد مسارات مطابقة.</p>}

      {filtered.map((roadmap) => {
        const { tint, accent } = paletteFor(roadmap.slug);
        return (
          <div
            key={roadmap.id}
            className="grid grid-cols-1 items-center gap-3 border-b border-neutral-100 px-4 py-4 last:border-b-0 hover:bg-neutral-50/60 sm:grid-cols-[2.4fr_0.9fr_0.7fr_0.8fr_1fr_auto] sm:gap-4"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: tint }}>
                <div
                  className="h-5 w-5 rounded-full"
                  style={{ border: `4px solid ${accent}`, borderInlineStart: "4px solid rgba(28,27,25,.12)", transform: "rotate(-30deg)" }}
                />
              </div>
              <div className="min-w-0">
                <p className="truncate font-semibold text-neutral-900">{roadmap.title.ar}</p>
                <p dir="ltr" className="truncate font-mono text-xs text-neutral-400">
                  /{roadmap.slug}
                </p>
              </div>
            </div>

            <span
              className={`w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${
                roadmap.status === "Published" ? "bg-[#0F6E56]/10 text-[#0F6E56]" : "bg-[#E8764A]/10 text-[#E8764A]"
              }`}
            >
              {roadmap.status === "Published" ? "منشور" : "مسودة"}
            </span>

            <span dir="ltr" className="font-mono text-sm font-bold text-[#0F6E56]">
              ${roadmap.price.toFixed(2)}
            </span>

            <span className="text-sm text-neutral-600">{roadmap.phaseCount} مراحل</span>

            <span className="text-xs text-neutral-500">{formatRelativeTimeAr(roadmap.updatedAt)}</span>

            <Link
              href={`/admin/roadmaps/${roadmap.id}`}
              className="w-fit rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-50"
            >
              تعديل
            </Link>
          </div>
        );
      })}

      <Link
        href="/admin/roadmaps/new"
        className="block border-t border-dashed border-neutral-200 p-4 text-center text-sm font-semibold text-[#0F6E56] transition hover:bg-neutral-50"
      >
        + أضف مساراً جديداً
      </Link>
    </div>
  );
}
