#!/usr/bin/env node
/* Static checks that do not need a browser:
     1. every u- class used in markup is defined in the CSS
     2. every var(--u-*) reference resolves to a definition
     3. no hardcoded hex outside the generated token block
     4. no native OS-rendered form controls in the markup
     5. every text style has an Uber Move face, and every face its file
   Run: npm run validate */
import { readFileSync, readdirSync, existsSync } from 'node:fs';

const css = readFileSync('dist/uber-learn.css', 'utf8');
const htmlFiles = ['index.html', ...readdirSync('lessons').map((f) => `lessons/${f}`)];
const fail = [];

/* 1. classes */
const defined = new Set([...css.matchAll(/\.(u-[a-z0-9_-]+)/g)].map((m) => m[1]));
const usedBy = new Map();
for (const f of htmlFiles) {
  for (const m of readFileSync(f, 'utf8').matchAll(/class="([^"]+)"/g)) {
    for (const c of m[1].split(/\s+/)) {
      if (!c.startsWith('u-') || c.startsWith('u-btn--') === false && false) continue;
      if (!defined.has(c)) usedBy.set(c, (usedBy.get(c) || new Set()).add(f));
    }
  }
}
if (usedBy.size) fail.push(['undefined classes', [...usedBy].map(([c, s]) => `${c}  (${[...s].join(', ')})`)]);

/* 2. variables */
const declared = new Set([...css.matchAll(/(--u-[a-z0-9-]+)\s*:/g)].map((m) => m[1]));
const referenced = new Set([...css.matchAll(/var\((--u-[a-z0-9-]+)/g)].map((m) => m[1]));
const localScoped = new Set(['--pct', '--size', '--knob', '--slide', '--timed']);
const unresolved = [...referenced].filter((v) => !declared.has(v) && !localScoped.has(v));
if (unresolved.length) fail.push(['unresolved css variables', unresolved]);

/* 3. hardcoded colour outside :root - ALL notations, not just hex.
      The hex-only version of this gate let six rgb() literals ship. */
const body = css.slice(css.indexOf('}', css.indexOf(':root')) + 1);
const literals = [
  ...body.matchAll(/#[0-9A-Fa-f]{3,8}\b/g),
  ...body.matchAll(/\brgba?\([^)]*\)/g),
  ...body.matchAll(/\bhsla?\([^)]*\)/g),
].map((m) => m[0]).filter((v) => !/^rgba?\(\s*(from|var)/.test(v));
if (literals.length) fail.push(['hardcoded colour outside :root', [...new Set(literals)]]);

/* 4. trailing-dot numbers, e.g. "1." - invalid CSS, silently drops the rule.
      Produced by .toFixed().replace(/0+$/,'') before it was fixed. */
const dotty = [...css.matchAll(/:\s*-?\d+\.\s*[;)]/g)].map((m) => m[0].trim());
if (dotty.length) fail.push(['trailing-dot numbers (invalid CSS)', [...new Set(dotty)]]);

/* 5. Overlays must be fixed, not absolute: absolute anchors to the nearest
      positioned ancestor and renders off-screen on a scrolled lesson.
      The --inline demo variants are the only permitted exception. */
const overlayAbs = [];
for (const sel of ['.u-scrim', '.u-sheet', '.u-dialog', '.u-fullscreen']) {
  const re = new RegExp(`\\${sel}\\s*\\{[^}]*position:\\s*absolute`, 'g');
  if (re.test(css)) overlayAbs.push(`${sel} uses position:absolute`);
}
if (overlayAbs.length) fail.push(['overlay anchored to absolute', overlayAbs]);

/* 6. env(safe-area-inset-*) is inert without viewport-fit=cover. */
if (css.includes('env(safe-area-inset') && !readFileSync('index.html', 'utf8').includes('viewport-fit=cover')) {
  fail.push(['safe-area used but viewport-fit=cover missing', ['index.html meta viewport']]);
}

/* 7. Every .u-web-gated component needs a default (mobile) rule, or a page
      that sets no scope class renders both halves of the pair at once.
      The check must look for the class as a STANDALONE selector. An earlier
      version matched the `.u-web .u-x` rule itself and so never fired. */
const rules = [...css.matchAll(/([^{}]+)\{([^}]*)\}/g)].map((m) => ({
  selectors: m[1].split(',').map((x) => x.trim()).filter(Boolean),
  body: m[2],
}));
const hiddenBare = (cls) => rules.some((r) =>
  r.selectors.includes(`.${cls}`) && /display\s*:\s*none/.test(r.body));

/* Only the half that .u-web REVEALS needs a bare rule hiding it by default.
   The half .u-web hides is the mobile default and is correctly visible with
   no declaration at all. */
const revealed = [...new Set(
  rules.flatMap((r) => r.selectors
    .filter((sel) => /^\.u-web\s+\.u-[a-z-]+$/.test(sel))
    .filter(() => /display\s*:\s*(?!none)[a-z-]/.test(r.body))
    .map((sel) => sel.split(/\s+/)[1].slice(1))),
)];
const ungated = revealed.filter((c) => !hiddenBare(c));
if (ungated.length) fail.push(['.u-web-revealed component not hidden by default', ungated]);

/* 8. native OS controls - these render unbrandable platform UI */
const native = [];
for (const f of htmlFiles) {
  const src = readFileSync(f, 'utf8');
  for (const pat of [/<select[\s>]/g, /type="date"/g, /type="time"/g, /type="datetime-local"/g]) {
    if (pat.test(src)) native.push(`${f}: ${String(pat).slice(1, -2)}`);
  }
}
if (native.length) fail.push(['native OS controls in markup', native]);

/* 9. The layout matrix in the built CSS must still be the one Figma holds.
      Spacing and Layout are documented on two sheets in the design file; if
      the compiler, the dump and the CSS ever disagree, those sheets become
      decoration. Compare the built output against the dump directly. */
const layoutDump = JSON.parse(readFileSync('tokens/figma.layout.json', 'utf8'));
const drift = [];

for (const px of new Set(Object.values(layoutDump.spacing))) {
  if (!new RegExp(`--u-space-${px}\\s*:`).test(css)) drift.push(`--u-space-${px} missing (Figma has it)`);
}
/* And nothing invented locally: every --u-space-N must exist in the dump. */
const dumpPx = new Set(Object.values(layoutDump.spacing).map(String));
for (const m of css.matchAll(/--u-space-(\d+)\s*:/g)) {
  if (!dumpPx.has(m[1])) drift.push(`--u-space-${m[1]} is not in the Figma Spacing collection`);
}

/* The six modes collapse to a default block plus two queries per density. */
const { modes, vars } = layoutDump.layout;
const blockFor = (selector, minWidth) => {
  const re = minWidth === null
    ? new RegExp(`${selector}\\s*\\{([^}]*)\\}`)
    : new RegExp(`@media\\s*\\(min-width:\\s*${minWidth}px\\)\\s*\\{\\s*${selector}\\s*\\{([^}]*)\\}`);
  const m = css.match(re);
  return m ? m[1] : null;
};
for (const [density, selector] of [['Standard', ':root'], ['Compact', '\\.u-density-compact']]) {
  for (const bp of ['Small', 'Medium', 'Large']) {
    const i = modes.indexOf(`${density} / ${bp}`);
    if (i < 0) { drift.push(`dump is missing mode ${density} / ${bp}`); continue; }
    const block = blockFor(selector, bp === 'Small' ? null : vars['Breakpoint min'][i]);
    if (block === null) { drift.push(`no CSS block for ${density} / ${bp}`); continue; }
    const want = {
      '--u-cols': String(vars.Columns[i]),
      '--u-margin': `${vars.Margin[i] / 16}rem`,
      '--u-gutter': `${vars.Gutter[i] / 16}rem`,
    };
    for (const [prop, value] of Object.entries(want)) {
      /* The built CSS is minified, so the LAST declaration in a block has no
         trailing semicolon. Requiring one made this gate report every
         --u-gutter as unset while the value was in fact correct. */
      const got = block.match(new RegExp(`${prop}\\s*:\\s*([^;}]+)`));
      if (!got) drift.push(`${density}/${bp}: ${prop} not set`);
      else if (got[1].trim() !== value) drift.push(`${density}/${bp}: ${prop} is ${got[1].trim()}, Figma says ${value}`);
    }
  }
}
if (drift.length) fail.push(['layout/spacing drift from Figma', drift]);

/* 10. Every text style resolves to a declared Uber Move face, and every face
       has its file in the build. A missing face does not break anything
       visibly: the browser synthesises bold or drops to the system stack, so
       only this gate notices. */
const fontFaces = [...css.matchAll(/@font-face\s*\{([^}]*)\}/g)].map((m) => ({
  family: (m[1].match(/font-family:\s*"?([^";]+?)"?\s*(;|$)/) || [])[1],
  weight: (m[1].match(/font-weight:\s*(\d+)/) || [])[1],
  file: (m[1].match(/url\(["']?[^)"']*?([\w-]+\.woff2)["']?\)/) || [])[1],
}));
const faceSet = new Set(fontFaces.map((f) => `${f.family} ${f.weight}`));
const typeFaces = [...css.matchAll(/--u-(type-[a-z0-9-]+)-family:\s*"?([^",;]+)"?/g)].map(([, k, family]) => {
  const weight = (css.match(new RegExp(`--u-${k}-weight:\\s*(\\d+)`)) || [])[1];
  return { style: `--u-${k}`, face: `${family} ${weight}` };
});
const fontProblems = [
  ...typeFaces.filter((t) => !faceSet.has(t.face)).map((t) => `${t.style} needs ${t.face}, which has no @font-face`),
  ...fontFaces.filter((f) => !f.file).map((f) => `${f.family} ${f.weight} has no woff2 url`),
  ...fontFaces.filter((f) => f.file && !existsSync(`dist/fonts/${f.file}`))
    .map((f) => `dist/fonts/${f.file} missing - copy the Uber Move files into public/fonts (SETUP.md)`),
  ...JSON.parse(readFileSync('tokens/fonts.json', 'utf8')).faces
    .filter((f) => !faceSet.has(`${f.family} ${f.weight}`)).map((f) => `${f.family} ${f.weight} is in tokens/fonts.json but not declared`),
];
if (!typeFaces.length) fontProblems.push('no --u-type-*-family tokens found - the gate cannot see the type scale');
if (fontProblems.length) fail.push(['Uber Move faces', fontProblems]);

const counts = {
  'component css files': readdirSync('src/components').length,
  'classes defined': defined.size,
  'tokens declared': declared.size,
  'font faces': `${fontFaces.length} for ${typeFaces.length} text styles`,
  'css bytes': css.length,
};
for (const [k, v] of Object.entries(counts)) console.log(`  ${k.padEnd(22)} ${v}`);

if (!fail.length) {
  console.log('\nPASS  classes defined, vars resolve, no colour literals, no trailing-dot numbers,');
  console.log('      overlays fixed-positioned, safe-area viable, web/mobile pairs defaulted,');
  console.log('      no native OS controls, layout matrix matches Figma, every text style has');
  console.log('      an Uber Move face with its file in the build');
}
else {
  console.log('');
  for (const [title, items] of fail) {
    console.log(`FAIL  ${title} (${items.length})`);
    items.slice(0, 12).forEach((i) => console.log('        ' + i));
  }
  process.exitCode = 1;
}
