# Gamification plan

The client-facing source is the "Driver Learning Gamification Metrics" Google
Doc (decided 2026-10-01, last aligned 2026-10-03). It has two tabs: Metrics,
and Assumptions and decisions, which marks every rule not in the PRD, proposal,
best-practices document or curriculum deck as Proposed, Assumption, To confirm
or Changes earlier guidance. This file restates both for the build; where the
two differ, the doc wins.

A driver's **curriculum** is the set of required courses Uber assigns through
Flow. Uber groups drivers by region, vehicle type, lifecycle stage and product,
and each group receives its own curriculum. A driver's curriculum can change at
any time, even for drivers who started on the same one. **Optional courses**
are all other courses, open to every driver.

## At a glance

| Metric | Unit | Earned by | Resets | Optional courses count |
|---|---|---|---|---|
| Points | Points | Finishing a lesson, plus a bonus for first-try correct answers | Never | Yes |
| Leaderboard | Rank in a start-month group of about 30 | Points earned this month | 1st of every month | Yes |
| Week streak | Weeks | Learning on 2 days in a Monday–Sunday week | A second missed week in any eight | Yes |
| Badges | 3 per curriculum | Curriculum milestones | Never | No |

## Where each one shows

| Surface | Shows | Does not show |
|---|---|---|
| Learning home | Stat chips (lifetime points, week streak, badges for the current curriculum), the Continue card, the Required carousel, This week, the Explore courses card | A score per course, points before a lesson |
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
5. Mistakes: show right or wrong with a short explanation, then continue. No retry inside the lesson and no requeue of wrong answers. A wrong first answer earns no bonus; points already earned are never taken away.
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

- A learning day is a day the driver completes any part of a lesson. A week is Monday to Sunday in the driver's local time zone; a streak week has at least 2 learning days.
- One missed week in any eight is forgiven; a second resets the streak to 0. Meeting the goal in 7 of 8 weeks keeps the streak; a second miss in the same eight weeks breaks it.
- The streak pauses while nothing in the curriculum is left, and continues when new courses are added.
- Optional courses count as learning days.
- The Streak tab shows the last eight weeks (met, forgiven, missed, paused, this week), because the forgiveness window is eight weeks. No flames.

## Badges

Three per curriculum, earned in order. Only curriculum courses count.

| Badge | Earned when | If not passed |
|---|---|---|
| Halfway | Half the curriculum's lessons are finished | — |
| Complete | Every curriculum course and its final check are finished | Review the missed topics and retake, no limit |
| Retained | The 30-day check is passed; it opens 30 days after Complete | Review the missed topics and retake, no limit |

- Earning moment: a calm, one-time celebration screen when the driver returns home. Never inside a lesson; no confetti, timers or countdowns.
- Shown on the Badges tab with the date earned. Never taken away. Recognition only.
- The home stat chip counts the current curriculum's badges only ("1/3").
- Badges earned in an earlier curriculum stay on the Badges tab under **Earlier badges** (see below).
- After all three, home shows the curriculum done. The Explore courses card, on every home state, leads to optional courses.

### How badges look (decided 2026-10-05)

The three shapes never change: flag = Halfway, medal = Complete, trophy =
Retained, so drivers learn them once. What changes per curriculum is its
**seal**: the art of its main course on that course's tint (the book on blue
for Sexual misconduct education, the map-shield on teal for Regional safety
training). Every badge of that curriculum wears it, so a second Halfway looks
new rather than "got that already".

- **Badges tab:** one card per curriculum, a collection rather than a list.
  Each set has a divider above it, then the seal, "Now" or "Earlier", the
  curriculum's courses, and its badges as slots, 114 px wide so rows line up. The caption on each slot is the date earned or where it
  stands ("4 to go", "Up next", "After that", "Open now"). Earlier curricula
  show only the badges actually earned.
- **Hero:** "1 of 3 for your required courses", plus "· 3 in all" only
  once there are earlier curricula.
- **Badge-earned screen:** the seal sits on the badge's disc.
- **Main course:** the first required course in Flow's order (to confirm).

Why: people speed up as a goal gets close and slow down once a badge is
earned (Anderson et al. 2013; Kusmierczyk and Gomez-Rodriguez 2018), and a
card that starts partly filled is completed far more often (34% against 19%
for loyalty cards, Nunes and Drèze 2006). The set card works like that card,
carried-over lessons pre-fill it, and the seal makes each new set read as a
new goal. Rejected: levels ("Complete ×2"), which suit frequent habits, not
curricula that change a few times a year, and read like Uber Pro's tiers.

## When the curriculum changes

| Metric | New curriculum assigned | Course added to the current one |
|---|---|---|
| Badges | Three new badges. Earned ones stay, under Earlier badges; unearned ones close | No change. Complete now needs the added course |
| Finished courses | Count toward the new curriculum if their content is unchanged | — |
| Week streak | Continues from where it paused | Continues from where it paused |
| Points, leaderboard | No change (the leaderboard resets monthly anyway) | No change |
| Driver sees | A one-time notice on home, and the new courses under Required | The new course under Required |

### A new curriculum before the old one is finished

*Added 2026-10-05; not yet in the doc.* Flow can send a new curriculum while the
driver holds one or two of the old curriculum's three badges.

**Rules**

1. Badges already earned in the old curriculum are kept, with their date. They
   move to **Earlier badges** on the Badges tab.
2. Badges not yet earned in the old curriculum close quietly. They are never
   shown as missed, locked or expired: the driver didn't fail anything, Uber
   changed the curriculum.
3. The new curriculum starts its own three badges: Halfway, Complete, Retained.
4. Finished lessons count toward the new curriculum's badges when the same
   course, with unchanged content, is in it. If that already reaches half, the
   new Halfway is earned at once and celebrated once on the way home.
5. If Flow only adds a course to the current curriculum, nothing resets:
   earned badges stay, and Complete now needs the added course.
6. If the old curriculum is replaced after Complete but before its 30-day
   check, that check doesn't open. Its courses count toward the new
   curriculum's Retained if they carried over. (To confirm, below.)

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
| Retained | Not earned → closes, not shown | Locked: opens 30 days after the new Complete |

**Stored as** (for the build)

- **Curriculum:** one record per Flow assignment: id, driver, courses, status
  (active, replaced or expired), assigned and replaced dates.
- **Badge award:** driver, curriculum id, badge, date earned. Never deleted.
- **Lesson progress:** per driver per course, independent of curricula, so it
  carries over on its own.
- Badge progress is worked out live from the active curriculum. A replaced
  curriculum stops being worked out; its awards stay.

## Road safety

The doc makes no exception for road safety: like every course, Road safety fundamentals earns points and learning days, and counts toward badges if it is in the driver's curriculum. (The earlier "adds no points" exception and its open question were dropped from the doc on 2026-10-03.) Every course in the catalogue is a real course with lessons; nothing is shown as "coming soon" (decided 2026-10-03).

## Octalysis mapping and guardrails

- **Epic Meaning:** explain why required learning matters to community safety.
- **Development and Accomplishment:** lesson results, points, and three curriculum badges.
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
- each curriculum assigned through Flow (id, courses, status, assigned and replaced dates), with badge progress for the active one;
- badge awards with curriculum id and timestamp, kept when their curriculum is replaced;
- per-course lesson completion, independent of curricula.

Each point event needs a stable learner, course, lesson, step count, first-try correct count, first-award flag, experiment variant and timestamp. The service must be idempotent so replayed events cannot award points twice.

## To confirm with Uber (from the doc)

1. Leaderboard groups: drivers who started learning in the same month, ranked by this month's points, independent of curriculum.
2. More than one curriculum at a time. If so, badges are earned per curriculum.
3. Repeated courses: one course in more than one curriculum, or assigned again later. If so, it earns points once and counts toward each curriculum's badges. Edly suggests a course re-run for a course that must be repeated.
4. Whether Flow can say when it sends a new curriculum rather than adding a course to the current one.
5. Renewal: if a curriculum expires (for example yearly), renewal works like a new curriculum.

Added 2026-10-05, not yet in the doc:

6. A 30-day check left open when its curriculum is replaced: proposed that it
   doesn't open, and that carried-over courses count toward the new
   curriculum's Retained instead.
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

## Assumptions and decisions added 2026-10-05

Not yet in the doc; labelled the way the doc labels them.

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
