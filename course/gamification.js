// Gamification rules, from the "Driver Learning Gamification Metrics" doc
// (2026-10-01; restated in GAMIFICATION-PLAN.md). A driver's curriculum is the
// set of required courses Flow assigns them; optional courses are the rest.
//
// Points: a lesson pays once, when it is first finished: 10 per step plus 5
// for each question answered correctly on the first try. Checks pay nothing.
// Week streak: weeks with at least 2 learning days (Monday to Sunday). One
// missed week in any eight is forgiven; a second resets the streak. The streak
// pauses while nothing in the curriculum is left.
// Badges: three per curriculum, in order: Halfway, Complete, Retained.
// Leaderboard: total points within a start-month group of about 30 drivers.
export const POINTS_PER_STEP = 10;
export const FIRST_TRY_BONUS = 5;
export const WEEKLY_DAY_GOAL = 2;
export const FORGIVEN_WEEKS_WINDOW = 8;
export const ROAD_SAFETY_COUNTS_FOR_REWARDS = false;
export const QUESTION_TYPES = new Set(['choice', 'dropdown', 'number', 'drag', 'sort']);
export const BADGES = [
  { key: 'halfway', name: 'Halfway' },
  { key: 'complete', name: 'Complete' },
  { key: 'retained', name: 'Retained' }
];
export const RETENTION_DELAY_DAYS = 30;

const defaultTimeZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
const dateInZone = (value, timeZone) => {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date(value));
  const part = type => parts.find(item => item.type === type).value;
  return `${part('year')}-${part('month')}-${part('day')}`;
};
const mondayOf = day => {
  const date = new Date(`${day}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 6) % 7);
  return date.toISOString().slice(0, 10);
};
const addDays = (key, days) => {
  const date = new Date(`${key}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
};
export const weekKey = (value, timeZone) => mondayOf(dateInZone(value, timeZone));
export const lessonMinutes = steps => Math.ceil(steps * 0.75);

export function createLearningRecord(now = new Date().toISOString(), timeZone = defaultTimeZone()) {
  return {
    version: 2,
    timeZone,
    steps: [],
    lessons: [],
    courses: { 'sexual-misconduct': { assignedAt: now, completedAt: null, eligible: true } },
    retentionChecks: [],
    badges: []
  };
}

// A learning day is a day the driver completes any part of a lesson.
export function recordStep(record, { courseId, stepId, completedAt = new Date().toISOString() }) {
  const key = `${courseId}:${stepId}`;
  if (record.steps.some(step => step.key === key)) return false;
  record.steps.push({ key, courseId, stepId, completedAt });
  return true;
}

// Points are paid once, when a lesson is first finished.
export function recordLesson(record, { courseId, lessonId, steps, questions = 0, firstTryCorrect = 0, completedAt = new Date().toISOString() }) {
  const key = `${courseId}:${lessonId}`;
  if (record.lessons.some(lesson => lesson.key === key)) return null;
  const entry = { key, courseId, lessonId, steps, questions, firstTryCorrect, completedAt, points: steps * POINTS_PER_STEP + firstTryCorrect * FIRST_TRY_BONUS };
  record.lessons.push(entry);
  return entry;
}
export const lessonAward = (record, courseId, lessonId) => record.lessons.find(lesson => lesson.key === `${courseId}:${lessonId}`) || null;

export function recordCourseCompletion(record, courseId, completedAt = new Date().toISOString(), eligible = true) {
  const course = record.courses[courseId] || { assignedAt: completedAt, completedAt: null, eligible };
  if (course.completedAt) return false;
  record.courses[courseId] = { ...course, completedAt, eligible };
  return true;
}

export const pointsTotal = record => record.lessons.reduce((sum, lesson) => sum + lesson.points, 0);
export const coursePoints = (record, courseId) => record.lessons.filter(lesson => lesson.courseId === courseId).reduce((sum, lesson) => sum + lesson.points, 0);

// ---------- Badges: three per curriculum, earned in order ----------
export const badgeEarned = (record, key) => record.badges.find(badge => badge.key === key) || null;
export const earnedBadgeKeys = record => BADGES.map(b => b.key).filter(key => badgeEarned(record, key));

// curriculum: { lessonsDone, lessonsTotal, complete } for the required courses only.
export function awardBadges(record, curriculum, now = new Date().toISOString()) {
  const earned = [];
  const award = key => { if (!badgeEarned(record, key)) { record.badges.push({ key, earnedAt: now, celebrated: false }); earned.push(key); } };
  if (curriculum.lessonsTotal && curriculum.lessonsDone * 2 >= curriculum.lessonsTotal) award('halfway');
  if (badgeEarned(record, 'halfway') && curriculum.complete) award('complete');
  if (badgeEarned(record, 'complete') && record.retentionChecks.some(check => check.score >= 4)) award('retained');
  return earned;
}
export const nextCelebration = record => record.badges.find(badge => !badge.celebrated) || null;
export function markCelebrated(record) { record.badges.forEach(badge => { badge.celebrated = true; }); }

// The 30-day check opens 30 days after the Complete badge.
export function retentionOpensAt(record) {
  const complete = badgeEarned(record, 'complete');
  if (!complete) return null;
  const opens = new Date(complete.earnedAt);
  opens.setUTCDate(opens.getUTCDate() + RETENTION_DELAY_DAYS);
  return opens.toISOString();
}
export function recordRetentionCheck(record, { score, completedAt = new Date().toISOString() }) {
  const opens = retentionOpensAt(record);
  if (!opens || score < 4 || score > 5 || new Date(completedAt) < new Date(opens) || record.retentionChecks.length) return false;
  record.retentionChecks.push({ score, completedAt });
  return true;
}

// ---------- Week streak ----------
export function habitSummary(record, now = new Date().toISOString()) {
  const timeZone = record.timeZone;
  const currentWeek = weekKey(now, timeZone);
  // Weeks with curriculum work to do. Outside them the streak pauses.
  const curriculumWeeks = new Set();
  for (const course of Object.values(record.courses)) {
    if (!course.eligible || !course.assignedAt) continue;
    const last = weekKey(course.completedAt || now, timeZone);
    for (let week = weekKey(course.assignedAt, timeZone); week <= last; week = addDays(week, 7)) curriculumWeeks.add(week);
  }
  const daysByWeek = new Map();
  for (const step of record.steps) {
    const week = weekKey(step.completedAt, timeZone);
    if (!daysByWeek.has(week)) daysByWeek.set(week, new Set());
    daysByWeek.get(week).add(dateInZone(step.completedAt, timeZone));
  }
  const eligible = Object.values(record.courses).filter(course => course.eligible);
  const allDone = eligible.length > 0 && eligible.every(course => course.completedAt);
  const allDoneWeek = allDone ? weekKey(eligible.map(course => course.completedAt).sort().at(-1), timeZone) : null;
  const starts = [...curriculumWeeks, ...daysByWeek.keys()].sort();
  const first = starts[0] || currentWeek;
  let streak = 0, longest = 0, lastForgiven = -Infinity, index = 0, forgivenUsed = false;
  const states = new Map();
  for (let week = first; week <= currentWeek; week = addDays(week, 7), index++) {
    const days = daysByWeek.get(week)?.size || 0;
    const met = days >= WEEKLY_DAY_GOAL || (allDone && week === allDoneWeek);
    // This week counts once it ends ("grows to 3 weeks when the week ends").
    if (week === currentWeek) { states.set(week, { state: 'current', days }); continue; }
    let state;
    if (met) state = 'met';
    else if (!curriculumWeeks.has(week)) state = 'paused';
    else if (streak > 0 && index - lastForgiven >= FORGIVEN_WEEKS_WINDOW) { state = 'forgiven'; lastForgiven = index; forgivenUsed = true; }
    else { state = 'missed'; streak = 0; }
    if (met) { streak++; longest = Math.max(longest, streak); }
    states.set(week, { state, days });
  }
  const weeks = Array.from({ length: 8 }, (_, i) => {
    const start = addDays(currentWeek, (i - 7) * 7);
    const entry = states.get(start);
    return { start, state: start === currentWeek ? 'current' : entry ? entry.state : 'empty', days: entry?.days || 0 };
  });
  const thisWeekDays = new Set(daysByWeek.get(currentWeek) || []);
  const today = dateInZone(now, timeZone);
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(currentWeek, i);
    return { date, learned: thisWeekDays.has(date), today: date === today, past: date < today };
  });
  const learningDays = thisWeekDays.size;
  return {
    learningDays,
    goal: WEEKLY_DAY_GOAL,
    met: learningDays >= WEEKLY_DAY_GOAL || (allDone && currentWeek === allDoneWeek),
    paused: !curriculumWeeks.has(currentWeek),
    weekStreak: streak,
    longestStreak: longest,
    forgivenUsed,
    weeks,
    days,
    timeZone
  };
}

// ---------- Leaderboard: a start-month group of about 30 drivers ----------
// Illustrative group until the pilot passes city and start month in the token.
export const DEMO_GROUP = {
  city: 'Chicago',
  month: 'September',
  drivers: [
    { name: 'Driver 2210', points: 610, done: true }, { name: 'Driver 4821', points: 540 }, { name: 'Driver 1307', points: 455 },
    { name: 'Driver 6650', points: 390 }, { name: 'Driver 5172', points: 310 }, { name: 'Driver 8034', points: 250 },
    { name: 'Driver 2846', points: 175 }, { name: 'Driver 9013', points: 120 }, { name: 'Driver 3378', points: 80 },
    { name: 'Driver 7419', points: 60 }, { name: 'Driver 1185', points: 45 }, { name: 'Driver 6203', points: 45 },
    { name: 'Driver 4467', points: 40 }, { name: 'Driver 3921', points: 0 }, { name: 'Driver 8810', points: 0 },
    { name: 'Driver 2054', points: 0 }, { name: 'Driver 7736', points: 0 }, { name: 'Driver 5598', points: 0 },
    { name: 'Driver 1642', points: 0 }, { name: 'Driver 9381', points: 0 }, { name: 'Driver 4105', points: 0 },
    { name: 'Driver 6877', points: 0 }, { name: 'Driver 3260', points: 0 }, { name: 'Driver 8492', points: 0 },
    { name: 'Driver 5014', points: 0 }, { name: 'Driver 7128', points: 0 }, { name: 'Driver 2399', points: 0 },
    { name: 'Driver 9957', points: 0 }, { name: 'Driver 1733', points: 0 }
  ]
};
export function leaderboard(record, group = DEMO_GROUP, { done = false } = {}) {
  const you = { name: 'You', points: pointsTotal(record), done, you: true };
  const ranked = [...group.drivers, you]
    .filter(driver => driver.points > 0)
    .sort((a, b) => (b.done ? 1 : 0) - (a.done ? 1 : 0) || b.points - a.points || (a.you ? -1 : b.you ? 1 : 0))
    .map((driver, i) => ({ ...driver, rank: i + 1 }));
  const mine = ranked.find(driver => driver.you) || null;
  const show = new Set([0, 1, 2]);
  if (mine) [mine.rank - 2, mine.rank - 1, mine.rank].forEach(i => { if (i >= 0 && i < ranked.length) show.add(i); });
  const rows = [];
  [...show].sort((a, b) => a - b).forEach((i, n, all) => { if (n && i - all[n - 1] > 1) rows.push({ gap: true }); rows.push(ranked[i]); });
  return { city: group.city, month: group.month, size: group.drivers.length + 1, rank: mine?.rank || null, rows };
}
