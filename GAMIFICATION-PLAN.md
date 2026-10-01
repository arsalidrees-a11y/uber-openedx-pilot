# Gamification plan

## Product model

Use one learning-accountability layer across every course. Courses contribute to it; they do not create separate currencies, streaks, or rankings.

| Level | Shows | Does not show |
|---|---|---|
| Learning home | Time-aware greeting with the learner's first name, total points, weekly goal and week streak, example cohort band, and the next course action | A separate score for each course |
| Course | Percentage, completed lessons and activities, and next lesson | Course streak, course rank, or a parallel point balance |
| Lesson | Activity position, mode, feedback, and completion | Points, streak, rank, badges, or a redundant progress bar |

## Point rules

1. Award 10 points for the first verified completion of an eligible course activity.
2. Award points only after the completion condition is met: reading advanced, required video completed, reflection submitted, or practice answered correctly.
3. Resource-only screens, pre/post and delayed assessments, retries, reviews, repeated video plays, speed, and time spent award no points.
4. Add earned points to one learner total across every eligible course.
5. Show the contribution of an individual course as a breakdown, not as a second balance.
6. The prototype uses 10 points. Product and Data Science must approve the pilot value and eligible activity events.

## Streak, ranking, and badges

- **Weekly habit goal:** complete eligible activities on two different days in an active Monday-Sunday week. Finishing all available eligible learning also meets the goal. Consecutive successful weeks form the streak; no-content weeks pause it, and one missed active week per eight can be forgiven. The prototype uses the device time zone; the pilot must use an approved assigned-market time zone.
- **Cohort comparison:** show four equal position bands (1–25%, 26–50%, 51–75%, 76–100%). The prototype uses an explicitly illustrative cohort of 120; no position appears before the first qualifying activity. Real pilot bands require comparable learners, an agreed weekly window, and an approved minimum cohort size. Never show names or exact ranks.
- **Badges:** keep one account-level set of three: Applied after five correct practice completions, Thorough after verified course completion and its required check, and Retained after at least four correct answers on a five-question check 30 days later. Award each once and never revoke it.
- **Flow's set:** Uber's Flow tool assigns each driver a set of courses from their experience and other factors; every course in that set is required for that driver. Learning home lists only that set, as "Required" with a done count, and says "You're all caught up" once it is done. Everything else is optional and lives in All courses.
- **Parked:** Ratings, reviews, the Trending tag, social proof and curricula are parked (PRD scope, 2026-10-01): their components stay in the Figma library but appear on no screen or prototype view.
- **Road Safety:** its external completion does not contribute to points, the habit goal, or badges unless an approved verified event feed is connected.

## Learner-facing hierarchy

1. Learning home answers: What should I do next, and how is my overall learning progressing?
2. Course details answers: How much of this course is complete, and what lesson is next?
3. Learning progress answers: Where did my points come from, what achievements have I earned, and what is my next milestone?
4. Lessons stay focused on the safety content. Rewards appear only after meaningful completion and in the shared progress destination.

## Octalysis mapping and guardrails

- **Epic Meaning:** explain why required learning matters to community safety.
- **Development and Accomplishment:** visible course completion, points, and three evidence-based milestones.
- **Empowerment and Feedback:** applied practice with calm explanation and retry.
- **Ownership:** persistent progress and achievements across courses and sessions.
- **Social Influence:** an anonymous cohort band only; no leaderboard or public comparison.
- **Scarcity:** locked milestone previews without artificial deadlines.
- **Curiosity:** reveal the next lesson without hiding required information.
- **Loss Avoidance:** saved progress, never punitive streak loss.

Do not use confetti, countdowns, point loss, speed bonuses, monetary rewards, public identities, exact ranks, or reward mechanics inside sensitive lessons.

## Implementation contract

The server-authoritative learner record should expose:

- total points;
- current weekly goal, week streak, grace-week status, and qualifying activity dates;
- privacy-safe cohort band plus cohort and time-window identifiers;
- per-course activity and lesson completion;
- per-course point contribution;
- earned badge identifiers and timestamps.

Each point event needs a stable learner, course, lesson, activity, completion rule, first-award flag, experiment variant, and timestamp. The service must be idempotent so replayed events cannot award points twice.

## Experiment measures

Treat points, streak, badges, and cohort-band interactions as diagnostic measures—not proof of learning. Primary evidence remains course completion, common post-course knowledge, delayed retention, and the agreed course-specific target behavior.
