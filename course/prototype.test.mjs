import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

let loadCount = 0;
async function loadPage(query = '') {
  const dom = new JSDOM('<main id="course"></main><aside id="review-panel"></aside><button id="review-toggle"></button>', { url: `https://example.test/course.html${query}` });
  dom.window.HTMLElement.prototype.scrollIntoView = () => {};
  globalThis.document = dom.window.document;
  globalThis.location = dom.window.location;
  globalThis.localStorage = dom.window.localStorage;
  await import(`./course.js?test=${++loadCount}`);
  const click = selector => {
    const element = document.querySelector(selector);
    assert.ok(element, `Expected ${selector}`);
    element.click();
  };
  return { dom, click };
}

test('home shows the weekly goal, and revisiting an activity does not award points twice', async () => {
  const { click } = await loadPage();
  assert.match(document.querySelector('#course').textContent, /Weekly learning goal/);
  click('[data-action="course"]');
  click('[data-action="course-intro"]');
  click('[data-action="baseline"]');
  for (let index = 0; index < 5; index++) {
    click('[data-assessment-choice="0"]');
    click('[data-action="assessment-next"]');
  }
  assert.match(document.querySelector('#course').textContent, /We all have a role to play/);
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
  assert.match(document.querySelector('#course').textContent, /does not add points/);
});

test('home greets the learner by name without showing generic placeholder copy', async () => {
  await loadPage('?firstName=Amina');
  assert.match(document.querySelector('.personal-greeting').textContent, /^Good (morning|afternoon|evening), Amina\.$/);
  assert.equal(document.querySelector('#required-course-title').textContent, 'Sexual misconduct education');
  assert.equal(document.querySelector('.avatar-button').textContent, 'A');
  assert.doesNotMatch(document.querySelector('#course').textContent, /Ready when you are|dummy data/);
});

test('home uses the named demo learner when no profile is supplied', async () => {
  await loadPage();
  assert.match(document.querySelector('.personal-greeting').textContent, /^Good (morning|afternoon|evening), Sam\.$/);
  assert.equal(document.querySelector('.avatar-button').textContent, 'S');
});

test('home calls the account total points', async () => {
  await loadPage();
  assert.equal(document.querySelector('.learning-stats small').textContent, 'Points');
  assert.doesNotMatch(document.querySelector('#course').textContent, /Learning points/i);
});

test('resumed home uses singular activity copy when one step remains', async () => {
  const { click } = await loadPage('?preview=activity&lesson=0&step=4');
  click('[data-action="exit"]');
  click('[data-action="discover"]');
  assert.match(document.querySelector('.priority-course').textContent, /1 activity remaining in this lesson/);
});

test('main course card keeps its resume action enabled and opens the saved activity', async () => {
  const { click } = await loadPage('?preview=activity&lesson=0&step=4');
  click('[data-action="exit"]');
  click('[data-action="discover"]');
  const resume = document.querySelector('.priority-course-action');
  assert.equal(resume.disabled, false);
  assert.equal(resume.dataset.action, 'start');
  click('.priority-course-action');
  assert.equal(document.querySelector('h1').textContent, 'Remember these takeaways');
});

test('home leads with the required course before goals and account progress', async () => {
  await loadPage();
  const course = document.querySelector('.priority-course');
  const goal = document.querySelector('.habit-card');
  const stats = document.querySelector('.learning-stats');
  assert.ok(course.compareDocumentPosition(goal) & 4);
  assert.ok(goal.compareDocumentPosition(stats) & 4);
  assert.match(course.textContent, /7 lessons · 6 required videos · 33 activities/);
  assert.match(course.textContent, /Completed progress saves automatically/);
  assert.equal(course.querySelector('[data-action="course"]').textContent.trim(), 'View course');
  assert.equal(course.querySelector('.course-ring').getAttribute('aria-label'), '0 of 7 lessons complete');
});

test('home progress summary uses verified account information', async () => {
  await loadPage();
  assert.deepEqual([...document.querySelectorAll('.learning-stats small')].map(element => element.textContent), ['Points', 'Week streak', 'Badges']);
  assert.doesNotMatch(document.querySelector('.learning-stats').textContent, /Example band/);
});

test('video uses a posterless slate and accessible fullscreen control', async () => {
  await loadPage('?preview=activity&lesson=1&step=1');
  const player = document.querySelector('.video-player');
  assert.ok(player);
  assert.equal(player.querySelector('img'), null);
  assert.match(player.querySelector('.video-slate').textContent, /Required video/);
  assert.match(player.querySelector('.video-slate').textContent, /Respecting privacy/);
  const fullscreen = player.querySelector('[data-action="fullscreen"]');
  assert.equal(fullscreen.getAttribute('aria-label'), 'Enter fullscreen');
  assert.ok(fullscreen.querySelector('svg'));
});

test('activity header shows the mode; page dots above the action show position', async () => {
  await loadPage('?preview=activity&lesson=2&step=1');
  const navContext = document.querySelector('.course-nav-context');
  assert.equal(navContext.querySelector('small').textContent, 'Lesson 3 / 7');
  assert.equal(navContext.querySelector('b').textContent, 'Conversational boundaries');
  assert.match(document.querySelector('.activity-meta-row .activity-type').textContent, /Watch/);
  assert.equal(document.querySelector('.activity-stepper'), null);
  const dots = document.querySelector('.course-footer .page-dots');
  assert.equal(dots.getAttribute('aria-label'), 'Activity 2 of 4');
  assert.equal(dots.querySelectorAll('i').length, 4);
  assert.equal(dots.querySelectorAll('i.is-complete').length, 1);
  assert.equal(dots.querySelectorAll('i.is-current').length, 1);
  assert.ok(dots.compareDocumentPosition(document.querySelector('.course-footer .u-btn')) & 4);
});

test('standing uses four visual bands and identifies its illustrative cohort', async () => {
  await loadPage('?preview=standing');
  assert.deepEqual([...document.querySelectorAll('.standing-band-label')].map(element => element.textContent), ['1–25%', '26–50%', '51–75%', '76–100%']);
  assert.equal(document.querySelectorAll('.standing-band.is-current').length, 1);
  assert.match(document.querySelector('.standing-panel').textContent, /Illustrative cohort/);
  assert.doesNotMatch(document.querySelector('.standing-panel').textContent, /dummy data|51–100%/);
});

test('retention check earns the badge only after a passing result is saved', async () => {
  const { click } = await loadPage('?preview=retention');
  click('[data-action="start-retention"]');
  for (const answer of [0, 1, 2, 0, 1]) {
    click(`[data-assessment-choice="${answer}"]`);
    click('[data-action="assessment-next"]');
  }
  assert.match(document.querySelector('#course').textContent, /Save your result/);
  click('[data-action="finish-retention"]');
  assert.match(document.querySelector('.badge-row.earned:last-child').textContent, /Retained/);
});
