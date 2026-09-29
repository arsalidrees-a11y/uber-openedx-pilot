// Official Uber icons (filled), from the Uber icon export of 2026-09-28.
// Base uses real icons where this prototype used Unicode glyphs; Uber Move
// has none of those glyphs, so they fell back to a system font. Paths are
// verbatim apart from fill="currentColor", so an icon takes its text colour.
const ICONS = {
  arrow_left: ["0 0 24 24", "<path fill=\"currentColor\" d=\"M22 13.5H6.3l5.5 7.5H8.3l-6.5-9 6.5-9h3.5l-5.5 7.5H22z\"/>"],
  chevron_right_small: ["0 0 48 48", "<path fill=\"currentColor\" d=\"M24.418 15h-7.46l6.64 9-6.64 9h7.46l6.62-9z\"/>"],
  phone: ["0 0 24 24", "<path fill=\"currentColor\" d=\"m15.9 13.4-3.6 4.1c-2.4-1.4-4.4-3.4-5.8-5.8l4.1-3.6L9.2 1H1v1.5C1 13.8 10.2 23 21.5 23H23v-8.2z\"/>"],
  speech_bubble: ["0 0 24 24", "<path fill=\"currentColor\" d=\"M1 1v22h1l5-5h16V1zm17 10H6V8h12z\"/>"],
  arrow_expand: ["0 0 24 24", "<path fill=\"currentColor\" d=\"M21 12V3h-9L9 6h6.9L6 15.9V8.8L3 12v9h9l3-3H8.1L18 8.1v7.1z\"/>"],
  player_pause: ["0 0 24 24", "<path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M2 3h7v18H2zm13 0h7v18h-7z\" clip-rule=\"evenodd\"/>"],
  arrow_counter_clockwise: ["0 0 24 24", "<path fill=\"currentColor\" d=\"M13 3c-5 0-9 4-9 9v.5L0 9.3v3.8l6 4.7 6-4.7V9.3l-4.9 3.8c-.1-.4-.1-.8-.1-1.2 0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6v3c5 0 9-4 9-9S18 3 13 3\"/>"],
  arrow_right_up: ["0 0 24 24", "<path fill=\"currentColor\" d=\"M21 3v11l-3 3.2V8.1L5.3 20.8l-2.1-2.1L15.9 6H7l3-3z\"/>"],
  arrow_up_down: ["0 0 24 24", "<path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"m11 6.8 5.5-4 5.5 4v3.5l-4-3V20h-3V7.3l-4 3zM9 4v13.7l4-3v3.5l-5.5 4-5.5-4v-3.5l4 3V4z\" clip-rule=\"evenodd\"/>"],
  badge_checkmark: ["0 0 48 48", "<path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"m45.258 19.79-2.68-2.68a1.97 1.97 0 0 1-.58-1.38v-3.78c0-3.28-2.68-5.96-5.96-5.96h-3.78c-.52 0-1.02-.2-1.38-.58l-2.68-2.68a5.92 5.92 0 0 0-4.2-1.74c-1.58 0-3.08.62-4.2 1.74l-2.68 2.68c-.36.36-.86.58-1.38.58h-3.78c-3.28 0-5.96 2.68-5.96 5.96v3.78c0 .52-.2 1.02-.58 1.38l-2.68 2.68a5.963 5.963 0 0 0 0 8.42l2.68 2.68c.36.36.58.86.58 1.38v3.78c0 3.28 2.68 5.96 5.96 5.96h3.78c.52 0 1.02.2 1.38.58l2.68 2.68a5.92 5.92 0 0 0 4.2 1.74c1.58 0 3.08-.62 4.2-1.74l2.68-2.68c.36-.36.86-.58 1.38-.58h3.78c3.28 0 5.96-2.68 5.96-5.96v-3.78c0-.52.2-1.02.58-1.38l2.68-2.68a5.963 5.963 0 0 0 0-8.42m-23.24 12.02-8.42-8.42 2.82-2.82 5.58 5.58 9.58-9.58 2.82 2.82-12.42 12.42z\" clip-rule=\"evenodd\"/>"],
  checkmark: ["0 0 24 24", "<path fill=\"currentColor\" d=\"m9 20.1-8.1-8 2.2-2.2 5.9 6 11.9-12 2.2 2.2z\"/>"],
  chevron_down_small: ["0 0 48 48", "<path fill=\"currentColor\" d=\"m32.998 16.96-9 6.62-9-6.62v7.44l9 6.64 9-6.64z\"/>"],
  circle_i: ["0 0 24 24", "<path fill=\"currentColor\" d=\"M12 1C5.9 1 1 5.9 1 12s4.9 11 11 11 11-4.9 11-11S18.1 1 12 1m1.5 18h-3v-8h3zM12 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2\"/>"],
  diamond: ["0 0 24 24", "<path fill=\"currentColor\" d=\"M12.07.474.546 12 12.07 23.526 23.596 12z\"/>"],
  lock: ["0 0 24 24", "<path fill=\"currentColor\" d=\"M19 9V8c0-3.9-3.1-7-7-7S5 4.1 5 8v1H3v14h18V9zM8 8c0-2.2 1.8-4 4-4s4 1.8 4 4v1H8zm6 9h-4v-3h4z\"/>"],
  player_play: ["0 0 24 24", "<path fill=\"currentColor\" d=\"M5 1.7 22.8 12 5 22.3z\"/>"],
  plus: ["0 0 24 24", "<path fill=\"currentColor\" d=\"M23 10.5h-9.5V1h-3v9.5H1v3h9.5V23h3v-9.5H23z\"/>"],
  shield_check: ["0 0 24 24", "<path fill=\"currentColor\" d=\"M12 1C6.68 1 2 3.04 2 3.04v11.9c0 4.84 5.57 7.15 10 9.06 4.4-1.89 10-4.2 10-9.06V3.04S17.5 1 12 1m-1 16.12-5.56-5.56 2.12-2.12L11 12.88l5.94-5.94 2.12 2.12z\"/>"],
  star: ["0 0 24 24", "<path fill=\"currentColor\" d=\"m12.458 1 3.646 7 7.813.5-5.73 5.5 2.084 8-7.813-4-7.812 4 2.083-8L1 8.5 8.813 8z\"/>"],
  two_lines: ["0 0 24 24", "<path fill=\"currentColor\" d=\"M2 6h20v3H2z\"/>,<path fill=\"currentColor\" d=\"M2 15h20v3H2z\"/>"],
  x: ["0 0 24 24", "<path fill=\"currentColor\" d=\"m21.1 5.1-2.2-2.2-6.9 7-6.9-7-2.2 2.2 7 6.9-7 6.9 2.2 2.2 6.9-7 6.9 7 2.2-2.2-7-6.9z\"/>"],
};

export function icon(name, className = "uicon") {
  const entry = ICONS[name];
  if (!entry) throw new Error(`Unknown icon: ${name}`);
  const [viewBox, paths] = entry;
  return `<svg class="${className}" viewBox="${viewBox}" aria-hidden="true" focusable="false">${paths}</svg>`;
}
