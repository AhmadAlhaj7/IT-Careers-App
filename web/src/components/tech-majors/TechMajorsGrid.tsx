"use client";

import { useMemo, useState } from "react";
import { SpecializationCard } from "./SpecializationCard";
import { CATEGORY_LABELS } from "@/lib/specializationLabels";
import type { Locale } from "@/lib/i18n/locale";
import type { SpecializationCategory, SpecializationSummary } from "@/lib/types";

const CATEGORIES: SpecializationCategory[] = ["Development", "Data", "Security", "Infrastructure"];

type TechMajorsGridProps = {
  specializations: SpecializationSummary[];
  locale: Locale;
  filterAllLabel: string;
  countSuffix: string;
  exploreMoreLabel: string;
  readMinutesSuffix: string;
  emptyLabel: string;
  emptyFilteredLabel: string;
};

// Client-only for the filter-pill state — same local useState pattern as
// AdminRoadmapsTable's status filter, no URL params needed for a dataset this small.
export function TechMajorsGrid({
  specializations,
  locale,
  filterAllLabel,
  countSuffix,
  exploreMoreLabel,
  readMinutesSuffix,
  emptyLabel,
  emptyFilteredLabel,
}: TechMajorsGridProps) {
  const [filter, setFilter] = useState<SpecializationCategory | "All">("All");

  const filtered = useMemo(() => {
    return filter === "All" ? specializations : specializations.filter((s) => s.category === filter);
  }, [specializations, filter]);

  return (
    <div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <span className="text-sm text-neutral-500">
          {specializations.length} {countSuffix}
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setFilter("All")}
            className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition ${
              filter === "All" ? "bg-neutral-900 text-white" : "border border-neutral-200 text-neutral-600 hover:bg-neutral-50"
            }`}
          >
            {filterAllLabel}
          </button>
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition ${
                filter === category ? "bg-neutral-900 text-white" : "border border-neutral-200 text-neutral-600 hover:bg-neutral-50"
              }`}
            >
              {CATEGORY_LABELS[category][locale]}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-sm text-neutral-500">{filter === "All" ? emptyLabel : emptyFilteredLabel}</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((specialization) => (
            <SpecializationCard
              key={specialization.slug}
              specialization={specialization}
              locale={locale}
              exploreMoreLabel={exploreMoreLabel}
              readMinutesSuffix={readMinutesSuffix}
            />
          ))}
        </div>
      )}
    </div>
  );
}
