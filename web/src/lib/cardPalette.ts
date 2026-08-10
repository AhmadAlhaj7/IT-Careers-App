// A small fixed palette, picked deterministically from a roadmap's slug so a given roadmap
// always gets the same tint/accent everywhere it's shown (public catalog, admin table)
// regardless of list order — purely cosmetic variety, not stored data.
const CARD_PALETTE = [
  { tint: "#EEF3F1", accent: "#0F6E56" },
  { tint: "#F1EEF8", accent: "#5B3FC4" },
  { tint: "#F7EFE9", accent: "#E8764A" },
] as const;

export function paletteFor(slug: string) {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return CARD_PALETTE[hash % CARD_PALETTE.length];
}
