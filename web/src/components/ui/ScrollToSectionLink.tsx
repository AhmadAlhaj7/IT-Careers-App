"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";

const DURATION_MS = 650;

// Ease in and out, so the scroll starts and lands gently but covers the middle quickly.
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

type ScrollToSectionLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  /** Id of the section to scroll to, without the "#". */
  targetId: string;
};

// An in-page "#section" link that glides there in a fixed, short time instead of jumping. CSS
// `scroll-behavior: smooth` can't be tuned and would also smooth-scroll every page navigation, so the
// animation is done here. Still a real <a href="#…">: without JavaScript it falls back to a normal jump,
// and visitors who ask for reduced motion get the instant jump too.
export function ScrollToSectionLink({ targetId, onClick, children, ...rest }: ScrollToSectionLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    const target = document.getElementById(targetId);
    if (event.defaultPrevented || !target || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    event.preventDefault();

    // Respect the section's scroll-margin-top (e.g. scroll-mt-24) so it lands below the sticky navbar.
    const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
    const start = window.scrollY;
    const end = target.getBoundingClientRect().top + window.scrollY - margin;
    const startTime = performance.now();

    function step(now: number) {
      const progress = Math.min((now - startTime) / DURATION_MS, 1);
      window.scrollTo(0, start + (end - start) * easeInOutCubic(progress));
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
    history.replaceState(null, "", `#${targetId}`);
  }

  return (
    <a href={`#${targetId}`} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
