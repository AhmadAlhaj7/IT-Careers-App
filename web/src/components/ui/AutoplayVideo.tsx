"use client";

import { useEffect, useRef, type VideoHTMLAttributes } from "react";

// A silent, looping showcase video that plays by itself — but only while it's actually on screen.
// Browsers only allow autoplay when muted, so it always is. Playing on visibility (instead of the
// plain `autoPlay` attribute) means the file isn't downloaded until the visitor scrolls to it, and it
// stops using CPU/battery once they scroll past. Visitors who ask for reduced motion get the poster
// and can press play themselves.
export function AutoplayVideo(props: Omit<VideoHTMLAttributes<HTMLVideoElement>, "autoPlay" | "muted" | "loop">) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    video.muted = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Can still be refused (e.g. data-saver modes); the poster and controls remain as a fallback.
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return <video ref={ref} muted loop playsInline preload="none" {...props} />;
}
