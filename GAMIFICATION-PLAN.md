# Gamification plan

The client-facing source is the "Driver Learning Gamification Metrics" Google
Doc (decided 2026-10-01, last aligned 2026-10-03). It has two tabs: Metrics,
and Assumptions and decisions, which marks every rule not in the PRD, proposal,
best-practices document or curriculum deck as Proposed, Assumption, To confirm
or Changes earlier guidance. This file restates both for the build; where the
two differ, the doc wins.

**Learning paths (2026-10-06).** A curriculum and a learning path are the same
thing: a **named** set of courses Flow sends, by topic (road safety, personal
safety) or by lifecycle stage (new-driver onboarding). Uber calls them
recommended learning paths. A driver can have several at once, and a course
can sit in more than one; it is taken once and counts for every path it is in.
Only **one course is mandatory** (Sexual misconduct education). Drivers see
every course that matches their location and gig type (driver or delivery
person), in a path or not, and every one counts toward points and badges.

So the driver's courses come in three layers: the mandatory course, their
learning paths, and all relevant courses (All courses). The screens never say
"Recommended"; the path names carry it.

Until 2026-10-06 this plan treated the curriculum as Flow's set of required
courses, one at a time and unnamed. Sections below that still use that model
say so.

## At a glance

| Metric | Unit | Earned by | Resets | Optional courses count |
|---|---|---|---|---|
| Points | Points | Finishing a lesson, plus a bonus for first-try correct answers | Never | Yes |
| Leaderboard | Rank in a start-month group of about 30 | Points earned this month | 1st of every month | Yes |
| Week streak | Weeks | Learning on 2 days in a Monday–Sunday week | A second missed week in any eight | Yes |
| Badges | One per course; Complete and 30-day check per learning path | Finishing a course; finishing every course in a path; passing the path's 30-day check | Never | Yes |

## Where each one shows

| Surface | Shows | Does not show |
|---|---|---|
| Learning home | Stat chips (lifetime points, week streak, badges earned), the Continue card (the lesson in progress), This week, Your learning paths (one card per path: its seal in a progress ring, "1 of 3 courses done", the next course), the Explore courses card | A score per course, points before a lesson |
| Learning path page | The path's seal in a large progress ring, "1 of 3 courses done", then its courses, each with its course badge in a progress ring | Points per path |
| Your progress | One full-page sheet with tabs Points, Streak, Badges, Leaderboard, replacing the old Learning progress page; each home chip opens its tab. The Points tab shows lifetime points next to this month's | A second dashboard |
| Course | Lessons complete, next lesson, lesson length ("4 steps · 3 min") | Course streak, course rank, a parallel balance |
| Course tile and Continue card | Flat Brand.uber course art, until Uber supplies course images | — |
| Lesson | Step position (the bar counts steps), feedback | Points, streak, rank, badges |
| Lesson results | "+45 points" and "100% correct", the next lesson | Praise labels, timers, speed |

## Points

1. A lesson pays out when it is finished for the first time, on the results screen.
2. Base: 10 points per step in the lesson.
3. Accuracy bonus: 5 points for each question answered correctly on the first try. The bonus is folded into the total, not listed separately.
4. Before a lesson, show its length only ("4 steps · 3 min"), never points.
5. Mistakes: show right or wrong with a short explanation, then continue. No retry inside the lesson and no requeue of wrong answers. A wrong first answer earns no bonus; points already earned are never taken away. After a wrong answer, the right option is marked correct, so the driver sees it in place (2026-10-05).
6. Repeating a lesson earns nothing. Final checks and the 30-day check earn no points; they count toward badges.
7. Every course earns points, including optional courses, sensitive topics and Warning courses.
8. The total never resets.

Demo data: lessons have 4–8 steps (lesson 1: 5, lessons 2–6: 4, lesson 7: 8). After lessons 1 and 2, with the lesson 2 question right first time, Sam has 50 + 45 = 95 points.

## Leaderboard

- Ranked by points earned this month; everyone starts again on the 1st of every month. Lifetime points still build up and show on the Points tab.
- Why monthly: drivers with more required courses would otherwise build an all-time lead, and optional courses don't get the same attention as required ones.
- Group: about 30 drivers who started learning in the same month. The group stays together whatever curriculum changes follow, because a driver's curriculum can change at any time. A month with fewer than 20 new drivers joins the previous month's group, to keep drivers anonymous. Groups don't depend on city, because the pilot runs in one city.
- Anonymous: the driver's own row reads "You"; others get a random name such as "Driver 4821". No real names or photos.
- Shown: the top 3, then the driver's own rank with the drivers just above and below.
- Drivers with no points this month are hidden. No "All courses done" marker.

This replaces the four anonymous position bands (updated 2026-10-02 to the monthly rule).

## Week streak

- A learning day is a day the driver completes any part of a lesson in any course (2026-10-06; until then, required courses only). A week is Monday to Sunday in the driver's local time zone; a streak week has at least 2 learning days.
- One missed week in any eight is forgiven; a second resets the streak to 0. Meeting the goal in 7 of 8 weeks keeps the streak; a second miss in the same eight weeks breaks it.
- The streak pauses only when there's no course left to take, and continues when new courses arrive.
- **Every course counts (decided 2026-10-06, as Uber asked).** The 2026-10-05 switch to required courses only is reversed: with one mandatory course, "required" no longer describes a learning path. The Streak rules sheet now reads "Every course counts, in a path or not." The prototype's `course/gamification.js` still counts required courses only (commit 22a8453) until it's switched back.
- The Streak tab shows the last eight weeks (met, forgiven, missed, paused, this week), because the forgiveness window is eight weeks. No flames.

## Badges

*Decided 2026-10-06 (Arsal); not yet in the client doc.* Every course and
every learning path has badges, Warning paths included. Optional courses count.

| Badge | Earned when | Looks like |
|---|---|---|
| Course | The course's lessons and its final check are done | Round seal: the course's art on its tint |
| Path: its title, e.g. "Personal safety hero" | Every course in the path is done | Medal wearing the path's seal |
| Path: 30-day check | The path's 30-day check is passed; it opens 30 days after Complete | Trophy wearing the path's seal |

- **No Halfway badge.** The progress ring around each seal already shows how
  far along a course or path is (the Apple Watch rings Uber pointed to), and a
  Halfway badge for every path would flood the Badges tab. The flag shape is
  retired.
- **A shared course earns one badge.** Sexual misconduct education in both New
  driver onboarding and Personal safety is one course badge, and finishing it
  moves both paths' rings.
- **One 30-day check per path**, not per course: a check per course would mean
  up to 16 checks for one driver. The check's rules below carry over unchanged.
- **Two badges at once.** Finishing a path's last course earns that course's
  badge and the path's Complete badge. The driver sees one celebration, for the
  path, and the course badge is named on the same screen ("Also earned: the
  Road safety fundamentals badge").
- Earning moment: a calm, one-time screen when the driver returns home. Never
  inside a lesson; no confetti, timers or countdowns.
- Never taken away; recognition only; each shows the date it was earned.
- The home stat chip counts every badge earned (no longer "1/3").
- **Every path has a title**, written by Uber and sent with the path: the
  name of its Complete badge. Safety topics use the hero pattern ("Personal
  safety hero", "Road safety hero"). The designs use "Road ready" for New
  driver onboarding as a placeholder. No titles with "Pro" (Uber Pro's tiers).
- **Warning paths get badges too**, like any other path, so their titles need
  care: they should name the habit gained, never the warning that sent them.

### Rings and seals

- **Seal:** art on a tint. A course's seal is its own course art. A path's seal
  is its own art; paths have none from Uber yet, so the designs borrow course
  art: Getting started for New driver onboarding, Safety toolkit for Personal
  safety, Crash detection for Road safety.
- **Ring:** a progress ring around the seal fills toward the badge: courses
  done out of the path's courses, or lessons done out of the course's lessons.
- **Colour means earned.** A seal is grey (its art in greyscale, lightened)
  until its badge is earned, then turns to full colour; the ring shows progress
  meanwhile. This follows Duolingo, Mindvalley, Reddit and Fitbit, and Uber's
  "seal when you complete" ask. Never fade a seal with opacity: it reads as
  disabled.

### Where badges show

- **Home:** the badges chip, and each path card's ring.
- **Learning path page:** the path's ring in its hero; each course in a ring.
- **Badges tab** (Your progress): the hero counts badges earned ("1 badge
  earned"); then **Learning paths**, one set per path (seal in its ring, name,
  "1 of 3 courses done", then its title badge and its 30-day check as slots); then
  **Courses**, one cell per course in the driver's paths plus any other course
  they've started, each with its seal in a ring and its date earned or where it
  stands ("22 Oct", "2 of 7 lessons", "4 lessons"). A shared course appears
  once. In each path set only the next badge has a caption ("2 to go"); the
  30-day check shows a lock until Complete, then "Opens 18 Dec", then "Open now".
- **Badge earned · course:** the course seal fills the disc; the line under it
  shows the path it moved ("1 of 3 courses done in New driver onboarding").
- **Badge earned · path:** the medal with the path's seal and the path's title;
  the body says when the 30-day check opens; the line under it names the course
  badge earned with it.
- **Badge detail:** tapping any badge opens a sheet with the badge in its ring,
  "Course badge" or "Path badge", its name, what earns it ("Earned when you
  finish all 7 lessons and the final check."), where it stands, and one
  action ("Continue course" or "See path"). It doesn't list the paths a shared
  course counts toward; the path rings show that.
- **New:** a badge earned since the driver last opened the Badges tab carries a
  "New" tag there (as Lyft does). It covers the course badge that shares a
  celebration with its path.

Figma: 02 · Hi-fi, section "Hi-fi · Iterations · Learning paths (version 2)".

Why rings and sets: people speed up as a goal gets close and slow down once a
badge is earned (Anderson et al. 2013; Kusmierczyk and Gomez-Rodriguez 2018),
and a card that starts partly filled is completed far more often (34% against
19% for loyalty cards, Nunes and Drèze 2006). A path's ring works like that
card: courses already finished, including shared ones, pre-fill it. Rejected:
levels ("Complete ×2"), which read like Uber Pro's tiers.

The 2026-10-01 to 10-05 model (three badges per curriculum: Halfway, Complete,
30-day check; required courses only; one curriculum at a time) is in git
history.

## When the curriculum changes

*Written for the one-curriculum model.* Uber has since said drivers can have
several learning paths at once, so a new path adds its own set of badges and
nothing closes; earned badges stay with their path. What happens when Flow
withdraws or replaces a path is still open, and the rules below are the
starting point for it.

| Metric | New curriculum assigned | Course added to the current one |
|---|---|---|
| Badges | Three new badges. Earned ones stay, under Earlier badges; unearned ones close | No change. Complete now needs the added course |
| Finished courses | Count toward the new curriculum if their content is unchanged | — |
| Week streak | Continues from where it paused | Continues from where it paused |
| Points, leaderboard | No change (the leaderboard resets monthly anyway) | No change |
| Driver sees | A one-time notice on home, and the new courses under Required | The new course under Required |

### A new curriculum before the old one is finished

*Added 2026-10-05; in the doc the same day.* Flow can send a new curriculum while the
driver holds one or two of the old curriculum's three badges.

**Rules**

1. Badges already earned in the old curriculum are kept, with their date. They
   move to **Earlier badges** on the Badges tab.
2. Badges not yet earned in the old curriculum close quietly. They are never
   shown as missed, locked or expired: the driver didn't fail anything, Uber
   changed the curriculum.
3. The new curriculum starts its own three badges: Halfway, Complete, 30-day check.
4. Finished lessons count toward the new curriculum's badges when the same
   course, with unchanged content, is in it. If that already reaches half, the
   new Halfway is earned at once and celebrated once on the way home.
5. If Flow only adds a course to the current curriculum, nothing resets:
   earned badges stay, and Complete now needs the added course.
6. If the old curriculum is replaced after Complete but before its 30-day
   check, that check doesn't open. Its courses count toward the new
   curriculum's 30-day check badge if they carried over. (To confirm, below.)

**What the driver sees**

- **Home:** the one-time "New required courses" notice ("Your points, streak
  and earlier badges stay"). The badges chip counts the new curriculum only.
- **Badges tab:** the current curriculum's card first ("Now"), then a card
  for each earlier curriculum, showing only badges actually earned, with their
  dates. Curricula have no names, so each card is labelled by its courses and
  its seal (see "How badges look").

**Example** (Figma, 02 · Hi-fi, "Your progress · Badges · earlier badges"):

| | Old curriculum: Sexual misconduct education | New curriculum: + Regional safety training |
|---|---|---|
| Halfway | Earned 26 Oct → Earlier badges | Earned 12 Nov, from the 7 carried-over lessons (7 of 11) |
| Complete | Earned 4 Nov → Earlier badges | Locked: needs Regional safety training and its final check |
| 30-day check | Not earned → closes, not shown | Locked: opens 30 days after the new Complete |

**Stored as** (for the build)

- **Curriculum:** one record per Flow assignment: id, driver, courses, status
  (active, replaced or expired), assigned and replaced dates.
- **Badge award:** driver, curriculum id, badge, date earned. Never deleted.
- **Lesson progress:** per driver per course, independent of curricula, so it
  carries over on its own.
- Badge progress is worked out live from the active curriculum. A replaced
  curriculum stops being worked out; its awards stay.

## Road safety

The doc makes no exception for road safety: like every course, Road safety fundamentals earns points, and counts toward learning days and badges if it is in the driver's curriculum. (The earlier "adds no points" exception and its open question were dropped from the doc on 2026-10-03.) Every course in the catalogue is a real course with lessons; nothing is shown as "coming soon" (decided 2026-10-03).

## Octalysis mapping and guardrails

- **Epic Meaning:** explain why required learning matters to community safety.
- **Development and Accomplishment:** lesson results, points, course badges and path badges.
- **Empowerment and Feedback:** right or wrong with a short explanation, then on.
- **Ownership:** persistent points and badges across courses and sessions.
- **Social Influence:** an anonymous start-month leaderboard of this month's points, reset on the 1st; no names, photos or public profiles.
- **Scarcity:** locked badges shown greyed, without deadlines.
- **Loss Avoidance:** points and badges are never lost; one missed week in eight is forgiven.

Never use confetti, countdowns, point loss, speed bonuses, monetary rewards, real identities, or reward mechanics inside sensitive lessons.

## Implementation contract

The server-authoritative learner record exposes:

- total points, with per-lesson awards (base and bonus) and per-course totals;
- learning days, the current streak, the longest streak, and the state of each of the last eight weeks;
- leaderboard group id (start month), this month's points and rank, and the visible rows (top 3, neighbours), with pseudonymous names;
- each learning path assigned through Flow (id, name, courses, status, assigned and replaced dates), with ring progress for each active path;
- badge awards (course badge, path Complete, path 30-day check) with the course or path id and timestamp, kept when a path is replaced;
- per-course lesson completion, independent of curricula.

Each point event needs a stable learner, course, lesson, step count, first-try correct count, first-award flag, experiment variant and timestamp. The service must be idempotent so replayed events cannot award points twice.

## To confirm with Uber (from the doc)

1. Leaderboard groups: drivers who started learning in the same month, ranked by this month's points, independent of curriculum.
2. More than one curriculum at a time. If so, badges are earned per curriculum.
3. Repeated courses: one course in more than one curriculum, or assigned again later. If so, it earns points once and counts toward each curriculum's badges. Edly suggests a course re-run for a course that must be repeated.
4. Whether Flow can say when it sends a new curriculum rather than adding a course to the current one.
5. Renewal: if a curriculum expires (for example yearly), renewal works like a new curriculum.

Added 2026-10-05, in the doc as questions 6–9:

6. A 30-day check left open when its curriculum is replaced: proposed that it
   doesn't open, and that carried-over courses count toward the new
   curriculum's 30-day check badge instead.
7. Whether earlier badges may name the courses they were for ("Sexual
   misconduct education"), since curricula themselves have no names.
8. Whether a driver can be sent back to an earlier curriculum, and if so
   whether its earned badges return to the top of the Badges tab.
9. Which course gives a curriculum its seal when it has several: proposed,
   the first required course in Flow's order.

Questions 2 and 4 decide the rules above: with two curricula at a time,
nothing closes and each keeps its own three badges; if Flow can't tell a new
curriculum from an added course, the platform must infer it from the course
list.

**Uber's answers (2026-10-05):**

1. Probably yes; Uber would like examples of how other apps group drivers.
2. Yes: drivers can have several paths at once, such as road safety and
   personal safety side by side.
3. Yes: a course can be in several paths, is taken once and counts for each.
   After a while it could earn points again as a refresher (not designed yet).
4. Yes. Course data reaches Open edX through a Syllabus integration, still to
   be defined.
5. Yes, though most paths won't need it; refresher points would encourage it.
6 and 8. Not answered.
7 and 9. Superseded: paths have names, and a path's seal is its own art.

## Assumptions and decisions added 2026-10-05

In the doc's Assumptions tab since 2026-10-05 (Badges and Technical tables), labelled the way the doc labels them.

| Rule | Label |
|---|---|
| Earned badges from a replaced curriculum stay, under Earlier badges, with date and courses | Proposed |
| Unearned badges of a replaced curriculum close without being shown as missed or locked | Proposed |
| The home badges chip counts the current curriculum only | Proposed |
| Carried-over lessons can earn the new curriculum's Halfway at once, with the usual one-time celebration | Proposed |
| A 30-day check doesn't open after its curriculum is replaced | To confirm |
| Each Flow assignment has a stable id, and replacing one is distinguishable from adding a course | Assumption |
| Lesson progress is stored per course, so it carries over without copying | Assumption |
| Each curriculum's badges carry the seal of its main course; the Badges tab groups badges by curriculum | Proposed |
| A curriculum's main course is the first required course in Flow's order | To confirm |
| The third badge is shown to drivers as "30-day check", not "Retained" | Proposed |
| Optional courses earn points but don't count as learning days for the week streak (in the doc since 2026-10-05) | Proposed |

## Changes to earlier guidance

- The accuracy bonus: the best-practices document advised no points for assessment answers.
- A ranked, anonymous leaderboard replaces its anonymous cohort band, which advised against exact ranks.

## Technical assumptions (from the doc)

- Open edX knows the month a driver started learning, for leaderboard grouping.
- Open edX scoring shows whether each question was answered correctly on the first try.
- Progress can be tracked per curriculum, as assigned by Flow.
- A check can unlock automatically 30 days after Complete.
- A change to a course's content can be detected, so finished courses carry over to a new curriculum only if unchanged.
- Each curriculum Flow sends has a stable id, and a replaced curriculum stays queryable so its badge awards can be listed (added 2026-10-05).

## Experiment measures

Treat points, streaks, badges and leaderboard views as diagnostic measures, not proof of learning. Primary evidence remains the PRD's three KPIs: voluntary learning, verified learning gain, and the course-specific target behaviour.
