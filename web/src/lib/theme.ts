// Raw hex mirrors of the color tokens defined in src/app/globals.css's `@theme inline` block —
// Tailwind v4's CSS-first theme can't be imported into TS, but a few call sites (inline
// `style={{backgroundColor}}` in cardPalette.ts, anything computing a color at runtime) need
// an actual string. Keep the two files in sync if a brand color ever changes.
export const PRIMARY = "#0F6E56";
export const PRIMARY_HOVER = "#0C5845";
export const PRIMARY_ACTIVE = "#0A4637";
export const PRIMARY_SUBTLE = "#EEF3F1";

export const ACCENT = "#E8764A";
export const ACCENT_HOVER = "#D35F35";
export const ACCENT_ACTIVE = "#B3512D";
export const ACCENT_SUBTLE = "#F7EFE9";

export const SECONDARY = "#5B3FC4";
export const SECONDARY_HOVER = "#4C33AE";
export const SECONDARY_SUBTLE = "#F1EEF8";

export const DANGER = "#DC2626";
export const DANGER_HOVER = "#B91C1C";
export const DANGER_SUBTLE = "#FEF2F2";

// The logo mark's own gradient (135deg, matches the brand's logo file) — distinct from
// ACCENT, which still drives buttons/badges/CTAs across the rest of the app.
export const LOGO_GRADIENT_FROM = "#fc9867";
export const LOGO_GRADIENT_TO = "#a21f4a";
