"use client";

import { useEffect, useState, type CSSProperties } from "react";

type MascotKind = "rocket" | "coffee" | "book" | "laptop" | "headphones" | "thinking" | "parachute";

// One mascot per section, matched to what the visitor is reading: a rocket by the launch price, a
// parachute "landing" on the registration form, and so on. Headphones appear twice (hero and terms),
// far enough apart that it never reads as a repeat.
const ZONES: { sectionId: string; mascot: MascotKind }[] = [
  { sectionId: "offer", mascot: "headphones" },
  { sectionId: "about", mascot: "coffee" },
  { sectionId: "features", mascot: "book" },
  { sectionId: "process", mascot: "laptop" },
  { sectionId: "terms", mascot: "headphones" },
  { sectionId: "faq", mascot: "thinking" },
  { sectionId: "price", mascot: "rocket" },
  { sectionId: "register", mascot: "parachute" },
];

type Placement = {
  /** which side margin it floats in ("start" is the right side in Arabic) */
  side: "start" | "end";
  /** vertical position, as a % of the viewport height */
  topPercent: number;
  /** how far into the side margin, 0 = screen edge, 1 = next to the content */
  depth: number;
};

// Let the visitor read for a while first; the mascot only drifts in after this.
const FIRST_APPEARANCE_MS = 6000;
// Fade-out time when swapping to the next section's mascot (matches the CSS transition below).
const SWAP_MS = 500;
// After a mascot fades out, the screen stays empty this long before the next one appears.
const NEXT_APPEARANCE_MS = 3000;
// If the visitor lingers on one section, the mascot hops to a new random spot after this long.
const RELOCATE_MS = 15000;
const MASCOT_WIDTH_PX = 60;

// A fresh random spot every time a mascot appears: either margin, anywhere from near the top to
// lower-middle of the screen, somewhere across the margin's width.
function randomPlacement(): Placement {
  return {
    side: Math.random() < 0.5 ? "start" : "end",
    topPercent: 15 + Math.random() * 55,
    depth: 0.25 + Math.random() * 0.5,
  };
}

// Server render and first client render must match, so the very first placement is fixed; it is
// re-rolled before the mascot ever becomes visible.
const INITIAL_PLACEMENT: Placement = { side: "end", topPercent: 30, depth: 0.5 };

// Small pixel-art Claude mascots floating in the side margins of the consultation page. Purely
// decorative: aria-hidden, never clickable, and hidden below lg where there's no margin to float in
// without covering text (same rule as the home page's floating chips).
export function ConsultationMascot() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [shownIndex, setShownIndex] = useState(0);
  const [placement, setPlacement] = useState(INITIAL_PLACEMENT);
  const [ready, setReady] = useState(false);
  // Bumped on every swap; while it differs from restDoneKey the new mascot is waiting out its pause.
  const [restKey, setRestKey] = useState(0);
  const [restDoneKey, setRestDoneKey] = useState(0);
  const [relocating, setRelocating] = useState(false);

  // Track which section is crossing the middle of the screen.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = ZONES.findIndex((zone) => zone.sectionId === entry.target.id);
            if (index !== -1) setActiveIndex(index);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );

    for (const zone of ZONES) {
      const section = document.getElementById(zone.sectionId);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Warm the cache for every sprite so later swaps never flash an empty frame.
      for (const { mascot } of ZONES) new Image().src = `/mascots/${mascot}.png`;
      setPlacement(randomPlacement());
      setReady(true);
    }, FIRST_APPEARANCE_MS);
    return () => clearTimeout(timer);
  }, []);

  // Swap: while the active section differs from the shown mascot, the current one fades out. Once it's
  // gone, the next one takes a new random spot, waits NEXT_APPEARANCE_MS, then fades in.
  const swapping = activeIndex !== shownIndex;
  useEffect(() => {
    if (!swapping) return;
    const timer = setTimeout(() => {
      setShownIndex(activeIndex);
      setPlacement(randomPlacement());
      setRestKey((key) => key + 1);
    }, SWAP_MS);
    return () => clearTimeout(timer);
  }, [activeIndex, swapping]);

  // Each swap restarts the pause, so scrolling on to yet another section waits the full time again.
  useEffect(() => {
    if (restKey === restDoneKey) return;
    const timer = setTimeout(() => setRestDoneKey(restKey), NEXT_APPEARANCE_MS);
    return () => clearTimeout(timer);
  }, [restKey, restDoneKey]);

  const resting = restKey !== restDoneKey;
  const visible = ready && !swapping && !resting && !relocating;

  // Lingering: once a mascot has been on screen for RELOCATE_MS, fade it out.
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => setRelocating(true), RELOCATE_MS);
    return () => clearTimeout(timer);
  }, [visible]);

  // ...then give the same mascot a new random spot and bring it back after the usual pause.
  useEffect(() => {
    if (!relocating) return;
    const timer = setTimeout(() => {
      setPlacement(randomPlacement());
      setRestKey((key) => key + 1);
      setRelocating(false);
    }, SWAP_MS);
    return () => clearTimeout(timer);
  }, [relocating]);

  const position: CSSProperties = {
    top: `${placement.topPercent}%`,
    // The margin beside the max-w-3xl (48rem) content column is (100vw - 48rem) / 2 wide.
    [placement.side === "start" ? "insetInlineStart" : "insetInlineEnd"]:
      `calc((100vw - 48rem) / 2 * ${placement.depth.toFixed(3)} - ${MASCOT_WIDTH_PX / 2}px)`,
  };

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed z-10 hidden w-[60px] transition-[opacity,transform] duration-500 ease-in-out will-change-[opacity,transform] lg:block ${
        visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-1 scale-95 opacity-0"
      }`}
      style={position}
    >
      <div className="mascot-float">
        {/* eslint-disable-next-line @next/next/no-img-element -- tiny static decorative sprite */}
        <img src={`/mascots/${ZONES[shownIndex].mascot}.png`} alt="" className={`mascot-${ZONES[shownIndex].mascot} h-auto w-full select-none`} draggable={false} />
      </div>
    </div>
  );
}
