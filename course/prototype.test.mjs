import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

const KEY = 'uber-us-mandatory-course-b-v4';
let loadCount = 0;
async function loadPage(query = '', saved = null) {
  const dom = new JSDOM('<main id="course"></main><aside id="review-panel"></aside><button id="review-toggle"></button>', { url: `https://example.test/course.html${query}` });
  dom.window.HTMLElement.prototype.scrollIntoView = () => {};
  globalThis.document = dom.window.document;
  globalThis.location = dom.window.location;
  globalThis.localStorage = dom.window.localStorage;
  if (saved) localStorage.setItem(KEY, JSON.stringify(saved));
  await import(`./course.js?test=${++loadCount}`);
  const click = selector => {
    const element = document.querySelector(selector);
    assert.ok(element, `Expected ${selector}`);
    element.click();
  };
  return { dom, click };
}
const text = () => document.querySelector('#course').textContent;
const all = (selector) => [...document.querySelectorAll(selector)];
const chips = () => all('.stat-chip').map(chip => chip.textContent);

// ---------- Learning home (2026-10-02: stat chips, Continue card, carousels) ----------
test('home greets the learner by name, with stat chips in place of an avatar', async () => {
  await loadPage('?firstName=Amina');
  assert.match(document.querySelector('.personal-greeting').textContent, /^Good (morning|afternoon|evening), Amina\.$/);
  assert.deepEqual(chips(), ['0', '0', '0/3']);
  assert.equal(document.querySelector('.avatar'), null);
  assert.doesNotMatch(text(), /Ready when you are|dummy data|Uber Learn/);
});

test('the home header shows the Uber wordmark and the three stats', async () => {
  await loadPage();
  const logo = document.querySelector('.discovery-header__logo');
  assert.equal(logo.getAttribute('role'), 'img');
  assert.equal(logo.getAttribute('aria-label'), 'Uber');
  assert.equal(logo.querySelectorAll('svg path').length, 4);
  assert.deepEqual(all('.stat-chip').map(chip => chip.dataset.tab), ['points', 'streak', 'badges']);
});

test('first visit: a Start card for lesson 1, length only, and no streak yet', async () => {
  await loadPage('?preview=discover&stage=new');
  const card = document.querySelector('.continue-card');
  assert.match(card.textContent, /Start · Lesson 1 of 7/);
  assert.match(card.textContent, /Helping to create a safe community/);
  assert.match(card.textContent, /Sexual misconduct education · 5 steps · 4 min/);
  assert.doesNotMatch(card.textContent, /point/i, 'points are never shown before a lesson');
  assert.equal(card.querySelector('.progress__bar'), null);
  assert.equal(card.querySelector('.btn').textContent, 'Start');
  assert.match(text(), /This weekNo streak yet/);
  assert.match(document.querySelector('.this-week').textContent, /0 of 2 learning days/);
});

test('mid-course home: chips, Continue card, Required carousel, This week, All courses', async () => {
  await loadPage('?preview=discover');
  assert.deepEqual(chips(), ['95', '2', '0/3']);
  const order = ['.continue-card', '.carousel', '.this-week', '.list-row'].map(s => document.querySelector(s));
  order.slice(1).forEach((el, i) => assert.ok(order[i].compareDocumentPosition(el) & 4));
  assert.match(document.querySelector('.continue-card').textContent, /Continue · Lesson 3 of 7Conversational boundariesSexual misconduct education · 4 steps · 3 min/);
  assert.match(document.querySelector('.continue-card').textContent, /2 of 7 lessons complete/);
  assert.deepEqual(all('.section-title h2').map(h => h.textContent), ['Required', 'This week']);
  assert.match(text(), /Required0 of 2 done/);
  assert.deepEqual(all('.carousel .course-tile').map(t => t.querySelector('.u-label-medium').textContent), ['Sexual misconduct education', 'Regional safety training']);
  assert.deepEqual(all('.course-tile .course-tile__footer').map(f => f.textContent), ['2 of 7 lessons', '4 lessons']);
  assert.match(text(), /This week2-week streak/);
  assert.match(document.querySelector('.this-week').textContent, /1 of 2 learning days/);
  assert.match(document.querySelector('.this-week').textContent, /keeps your 2-week streak going/);
  assert.doesNotMatch(text(), /Recommended|Trending|drivers rated|curriculum/i);
});

test('once every required course and badge is done, home says so and suggests optional courses', async () => {
  const { click } = await loadPage('?preview=discover&stage=caught-up');
  assert.deepEqual(chips(), ['540', '3', '3/3']);
  assert.match(document.querySelector('.banner--positive').textContent, /You’re all caught upYou’ve finished your required courses and earned all three badges\./);
  assert.equal(document.querySelector('.continue-card'), null);
  assert.deepEqual(all('.section-title h2').map(h => h.textContent), ['Required', 'Optional courses', 'This week']);
  assert.match(text(), /Required2 of 2 done/);
  assert.match(text(), /Optional courses5 courses/);
  assert.match(document.querySelector('.this-week').textContent, /Streak paused/);
  assert.match(document.querySelector('.this-week').textContent, /your 3-week streak is safe/);
  click('.banner__action');
  assert.equal(document.querySelector('h1').textContent, 'All courses');
});

test('a new curriculum shows a one-time notice; the finished course carries over', async () => {
  const { click } = await loadPage('?preview=discover&stage=new-curriculum');
  assert.deepEqual(chips(), ['360', '2', '1/3']);
  assert.match(document.querySelector('.banner--accent').textContent, /New required courses/);
  assert.match(document.querySelector('.continue-card').textContent, /Start · Lesson 1 of 4Regional safety training/);
  assert.match(text(), /Required1 of 2 done/);
  assert.deepEqual(all('.course-tile__footer').map(f => f.textContent), ['4 lessons · New', 'Complete · Carried over']);
  click('[data-action="dismiss-notice"]');
  assert.equal(document.querySelector('.banner--accent'), null);
});

test('a new badge is celebrated once, calmly, on the way back home', async () => {
  const { click } = await loadPage('?preview=badge&badge=halfway');
  assert.equal(document.querySelector('h1').textContent, 'Halfway');
  assert.match(text(), /Badge earnedHalfwayYou’ve finished half of your required lessons\./);
  assert.match(text(), /Earned 26 October 2026/, 'previews run on Wednesday 28 October 2026');
  assert.doesNotMatch(text(), /congrat|amazing|awesome/i);
  click('[data-action="celebrated"]');
  assert.ok(document.querySelector('.continue-card'), 'back on Learning home');
  assert.equal(chips()[2], '1/3');
  click('[data-action="all-courses"]');
  click('[data-action="discover"]');
  assert.equal(document.querySelector('.celebration'), null, 'not shown twice');
});

test('Learning home leads into All courses through the All courses row', async () => {
  const { click } = await loadPage();
  assert.match(document.querySelector('.list-row').textContent, /All coursesEvery course available to you, any time7/);
  click('[data-action="all-courses"]');
  assert.match(document.querySelector('.results-line').textContent, /^7 courses$/);
  click('[data-filter="type:optional"]');
  assert.match(document.querySelector('.results-line').textContent, /^5 coursesReset$/);
});

// ---------- Your progress: one full-page sheet, a tab per chip ----------
test('each home chip opens Your progress on its tab, and the close button returns home', async () => {
  const { click } = await loadPage('?preview=discover');
  click('.stat-chip[data-tab="streak"]');
  assert.equal(document.querySelector('.nav-header__title').textContent, 'Your progress');
  assert.equal(document.querySelector('.nav-header__action').getAttribute('aria-label'), 'Close');
  assert.deepEqual(all('[role="tab"]').map(tab => tab.textContent), ['Points', 'Streak', 'Badges', 'Leaderboard']);
  assert.equal(document.querySelector('[role="tab"][aria-selected="true"]').textContent, 'Streak');
  assert.equal(document.querySelector('.step-footer .btn').textContent, 'Continue learning');
  click('[data-action="close-progress"]');
  assert.ok(document.querySelector('.continue-card'));
});

test('Points: total, last lesson, by course, and how points work', async () => {
  await loadPage('?preview=progress&tab=points');
  assert.deepEqual(all('.stat-tile').map(t => t.textContent), ['95total points', '+45from your last lesson']);
  assert.deepEqual(all('.contribution-row').map(r => r.textContent), ['Sexual misconduct education2 of 7 lessons complete+95', 'Regional safety trainingNot started0', 'Road safety fundamentalsTracked outside this app, so it adds no points—']);
  assert.match(text(), /10 points for each step, plus 5 for each question you get right on the first try/);
});

test('Streak: current and longest, this week, and the last eight weeks with the forgiven week', async () => {
  await loadPage('?preview=progress&tab=streak');
  assert.deepEqual(all('.stat-tile').map(t => t.textContent), ['2 weekscurrent streak', '2 weekslongest streak']);
  assert.match(document.querySelector('.this-week').textContent, /1 of 2 learning days/);
  assert.deepEqual(all('.week-cell').map(c => c.className.replace('week-cell is-', '')), ['empty', 'empty', 'empty', 'empty', 'met', 'forgiven', 'met', 'current']);
  assert.equal(document.querySelector('.week-history__dates').lastElementChild.textContent, 'Now');
});

test('Badges: three curriculum badges in order, Halfway in progress', async () => {
  await loadPage('?preview=progress&tab=badges');
  assert.deepEqual(all('.badge-row__name').map(n => n.textContent), ['Halfway', 'Complete', 'Retained']);
  assert.deepEqual(all('.badge-shelf__item').map(n => n.textContent), ['Halfway', 'Complete', 'Retained']);
  const halfway = document.querySelector('.badge-row');
  assert.ok(halfway.classList.contains('is-in-progress'));
  assert.match(halfway.textContent, /2 of 6 lessons · 4 to go/);
  assert.equal(halfway.querySelector('.progress__bar').getAttribute('aria-valuenow'), '33');
  assert.doesNotMatch(text(), /Applied|Thorough/);
});

test('Leaderboard: this month’s points in a start-month group, top 3 and your neighbours', async () => {
  await loadPage('?preview=progress&tab=leaderboard');
  assert.match(text(), /Started learning in October · 30 drivers/);
  assert.doesNotMatch(text(), /Chicago|All courses done/);
  assert.deepEqual(all('.stat-tile').map(t => t.textContent), ['9thyour rank this month', '95your points this month']);
  assert.deepEqual(all('.leaderboard > *').map(r => r.classList.contains('lb-gap') ? '…' : r.textContent), ['1Driver 2210610', '2Driver 4821540', '3Driver 1307455', '…', '8Driver 9013120', '9You95', '10Driver 337880']);
  assert.ok(document.querySelector('.lb-row.is-you'));
  assert.match(text(), /Everyone starts again on 1 November, and your total points stay on the Points tab/);
});

// ---------- Lessons: length before, points after, no retry ----------
test('lesson results show two plain figures: points and accuracy', async () => {
  await loadPage('?preview=lesson-complete&lesson=1');
  assert.deepEqual(all('.stat-tile').map(t => t.textContent), ['+45points', '100%correct']);
  assert.match(text(), /Next lessonConversational boundaries4 steps · 3 min/);
  assert.equal(document.querySelector('.step-footer .btn').textContent, 'Start lesson 3');
  assert.doesNotMatch(text(), /great|awesome|amazing|seconds/i);
});

test('a wrong first answer explains and continues: no retry, no bonus; a repeat earns nothing', async () => {
  const { click } = await loadPage('?preview=activity&lesson=1&step=2');
  click('[data-choice="0"]');
  click('[data-action="check"]');
  assert.match(document.querySelector('#feedback').textContent, /Not quite/);
  assert.equal(document.querySelector('.step-footer .btn').textContent, 'Continue');
  assert.doesNotMatch(text(), /Try again/);
  click('[data-action="next"]');
  click('[data-action="next"]');
  assert.deepEqual(all('.stat-tile').map(t => t.textContent), ['+40points', '0%correct']);
  click('.step-footer .btn--tertiary');
  click('[data-lesson="1"]');
  click('[data-action="next"]');
  assert.deepEqual(all('.stat-tile').map(t => t.textContent)[0], '+0points');
  assert.match(text(), /Repeating a lesson earns no points/);
});

test('the numeric "not quite" state continues instead of retrying', async () => {
  await loadPage('?preview=activity&lesson=6&step=2&demo=incorrect');
  assert.match(text(), /Not quite/);
  assert.equal(document.querySelector('.step-footer .btn').textContent, 'Continue');
});

test('course details show lesson length, never points before a lesson', async () => {
  await loadPage('?preview=overview');
  assert.match(text(), /7 lessons · 6 required videos · about 25 min/);
  assert.match(text(), /95 points from this course/);
  const descriptions = all('.lesson-row small').map(s => s.textContent);
  assert.deepEqual(descriptions, ['Complete', 'Complete', 'In progress · 2 of 4', '4 steps · 3 min', '4 steps · 3 min', '4 steps · 3 min', '8 steps · 6 min']);
});

test('upcoming lessons are shown but cannot be opened early', async () => {
  await loadPage('?preview=overview');
  assert.ok(document.querySelector('[data-lesson="0"]'), 'completed lessons reopen for review');
  assert.ok(document.querySelector('[data-lesson="2"]'), 'the current lesson opens');
  assert.equal(document.querySelector('[data-lesson="3"]'), null);
  assert.equal(all('.lesson-row.is-upcoming').length, 4);
});

test('the course hero shows a plain shield until the course is complete', async () => {
  await loadPage('?preview=overview');
  assert.equal(document.querySelector('.safety-hero').dataset.state, 'not-complete');
  await loadPage('?preview=complete');
  assert.match(text(), /360 points from this course are in your total\./);
  assert.doesNotMatch(text(), /Badge unlocked/);
  document.querySelector('[data-action="overview"]').click();
  assert.equal(document.querySelector('.safety-hero').dataset.state, 'complete');
  await loadPage('?preview=overview&stage=complete');
  assert.match(text(), /7 of 7 lessons complete/);
  assert.match(text(), /360 points from this course/);
  assert.equal(document.querySelector('.step-footer .btn').textContent, 'Review course');
  assert.equal(all('.lesson-row.is-complete').length, 7);
});

test('finishing every lesson is not completion: the final check is still required', async () => {
  const { click } = await loadPage('?preview=final-check');
  click('[data-action="overview"]');
  assert.equal(document.querySelector('.safety-hero').dataset.state, 'not-complete');
  assert.equal(document.querySelector('.step-footer [data-action="final-check"]').textContent, 'Complete final check');
  click('[data-action="discover"]');
  assert.match(document.querySelector('.continue-card').textContent, /Next · Final knowledge check/);
  assert.match(document.querySelector('.course-tile').textContent, /7 of 7 lessons/);
});

test('the final check result says checks add no points but count toward Complete', async () => {
  await loadPage('?preview=final-result');
  assert.match(text(), /Checks don’t add points\. Passing this one counts toward your Complete badge\./);
});

test('the 30-day check earns Retained only after a passing result is saved', async () => {
  const { click } = await loadPage('?preview=retention');
  assert.match(text(), /30-day check · No pointsStill with you\?Five questions check what stayed with you from your required courses\./);
  click('[data-action="start-retention"]');
  for (const answer of [0, 1, 2, 0, 1]) {
    click(`[data-assessment-choice="${answer}"]`);
    click('[data-action="assessment-next"]');
  }
  assert.match(text(), /Save result and view badge/);
  click('[data-action="finish-retention"]');
  assert.equal(document.querySelector('h1').textContent, 'Retained');
  click('[data-action="celebrated-badges"]');
  const retained = all('.badge-row').find(row => /Retained/.test(row.textContent));
  assert.ok(retained.classList.contains('is-earned'));
});

test('saving and resuming reports progress and reopens the saved activity', async () => {
  const { click } = await loadPage('?preview=activity&lesson=0&step=4');
  click('[data-action="exit"]');
  assert.match(text(), /You finished 0 of 7 lessons, and lesson 1 keeps your place\./);
  click('[data-action="start"]');
  assert.equal(document.querySelector('h1').textContent, 'Remember these takeaways');
});

test('previews never overwrite the learner’s saved progress', async () => {
  const saved = { lesson: 0, step: 1, completed: [], started: true, responses: {}, answers: {}, learningRecord: { version: 2, timeZone: 'UTC', steps: [], lessons: [], courses: {}, retentionChecks: [], badges: [] } };
  const { click } = await loadPage('?preview=complete', saved);
  click('[data-action="progress"]');
  click('[data-action="close-progress"]');
  assert.deepEqual(JSON.parse(localStorage.getItem(KEY)), saved);
});

test('road safety handoff does not claim points without a verified feed', async () => {
  const { click } = await loadPage('?preview=library');
  click('[data-action="road-safety"]');
  assert.match(text(), /doesn’t add points, learning days or badges yet/);
  assert.equal(document.querySelector('.step-footer .btn').textContent, 'Back to all courses');
});

// ---------- Lesson activities ----------
test('video uses a posterless player with an accessible fullscreen control', async () => {
  await loadPage('?preview=activity&lesson=1&step=1');
  const player = document.querySelector('.video-player');
  assert.ok(player);
  assert.equal(player.querySelector('img'), null);
  assert.match(player.querySelector('.video-player__title').textContent, /Required video/);
  assert.match(text(), /Finish the video to unlock the next step/);
  const fullscreen = player.querySelector('[data-action="fullscreen"]');
  assert.equal(fullscreen.getAttribute('aria-label'), 'Enter fullscreen');
  assert.ok(fullscreen.querySelector('svg'));
});

test('activity nav shows the lesson; page dots above the action show position', async () => {
  await loadPage('?preview=activity&lesson=2&step=1');
  assert.equal(document.querySelector('.nav-header__title').textContent, 'Lesson 3 of 7');
  assert.match(document.querySelector('.activity-header').textContent, /Watch/);
  const dots = document.querySelector('.step-footer .page-dots');
  assert.equal(dots.getAttribute('aria-label'), 'Activity 2 of 4');
  assert.equal(dots.querySelectorAll('i').length, 4);
  assert.equal(dots.querySelectorAll('i.is-done').length, 1);
  assert.equal(dots.querySelectorAll('i.is-current').length, 1);
  assert.ok(dots.compareDocumentPosition(document.querySelector('.step-footer .btn')) & 4);
});

// ---------- All courses ----------
test('All courses lists Required, then Optional', async () => {
  await loadPage('?preview=library');
  const groups = all('.course-group');
  assert.deepEqual(groups.map(group => group.querySelector('h2').textContent), ['Required', 'Optional']);
  assert.deepEqual(groups.map(group => group.querySelectorAll('.course-card').length), [2, 5]);
  assert.match(groups[0].querySelector('.section-title').textContent, /Required0 of 2 done/);
  assert.match(groups[1].textContent, /Road safety fundamentals/);
});

test('the Required group holds several mandatory courses', async () => {
  const { click } = await loadPage('?preview=library');
  const cards = [...all('.course-group')[0].querySelectorAll('.course-card')];
  assert.deepEqual(cards.map(card => card.querySelector('.u-label-large').textContent), ['Sexual misconduct education', 'Regional safety training']);
  click('[data-course="regional-safety"]');
  assert.equal(document.querySelector('h1').textContent, 'Regional safety training');
  assert.match(text(), /Required · Safety/);
});

test('an optional course page shows only its outline: no ratings, proof or reviews', async () => {
  const { click } = await loadPage('?preview=course&id=2');
  assert.equal(document.querySelector('h1').textContent, 'Course 2');
  assert.equal(document.querySelector('.rating, .social-proof, .review, .curriculum-header'), null);
  assert.equal(all('.lesson-row').length, 4);
  click('[data-action="course-soon"]');
  assert.match(text(), /Content coming soon/);
});

test('All courses lists every course and narrows it with one-tap filters', async () => {
  const { click } = await loadPage('?preview=library');
  assert.equal(document.querySelector('h1').textContent, 'All courses');
  assert.match(document.querySelector('.results-line').textContent, /^7 courses$/);
  click('[data-filter="type:required"]');
  assert.match(document.querySelector('.results-line').textContent, /^2 coursesReset$/);
  assert.equal(document.querySelector('[data-action="open-filters"]').textContent, 'Filters · 1');
  assert.equal(all('.course-group').length, 0);
  click('[data-filter="status:in-progress"]');
  assert.deepEqual(all('.course-card .u-label-large').map(t => t.textContent), ['Sexual misconduct education']);
  click('[data-action="reset-filters"]');
  assert.match(document.querySelector('.results-line').textContent, /^7 courses$/);
});

test('the Filters sheet edits a draft and shows the live result before applying', async () => {
  const { click } = await loadPage('?preview=library');
  click('[data-action="open-filters"]');
  assert.ok(document.querySelector('.sheet[role="dialog"]'));
  assert.deepEqual(all('.check-row').map(r => r.textContent), ['Not started (6)', 'In progress (1)', 'Completed (0)', 'Required (2)', 'Optional (5)']);
  click('[data-draft="type:optional"]');
  assert.equal(document.querySelector('[data-action="apply-filters"]').textContent, 'Show 5 courses');
  assert.match(document.querySelector('.results-line').textContent, /^7 courses$/, 'the list waits for Apply');
  click('[data-draft="status:completed"]');
  assert.equal(document.querySelector('[data-action="apply-filters"]').textContent, 'Show 0 courses');
  click('[data-action="apply-filters"]');
  assert.equal(document.querySelector('.sheet'), null);
  assert.match(document.querySelector('.no-results').textContent, /No courses match these filters/);
  click('.no-results [data-action="reset-filters"]');
  assert.match(document.querySelector('.results-line').textContent, /^7 courses$/);
});

test('All courses previews match the Figma states', async () => {
  await loadPage('?preview=library&sheet=filters&status=in-progress&type=required');
  assert.ok(document.querySelector('.sheet'));
  assert.equal(document.querySelector('[data-action="apply-filters"]').textContent, 'Show 1 course');
  await loadPage('?preview=library&status=completed&type=optional');
  assert.ok(document.querySelector('.no-results'));
  assert.match(document.querySelector('.results-line').textContent, /^0 coursesReset$/);
});
