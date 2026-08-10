import type { Dictionary } from "@/lib/i18n/dictionaries";

type HowItWorksProps = {
  dict: Dictionary["homePage"];
};

const STEP_STYLE = [
  { tint: "#F1EEF8", mark: "#5B3FC4", ghost: "rgba(91,63,196,.07)" },
  { tint: "#EEF3F1", mark: "#0F6E56", ghost: "rgba(15,110,86,.07)" },
  { tint: "#F7EFE9", mark: "#E8764A", ghost: "rgba(232,118,74,.09)" },
] as const;

// Step 1's copy deliberately doesn't mention "بوصلة المهنة" (Career Compass) — that quiz was
// explicitly hidden from the site's UI earlier, so promoting it here would contradict that.
// Points at /tech-majors instead, which now serves the "not sure where to start" role.
export function HowItWorks({ dict }: HowItWorksProps) {
  const steps = [
    { title: dict.how1Title, body: dict.how1Body },
    { title: dict.how2Title, body: dict.how2Body },
    { title: dict.how3Title, body: dict.how3Body },
  ];

  return (
    <section className="mt-20">
      <div className="mb-8 text-center">
        <p className="text-xs font-semibold tracking-wide text-[#0F6E56]">{dict.howEyebrow}</p>
        <h2 className="mx-auto mt-2 max-w-xl text-2xl font-bold text-neutral-900 sm:text-3xl">{dict.howTitle}</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {steps.map((step, index) => {
          const style = STEP_STYLE[index];
          return (
            <div key={step.title} className="relative overflow-hidden rounded-3xl border border-neutral-100 bg-white p-7 shadow-sm shadow-neutral-900/5">
              <span
                className="pointer-events-none absolute -top-4 start-[-6px] font-mono text-8xl font-bold leading-none"
                style={{ color: style.ghost }}
              >
                {index + 1}
              </span>
              <div className="relative">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: style.tint }}>
                  <span className="h-3.5 w-3.5 rounded-full" style={{ border: `3px solid ${style.mark}`, borderInlineStart: "3px solid rgba(28,27,25,.14)" }} />
                </div>
                <h3 className="mb-2 text-lg font-bold text-neutral-900">{step.title}</h3>
                <p className="text-sm leading-[1.85] text-neutral-600">{step.body}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
