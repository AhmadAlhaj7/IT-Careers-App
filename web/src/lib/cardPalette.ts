import { ACCENT, ACCENT_SUBTLE, PRIMARY, PRIMARY_SUBTLE, SECONDARY, SECONDARY_SUBTLE } from "./theme";

// A small fixed palette, picked deterministically from a roadmap's slug so a given roadmap
// always gets the same tint/accent everywhere it's shown (public catalog, admin table)
// regardless of list order — purely cosmetic variety, not stored data. Values come from the
// same brand tokens as the rest of the app (see theme.ts) instead of a separate hardcoded set.
const CARD_PALETTE = [
  { tint: PRIMARY_SUBTLE, accent: PRIMARY },
  { tint: SECONDARY_SUBTLE, accent: SECONDARY },
  { tint: ACCENT_SUBTLE, accent: ACCENT },
] as const;

export function paletteFor(slug: string) {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return CARD_PALETTE[hash % CARD_PALETTE.length];
}
