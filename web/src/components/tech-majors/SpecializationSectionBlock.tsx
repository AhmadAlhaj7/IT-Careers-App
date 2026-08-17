import type { Locale } from "@/lib/i18n/locale";
import { localize } from "@/lib/localize";
import type { SpecializationSection } from "@/lib/types";

type SpecializationSectionBlockProps = {
  section: SpecializationSection;
  index: number;
  locale: Locale;
};

// An enabled section with no title/body/items typed in yet (default state right after
// creation) shouldn't render as an empty numbered heading — callers filter with this first,
// which also keeps the visible numbering sequential (no gaps from skipped empty sections).
// Checks the Arabic content specifically (not the viewing locale) — section text isn't marked
// required in the admin editor, so an admin filling only Arabic shouldn't make the section
// vanish for English readers, same "always-truthy object, per-locale text" pattern already
// used for Roadmap.description elsewhere in the app.
export function hasSectionContent(section: SpecializationSection): boolean {
  return section.title.ar.length > 0 || section.body.ar.length > 0 || section.items.length > 0;
}

// One shared renderer for all 9 section shapes (the design's per-section visualizations —
// salary progress bars, a pros/cons two-column split — need structured sub-fields the CMS's
// generic Title/Body item pairs don't carry, so every section's items render through this
// same uniform grid instead of 9 special-cased layouts).
export function SpecializationSectionBlock({ section, index, locale }: SpecializationSectionBlockProps) {
  const title = localize(section.title, locale);
  const body = localize(section.body, locale);

  return (
    <div className="mt-12">
      <div className="flex items-center gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0F6E56]/10 font-mono text-xs font-bold text-[#0F6E56]">
          {index}
        </span>
        {title.length > 0 && <h2 className="text-xl font-bold text-neutral-900 sm:text-2xl">{title}</h2>}
      </div>

      {body.length > 0 && <p className="mt-3 max-w-2xl text-sm leading-[1.9] text-neutral-600 sm:text-base">{body}</p>}

      {section.items.length > 0 && (
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {section.items.map((item, itemIndex) => {
            const itemTitle = localize(item.title, locale);
            const itemBody = localize(item.body, locale);
            return (
              <div key={itemIndex} className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm shadow-neutral-900/5">
                <p className="text-sm font-semibold text-neutral-900">{itemTitle}</p>
                {itemBody.length > 0 && <p className="mt-1.5 text-sm leading-[1.7] text-neutral-600">{itemBody}</p>}
              </div>
            );
          })}
        </div>
      )}

      {section.imageUrl && (
        <figure className="mt-5">
          {/* eslint-disable-next-line @next/next/no-img-element -- admin-supplied external URL */}
          <img src={section.imageUrl} alt="" className="w-full rounded-2xl border border-neutral-100 object-cover" />
          {section.imageCaption && localize(section.imageCaption, locale).length > 0 && (
            <figcaption className="mt-2 text-xs text-neutral-500">{localize(section.imageCaption, locale)}</figcaption>
          )}
        </figure>
      )}
    </div>
  );
}
