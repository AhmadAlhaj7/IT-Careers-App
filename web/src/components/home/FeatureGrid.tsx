import type { Dictionary } from "@/lib/i18n/dictionaries";

type FeatureGridProps = {
  dict: Dictionary["homePage"];
};

const FEATURE_STYLE = [
  { tint: "rgba(15,110,86,.10)", mark: "#0F6E56" },
  { tint: "rgba(232,118,74,.12)", mark: "#E8764A" },
  { tint: "rgba(91,63,196,.10)", mark: "#5B3FC4" },
  { tint: "rgba(15,110,86,.10)", mark: "#0F6E56" },
  { tint: "rgba(232,118,74,.12)", mark: "#E8764A" },
  { tint: "rgba(91,63,196,.10)", mark: "#5B3FC4" },
] as const;

// Every claim here is checked against what the product actually does. The original design's
// "مشاريع تُراجَع" (projects get reviewed by an engineer) card was reworded — there's no
// student-submission/review system anywhere in the app, so that specific claim was false.
export function FeatureGrid({ dict }: FeatureGridProps) {
  const features = [
    { title: dict.feature1Title, body: dict.feature1Body },
    { title: dict.feature2Title, body: dict.feature2Body },
    { title: dict.feature3Title, body: dict.feature3Body },
    { title: dict.feature4Title, body: dict.feature4Body },
    { title: dict.feature5Title, body: dict.feature5Body },
    { title: dict.feature6Title, body: dict.feature6Body },
  ];

  return (
    <section className="mt-20">
      <div className="mb-8 text-center">
        <p className="text-xs font-semibold tracking-wide text-[#0F6E56]">{dict.featuresEyebrow}</p>
        <h2 className="mx-auto mt-2 max-w-xl text-2xl font-bold text-neutral-900 sm:text-3xl">{dict.featuresTitle}</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => {
          const style = FEATURE_STYLE[index];
          return (
            <div key={feature.title} className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm shadow-neutral-900/5">
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg" style={{ backgroundColor: style.tint }}>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke={style.mark} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h3 className="mb-2 text-base font-bold text-neutral-900">{feature.title}</h3>
              <p className="text-sm leading-[1.85] text-neutral-600">{feature.body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
