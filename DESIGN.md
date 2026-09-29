# Visual contract

## Design thesis

The learning experience should feel like an operational tool that happens to teach: direct, calm, and precise. The interface uses Uber's black-and-white foundation, editorial typography, and a single blue directional signal. Gamification is visible as an account-level learning record, never as decoration inside every lesson.

## Visual language

- Black is structural: primary actions, the selected tab and the selected answer. Totals sit on grey, label left and figure right, as Uber Cash does; the Uber and Uber Eats patterns this follows are in `UBER-PATTERNS.md`.
- White is the primary reading surface. `#F3F3F3` separates supporting information without creating a card for every block.
- Uber blue `#276EF1` marks the current path and forward progress. A selected answer is black, as in Base.
- Uber green `#0E8345` appears only after verified completion or a correct answer.
- Amber and red are reserved for care, warning, and recovery states.
- No gradients, glass, confetti, ornamental illustrations, or game-like currency graphics.

## Typography

- Type comes only from Base's 36 text styles, each on a real Uber Move face: Display and Heading in Uber Move Bold; Label in Uber Move Text Medium; Paragraph in Uber Move Text Regular; Mono Display, Heading and Label in Uber Move Mono Medium; Mono Paragraph in Uber Move Mono Regular. Uber's brand sheet says the same: Uber Move for headlines, Uber Move Text for body copy.
- Uber Move is used for decisive headings and large numbers; Uber Move Text for body copy and controls; Uber Move Mono only where figures must align.
- Weights are 400, 500 and 700. There is no 600: Uber Move ships no semibold, and asking for one silently picks a neighbouring face.
- Page titles use Heading / Large (32/40) and section titles Heading / Small (24/32). Base text styles carry no negative tracking; the prototype no longer adds any.
- Labels are sentence case, as in Base, status labels included: "Required · Safety", not "REQUIRED · SAFETY".
- Body copy stays at 16px and roughly 35–65 characters per line.

## Layout

- The reference viewport is 390 × 844, with natural vertical scrolling inside the WebView.
- Navigation and bottom actions are stable edges; content owns the middle.
- Sections are separated by space and hairlines before containers. Cards are reserved for actions, selected states, or a meaningful surface change.
- Course progress is a path: each lesson has a state marker, a title, its activity count, and its contribution to the shared learning record.

## Gamification

- One account-level system spans every course: points, learning streak, cohort standing, and one badge per curriculum.
- Courses contribute points; they do not create competing scores.
- Badges belong to curricula, not courses: four curricula of four courses (sixteen in all), and a badge when every course in a curriculum is complete. A course advances its curriculum's badge but never earns one alone. The 30-day retention check awards no badge.
- Social proof is aggregate and anonymous. Optional courses show an average rating with a driver count, short anonymous reviews and a Trending tag. Required and sensitive courses show completion proof only ("Completed by 1,240 drivers rated 4.9+"): no stars, no Trending, no rating prompt.
- Correct practice can award points. Baseline and final measurement do not award points, so experiment results stay interpretable.
- Progress messages state the action and its consequence: “Correct · +10 points” or “Lesson complete · +40 points”.

## Components and states

- Base is the reference. Every learning component is designed on "❖ Learning Components" in the Base Gallery Figma file (page 22637:8), built from Base components, variables and text styles; `figma.map.json` lists the node ids. Where the prototype differed from Base, the prototype changed.
- Icons are official Uber icons (`course/icons.js`), never Unicode glyphs: Uber Move has no glyphs for them, so they fell back to a system font.
- Buttons are Base Button, Rect: 8px radius, with Large (56px) for the main action. Cards and panels use Base's 12px radius.
- Choice, dropdown, drag-and-drop, and sorting controls share the same border and selected-state grammar.
- Video is the dominant visual in video steps, with controls embedded in a black media surface.
- Correct, incorrect, loading, empty, offline, expired-session, denied, unsupported, and media-error states remain designed and reachable.
- Every interactive target is at least 44px, focus is visible, and reduced-motion settings are respected.

## Motion

- Completion uses one short scale-and-focus transition. Other state changes are immediate or use a 160–220ms ease-out.
- Motion communicates state; it never celebrates sensitive course content.

## Anti-patterns

- Do not introduce a second gamification layer inside a course.
- Do not use exact public rankings or expose learner identities.
- Do not add decorative progress rings, badges for lesson topics, streak flames, or points to assessments.
- Do not rewrite or shorten source-backed course guidance merely to make a screen look cleaner.
