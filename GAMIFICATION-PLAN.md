# Gamification plan

The client-facing source is the "Driver Learning Gamification Metrics" Google
Doc (decided 2026-10-01). This file restates it for the build; where the two
differ, the doc wins.

A driver's **curriculum** is the set of required courses Uber assigns through
Flow. Uber groups drivers by region, vehicle type, lifecycle stage and product;
each group gets its own curriculum, and we never change the grouping.
**Optional courses** are all other courses.

## At a glance

| Metric | Unit | Earned by | Resets | Optional courses count |
|---|---|---|---|---|
| Points | Points | Finishing a lesson, plus a bonus for first-try correct answers | Never | Yes |
| Leaderboard | Rank in a start-month group of about 30 | Total points | Never | Yes |
| Week streak | Weeks | Learning on 2 days in a Monday–Sunday week | A second missed week in any eight | Yes |
| Badges | 3 per curriculum | Curriculum milestones | Never | No |

## Where each one shows

| Surface | Shows | Does not show |
|---|---|---|
| Learning home | Stat chips (points, week streak, badges), the Continue card, the Required carousel, This week | A score per course, points before a lesson |
| Your progress | One full-page sheet with tabs Points, Streak, Badges, Leaderboard; each home chip opens its tab | A second dashboard |
| Course | Lessons complete, next lesson, lesson length ("4 steps · 3 min") | Course streak, course rank, a parallel balance |
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

- Ranked by total points within a group of about 30 drivers in the same city who started learning in the same month. Groups are separate from curriculum groups and stay together once formed.
- A month with fewer than 20 new drivers joins the previous month's group.
- Drivers who finish every available course are marked "All courses done" at the top.
- Anonymous: the driver's own row reads "You"; others get a random name such as "Driver 4821". No real names or photos.
- Shown: the top 3, then the driver's own rank with the drivers just above and below.
- Drivers with zero points are hidden. No reset.

This replaces the four anonymous position bands.

## Week streak

- A learning day is a day the driver completes any part of a lesson. A week is Monday to Sunday; a streak week has at least 2 learning days.
- One missed week in any eight is forgiven; a second resets the streak to 0.
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
- After all three, home shows the curriculum done and suggests optional courses.

## When the curriculum changes

| Metric | New curriculum assigned | Course added to the current one |
|---|---|---|
| Badges | Three new badges; earlier ones stay | No change |
| Finished courses | Count toward the new curriculum if their content is unchanged | — |
| Week streak | Continues from where it paused | Continues from where it paused |
| Points, leaderboard | No change | No change |
| Driver sees | A one-time notice on home, and the new courses under Required | The new course under Required |

## Road safety

The externally tracked HTML5 course adds no points, learning days or badges unless an approved verified completion feed is connected (open question for Uber).

## Octalysis mapping and guardrails

- **Epic Meaning:** explain why required learning matters to community safety.
- **Development and Accomplishment:** lesson results, points, and three curriculum badges.
- **Empowerment and Feedback:** right or wrong with a short explanation, then on.
- **Ownership:** persistent points and badges across courses and sessions.
- **Social Influence:** an anonymous start-month leaderboard; no names, photos or public profiles.
- **Scarcity:** locked badges shown greyed, without deadlines.
- **Loss Avoidance:** points and badges are never lost; one missed week in eight is forgiven.

Never use confetti, countdowns, point loss, speed bonuses, monetary rewards, real identities, or reward mechanics inside sensitive lessons.

## Implementation contract

The server-authoritative learner record exposes:

- total points, with per-lesson awards (base and bonus) and per-course totals;
- learning days, the current streak, the longest streak, and the state of each of the last eight weeks;
- leaderboard group id, rank, and the visible rows (top 3, neighbours), with pseudonymous names;
- per-curriculum lesson progress and badge awards with timestamps;
- per-course lesson completion.

Each point event needs a stable learner, course, lesson, step count, first-try correct count, first-award flag, experiment variant and timestamp. The service must be idempotent so replayed events cannot award points twice.

## Open questions (from the doc)

For Uber: leaderboard groups by city and start month; more than one curriculum at a time; courses repeated across curricula; whether road safety counts; whether Flow can signal a new versus an updated curriculum; curriculum renewal or expiry.

For the Open edX team: passing city and start month in the token; first-try correctness for the bonus; per-curriculum progress; one course in two curricula; detecting unchanged content via course versions; scheduling the 30-day check; HTML5 completion.

## Experiment measures

Treat points, streaks, badges and leaderboard views as diagnostic measures, not proof of learning. Primary evidence remains the PRD's three KPIs: voluntary learning, verified learning gain, and the course-specific target behaviour.
