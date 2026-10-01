#!/usr/bin/env node
/* Headless behaviour tests. Loads the built, self-contained gallery and drives
   it with real events, so this verifies the same file we hand to Uber.
   Run: npm test   (build + gallery first) */
import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';

const dom = new JSDOM(readFileSync('dist/gallery.html', 'utf8'), {
  runScripts: 'dangerously', url: 'http://localhost/',
});
const { window } = dom;
const D = window.document;
const $ = (s) => D.querySelector(s);
const $$ = (s) => [...D.querySelectorAll(s)];
const click = (el) => el.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));

let pass = 0; const fails = [];
const t = (name, fn) => {
  try { const r = fn(); if (r === true) { pass++; } else fails.push(`${name}  ->  ${r}`); }
  catch (e) { fails.push(`${name}  ->  threw ${e.message}`); }
};
const eq = (a, b) => (a === b ? true : `expected ${JSON.stringify(b)}, got ${JSON.stringify(a)}`);

/* jsdom parses synchronously, so DOMContentLoaded has usually already fired by
   the time we get here. Only wait if it genuinely has not. */
if (D.readyState === 'loading') {
  await new Promise((r) => window.addEventListener('DOMContentLoaded', r, { once: true }));
}

t('behaviours loaded', () => (window.UberLearn ? true : 'window.UberLearn undefined'));

/* The gallery above inlines the script, so it runs while the page is still
   parsing and boot() waits for DOMContentLoaded. The real gallery loads it with
   defer, and the MFE can inject it late: the DOM is already parsed and boot()
   runs at once. That path threw in the calendar (since removed) and killed
   every handler, and this suite never saw it. Replay it on a parsed page.
   Once boot worked, the MutationObserver it installs looped forever: the ring
   rewrote identical text, which is itself a mutation. That hangs the page
   rather than failing, so count batches and cut the loop off. */
const late = new JSDOM('<!doctype html>' +
  '<div class="u-ring" data-u-progress="40"><span class="u-ring__value"></span></div>',
  { runScripts: 'outside-only' });
if (late.window.document.readyState === 'loading') await new Promise((r) => setTimeout(r, 0));
let lateBatches = 0;
const RealMO = late.window.MutationObserver;
late.window.MutationObserver = function (cb) {
  return new RealMO((m, o) => { if (++lateBatches > 50) o.disconnect(); else cb(m, o); });
};
let lateError = '';
try { late.window.eval(readFileSync('public/uber-learn.js', 'utf8')); } catch (e) { lateError = e.message; }
late.window.document.body.appendChild(late.window.document.createElement('p'));   // wake the observer
await new Promise((r) => setTimeout(r, 20));
t('behaviours survive a late load (defer, MFE)', () => {
  const ring = late.window.document.querySelector('.u-ring__value')?.textContent;
  return !lateError && late.window.UberLearn && ring === '40%'
    ? true : `error=${JSON.stringify(lateError)} ring=${ring}`;
});
t('the DOM observer settles instead of looping', () =>
  lateBatches <= 5 ? true : `${lateBatches} mutation batches after one insert - the observer is feeding itself`);
late.window.close();

t('no native OS controls', () =>
  eq($$('select, input[type=date], input[type=time], input[type=datetime-local]').length, 0));

/* --- select replaces the OS wheel ------------------------------------- */
const sel = $$('.u-select').at(-1);
t('select opens', () => {
  click(sel.querySelector('.u-select__trigger'));
  return eq(sel.querySelector('.u-select__trigger').getAttribute('aria-expanded'), 'true');
});
t('select picks a value and closes', () => {
  click(sel.querySelectorAll('.u-select__opt')[1]);
  return sel.querySelector('.u-select__value').textContent === 'Safe pickups' &&
         sel.querySelector('.u-select__trigger').getAttribute('aria-expanded') === 'false'
    ? true : 'value or expanded state wrong';
});

/* --- knowledge check is ungraded and answer-once ----------------------- */
t('knowledge check marks wrong and reveals right', () => {
  const kc = $('.u-kc');
  click(kc.querySelector('.u-kc__opt[data-correct="false"]'));
  return kc.querySelector('[data-correct="false"]').getAttribute('data-state') === 'incorrect' &&
         kc.querySelector('[data-correct="true"]').getAttribute('data-state') === 'correct' &&
         !kc.querySelector('.u-kc__feedback').hidden ? true : 'states wrong';
});
t('knowledge check locks after one answer', () => {
  const kc = $('.u-kc');
  click(kc.querySelector('.u-kc__opt[data-correct="true"]'));
  return eq(kc.querySelector('[data-correct="true"]').getAttribute('aria-checked'), 'false');
});

/* --- keyboard reorder works without a pointer -------------------------- */
t('draggable list reorders with ArrowDown', () => {
  const list = $('#demo-drag');
  const before = [...list.children].map((c) => c.getAttribute('data-value')).join(',');
  const handle = list.firstElementChild.querySelector('.u-drag__grab');
  handle.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
  const after = [...list.children].map((c) => c.getAttribute('data-value')).join(',');
  return before === 'check,signal,slow,scan' && after === 'signal,check,slow,scan'
    ? true : `${before} -> ${after}`;
});
t('reorder renumbers the indices', () =>
  eq($$('#demo-drag .u-drag__index').map((n) => n.textContent).join(''), '1234'));

/* --- tabs and progress --------------------------------------------------- */
t('tabs swap selection', () => {
  const tabs = $$('.u-tabs .u-tab').slice(0, 4);
  click(tabs[2]);
  return eq(tabs.map((x) => x.getAttribute('aria-selected')).join(','), 'false,false,true,false');
});
t('declarative progress applied to ring', () =>
  eq($('.u-ring[data-u-progress]').style.getPropertyValue('--pct'), '68'));
/* ---- CSS regressions, asserted against the built stylesheet ---------- */
const CSS = readFileSync('dist/uber-learn.css', 'utf8');
/* Parse rules rather than regex the selector: a hand-built RegExp over
   selectors is where the previous version of this helper went wrong. */
const CSS_RULES = [...CSS.matchAll(/([^{}]+)\{([^}]*)\}/g)].map((m) => ({
  selectors: m[1].split(',').map((x) => x.trim()).filter(Boolean),
  body: m[2],
}));
/* The minifier rewrites ::after to :after and strips attribute quotes, so
   compare on a normalised form rather than the authored spelling. */
const norm = (sel) => sel.replace(/::/g, ':').replace(/["']/g, '');
const rule = (sel) => CSS_RULES
  .filter((r) => r.selectors.some((s2) => norm(s2) === norm(sel)))
  .map((r) => r.body).join(';');

t('no colour literals survive in components', () => {
  const body = CSS.slice(CSS.indexOf('}', CSS.indexOf(':root')) + 1);
  const hits = [...body.matchAll(/#[0-9A-Fa-f]{3,8}\b|\brgba?\([^)]*\)/g)].map((m) => m[0]);
  return hits.length ? `found ${JSON.stringify([...new Set(hits)])}` : true;
});
t('no trailing-dot numbers', () => {
  const hits = [...CSS.matchAll(/:\s*-?\d+\.\s*[;)]/g)].map((m) => m[0]);
  return hits.length ? JSON.stringify(hits) : true;
});
t('touch-action sits on the drag handle, not the row', () =>
  /touch-action:\s*none/.test(rule('.u-drag__grab')) &&
  !/touch-action:\s*none/.test(rule('.u-drag__item'))
    ? true : 'touch-action is on the wrong element');
t('safe-area is viable (viewport-fit=cover present)', () =>
  readFileSync('index.html', 'utf8').includes('viewport-fit=cover')
    ? true : 'meta viewport lacks viewport-fit=cover');

/* ---- complete-course discovery regressions -------------------------- */
const COURSE_JS = readFileSync('course/course.js', 'utf8');
const COURSE_CSS = readFileSync('course/course.css', 'utf8');
const TYPE_TOKENS = readFileSync('src/styles/tokens.css', 'utf8');
t('learning discovery preserves shared points streak and badges', () =>
  ['Points', 'Week streak', 'Badges'].every((label) => COURSE_JS.includes(label))
    ? true : 'one or more learning stats are missing');
t('course discovery leads with the Required section (Figma: Learning / Course card)', () =>
  ['requiredCourseCard', 'requiredSection', 'courseCard(', "sectionTitle('Required'"].every((label) => COURSE_JS.includes(label)) &&
  !COURSE_JS.includes('<h2>Your path</h2>')
    ? true : 'the Required section or its course card is missing');
t('gamification remains one account-level layer', () =>
  !COURSE_JS.includes('activity-reward') &&
  !COURSE_JS.includes('10 points ready') &&
  !COURSE_JS.includes('profilePoints') &&
  !COURSE_JS.includes('rewardsStrip')
    ? true : 'lesson or activity reward layer still exists');
t('course prototype uses a bounded mobile viewport', () =>
  COURSE_CSS.includes('height: min(844px, calc(100dvh - 132px))') &&
  COURSE_CSS.includes('height: calc(100dvh - 60px)')
    ? true : 'mobile viewport height rules are missing');
t('course typography stays on the Uber design-system families', () => {
  const declarations = [...COURSE_CSS.matchAll(/font-family:\s*([^;]+)/g)]
    .map((match) => match[1].trim());
  const offToken = declarations.filter((value) => !/^var\(--u-type-/.test(value));
  const mapsHeadings = /--u-type-heading-large-family:\s*"Uber Move"/.test(TYPE_TOKENS);
  const mapsBody = /--u-type-paragraph-medium-family:\s*"Uber Move Text"/.test(TYPE_TOKENS);
  const usesUnavailableSemiBold = /font-weight:\s*600\b/.test(COURSE_CSS);
  return !offToken.length && mapsHeadings && mapsBody && !usesUnavailableSemiBold
    ? true : `off-token=${JSON.stringify(offToken)} heading=${mapsHeadings} body=${mapsBody} semi-bold=${usesUnavailableSemiBold}`;
});
t('course cards use the Base card radius, 12px', () => {
  const radiusTokens = [...COURSE_CSS.matchAll(/--course-radius:\s*([^;]+)/g)]
    .map((match) => match[1].trim());
  const cardSelectors = [
    '.course-card', '.weekly-goal', '.learning-stats > span', '.milestone',
    '.check-result', '.gain > span', '.points-total', '.note', '.feedback',
    '.answer', '.video-player', '.match-card', '.drop-zone', '.sort-row',
  ];
  const authoredRules = [...COURSE_CSS.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/([^{}]+)\{([^}]*)\}/g)].map((match) => ({
    selectors: match[1].split(',').map((selector) => selector.trim()),
    body: match[2],
  }));
  const effectiveRadius = (selector) => authoredRules
    .filter((entry) => entry.selectors.includes(selector))
    .flatMap((entry) => [...entry.body.matchAll(/border-radius:\s*([^;]+)/g)])
    .map((match) => match[1].trim())
    .at(-1);
  const invalid = cardSelectors.filter((selector) =>
    !['12px', 'var(--u-radius-md)'].includes(effectiveRadius(selector)));
  return radiusTokens.every((value) => value === '12px') && !invalid.length
    ? true : `tokens=${JSON.stringify(radiusTokens)} invalid=${JSON.stringify(invalid)}`;
});

console.log(`\n  ${pass} passed, ${fails.length} failed\n`);
if (fails.length) { fails.forEach((f) => console.log('  FAIL  ' + f)); process.exitCode = 1; }
else console.log('  PASS  all behaviours verified headlessly');

window.close();   /* release jsdom timers so node can exit */
