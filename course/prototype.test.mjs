import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

let loadCount = 0;
async function loadPage(query = '', saved = null) {
  const dom = new JSDOM('<main id="course"></main><aside id="review-panel"></aside><button id="review-toggle"></button>', { url: `https://example.test/course.html${query}` });
  dom.window.HTMLElement.prototype.scrollIntoView = () => {};
  globalThis.document = dom.window.document;
  globalThis.location = dom.window.location;
  globalThis.localStorage = dom.window.localStorage;
  if (saved) localStorage.setItem('uber-us-mandatory-course-b-v3', JSON.stringify(saved));
  await import(`./course.js?test=${++loadCount}`);
  const click = selector => {
    const element = document.querySelector(selector);
    assert.ok(element, `Expected ${selector}`);
    element.click();
  };
  return { dom, click };
}
const text = () => document.querySelector('#course').textContent;

test('home shows the weekly goal, and revisiting an activity does not award points twice', async () => {
  const { click } = await loadPage();
  assert.match(text(), /Weekly learning goal/);
  click('[data-action="course"]');
  click('[data-action="course-intro"]');
  click('[data-action="baseline"]');
  for (let index = 0; index < 5; index++) {
    click('[data-assessment-choice="0"]');
    click('[data-action="assessment-next"]');
  }
  assert.match(text(), /We all have a role to play/);
  click('[data-action="next"]');
  let saved = JSON.parse(localStorage.getItem('uber-us-mandatory-course-b-v3'));
  assert.equal(saved.learningRecord.activities.length, 1);
  click('[data-action="back"]');
  click('[data-action="next"]');
  saved = JSON.parse(localStorage.getItem('uber-us-mandatory-course-b-v3'));
  assert.equal(saved.learningRecord.activities.length, 1);
});

test('road safety handoff does not claim points without a verified feed', async () => {
  const { click } = await loadPage('?preview=library');
  click('[data-action="road-safety"]');
  assert.match(text(), /does not add points/);
});

test('home greets the learner by name without showing generic placeholder copy', async () => {
  await loadPage('?firstName=Amina');
  assert.match(document.querySelector('.personal-greeting').textContent, /^Good (morning|afternoon|evening), Amina\.$/);
  assert.match(document.querySelector('.course-card').textContent, /Sexual misconduct education/);
  assert.equal(document.querySelector('.avatar').textContent, 'A');
  assert.doesNotMatch(text(), /Ready when you are|dummy data|Uber Learn/);
});

test('home uses the named demo learner when no profile is supplied', async () => {
  await loadPage();
  assert.match(document.querySelector('.personal-greeting').textContent, /^Good (morning|afternoon|evening), Sam\.$/);
  assert.equal(document.querySelector('.avatar').textContent, 'S');
});

test('home leads with the required course before goals and account progress', async () => {
  await loadPage();
  const course = document.querySelector('.course-card');
  const goal = document.querySelector('.weekly-goal');
  const stats = document.querySelector('.learning-stats');
  assert.ok(course.compareDocumentPosition(goal) & 4);
  assert.ok(goal.compareDocumentPosition(stats) & 4);
  assert.match(course.textContent, /^Safety.*7 lessons/);
  assert.equal(course.querySelector('.ring').getAttribute('aria-label'), '0 of 7 lessons complete');
  assert.deepEqual([...document.querySelectorAll('.learning-stats small')].map(element => element.textContent), ['Points', 'Week streak', 'Badges']);
});

test('saving and resuming reports progress and reopens the saved activity', async () => {
  const { click } = await loadPage('?preview=activity&lesson=0&step=4');
  click('[data-action="exit"]');
  assert.match(text(), /You completed 4 of 33 activities/);
  click('[data-action="start"]');
  assert.equal(document.querySelector('h1').textContent, 'Remember these takeaways');
});

test('video uses a posterless player with an accessible fullscreen control', async () => {
  await loadPage('?preview=activity&lesson=1&step=1');
  const player = document.querySelector('.video-player');
  assert.ok(player);
  assert.equal(player.querySelector('img'), null);
  assert.match(player.querySelector('.video-player__title').textContent, /Required video/);
  assert.match(player.querySelector('.video-player__title').textContent, /Respecting privacy/);
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

test('standing uses four visual bands and identifies its illustrative cohort', async () => {
  await loadPage('?preview=rewards&tab=standing');
  assert.deepEqual([...document.querySelectorAll('.standing-band-label')].map(element => element.textContent), ['1–25%', '26–50%', '51–75%', '76–100%']);
  assert.equal(document.querySelectorAll('.cohort__band.is-current').length, 1);
  assert.match(document.querySelector('.standing-panel').textContent, /Illustrative cohort/);
});

test('retention check earns the badge only after a passing result is saved', async () => {
  const { click } = await loadPage('?preview=retention');
  click('[data-action="start-retention"]');
  for (const answer of [0, 1, 2, 0, 1]) {
    click(`[data-assessment-choice="${answer}"]`);
    click('[data-action="assessment-next"]');
  }
  assert.match(text(), /Save result and view badge/);
  click('[data-action="finish-retention"]');
  const retained = [...document.querySelectorAll('.badge-row')].find(row => /Retained/.test(row.textContent));
  assert.ok(retained.classList.contains('is-earned'));
});

// Logic fixed on 2026-09-29, when the prototype was rebuilt to match Figma.
test('the course hero shows a plain shield until the course is complete', async () => {
  await loadPage('?preview=overview');
  assert.equal(document.querySelector('.safety-hero').dataset.state, 'not-complete');
  assert.match(text(), /2 of 7 lessons complete/);
  await loadPage('?preview=complete');
  document.querySelector('[data-action="overview"]').click();
  assert.equal(document.querySelector('.safety-hero').dataset.state, 'complete');
  await loadPage('?preview=overview&stage=complete');
  assert.equal(document.querySelector('.safety-hero').dataset.state, 'complete');
  assert.match(text(), /7 of 7 lessons complete/);
  assert.match(text(), /250 points from this course · 2 badges earned/);
  assert.equal(document.querySelector('.step-footer .btn').textContent, 'Review course');
  assert.equal(document.querySelectorAll('.lesson-row.is-complete').length, 7);
});

test('finishing every lesson is not completion: the final check is still required', async () => {
  const { click } = await loadPage('?preview=final-check');
  click('[data-action="overview"]');
  assert.equal(document.querySelector('.safety-hero').dataset.state, 'not-complete');
  assert.equal(document.querySelector('.step-footer [data-action="final-check"]').textContent, 'Complete final check');
  click('[data-action="discover"]');
  const ring = document.querySelector('.course-card .ring');
  assert.ok(!ring.classList.contains('is-complete'));
  assert.match(document.querySelector('.course-card').textContent, /Next: Final check/);
});

test('previews never overwrite the learner’s saved progress', async () => {
  const saved = { lesson: 0, step: 1, completed: [], started: true, responses: {}, learningRecord: { version: 1, timeZone: 'UTC', activities: [], courses: {}, retentionChecks: [] } };
  const { click } = await loadPage('?preview=complete', saved);
  click('[data-action="rewards"]');
  click('[data-action="discover"]');
  assert.deepEqual(JSON.parse(localStorage.getItem('uber-us-mandatory-course-b-v3')), saved);
});

test('upcoming lessons are shown but cannot be opened early', async () => {
  await loadPage('?preview=overview');
  assert.ok(document.querySelector('[data-lesson="0"]'), 'completed lessons reopen for review');
  assert.ok(document.querySelector('[data-lesson="2"]'), 'the current lesson opens');
  assert.equal(document.querySelector('[data-lesson="3"]'), null);
  assert.equal(document.querySelectorAll('.lesson-row.is-upcoming').length, 4);
});

test('mid-course numbers agree on every screen', async () => {
  await loadPage('?preview=overview');
  assert.match(text(), /70 points from this course · 0 badges earned/);
  assert.match(text(), /In progress · 1 of 4/);
  await loadPage('?preview=rewards&tab=progress');
  assert.match(text(), /Total pointsAcross all your courses70/);
  assert.match(text(), /2 of 7 lessons complete · 7 eligible activities\+70/);
  await loadPage('?preview=rewards&tab=habit');
  assert.match(text(), /1 of 2 learning days this week/);
  assert.match(text(), /2-week streak/);
  await loadPage('?preview=lesson-complete&lesson=1');
  assert.match(text(), /Lesson complete · \+30 points/);
  assert.match(text(), /total is now 70 points/);
});

test('the home header shows the Uber wordmark in place of a text brand', async () => {
  await loadPage();
  const logo = document.querySelector('.discovery-header__logo');
  assert.equal(logo.getAttribute('role'), 'img');
  assert.equal(logo.getAttribute('aria-label'), 'Uber');
  assert.equal(logo.querySelectorAll('svg path').length, 4);
  assert.equal(document.querySelector('.discovery-header').textContent.trim(), 'S');
});

// Reworked to the PRD on 2026-10-01: Flow's recommended set, three badges, no
// ratings, reviews, social proof or curricula.
test('home shows Flow’s recommended set as one carousel with a done count, and no ratings or proof', async () => {
  await loadPage();
  const section = document.querySelector('.recommended');
  assert.ok(document.querySelector('.course-card').compareDocumentPosition(section) & 4, 'the set follows the required course');
  assert.match(section.textContent, /Recommended for you/);
  assert.match(section.textContent, /Optional courses picked for you by Uber · 0 of 4 done/);
  assert.deepEqual([...section.querySelectorAll('.carousel .course-card')].map(card => card.querySelector('.u-label-large').textContent), ['Course 2', 'Course 3', 'Course 4', 'Course 5']);
  assert.equal(document.querySelector('.rating, .trending-tag, .social-proof, .review, .curriculum-header'), null);
  assert.doesNotMatch(text(), /Trending|drivers rated|curriculum/i);
  assert.match(document.querySelector('.learning-stats').textContent, /0 of 3Badges/);
});

test('the library lists Required, Recommended for you and More courses', async () => {
  await loadPage('?preview=library');
  const groups = [...document.querySelectorAll('.course-group')];
  assert.deepEqual(groups.map(group => group.querySelector('h2').textContent), ['Required', 'Recommended for you', 'More courses']);
  assert.deepEqual(groups.map(group => group.querySelectorAll('.course-card').length), [2, 4, 1]);
  assert.match(groups[0].querySelector('.section-title').textContent, /Required0 of 2 done/);
  assert.match(groups[2].textContent, /Road safety fundamentals/);
});

test('an optional course page shows only its outline: no ratings, proof or reviews', async () => {
  const { click } = await loadPage('?preview=course&id=2');
  assert.equal(document.querySelector('h1').textContent, 'Course 2');
  assert.equal(document.querySelector('.rating, .social-proof, .review, .curriculum-header'), null);
  assert.equal(document.querySelectorAll('.lesson-row').length, 4);
  click('[data-action="course-soon"]');
  assert.match(text(), /Content coming soon/);
});

test('the badges tab shows the three PRD badges', async () => {
  await loadPage('?preview=rewards&tab=badges');
  assert.deepEqual([...document.querySelectorAll('.badge-row__name')].map(name => name.textContent), ['Applied', 'Thorough', 'Retained']);
  assert.match(text(), /1 of 5 correct practice activities/);
});

test('the Required section holds several mandatory courses, with a done count', async () => {
  const { click } = await loadPage();
  const title = [...document.querySelectorAll('.section-title')].find(t => /^Required/.test(t.textContent));
  assert.match(title.textContent, /Required0 of 2 done/);
  const cards = [...title.nextElementSibling.querySelectorAll('.course-card')];
  assert.deepEqual(cards.map(card => card.querySelector('.u-label-large').textContent), ['Sexual misconduct education', 'Regional safety training']);
  assert.deepEqual(cards.map(card => card.querySelector('.u-label-x-small').textContent), ['Safety', 'Safety']);
  click('[data-course="regional-safety"]');
  assert.equal(document.querySelector('h1').textContent, 'Regional safety training');
  assert.match(text(), /Required · Safety/);
});
