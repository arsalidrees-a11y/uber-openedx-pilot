# PRD gap analysis

Compared on 22 September 2026 against `DRAFT PRD OpenEdX Pilot .docx.pdf` and the current local Version B prototype in `course.html`.

## What the prototype already covers

The current prototype already contains the main learner-facing design surfaces required on PRD page 8: a learning-home/discovery entry, course outline, lesson and interactive activity views, a combined accountability/learning-progress view, cross-course points, one learning streak, three pilot badges, a privacy-safe learner cohort band, completion and resume, plus previews for loading, empty, offline, expired, unauthorized, unsupported, and media-error states. It also includes the five named interaction patterns from PRD page 5: multiple choice, dropdown, text/numerical response, drag-and-drop, and sorting.

## Missing from the complete learner and experiment workflow

| Priority | Missing item | PRD basis | Current gap | Next design/product action |
|---|---|---|---|---|
| P0 | Real mandatory videos | pp. 4–5: supplied videos and tested mandatory/unskippable behavior | Six video screens use poster images and a short simulated timer; there are no approved playable files. | Replace the simulation with approved video assets and verify pause, completion, replay, exit, and restart behavior. |
| P0 | Approved captions and verbatim transcripts | p. 5: support approved caption files | Captions are summaries and every transcript is placeholder copy. | Obtain VTT/SRT files and approved transcripts, then test caption controls and transcript reading. |
| P0 | Pre-assessment and post-assessment | pp. 6, 9–10: assessment responses and verified learning gain | Lesson practice exists, but there is no common pre/post instrument. The primary learning-gain KPI therefore cannot be calculated. | Add equivalent but non-identical pre- and post-course assessment flows shared by A and B. |
| P0 | Delayed-retention return flow | pp. 9–10: retention after 14 or 30 days | There is no scheduled return entry, retention assessment, or completed-course follow-up state. | Design the re-entry prompt, delayed assessment, completed state, and no-longer-eligible/error path. |
| P0 | Voluntary-learning journey | pp. 8–10: meaningful voluntary learning and unprompted return are primary/diagnostic measures | The only implemented course is mandatory, so the primary voluntary-learning KPI cannot be exercised in the prototype. | Add at least one clearly non-mandatory learning option and distinguish prompted from unprompted entry. This does not require algorithmic recommendations. |
| P0 | A/B assignment and control routing | pp. 6 and 12–13: distinguish treatment/control; Flow routes each learner | The local experience only runs Version B. It does not accept or expose an assignment, nor route to the existing Version A. | Define the assignment contract and prototype both entry outcomes while keeping course meaning, media, completion rules, and measurement constant. |
| P0 | Course-specific target behavior | pp. 9–10: each course must identify one observable target behavior | No target behavior or measurement moment has been selected for this course. | Agree the behavior with Product/Data Science and add its event or task to the measurement plan; do not invent it in the UI. |
| P0 | Event instrumentation and measurement specification | p. 6: events, destination, validation, weekly reporting, minimum sync fields | The storyboard names events, but the prototype emits none and has no payload schema, retry behavior, learner correlation, or destination. | Define the taxonomy and implement events for exposure, source/variant, mandatory/voluntary, prompted/unprompted, starts, completion, assessment, target behavior, errors, and course interactions. |
| P0 | Authenticated WebView entry and eligibility | p. 4: Breeze/OAuth2-equivalent access, signed assertion, pseudonymous UUID, JIT provisioning, no second login | Discovery begins without authentication, eligibility, token validation, or provisioning. Error screens are only manual previews. | Specify the entry contract, then connect successful, expired, invalid, unauthorized, and ineligible outcomes to the real launch flow. |
| P0 | Deep links and session lifecycle | p. 4: deep links into courses/lessons/units and session continuity | Navigation is internal only. Progress uses browser `localStorage`; there is no tested deep-link or authenticated session restoration. | Define URL targets and resume rules for home, course, lesson, and unit; test start, pause, exit, relaunch, and expiry. |
| P0 | Server-side progress and achievement persistence | p. 5: persist progress and achievements across sessions | Local persistence works in one browser profile only. It cannot reconcile across devices, reinstalls, WebView storage loss, or Open edX records. | Implement server-authoritative activity, video, course, points, streak, badge, and ranking state. |
| P0 | HTML5 road-safety course handoff | p. 5: link/embed existing HTML5 course and retain external completion tracking | The experience contains no entry, embedded view, return path, rendering failure, or external completion state for this course. | Add the HTML5 course card/entry, WebView state, return state, and tracking handoff. Resolve whether its completion contributes to gamification. |
| P0 | Complete controlled error flows | pp. 4 and 8: loading, timeout, expiry, enrollment, access, empty, unsupported, and error states | Most states exist as review-panel previews, but timeout and enrollment failure are not distinct and none are connected to a real operation. | Add timeout and enrollment states, then map each state to its trigger, recovery action, preserved data, and support path. |
| P0 | Content approval and source-to-target validation | p. 5: Uber-approved content and source-to-target validation | Interactive prompts and feedback are derived from the source but are not recorded as approved. One Canadian resource and a generic Uber trafficking link remain unresolved. | Run content-owner/legal review, resolve every URL and hotline action, and keep a signed coverage/version record. |
| P0 | Supported device/WebView and accessibility acceptance | pp. 4, 6, and 8: approved matrix, WCAG target, and test plan | The prototype is mobile-sized and includes useful keyboard/tap affordances, but there is no approved target, matrix, audit, or assistive-technology evidence. | Agree WCAG level and device matrix; test zoom, text scaling, screen readers, keyboard, reduced motion, media controls, focus order, and rotation. |

## Missing platform, authoring, governance, and operations work

These are P0 launch requirements in the PRD, but they are not additional learner screens and should not be disguised as prototype UI work.

- **Open edX deployment:** staging/production on Uber-managed infrastructure; approved registry, CI/CD, secrets, logging, pinned version, health checks, backup/restore, rollback, and release traceability (p. 4).
- **Open edX Studio authoring:** approved author access; administrator, staff, reviewer/publisher, reporting, and learner roles; least privilege; training; review checklist; publication flow; snapshots and version traceability (p. 5).
- **Security, privacy, and data governance:** formal reviews, data minimization, encryption, scans, controlled ingress/egress, retention/deletion/deactivation, and incident response (p. 6).
- **Reporting and reconciliation:** approved Uber analytics destination, event QA/retries, weekly treatment reporting, and reconciliation with `user_uuid`, `course_id`, `completion_status`, timestamp, and content version (p. 6).
- **Support readiness:** intake, severity, ownership, escalation contacts, response expectations, defect triage, rollback authority, fallback experience, and post-launch coverage (pp. 12–13).
- **Experiment definition:** treatment/control city, comparable cohorts, baseline, sample size, duration, power analysis, success thresholds, and guardrails remain TBD (pp. 11–15).

## Decisions still unresolved in the PRD

- Whether completion of the externally tracked HTML5 road-safety course contributes to Open edX progress, points, badges, or streaks (p. 5).
- The final privacy-safe ranking semantics and cohort rules.
- The exact point and streak rules, including calendar/time-zone behavior and anti-gaming safeguards.
- Approved WCAG target and supported app/OS/WebView matrix.
- Measurement taxonomy, payload definitions, destination, and KPI thresholds.
- Treatment and control cities and the course-specific target behavior.

## Not missing for this pilot

The following are explicitly P1/P2 or out of scope and should not be added to close the current design: algorithmic recommendations, adaptive learning, more gamification systems, expanded badges/challenges, ratings/reviews, community features, localization, multiple languages, monetary rewards, reward redemption, forums, media production, and global rollout (p. 7). The current explainable profile/market/requirement-based course recommendation is appropriate for the pilot; it must not be presented as an algorithmic recommendation.

## Recommended next slice

Before adding more interface polish, close the experiment-critical learner flow in this order:

1. Obtain and integrate the six approved videos, captions, and transcripts.
2. Define the course-specific target behavior and common A/B measurement specification.
3. Design and prototype pre-assessment, post-assessment, and delayed-retention re-entry.
4. Add treatment/control assignment, a voluntary-learning option, and prompted/unprompted entry states.
5. Add the HTML5 road-safety handoff and resolve whether it contributes to the shared gamification layer.
6. Connect auth, deep links, persistence, analytics, and error states to production contracts.
