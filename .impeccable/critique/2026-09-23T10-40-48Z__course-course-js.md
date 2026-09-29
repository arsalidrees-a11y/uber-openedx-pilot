---
target: Uber Learn home dashboard greeting
total_score: 12
max_score: 20
na_heuristics: 3,5,7,9,10
p0_count: 0
p1_count: 2
timestamp: 2026-09-23T10-40-48Z
slug: course-course-js
---
Method: dual-agent (A: /root/dashboard_design_review · B: /root/dashboard_evidence)

## Design Health Score

**12/20 — Acceptable.** Five heuristics are applicable to this static dashboard header; interaction-only heuristics are marked n/a.

| # | Heuristic | Score | Key issue |
|---|---|---:|---|
| 1 | Visibility of system status | 2/4 | The header says required learning is ready but does not name it, quantify it, or surface its next action. |
| 2 | Match between system and real world | 3/4 | The language is calm, but “learning is ready” is less concrete than “1 required course.” |
| 3 | User control and freedom | n/a | The greeting is non-interactive. |
| 4 | Consistency and standards | 2/4 | `YOUR LEARNING` uses uppercase for a non-status label despite the design contract reserving uppercase for statuses. |
| 5 | Error prevention | n/a | No input or risky action exists here. |
| 6 | Recognition rather than recall | 2/4 | Learners must scroll to discover which required course is waiting. |
| 7 | Flexibility and efficiency | n/a | No accelerator applies to this static header. |
| 8 | Aesthetic and minimalist design | 3/4 | The visual treatment is clean, but the largest element carries the least actionable information. |
| 9 | Error recovery | n/a | No error state exists here. |
| 10 | Help and documentation | n/a | Contextual help is not needed in the greeting. |

## Design Specificity Verdict

**Partly branded, mostly category-interchangeable.** Uber Move, black-and-white restraint, and generous spacing feel plausibly Uber, but the composition and copy could sit in almost any corporate LMS. It does not foreground what is specific to this product: one required safety course, its state, its scope, and the immediate next action.

## Overall Impression

The surface is visually sound but operationally inverted. At 390 × 844, the greeting header is 173.7px tall—20.6% of the entire viewport—and the content through the greeting consumes 31.6% once navigation is included. The H1 wraps cleanly to two lines with no horizontal overflow, and contrast is excellent. The issue is not fit; it is that a pleasantry dominates while the required course appears later, after the stats and weekly-goal regions.

Cognitive load is **moderate (2 checklist failures)**: single focus and visual hierarchy. There are no overloaded decision points. The emotional tone is calm and respectful, but the phrase “required learning” introduces obligation without immediately resolving what the requirement is, how much work it contains, or what the learner should tap.

## What's Working

- Calm, serious tone appropriate to sensitive safety education.
- Strong type, spacing, contrast, and semantic structure; the page has no horizontal overflow.
- State-aware copy architecture already supports new, in-progress, and completed learners.
- The learner name is safely normalized and capped before rendering.

## Priority Issues

### [P1] The hierarchy prioritizes the greeting over required work

**Why it matters:** Drivers and couriers opening an operational dashboard need to know what must be completed next. The required course sits below the greeting, metrics, and weekly goal.

**Fix:** Make the required course and its action the first substantive content. Reduce the personalized greeting to a small context line and move points, streak, and standing below the required task.

**Suggested command:** `$impeccable layout`

### [P1] The supporting copy is warm but vague

**Why it matters:** “Your required learning is ready” repeats “learning” without naming the course, its size, or the next action.

**Fix:** State the concrete object and scope: `Sexual misconduct education · 7 lessons`, followed by `View course`. If guaranteed, add `Your progress saves automatically.`

**Suggested command:** `$impeccable clarify`

### [P2] `YOUR LEARNING` is redundant and conflicts with the visual contract

**Why it matters:** It adds no information and uses uppercase for navigation rather than a true status.

**Fix:** Remove it or replace it with a meaningful status token such as `REQUIRED · SAFETY`.

**Suggested command:** `$impeccable typeset`

### [P2] Personalized wrapping is fragile at extreme name lengths

**Why it matters:** The current H1 is 40px and `overflow-wrap:anywhere` applies broadly. Long names or 200% zoom can break names at arbitrary characters.

**Fix:** Reduce the greeting’s typographic role and keep names on word-boundary wrapping. Verify long names and zoom after the hierarchy change.

**Suggested command:** `$impeccable adapt`

## Persona Red Flags

**Casey, distracted mobile user:** The actual required task appears after the greeting and gamification surfaces. Casey may leave before reaching the next action.

**Jordan, first-time learner:** “Required learning” does not identify the course or first step. The subsequent “Example band” adds prototype language before orientation is complete.

**Sam, accessibility-dependent learner:** Contrast is strong, but the 11px-authored context label computes to 14px because of selector specificity, and arbitrary wrapping can damage long-name readability. Programmatic focus lands on an H1 whose outline is removed, then Tab skips the earlier avatar because focus begins later in DOM order.

## Recommended First-Viewport Hierarchy

1. Personal context: `Good afternoon, Sam.`
2. Status: `REQUIRED · SAFETY`
3. H1: `Sexual misconduct education`
4. Scope and reassurance: `7 lessons. Start when it works for you—your progress saves automatically.`
5. Primary action: `View course`
6. Points, streak, standing, and weekly goal after the required task.

For an in-progress learner, lead with `Continue lesson 3` and `4 activities remaining`. For completion, lead with `Required learning complete` and `View learning record`.

## Minor Observations

- The body copy wraps without clipping and has an 8.72:1 contrast ratio; the H1 contrast is 21:1.
- The supporting sentence leaves “works for you” on the second line in the supplied screenshot.
- Device-time greetings can be wrong for travelers or stale WebView clocks.
- The page programmatically focuses the H1 but explicitly removes its outline.
- If the course has a deadline, “Start when it works for you” must not conceal it.

## Questions to Consider

- Is the learner opening this dashboard to be greeted, or to learn what must be completed next?
- Should points and streaks precede a mandatory course about sexual misconduct?
- Which promise matters most in the first viewport: manageable scope, saved progress, or deadline clarity?
