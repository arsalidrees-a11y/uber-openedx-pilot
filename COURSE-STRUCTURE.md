# United States mandatory safety education storyboard

## Purpose

This storyboard defines how the supplied United States Mandatory Sexual Misconduct Education course becomes an interactive Version B experience without changing its approved subject matter, lesson order, safety guidance, support resources, or mandatory-video rules.

The source document is the content authority. It contains 7 modules, 24 learner screens, and 6 mandatory videos. Its first 6 modules generally use the same pattern: introductory text, a required video, and a takeaway screen. The seventh module is a longer text-led sequence about human trafficking. Version B retains that material and converts it into 33 short activities with contextual practice, explanatory feedback, visible course progress, and one restrained gamification layer owned by the course.

This is the production storyboard for the local prototype. It also documents the difference between the existing control experience and the interactive treatment for the A/B experiment.

## What the source course was

The source experience is a linear mobile presentation. Learners move through large text screens, watch 6 unskippable videos, and read takeaway lists. Completion is primarily evidence that each required screen and video was traversed.

| Source characteristic | Existing experience |
|---|---|
| Structure | 7 modules presented in a fixed sequence |
| Core rhythm | Read an introduction, watch a video, read takeaways |
| Video rule | Each of the first 6 videos must be watched to completion before moving on |
| Resume behavior | The course can be resumed, but an unfinished video restarts from the beginning |
| Learner action | Mostly Next and Previous navigation |
| Confirmation of understanding | Takeaway lists; no formative practice is shown in the supplied screens |
| Progress | A dashboard indicates completion across the course |
| Motivation | Mandatory completion; no persistent points, badges, or applied milestones |
| Human trafficking module | 5 text-led screens covering purpose, definition, indicators, specialist resources, and reporting |

The source remains Variant A. Version B should not recreate or visually imitate Variant A inside the treatment.

## How it becomes interactive

Version B changes the learning behavior, not the approved content. Every source statement is either presented directly, reinforced through practice, or included in a recap or resource screen. New interactions only ask learners to apply or recall what the source has already taught.

| Source behavior | Version B conversion | Learning purpose |
|---|---|---|
| Long introductory screen | Short orienting activity with one clear idea and a meaningful title | Reduce reading load and set a concrete expectation |
| List of objectives | Compact lesson preview | Explain why the lesson matters |
| Mandatory video | Focus prompt before playback, captions and transcript access, completion gate | Make viewing intentional while preserving the source rule |
| Takeaway list | One applied practice activity followed by a concise recap | Require retrieval before the final summary |
| Repeated Next navigation | Check answer, Try again, Continue, and Start next lesson | Make each action describe its consequence |
| Course dashboard | Discovery, recommendation rationale, course map, lesson states, resume, and achievements | Make assignment and progress understandable |
| Passive completion | Immediate explanatory feedback and visible lesson milestones | Let learners confirm what they understood |
| Generic completion | One shared progress system fed by course activities, with points, a learning streak, a privacy-safe cohort band, and three pilot badges | Recognize meaningful progress without creating separate reward systems for every course or lesson |

### Interaction design rules

1. Preserve the source meaning and sequence. Interaction prompts may simplify presentation but must not add policy claims.
2. Practice before recap. The learner retrieves or applies the idea before seeing the takeaway summary.
3. Explain every answer. Correct feedback states why the answer is appropriate; incorrect feedback redirects to the source idea without punishment.
4. Allow retry without point loss. The course measures learning, not first-attempt perfection.
5. Do not reward speed. Video playback, reading time, and response time never increase points.
6. Treat sensitive content with restraint. Sexual-violence content keeps its self-care language and avoids celebratory animation.
7. Keep resources accessible. Support and reporting information remains readable without completing an interaction.
8. Never make one trafficking indicator appear conclusive. The context warning must accompany the indicators.
9. Keep free-text reflection private and ungraded. Do not send its text in analytics payloads.
10. Provide keyboard and tap alternatives for drag and sorting interactions.

## Course journey

1. **Learning home** explains why the course is recommended for the learner's active United States driver or courier profile.
2. **Course details** states the mandatory status, 7-lesson scope, 33-activity structure, 6 required videos, and current progress.
3. **Course introduction** sets expectations for sensitive content, explains that progress is saved, and keeps support resources findable.
4. **Baseline check** captures three source-backed answers before learning begins. It does not award points or expose correctness.
5. **Lesson map** groups completed, current, and upcoming lessons into Foundations, Boundaries, and Safe response. The learner can resume the next required activity or review completed material.
6. **Lesson activity** presents one idea or decision at a time. It uses an activity count rather than a redundant within-screen progress bar.
7. **Feedback** confirms the source principle and allows a retry when required.
8. **Lesson completion** records what the lesson contributed to the course and shows the next lesson.
9. **Final knowledge check** uses three equivalent source-backed questions after all lessons. It remains outside the points system.
10. **Your progress** is the only gamification layer. It combines points, one week streak, three curriculum badges, and an anonymous start-month leaderboard. The current course contributes to this record while retaining its own completion percentage.
11. **Course completion** confirms all 7 lessons and the final check, and retains access to support resources and lesson review.
12. **Exit and resume** saves the last completed activity. An unfinished mandatory video restarts, as required by the source.

## Lesson rhythm

Lessons 1 through 6 use the rhythm **Orient → Learn → Apply → Confirm**. Lesson 1 includes a separate preview because the source contains explicit objectives. Lesson 7 has no supplied video and uses an eight-activity **Orient → Learn → Retrieve → Observe → Extend → Apply → Prepare → Confirm** sequence.

| Stage | Learner question | Treatment |
|---|---|---|
| Orient | Why does this matter? | Source introduction and lesson outcome |
| Learn | What does the approved course say? | Mandatory video with a focus prompt, or source reading in lesson 7 |
| Apply | Can I use this idea in context? | Short interaction derived only from source content |
| Confirm | What should I remember and where can I get help? | Takeaways and approved resources |

## Detailed storyboard

### Lesson 1 Helping to create a safe community

**Source:** Module 1, screens 1–4  
**Purpose:** Understand shared responsibility, the role of Community Guidelines, and available survivor support.  
**Progression beat:** Begin the mission and establish that safety is a shared responsibility.

| ID | Stage | Version B activity | Source retained | Interaction and completion |
|---|---|---|---|---|
| 1.1 | Orient | We all have a role to play | Safety issues can enter the car; misconduct affects people across backgrounds; drivers, riders, and rideshare companies share responsibility; Uber partnered with RAINN | Read, then Continue |
| 1.2 | Preview | What you will learn | Community Guidelines support drivers and riders; what to expect from the videos; available survivor resources | Review objectives, then Continue |
| 1.3 | Learn | Helping to create a safe community | Supplied mandatory video and its original completion rule | Focus prompt, captions, transcript, full-video gate |
| 1.4 | Apply | Your role in the community | Respect, Community Guidelines, and shared responsibility | Private one-sentence reflection; ungraded; text excluded from analytics |
| 1.5 | Confirm | Remember these takeaways | Shared role, driver support under the Guidelines, and supplied help resource | Read recap and resource, then complete lesson |

**Feedback:** Acknowledge the reflection without scoring its wording. Reinforce that safe and respectful experiences depend on shared responsibility.

### Lesson 2 Respecting privacy

**Source:** Module 2, screens 1–3  
**Purpose:** Recognize that conversation comfort varies and avoid a question or comment when unsure how it will be received.  
**Progression beat:** Move from general responsibility to a practical conversational choice.

| ID | Stage | Version B activity | Source retained | Interaction and completion |
|---|---|---|---|---|
| 2.1 | Orient | Let's talk or maybe not | Riders and drivers have different comfort levels; friendly intention does not guarantee comfort | Read, then Continue |
| 2.2 | Learn | Respecting privacy | Supplied mandatory video | Focus prompt about uncertainty, captions, transcript, full-video gate |
| 2.3 | Apply | Choose the respectful response | If unsure how someone may respond, it is best not to say it | Single-choice decision with retry and explanatory feedback |
| 2.4 | Confirm | Remember these takeaways | Intent can be misunderstood; do not ask when unsure; use Help in the Uber app; RAINN support | Read recap and resources, then complete lesson |

**Correct response:** Do not say it.  
**Feedback:** The source advises leaving out a question or comment when its reception is uncertain.

### Lesson 3 Conversational boundaries

**Source:** Module 3, screens 1–3  
**Purpose:** Keep conversations non-flirtatious, communicate a boundary, and end and report a trip safely if that boundary is ignored.  
**Progression beat:** Practice a clear response when a conversational boundary is crossed.

| ID | Stage | Version B activity | Source retained | Interaction and completion |
|---|---|---|---|---|
| 3.1 | Orient | Uber is not a dating app | Flirting by drivers or riders is inappropriate and violates Community Guidelines | Read, then Continue |
| 3.2 | Learn | Conversational boundaries | Supplied mandatory video | Focus prompt on address, redirect, and name-the-boundary options; full-video gate |
| 3.3 | Apply | A rider keeps flirting | When a communicated boundary is ignored, end the trip where it is safe and report the behavior | Scenario choice with retry and explanatory feedback |
| 3.4 | Confirm | Remember these takeaways | Do not flirt; address directly, redirect, or cite the Guidelines; end safely and report if behavior continues; RAINN support | Read recap and resources, then complete lesson |

**Correct response:** Pull over where the trip can be ended safely and report it.  
**Feedback:** The response protects the driver's boundary while preserving physical safety.

### Lesson 4 Respecting personal space

**Source:** Module 4, screens 1–3  
**Purpose:** Respect physical boundaries and ask for consent before offering physical assistance.  
**Progression beat:** Turn the abstract idea of a personal-space bubble into a clear consent action.

| ID | Stage | Version B activity | Source retained | Interaction and completion |
|---|---|---|---|---|
| 4.1 | Orient | Your space your bubble | Personal-space needs differ; physical touch is rarely appropriate while using the Uber app | Read, then Continue |
| 4.2 | Learn | Respecting personal space | Supplied mandatory video | Focus prompt on what must happen before physical assistance; full-video gate |
| 4.3 | Apply | Complete the guidance | Ask for consent before providing physical assistance | Select the missing phrase; retry and explanatory feedback |
| 4.4 | Confirm | Remember these takeaways | Do not touch strangers; sexual contact is prohibited even if consensual and applies to riders; ask before assisting; RAINN support | Read recap and resources, then complete lesson |

**Correct response:** Consent.  
**Feedback:** Assistance should be offered verbally first and provided only after consent.

### Lesson 5 Sexual violence awareness

**Source:** Module 5, screens 1–3  
**Purpose:** Understand the source definition of sexual violence, recognize included behaviors, and know where support is available.  
**Progression beat:** Slow the pace, protect learner agency, and confirm the central definition without sensational treatment.

| ID | Stage | Version B activity | Source retained | Interaction and completion |
|---|---|---|---|---|
| 5.1 | Orient | Take a deep breath | Sexual violence affects every community; the learner may pause for self-care | Read or pause; support remains accessible |
| 5.2 | Learn | Sexual violence awareness | Supplied mandatory video | Focus prompt on explicit agreement and support; captions, transcript, pause, full-video gate |
| 5.3 | Apply | Check the definition | Sexual violence is any sexual interaction that both parties have not explicitly agreed to | Single-choice definition check with retry and calm feedback |
| 5.4 | Confirm | Remember these takeaways | Definition, supplied examples, zero tolerance, reporting to Uber, and RAINN support | Read recap and resources, then complete lesson |

**Correct response:** Any sexual interaction that both parties have not explicitly agreed to.  
**Sensitive-content treatment:** No streak pressure, countdown, confetti, or competitive ranking is shown inside this lesson.

### Lesson 6 Bystander intervention

**Source:** Module 6, screens 1–3  
**Purpose:** Recognize the Direct, Distract, and Delegate approaches and remember to act only when safe.  
**Progression beat:** Move from recognizing boundaries to choosing a safe response that can help another person.

| ID | Stage | Version B activity | Source retained | Interaction and completion |
|---|---|---|---|---|
| 6.1 | Orient | You can make a difference | Drivers may notice a situation where someone needs help; three approaches are available | Read, then Continue |
| 6.2 | Learn | Bystander intervention | Supplied mandatory video | Focus prompt on the three approaches and personal safety; full-video gate |
| 6.3 | Apply | Match the three approaches | Direct addresses the behavior, Distract creates an interruption, Delegate brings in another person or authority | Match by drag or tap; keyboard alternative; retry and feedback |
| 6.4 | Confirm | Remember these takeaways | Direct, Distract, or Delegate; report to Uber when safe; proactive reporting supports community safety; source resources | Read recap and resources, then complete lesson |

**Feedback:** Define each approach after submission. Do not imply that direct intervention is always preferred.

### Lesson 7 Spotting human trafficking

**Source:** Module 7, screens 1–5  
**Purpose:** Recognize possible indicators, interpret them in context, remember useful details, and report through an appropriate safe channel.  
**Progression beat:** Use the skills developed across the course to observe carefully and respond without confrontation.

| ID | Stage | Version B activity | Source retained | Interaction and completion |
|---|---|---|---|---|
| 7.1 | Orient | You can help notice when something is not right | Drivers see varied people and places; awareness can help; recognize, report, and connect with trained professionals | Review the three outcomes, then Continue |
| 7.2 | Learn | What is human trafficking | Force, fraud, or coercion; labor or commercial sex; commercial sex involving a minor under 18; any age, gender, or background; local occurrence; secrecy and manipulation; PACT and Polaris partnership | Read in short sections, then Continue |
| 7.3 | Retrieve | Check the definition | A minor is someone under 18 | Numerical response with retry and explanatory feedback |
| 7.4 | Observe | Recognizing possible signs | All supplied indicators under Location, Behavior, and Interactions | Review three groups; keep context warning visible |
| 7.5 | Extend | Learn more from specialist organizations | Supplied descriptions and links for PACT and Polaris plus supplied Uber information link | Open resources optionally; Continue remains available |
| 7.6 | Apply | Put safe reporting in order | Stay safe and do not confront; remember factual details; report through the appropriate channel | Sort by drag, arrows, or tap; retry and feedback |
| 7.7 | Prepare | Remember useful details | Date, time, location, appearance, names or nicknames, and reason for concern | Review observation checklist; do not request details of a real incident |
| 7.8 | Confirm | Report suspected human trafficking | 911 for immediate danger; National Human Trafficking Hotline; text Help to 233733; report to Uber; well-lit safe-location guidance | Read and access reporting resources, then complete course |

**Correct sequence:** Stay safe and do not confront → remember factual details → report immediate danger to 911, contact the hotline, and report to Uber.  
**Context warning:** One indicator by itself is not necessarily proof of human trafficking. Consider it with other signs and the surrounding context.  
**Safety rule:** Never ask the learner to confront, investigate, photograph, follow, or personally rescue someone.

## Course level progress and gamification storyboard

Gamification supports completion and mastery but does not compete with the safety content. The learning experience has one learning record and one progress destination across courses. Eligible readings, required videos, reflections, and correctly completed practice contribute points to that shared record; resource-only screens and assessments do not. Courses retain progress percentages and do not create their own streaks, rankings, currencies, or reward dashboards. The experience prioritizes White Hat motivation from the Octalysis framework.

| Moment | Learner experience | Octalysis role | Constraint |
|---|---|---|---|
| Course discovery | Assignment connects to active profile, location, and required learning | Epic Meaning and Calling | Recommendation signals must be explainable |
| Lesson finished for the first time | Results screen: 10 points per step plus 5 per question right first time, shown as "+45 points" and "100% correct" | Development and Accomplishment | Repeats, checks, speed and time spent add nothing; before a lesson only its length shows |
| Incorrect practice | Right or wrong with a short explanation, then continue | Empowerment of Creativity and Feedback | No retry or requeue; a wrong first answer only misses the bonus |
| Save and resume | Progress and achievements persist | Ownership and Possession | An unfinished source video restarts |
| Half the curriculum's lessons finished | Halfway badge | Development and Accomplishment | Badges belong to the curriculum (Flow's required set) |
| Every curriculum course and its final check finished | Complete badge | Development and Accomplishment | Celebrated once on return home, never inside a lesson |
| Pass the 30-day check (opens 30 days after Complete), four of five | Retained badge | Development and Accomplishment | The check gives no points; retakes allowed after review |
| Your progress | One full-page sheet with Points, Streak (last 8 weeks), Badges and Leaderboard tabs, opened from the home stat chips | Social Influence and Relatedness | The only gamification dashboard; the leaderboard ranks this month's points in a start-month group (reset on the 1st), with random names, top 3 and your neighbours |
| Learning home | Flow's set as the Required list, with a done count; all caught up once done | Development and Accomplishment | Flow (Uber) chooses the set; optional courses live in All courses |
| Upcoming badge | Visible locked state | Scarcity and Impatience | No artificial deadline |
| Progressive reveal | Next lesson and milestone appear after completion | Unpredictability and Curiosity | Required information is never hidden for suspense |
| Safe exit | Saved progress avoids losing completed work | Loss and Avoidance | No punitive streak loss |

## Progress behavior

- Measure course progress across all 33 activities.
- Use the lesson map as the primary progress visualization.
- Inside a lesson, show `Activity X of Y`, the lesson name, and the mode: Learn, Watch, Practice, or Lesson recap.
- Do not show a progress bar inside an individual activity.
- Do not show points, streak, ranking, or badge counters inside an activity.
- Add points to the shared learner total only after the learner advances from the first verified completion of an eligible activity.
- At lesson completion, state what the lesson contributed to the course without presenting a separate lesson score.
- Mark a lesson complete only after its recap or final reporting screen.
- Keep completed lessons reviewable and upcoming lessons visible.
- Preserve the required sequence for completion credit.
- Store verified video completion separately from elapsed page time in production.

## Feedback behavior

| Activity type | Correct or complete | Incorrect or incomplete |
|---|---|---|
| Reading or recap | Continue is immediately available | Not applicable |
| Mandatory video | Continue unlocks after verified completion | Explain the video must finish; preserve pause and restart behavior |
| Private reflection | Confirm it is private practice | Do not score the wording |
| Choice or dropdown | Explain the matching source principle | Explain the relevant principle and offer Try again |
| Numerical response | Confirm that a minor is under 18 | Point back to the definition and offer Try again |
| Matching | Define Direct, Distract, and Delegate | Indicate that one or more matches need review without penalty |
| Sorting | Restate the safe reporting order | Return the items for another attempt |

## Source coverage checklist

- Shared responsibility across drivers, riders, and rideshare companies
- Community Guidelines support for drivers and riders
- RAINN partnership and support resources
- Conversation comfort levels and the advice not to speak when unsure
- Prohibition on flirting while using the app
- Address, redirect, or name a conversational boundary
- Safe trip termination and reporting when a boundary is ignored
- Personal-space differences and consent before physical assistance
- Prohibition of sexual contact even when consensual, applying to riders and drivers
- Self-care language before sexual-violence content
- Source definition and examples of sexual violence
- Reporting and RAINN support information
- Direct, Distract, and Delegate bystander approaches
- Reporting to Uber when safe
- Human-trafficking definition, including force, fraud, coercion, labor, commercial sex, and under-18 rule
- Warning that trafficking does not require movement and can happen locally
- All indicators under location, behavior, and interactions
- Warning that one indicator alone is not proof
- PACT and Polaris information
- Stay safe and never confront anyone directly
- Supplied observation details
- 911, National Human Trafficking Hotline at 1-888-373-7888, and text `Help` to 233733
- Safe-location instruction when cancelling a trip involving a distressed rider or suspected unaccompanied minor

## A B experiment contract

Variant A is the supplied existing experience. Variant B is this interactive and gamified treatment.

Hold constant across variants:

- Eligibility and assignment rules
- Lesson order and approved source meaning
- Mandatory status
- Approved videos, captions, and transcripts
- Video completion gates
- Support and reporting resources
- Completion definition
- Device and WebView environment
- Reminder cadence and experiment window
- Common post-course and delayed-retention measures

Treatment variables are the discovery entry point, segmented activities, applied practice, explanatory feedback, lesson milestones, and one persistent cross-course progress layer containing points, one cross-course streak, three pilot badges, and an anonymous learner-cohort band.

## Analytics plan

Use the stable activity IDs in this storyboard and record the assigned experiment variant with every event.

Minimum events: course recommended, opened, and started; lesson started and completed; activity viewed; video started, paused, restarted, and completed; interaction attempted and correct or incorrect; retry selected; resource opened; badge earned; save and exit; resume; course completed.

Do not record the text of the private reflection. Record only that activity 1.4 was completed.

Primary comparisons are course completion rate, common post-course knowledge score, and delayed retention. Diagnostic measures include time on task, abandonment, first-attempt correctness, retry rate, video completion and replay, resource opens, and resume rate. Points, badges, ranking, or treatment-only interactions must not be used as the sole evidence of learning.

## Content and production dependencies

- Approved source video files for lessons 1–6
- Approved captions and verbatim transcripts
- Content-owner validation of every derived practice prompt, answer, and feedback statement
- Confirmation of the `endingviolencecanada.org` resource currently present in the United States source document
- Final legal and policy review of all URLs, hotline wording, and phone actions
- Final destination for the generic Uber human-trafficking blog link
- Common assessment used by both experiment variants
- Server-side assignment, progress, completion, and analytics contracts
- Accessibility target and supported in-app WebView matrix

## Definition of ready

1. All 33 activities can be completed in sequence on a mobile viewport.
2. Every practice activity shows right or wrong with source-based feedback, then continues (no retry or requeue).
3. All 6 videos enforce completion and expose captions and transcript controls.
4. Lesson and course progress persist across exit and resume.
5. Your progress (Points, Streak, Badges, Leaderboard) receives points from every course, shows this course's contribution next to lifetime and this month's points, and applies the curriculum's Halfway, Complete and Retained badge rules (GAMIFICATION-PLAN.md).
6. Support and reporting resources appear at the relevant recaps.
7. Keyboard-only and tap-only alternatives work for matching and sorting.
8. The human-trafficking context warning is visible with the indicators.
9. Private reflection text is excluded from analytics.
10. A content owner signs off that Version B preserves the approved meaning of the source course.
