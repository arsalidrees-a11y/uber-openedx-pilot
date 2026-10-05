# Accessibility audit: 02 · Hi-fi

Audited 2026-10-05 against a designer's accessibility checklist (Shift Nudge's,
by MDS; its points are paraphrased here, not copied). Scope: all 63 screens on
the Figma page "02 · Hi-fi" (Uber-UI file), plus the prototype code where a
point is about implementation.

**How it was checked.** Measured in Figma: the contrast of all 1,031 visible
text layers against their real background (tokens resolved to hex, opacity
blended), the contrast of every icon and chevron, every text size, and the size
of every tappable component. Reviewed by eye: structure, labels, reading order,
colour-only meaning, media and feedback. Checked in code: `lang`, ARIA,
buttons, focus styles, reduced motion.

**Bar used.** WCAG 2.2 AA: text 4.5:1 (3:1 at 24 px, or 18.66 px bold),
icons and control outlines 3:1, targets at least 24 px. Our own rule, from
CLAUDE.md, is stricter on targets: 44 px.

## Result

41 checklist points:

| | Points |
|---|---|
| Pass | 23 |
| Fix in the designs (4 open fixes, listed next; 4 fixed, 1 accepted) | 2 |
| Decide or do (process) | 4 |
| For the developers (handoff) | 11 |
| Doesn't apply | 1 |

## Fix list, most important first

| # | Issue | Where | Measured | Fix |
|---|---|---|---|---|
| 1 | ~~"Correct" and "Not quite" titles in green and red on their light tints~~ **Accepted as is** (Arsal, 2026-10-05): within 0.16 of 4.5:1 and visually balanced | Single choice, Numeric (feedback panel) | 4.34:1 and 4.47:1; need 4.5 | None. The coloured icon and tinted panel carry the meaning too |
| 2 | Step numbers "01 02 03" in blue on light blue | Course introduction | 4.15:1 | Use Blue700 (#175BCC), about 5.9:1, or black |
| 3 | ~~Chevrons on tappable cards in disabled grey #A6A6A6~~ **Fixed 2026-10-05** | Milestone (points card, Next lesson card) and Resource row (Support rows) | Was 2.19–2.43:1 | Library chevrons now Content/Secondary (#4B4B4B, about 8.8:1); reaches screens on publish |
| 4 | ~~Options not picked fade to disabled grey; after a wrong answer the right one fades too~~ **Fixed 2026-10-05** | Single choice · correct and · not quite | Was 2.43:1 (text), 2.19:1 (letters) | Disabled answer option now uses Content/Secondary text and letter. After a wrong answer the right option shows as Correct (no retry, as agreed) |
| 5 | Points icon (yellow lightning) on the grey stat chip; it's the only cue that "95" means points | Every Learning home state | 1.47:1; need 3 | A darker amber icon from the Uber palette, or a black icon. Also give each chip a spoken label ("95 points") |
| 6 | Filter chips and home stat chips are 32 px tall | All courses, Learning home | Passes AA (24 px), fails our 44 px rule | Keep the look; extend the tap area to 44 px in code (padding or a pseudo-element), and note it on the components |
| 7 | 12 px text carries real information | Tile captions ("2 of 7 lessons"), kickers ("Lesson 3 of 7", "Required · Safety"), dates ("Earned 26 October 2026"), unit labels, week history, video time | 193 layers at 12 px | Raise anything informative to 14 px (Label/Small or Paragraph/Small). Day letters and month labels can stay 12 |
| 8 | ~~Dropdown has no visible label; the placeholder does the work~~ **Fixed 2026-10-05** | Dropdown step | — | The select now shows its label, "Your answer", as on Numeric; the placeholder stays as the prompt |
| 9 | ~~Video has captions but no transcript~~ **Fixed 2026-10-05** | Video, Video · couldn't load | — | "Read the transcript" replaces the "CC on" chip under the video. Subtitles show inline, inside the player (Open edX Video XBlock), switched with the player's own CC button. Still to check: does the video need audio description? |

Disabled buttons ("Continue" and "Check answer" before an answer) are #A6A6A6 on
#F3F3F3 (2.19:1). WCAG exempts inactive controls, so they're not on the list,
but they're hard to read in sunlight.

## Checklist, point by point

Status: **Pass** · **Fix** (numbered above) · **Do** (process, not a screen) ·
**Dev** (handoff, see the last section) · **N/A**.

### Getting started

| Point | Status | Evidence |
|---|---|---|
| Considered visual, motor, cognitive, hearing and situational needs | Pass | Drivers use the webview in a parked car, often one-handed and in sunlight: actions sit in the bottom footer, targets are large, copy is plain |
| Accessibility treated as a constraint from the start | Pass | Kit rules (no colour literals, 44 px targets, reduced motion, tap alternatives to drag) are enforced by `npm run validate` |
| WCAG level decided | **Do** | PRODUCT.md and PRD-GAP-ANALYSIS.md: "formal WCAG target … remains to be agreed". Propose WCAG 2.2 AA |
| Core tasks made accessible first | Pass | Start or continue a lesson, answer, see progress: all reachable from the footer button |
| Permanent, temporary and situational disabilities | Pass | One-handed reach, no time limits, no drag-only steps |
| People with disabilities in research or testing | **Do** | Not done. Recruit 3–5 drivers who use VoiceOver, larger text or one hand for the pilot test round |

### Layout

| Point | Status | Evidence |
|---|---|---|
| Standard controls used deliberately | Pass | Base components throughout (buttons, tabs, list items, checkboxes, tags, sheets) |
| Custom controls justified and planned with developers | **Dev** | Matching, sorting, the custom select (`u-select`, chosen over native) and the bottom sheets need the patterns in the handoff |
| Page can be scanned in a logical order | Pass | One column, top to bottom |
| Clear page title | Pass | Navigation titles ("Your progress", "Lesson 1 of 7") or a page heading on every screen. Learning home's title ("Learning") should exist in code even though the screen shows the Uber logo |
| Headings show the structure | Pass | Section titles (Required, This week, By course) over their content |
| Visual order matches reading order | Pass | Badge seals and overlays are decoration on top of the content they belong to |
| Inputs and controls labelled | Pass | Numeric ("Your answer"), Reflection ("Your response") and Dropdown ("Your answer", Fix 8) |
| Action-oriented button labels | Pass | Verbs throughout: "Start", "Check answer", "Try again", "See all courses", "Start 30-day check" |
| Status text kept out of the tab order | **Dev** | |
| Links vs buttons used correctly | **Dev** | Prototype uses 37 `<button>`s and no clickable divs |
| Screen-reader scan works | **Dev** | |
| Logical keyboard order | **Dev** | |
| Roles, states and properties defined | **Dev** | 62 `aria-` attributes and 17 roles in the prototype already |

### Typography

| Point | Status | Evidence |
|---|---|---|
| Body copy at least 16 px | Pass | Lesson body is 16 px (Paragraph/Medium); 14 px is secondary text only. But see **Fix 7** for 12 px |
| Comfortable line height | Pass | Text styles: 16/24, 14/20, 18/24, 32/40 |
| 45–75 characters per line | Pass | About 45–50 on a 358 px column at 16 px; the narrowest a phone allows |
| Makes sense read aloud in order | Pass | Alt text still needed; see handoff |
| Rules for long text and truncation | Pass | Titles wrap instead of truncating; the edge-cut card in a carousel is the peek, not truncation. Decide a maximum (3 lines) before real course names arrive |
| Strong and emphasis used semantically | **Dev** | |
| Larger text sizes | **Dev** | Test at iOS's largest text sizes and 200% zoom. Components now grow with content, but 32 px chips and tags must not clip |

### Colour and contrast

| Point | Status | Evidence |
|---|---|---|
| Meaning not carried by colour alone | Pass | Right and wrong show an icon and a word; earned and locked badges have a caption; streak weeks differ by shape (check, dashed outline, "Now" label); "You" is labelled on the leaderboard |
| Text contrast | **Fix 2** (4 fixed) | 1,031 layers measured; 13 under 4.5:1. The feedback titles (4.34, 4.47) are accepted as is |
| High-contrast theme considered | **Do** | Out of pilot scope; respect iOS "Increase Contrast" if the Uber app passes it to the webview |

### Media

| Point | Status | Evidence |
|---|---|---|
| No text inside bitmap images | Pass | All art is vector Brand.uber illustration; the "Q&A" letters in one scene are decorative |
| Transcripts for audio | N/A | No audio-only content |
| Captions and transcripts for video | Pass | Subtitles inline in the player, switched with its CC button; "Read the transcript" under the video, also on the couldn't-load state (Fix 9) |
| Icons at least 3:1 and labelled | **Fix 5** (3 fixed) · **Dev** | Chevrons and the points icon fail. Icon-only buttons (close, back, CC, full screen, sort arrows) need spoken names |
| Alt text on meaningful images | **Dev** | |

### Functionality

| Point | Status | Evidence |
|---|---|---|
| Feedback after each action, including errors | Pass | Correct, Not quite, Saved, lesson results, system states (offline, slow, session ended, update) |
| Nothing flashes more than three times a second | Pass | Celebrations are static; no confetti |
| No unexpected change of context | Pass | Badge celebrations appear after the driver returns home; the new-courses notice is inline and dismissible; no pop-ups |
| Page language set | Pass | `<html lang="en">` in the prototype; the Open edX pages set their own |
| No full-page auto refresh | **Dev** | |
| Checked with accessibility tools | **Do** | Run Axe or Accessibility Insights and VoiceOver on staging once the build exists |
| ARIA where native HTML falls short | **Dev** | |

## Developer handoff

1. **Spoken names for icon-only buttons:** close, back, CC, full screen, sort up and down, the sheet's grabber, and the ⓘ in the Your progress header, named for the tab it opens ("How points work", "How your streak works", "How badges work", "How the leaderboard works").
2. **Alt text:**
   - Course art, badge art and seals say what they are ("Halfway badge, earned"). A locked badge is spoken as locked ("30-day check badge, locked"); its lock replaces the caption, so the lock itself is decorative.
   - Scenes and the decorative art tiles are empty (`alt=""`).
3. **Stat chips** read as one control: "95 points", "2-week streak", "0 of 3 badges".
4. **Bottom sheets** (rules, filters):
   - Move focus into the sheet, trap it, and close on swipe and Escape.
   - Return focus to the button that opened the sheet.
5. **The custom select** follows the ARIA listbox pattern, and the sentence with the blank labels it.
6. **Matching and sorting** keep their tap and arrow alternatives (WCAG 2.5.7 dragging) and announce moves.
7. **Tap areas** reach 44 px on the 32 px chips and tags (Fix 6).
8. **The sticky footer** must not cover a focused field or button (WCAG 2.4.11).
9. **Status text** ("Saved", "Correct") is announced (a live region) but not focusable.
10. **Large text:** test at the largest iOS text size and at 200% zoom. Run Axe and VoiceOver on staging.
11. **Video:** subtitles come from the Video XBlock's own transcript and show inside the player. "Read the transcript" opens that same transcript as text, and still works when the video can't load.
