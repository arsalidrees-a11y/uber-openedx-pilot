# uber-learn

Uber-branded component kit for the Edly x Uber Open edX safety pilot.

The product has no official name yet. Do not call it "Uber Learn" anywhere a
person reads it: UI copy, page titles, docs or Figma. The `uber-learn`
folder, package and asset file names are machine identifiers and stay until a
name is agreed.

## Workflow

**Figma is the source of truth.** Design changes start in Figma (the
`❖ Base Gallery - Design System` library and the `Uber-UI` file); code
follows Figma, never the other way round. Where the two disagree, Figma wins
and the code changes.

Every change goes through git before it goes anywhere else:

1. Make the change, then `npm run check` and `node --test course/*.test.mjs`.
2. Commit and push to `origin`, github.com/arsalidrees-a11y/uber-openedx-pilot.
3. Only then deploy to Vercel, from the committed state.

The repository was restarted with fresh history on 2026-09-29. The earlier
history, including two commits from 2026-09-14, is kept outside the project
at `../uber-learn-git-backup-2026-09-29` (a bare `.git` directory).

**Deploying the prototype.** The Vercel project is `uber-learn`, production
URL https://uber-learn.vercel.app. Keep that link: do not rename the project.
Deploy prebuilt, and strip the fonts before uploading, because Uber Move is
not cleared for public web use:

    npx vercel@59.25.0 build --prod
    rm -rf .vercel/output/static/fonts
    npx vercel@59.25.0 deploy --prebuilt --prod

Without the files, the site falls back to a locally installed Uber Move and
then to the system stack, as it did before the fonts arrived.

## Delivery

Two static assets plus HTML snippets. How they are wired matters, and the
obvious way does not work. All of this is verified against openedx-platform
source, not docs prose.

    dist/uber-learn.css  ->  Files & Uploads  ->  Advanced Settings: course_wide_css
    dist/uber-learn.js   ->  Files & Uploads  ->  Advanced Settings: course_wide_js
    lessons/*.template.html  ->  HTML XBlock units, with NO asset tags

**Never put `<link>` or `<script src>` for the kit inside unit markup.**
Two independent reasons:

1. `frontend-app-learning` renders every unit in **its own iframe**, a separate
   document. An asset tag in unit 1 does nothing for unit 2. There is no such
   thing as "reference it once per course" from inside unit content.
2. Studio's TinyMCE editor **silently deletes** `<link rel="stylesheet">`,
   because `<link>` is not a valid child of `<body>` in its HTML5 schema.

Use the course-wide hooks instead. They are in Studio under Settings then
Advanced Settings as "Course-wide custom css" and "Course-wide custom js",
they need no feature flag, and they ARE injected into each unit iframe. They
exist from the Maple release onward and are absent in Lilac.

**Course-wide values need the full asset path, not `/static/`.** Those fields
are emitted raw into the attribute and never pass through the static-URL
rewrite. Copy the exact URL from the Files & Uploads table:

    /asset-v1:<org>+<course>+<run>+type@asset+block@uber-learn.css

`/static/<filename>` is still correct and is rewritten properly for assets
referenced from **inside** unit markup: images, fonts, the caption files.

Leave both assets UNLOCKED in Files & Uploads. The content server gates locked
assets behind enrollment checks.

**Fonts need the same full path, baked in at build time.** The stylesheet
declares the Uber Move faces at `/fonts/<file>.woff2`, which is right for the
gallery, the prototype and Vercel, and wrong in Open edX: every upload lives at
`/asset-v1:...+block@<name>`, a single path segment, so a relative `url()` in
the course-wide CSS cannot reach a sibling file either. Upload the ten woff2
files next to the CSS, then build with the course's prefix:

    UL_FONT_BASE='/asset-v1:<org>+<course>+<run>+type@asset+block@' npm run build

Only `dist/` changes. Do this only once web embedding is licensed (see
Non-negotiables); until then, ship the CSS unchanged and the faces fall back.

## What is confirmed, and what is still a risk

Confirmed by reading the platform source:

- Inline `<script>` in a unit **does** execute. The fragment is rendered
  server-side into the iframe document by Mako.
- There is **no** sanitiser or allowlist on the built-in `html` block. No CSP
  is enabled by default.
- A relative `fetch` from a unit resolves against the LMS origin. It needs
  HTTPS: production sets `SESSION_COOKIE_SAMESITE=None`, local Tutor dev uses
  `Lax` and will not send the session cookie.
- Content size is not a constraint at this scale.

**The largest unresolved risk**: Open edX ships a SECOND HTML block, `html5`
from open-craft/xblock-html, also labelled "Text". That one bleaches against a
fixed allowlist with **no `<button>`, no `<svg>`, no `hidden`, no `role` or
`aria-*`**, and JavaScript off by default. If the pilot instance has `html5` in
`advanced_modules`, these templates are gutted and need a rewrite, not a patch.

Three questions for Edly before Phase 0 commits, in this order:

1. Is the Text component the built-in `html` block, or is `html5` in
   `advanced_modules`?
2. What are `CSP_STATIC_ENFORCE` and `CSP_STATIC_REPORT_ONLY` on the instance?
3. Which Open edX release is it?

Then do one smoke test: paste a template into a Text component, save, reopen,
and diff the saved markup against what you pasted. TinyMCE round-trips content
on save, so anything it dislikes is gone at that point.

To bypass TinyMCE entirely, author through OLX course import or the CMS XBlock
API. Both store `data` verbatim with zero sanitisation.

## Why there is no React and no Tailwind

Course content lives in the HTML XBlock, which renders raw HTML. It cannot
run a React app and it cannot run Tailwind's compiler. The lesson surfaces
therefore have to be plain HTML and CSS regardless of what we might prefer.

Given that, adding a React layer for the *other* surfaces would mean two
component systems describing the same buttons, and they would drift. So the
non-courseware surfaces (dashboard, points, badges, ranking, completion) ship
as HTML XBlock units too, hydrated by `fetch` from Open edX APIs. See
`lessons/dashboard.template.html`.

One kit, one delivery path, no MFE fork, nothing to keep in sync.

If a future phase genuinely needs a custom MFE, the tokens are already
framework-neutral CSS custom properties and will feed it unchanged.

## The rule that matters

**Never write a raw colour, font stack, or shadow.** Every visual value comes
from a token in `src/styles/tokens.css`, which is generated from Figma. A
hardcoded `#276EF1` is a bug even when it renders correctly, because the next
Figma pull will not update it.

If a design needs a value with no token, add the variable in Figma and re-pull.

## Layout

    tokens/figma.raw.json      Figma Variables dump  (INPUT, hand-refreshed)
    tokens/figma.layout.json   Spacing + Layout dump (INPUT, hand-refreshed)
    tokens/fonts.json          Uber Move faces -> woff2 files (INPUT)
    public/fonts/              the ten woff2 files, gitignored (SETUP.md)
    scripts/build-tokens.mjs   the compiler
    scripts/coverage.mjs       Figma section -> component status
    src/styles/tokens.css      GENERATED - never hand-edit
    src/styles/base.css        reset + webview hardening
    src/components/*.css       one file per component
    src/styles/index.css       import manifest
    public/uber-learn.js       behaviours, copied verbatim to dist/
    lessons/                   HTML XBlock templates
    index.html                 review gallery at 390x844
    figma.map.json             Figma node -> component, check before building

## Kit scope

The kit holds only what the learning experience uses: 18 components. Button,
button dock, banner, accordion, divider and section heading, empty state,
input, select, tabs, list item, progress, progress ring, grabber, draggable
list, knowledge check, lesson card, achievement, streak chip.

33 Base components left on 2026-09-28 because nothing in the course, the unit
templates or the learning design uses them: avatar, badge, breadcrumbs, card,
carousel, checkbox and toggle, country field, date picker, dialog, file drop,
hint badge, menu, message card, navigation, page control, pagination,
password field, PIN, rich text, segmented control and slider, sheet, side
nav, slider, slide to confirm, snackbar, star rating, stepper, tag, tile, time
picker, timed button, tooltip. `npm run coverage` reports their Figma names as
SKIPPED, and `OUT_OF_SCOPE` in `scripts/coverage.mjs` lists them. Git has
every file: restore one only when the learning experience needs it, then take
it out of `OUT_OF_SCOPE`.

## The colour system in Figma

Five published variable collections in the design system file, plus a
`◐ Colour Sheet` page documenting them:

| Collection | Variables | Published |
|---|---|---|
| Primitives | 112 | hidden, backing values only |
| Core | 8 | yes |
| Semantic | 16 | yes |
| Semantic Extensions | 25 | yes |
| Program | 7 | yes |

47 of the 56 published tokens alias a primitive. The nine that do not are the
six transparent overlays in Core and three Program colours that sit outside
Base's ramps. Those are correct, not gaps.

To add a colour: pick a primitive from the Colour Sheet, create a variable in
the right collection that **aliases** it, publish, then re-pull tokens here.

**Text styles**: 36 across eight groups, matching this repo's type scale
exactly. The 18 inherited styles from the borrowed library were removed on
2026-09-14 after verifying zero uses across 8,995 text nodes, so every text
style in the file is now ours.

| Group | Steps | | Group | Steps |
|---|---|---|---|---|
| Display | 4 | | Mono Display | 4 |
| Heading | 6 | | Mono Heading | 6 |
| Label | 4 | | Mono Label | 4 |
| Paragraph | 4 | | Mono Paragraph | 4 |

All 36 run on the real faces as of 2026-09-14: Uber Move Bold (10), Uber Move
Text Medium (4) and Regular (4), Uber Move Mono Medium (14) and Regular (4).

The swap could not be done through the MCP, because `use_figma` executes in a
context carrying only web fonts. It was done with a Figma canvas plugin, "Uber
Text Style Fonts", which runs inside the editor where the fonts exist. That
plugin stays in the account library and re-reads each style's own description,
so it still works if styles are added later. See
`figma/swap-text-style-fonts.md`.

**Inherited from the borrowed library.** The 81 paint styles were removed on
2026-09-14 after confirming a single use across 58,052 nodes, a vector bound to
Primary / Black which detached to the identical value. Colour now lives only in
variables.

The 60 inherited grid styles were removed on 2026-09-14 the same way, after a
scan of all four pages found zero uses across 59,229 nodes, and replaced with
13 of our own. See the layout section below.

| Remaining | Count | Note |
|---|---|---|
| Effect styles | 6 | inherited; our three shadow tokens have no Figma equivalent yet |

Effect styles are the last inherited asset in the file.

All four sheets are built from the system they document: their own headings and
labels use the real text styles, and every text fill is bound to a semantic
colour variable. Metrics and hex values sit on the Mono ramp.

Four documentation pages live in the design file: `◐ Colour Sheet`,
`◐ Text Sheet`, `◐ Spacing Sheet` and `◐ Layout Sheet`. Each carries the
workflow for growing its part of the system.

## Learning components in Figma

`❖ Learning Components` (page 22637:8) holds the 20 components the learning
experience needs and nothing else: no calendar, time picker, PIN or other
unused Base parts. Each is built from Base variables and text styles and nests
Base's own components (Button, Progress bar, Grabber, icons) wherever Base has
one. `figma.map.json` lists every node id under `learningComponents`.

`use_figma` has no Uber fonts, but it CAN apply a Base text style: write the
text in Inter, size it (fill width, hug height), then `setTextStyleIdAsync`.
The order matters. Once the style is on, the layer's characters, size and
resizing are locked to this context, because each needs the font. Base
buttons carry their label as `Action ⟪Try again⟫`, since writing a text
override needs the font too. The "Apply Uber type" plugin runs in the
editor: it measures every text layer in Uber Move, sets each button label and
tidies the names. Re-run it after any MCP build. It lives in the Arbisoft plan
as 6eaa75a6-fd51-4b2c-82dd-db3821d9f67f, with a copy in the personal team
(6bde15f7-f9e1-4768-bba1-f6d6b42df864); a plugin only shows in files of the
plan that owns it.

**The prototype is built from those components.** `course/course.css` has one
block per Figma component (Learning / Course card, Lesson row, Step footer, …
plus the Base parts the screens use), with padding, gaps, radii, text styles
and colour tokens copied from Figma; `course/course.js` has one render function
per component and one per screen, and `course/icons.js` holds the icons
exported from Figma as SVG. Every screen on the `Uber-UI` page has a
"Prototype ↗" link under it that opens the prototype in the same state
(`?preview=…`), so the two can be compared side by side. When a screen changes
in Figma, change the matching component block and render function, then check
the linked state.

Prototype logic, fixed on 2026-09-29 and covered by `course/prototype.test.mjs`:
course progress is lessons complete out of 7; the course is complete only when
all lessons **and** the final check are done (until then the hero shows a plain
shield, not the check); upcoming lessons cannot be opened early; previews
(`?preview=`, the review panel) never write over saved progress; and the
prepared states carry real dates, so the streak, weekly goal and standing are
computed by `gamification.js`, never typed in.

Catalogue and badges, added 2026-09-29: `course/catalog.js` holds four
curricula of four courses. Only Sexual misconduct education has content; the
other courses are placeholders ("Content coming soon"). A badge is earned for
a whole curriculum, never for one course, and the retention check awards none.
Optional courses carry ratings, reviews and Trending (the numbers are
illustrative); required and sensitive courses carry completion proof only and
are never rated. Previews: `course&id=5`, `rate&id=5` (`stars=0` for the empty
prompt) and `curriculum-complete`.

The layout follows the Uber and Uber Eats apps, studied on Mobbin. See
`UBER-PATTERNS.md`: the course page is Uber's Safety checkup, the course
card is its Account checkup card, totals sit on grey like Uber Cash.

Base is the reference: where the prototype differed, the prototype changed.
The "Base alignment" block at the end of `course/course.css` records each
change, and `course/icons.js` replaces Unicode glyphs with official Uber
icons. Icons Base Gallery lacks are local components in the Figma file.

## Spacing and layout

Two more collections, and the matrix that drives every gap and page margin.

**Spacing** — 17 FLOAT variables in one collection. Thirteen are Uber's Spacer
component value for value (12, 16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 96,
128). Four below 12 (0, 2, 4, 8) are ours: Uber never shipped a Spacer that
small, but CSS needs hairlines and inline offsets. Use a Spacer value to space
one block from another; reach for a sub-spacer only inside a component.

**Layout** — four variables across six modes, `{Standard, Compact} x {Small,
Medium, Large}`. This is Uber's own matrix:

| Density | Breakpoint | Columns | Margin | Gutter |
|---|---|---|---|---|
| Standard | Small (320–599) | 4 | 16 | 16 |
| Standard | Medium (600–1135) | 8 | 36 | 36 |
| Standard | Large (1136+) | 12 | 64 | 36 |
| Compact | Small | 4 | 16 | 16 |
| Compact | Medium | 8 | 24 | 16 |
| Compact | Large | 12 | 24 | 16 |

**13 grid styles** carry the same matrix onto frames: `Layout grid / <density> /
<breakpoint> / Margins on|off`, plus `Layout grid / Baseline 4pt`. Each column
grid bundles the 4pt baseline rows, so vertical rhythm is never a separate
decision. The previews on the Layout Sheet have their padding and item spacing
bound to the Layout variables with the matching mode set, so they are the
tokens rather than a picture of them.

In CSS the two axes split, because media queries only have one: **density is a
class**, `.u-density-compact`; **breakpoint is a query**. Both resolve
`--u-cols`, `--u-margin` and `--u-gutter`, which `.u-grid` consumes.

    .u-grid            display:grid over --u-cols, gutter gap, margin inline
    .u-grid--flush     "Margins off" - grid without the page margin
    .u-col-1 … -4      safe at every breakpoint (Small has 4 columns)
    .u-col-md-*        from 600px    .u-col-lg-*   from 1136px

Small is the default and needs no class, because the pilot ships into a 390px
webview. Spans wider than 4 must be asked for per breakpoint: `span N` needs a
literal integer, so it cannot be derived from `--u-cols`, and an unguarded
`.u-col-8` would overflow the phone.

Uber's Divider component maps to `.u-divider`, `--section` and `--module` at
1px, 2px and 8px. All three are `--u-border-opaque` (#E8E8E8); module was on
`--u-background-secondary` until 2026-09-14, which read a step too light.

**To change the matrix**: edit the variables in Figma, re-dump to
`tokens/figma.layout.json`, then `npm run tokens`. `npm run validate` compares
the built CSS against that dump cell by cell and fails on any disagreement, so
the sheets cannot quietly become decoration.

## Refreshing tokens from Figma

1. Select the node in the Figma desktop app.
2. Call the Figma MCP tool `get_variable_defs`.
3. Merge into the `variables` object of `tokens/figma.raw.json`. Drop anything
   prefixed `DEPRECATED_` or `_`.
4. Update `_meta.pulledOn`, then `npm run tokens`.

The compiler normalises Figma's inconsistent naming, so
`Background++/backgroundAccentLight` and `Background ++ / backgroundAccentLight`
both land on `--u-background-accent-light`.

## Adding a component

1. Read the Figma node with `get_design_context` or `get_screenshot`.
2. Check `figma.map.json` before building anything new.
3. Create `src/components/<name>.css`. Prefix `u-`, BEM-ish
   (`.u-thing`, `.u-thing__part`, `.u-thing--variant`).
4. Add it to `src/styles/index.css`.
5. Add a specimen to `index.html` covering every state, including empty,
   loading, and error. The proposal's acceptance criteria name those.
6. Record the node id in `figma.map.json` and run `npm run coverage`.
7. Verify in the browser at 390x844 before reporting done.

## Behaviours

`public/uber-learn.js` is delegated from `document` and guards against
double-inclusion.

Note what the iframe model actually means: the learning MFE loads a **new
document per unit**, so the script re-executes from scratch every time a
learner moves between units. There is no cross-unit state to preserve, and the
double-inclusion guard protects against a doubled course-wide entry rather than
against unit navigation. Delegation from `document` is still the right pattern,
because one unit can hold several components.

## Web vs mobile

The shipping target is a webview inside the Uber driver app, so **mobile is
the default, not a breakpoint**. Base's Figma ships `/ Web` and `/ Mobile`
variants; `src/styles/responsive.css` mirrors them as `.u-web` and `.u-mobile`.

Two axes, kept separate on purpose:

- **Modality** decides touch targets and hover. A webview on a tablet is wide
  but still touch, so width must never shrink a target. Gate every hover rule
  behind `@media (hover: hover) and (pointer: fine)`.
- **Width** decides layout only, which today means the grid. The kit's
  web/mobile component pairs left with the unused components.

Web surfaces in this project means Studio, used by the content team on a
laptop. Learner surfaces are always mobile.

## Rules the audit added

These came from an audit that found real defects. Each is now enforced by
`npm run validate` or `npm test`, so breaking one fails the build.

- **No colour literals in any notation.** Not hex, not `rgb()`, not `hsl()`.
  The overlay tokens `--u-overlay-black4/8/48/78` and `--u-overlay-white18/40`
  exist for scrims and press states. `tokens/figma.raw.json` records which of
  those are verbatim Figma values and which are derived.
- **Never format numbers with `.toFixed().replace(/0+$/, '')`.** It yields
  `"1."`, which is invalid CSS, and the browser drops the whole declaration in
  silence. Use the `num()` helper in `scripts/build-tokens.mjs`.
- **Mobile is the default with no class required.** If a web/mobile pair
  returns, gate it so a bare XBlock unit renders the mobile half: the half
  `.u-web` reveals must be hidden by a bare rule. Getting this backwards once
  made a phone render both time pickers, both navigations and both modal shapes.
- **Overlays are unreliable inside a unit iframe. Prefer inline disclosure
  there.** The iframe is `scrolling: "no"` with its height driven by content
  height, so its viewport is as tall as the whole unit. `position: fixed` then
  anchors to the full-unit box rather than the phone viewport, and a bottom
  sheet can land far below what the learner can see. `absolute` behaves the
  same way for the same reason. Inside a lesson, use the accordion or an inline
  panel. The kit ships no sheet or dialog; one belongs only on a standalone
  page that owns its viewport, such as a deep-linked dashboard.
- **`touch-action: none` goes on the element the gesture is bound to**, never a
  whole row. On the row it blocked vertical lesson scrolling.
- **Every target is 24px minimum even when the visual is smaller.** Expand it
  with a transparent pseudo-element around the visual.
- **Any component the CSS shows must have behaviour.** The pinwheel time picker
  (since removed) shipped with zero JavaScript while being the only time
  picker on mobile.
- **Every gesture needs a non-gesture path.** Drag to reorder answers to the
  arrow keys; the course's match and sort activities take taps and buttons.
- **Guard `scrollIntoView`.** It is absent in some engines and its options
  argument is unsupported on older WebViews.
- **A gate that has never been run against bad input is not a gate.** Three
  validator gates shipped broken, one of which could never fire. The layout
  drift gate was written the same way and reported every `--u-gutter` as unset
  because it required a trailing semicolon that the minifier strips from the
  last declaration in a block. Feed each new gate a deliberately wrong input
  and watch it fail before trusting it green.
- **A broken toolchain is not a lint failure.** The PostToolUse lint hook ran
  `npm`, which is not on a hook's PATH under nvm, and reported exit 127 as
  broken code. It also walked `..` logically while its own `-f`/`-d` tests
  walked the filesystem physically, so through the `.claude` symlink at the
  parent it pointed `cd` one directory above the repo. It now resolves node
  itself, uses `cd -P`, tests for the file it is about to run, and exits 0 with
  a message when there is no node at all.
- **`boot()` stays at the end of `00-core.js`.** Loaded with `defer`, or late
  by the MFE, the DOM is already parsed and boot runs the moment it is called.
  It used to sit mid-file, reached the calendar before `MONTHS` was assigned,
  and threw, which killed every handler after it. The inline gallery the suite
  loads never took that path; a late-load test now does.
- **Anything the MutationObserver path writes must be change-only.**
  `applyProgress` and `syncSlider` rewrote identical text, which is itself a
  mutation, so the observer fed itself forever and froze the page. Compare
  before writing. A test counts observer batches after one insert.
- **`env(safe-area-inset-*)` is permanently inert inside a unit.** This is
  settled, not open. The LMS emits its own `<meta name="viewport">` with no
  `viewport-fit=cover`, and safe-area insets do not apply to a nested browsing
  context anyway. It is the LMS's meta tag, so it is not Uber's call and there
  is nothing to ask them. The declarations are harmless and still work in the
  gallery and on any standalone page.

## Non-negotiables

- **No native OS form controls.** A `<select>` renders the platform wheel and
  `input[type=date]` renders the OS calendar. Neither can be branded. Use
  `u-select`. The kit has no date or time picker because the learning
  experience asks for neither. `npm run validate` fails the build if a native
  control reappears.
- **Webview, not desktop.** Design at 390x844. There is no hover. Every
  interactive target is at least 44px.
- **Reduce Motion is honoured** by a global query in `base.css`. Do not
  re-introduce animation that ignores it.
- **Uber Move is proprietary.** Every generated family ends in a system
  fallback stack. Never ship a font file you were not licensed to ship.
  Installing a font locally for design work and serving it to drivers are two
  different permissions; only the first is settled.

  The official packages arrived on 2026-09-28: `UberMove_English` (Uber Move,
  Uber Move Text) and `UberMove_Monospace` (Uber Move Mono), all Version 1.003.
  Their ten woff2 files sit in `public/fonts/`, gitignored, and
  `scripts/build-tokens.mjs` generates one `@font-face` per face from
  `tokens/fonts.json`. The token build fails if a Figma text style names a face
  that is not listed; `npm run validate` fails if a listed file is missing
  from the build. 36 of 36 styles resolve to a real face, and the gallery's
  Typography section shows live whether each face actually loaded.

  Each face loads the file first and falls back to `local()` by PostScript
  name only. A full-name `local()` lookup rendered Mono Medium as garbage right
  after the installed copy was replaced, while the file was correct.

  The files carry "licensed exclusively to Uber". Having them is still not a
  web-embedding grant, so confirm that before deploying them anywhere public,
  including Vercel, or pointing Open edX at them with `UL_FONT_BASE`.
- **Graded questions use the native Problem XBlock**, so the grade reaches the
  gradebook. Only ungraded retention checks are built in HTML.
- **User-supplied strings use `textContent`, never `innerHTML`.** Lesson
  markup is author-controlled, but API values are not.
- **CSS budget is 15 kB gzipped.** Currently 7.8 kB, including the ten
  `@font-face` rules.
