export const POINTS_PER_ACTIVITY = 10;
export const WEEKLY_DAY_GOAL = 2;
export const ROAD_SAFETY_COUNTS_FOR_REWARDS = false;

export const ELIGIBLE_ACTIVITY_TYPES = new Set(['reading', 'video', 'text', 'choice', 'dropdown', 'number', 'drag', 'sort']);
export const PRACTICE_TYPES = new Set(['choice', 'dropdown', 'number', 'drag', 'sort']);

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
const nextWeek = key => {
  const date = new Date(`${key}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + 7);
  return date.toISOString().slice(0, 10);
};
export const weekKey = (value, timeZone) => mondayOf(dateInZone(value, timeZone));

export function createLearningRecord(now = new Date().toISOString(), timeZone = defaultTimeZone()) {
  return {
    version: 1,
    timeZone,
    activities: [],
    courses: { 'sexual-misconduct': { assignedAt: now, completedAt: null, eligible: true } },
    retentionChecks: []
  };
}

export function recordActivity(record, { courseId, activityId, type, correct = false, completedAt = new Date().toISOString() }) {
  if (!ELIGIBLE_ACTIVITY_TYPES.has(type)) return false;
  if (PRACTICE_TYPES.has(type) && !correct) return false;
  const key = `${courseId}:${activityId}`;
  if (record.activities.some(activity => activity.key === key)) return false;
  record.activities.push({ key, courseId, activityId, type, correct: PRACTICE_TYPES.has(type) && correct, completedAt, points: POINTS_PER_ACTIVITY });
  return true;
}

export function recordCourseCompletion(record, courseId, completedAt = new Date().toISOString(), eligible = true) {
  const course = record.courses[courseId] || { assignedAt: completedAt, completedAt: null, eligible };
  if (course.completedAt) return false;
  record.courses[courseId] = { ...course, completedAt, eligible };
  return true;
}

export function recordRetentionCheck(record, { courseId, score, completedAt = new Date().toISOString() }) {
  const completed = record.courses[courseId]?.completedAt;
  if (!completed || score < 4 || score > 5) return false;
  const dueAt = new Date(completed);
  dueAt.setUTCDate(dueAt.getUTCDate() + 30);
  if (new Date(completedAt) < dueAt || record.retentionChecks.some(check => check.courseId === courseId)) return false;
  record.retentionChecks.push({ courseId, score, completedAt });
  return true;
}

export const pointsTotal = record => record.activities.reduce((sum, activity) => sum + activity.points, 0);
export const coursePoints = (record, courseId) => record.activities.filter(activity => activity.courseId === courseId).reduce((sum, activity) => sum + activity.points, 0);
export const activityCount = (record, courseId) => record.activities.filter(activity => activity.courseId === courseId).length;
export function earnedBadgeKeys(record) {
  const earned = [];
  if (record.activities.filter(activity => activity.correct).length >= 5) earned.push('applied');
  if (Object.values(record.courses).some(course => course.completedAt)) earned.push('thorough');
  if (record.retentionChecks.length) earned.push('retained');
  return earned;
}

export function habitSummary(record, now = new Date().toISOString()) {
  const timeZone = record.timeZone;
  const currentWeek = weekKey(now, timeZone);
  const activeWeeks = new Set();
  for (const course of Object.values(record.courses)) {
    if (!course.eligible || !course.assignedAt) continue;
    const first = weekKey(course.assignedAt, timeZone);
    const last = weekKey(course.completedAt || now, timeZone);
    for (let week = first; week <= last; week = nextWeek(week)) activeWeeks.add(week);
  }
  const daysByWeek = new Map();
  for (const activity of record.activities) {
    const week = weekKey(activity.completedAt, timeZone);
    if (!daysByWeek.has(week)) daysByWeek.set(week, new Set());
    daysByWeek.get(week).add(dateInZone(activity.completedAt, timeZone));
  }
  const eligibleCourses = Object.values(record.courses).filter(course => course.eligible);
  const allDone = eligibleCourses.length > 0 && eligibleCourses.every(course => course.completedAt);
  const allDoneWeek = allDone ? weekKey(eligibleCourses.map(course => course.completedAt).sort().at(-1), timeZone) : null;
  const weeks = [...activeWeeks].sort();
  let streak = 0, graceIndex = -Infinity, activeIndex = 0, graceUsed = false;
  for (const week of weeks) {
    const days = daysByWeek.get(week)?.size || 0;
    const met = days >= WEEKLY_DAY_GOAL || (allDone && week === allDoneWeek);
    if (met) streak++;
    else if (week !== currentWeek) {
      if (streak > 0 && activeIndex - graceIndex >= 8) { graceIndex = activeIndex; graceUsed = true; }
      else streak = 0;
    }
    activeIndex++;
  }
  const learningDays = daysByWeek.get(currentWeek)?.size || 0;
  const paused = !activeWeeks.has(currentWeek);
  return {
    learningDays,
    goal: WEEKLY_DAY_GOAL,
    met: learningDays >= WEEKLY_DAY_GOAL || (allDone && currentWeek === allDoneWeek),
    paused,
    weekStreak: streak,
    graceUsed,
    timeZone
  };
}

const demoCohort = Array.from({ length: 120 }, (_, index) => (index * 37 + 11) % 12);
export const COHORT_BANDS = ['1–25%', '26–50%', '51–75%', '76–100%'];
export function demoComparison(record, now = new Date().toISOString()) {
  const currentWeek = weekKey(now, record.timeZone);
  const count = record.activities.filter(activity => weekKey(activity.completedAt, record.timeZone) === currentWeek).length;
  if (!count) return { label: 'No band yet', short: '—', bandIndex: null, count, cohortSize: demoCohort.length };
  const ahead = demoCohort.filter(sampleCount => sampleCount > count).length;
  const position = Math.ceil((ahead + 1) / (demoCohort.length + 1) * 100);
  const bandIndex = Math.min(COHORT_BANDS.length - 1, Math.floor((position - 1) / 25));
  const label = COHORT_BANDS[bandIndex];
  return { label, short: label, bandIndex, count, cohortSize: demoCohort.length };
}
