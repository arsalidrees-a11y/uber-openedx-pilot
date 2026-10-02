import test from 'node:test';
import assert from 'node:assert/strict';
import { createLearningRecord, recordStep, recordLesson, recordCourseCompletion, recordRetentionCheck, pointsTotal, coursePoints, awardBadges, earnedBadgeKeys, nextCelebration, markCelebrated, retentionOpensAt, habitSummary, leaderboard, lessonMinutes } from './gamification.js';

const monday = '2026-09-21T12:00:00Z';
const tuesday = '2026-09-22T12:00:00Z';

test('a lesson pays once: 10 per step plus 5 per first-try correct answer', () => {
  const record = createLearningRecord(monday, 'UTC');
  const award = recordLesson(record, { courseId: 'sexual-misconduct', lessonId: 1, steps: 4, questions: 1, firstTryCorrect: 1, completedAt: monday });
  assert.equal(award.points, 45);
  assert.equal(recordLesson(record, { courseId: 'sexual-misconduct', lessonId: 1, steps: 4, questions: 1, firstTryCorrect: 1, completedAt: tuesday }), null, 'repeats earn nothing');
  recordLesson(record, { courseId: 'sexual-misconduct', lessonId: 6, steps: 8, questions: 2, firstTryCorrect: 1, completedAt: tuesday });
  assert.equal(pointsTotal(record), 45 + 85);
  assert.equal(coursePoints(record, 'sexual-misconduct'), 130);
});

test('optional courses add to the same total', () => {
  const record = createLearningRecord(monday, 'UTC');
  recordLesson(record, { courseId: 'sexual-misconduct', lessonId: 0, steps: 5, completedAt: monday });
  recordLesson(record, { courseId: 'course-2', lessonId: 0, steps: 4, questions: 1, firstTryCorrect: 1, completedAt: monday });
  assert.equal(pointsTotal(record), 50 + 45);
  assert.equal(coursePoints(record, 'course-2'), 45);
});

test('lesson length is shown in minutes, never points', () => {
  assert.deepEqual([4, 5, 8].map(lessonMinutes), [3, 4, 6]);
});

test('a streak week needs two learning days; one missed week in eight is forgiven, a second resets', () => {
  const record = createLearningRecord('2026-09-07T09:00:00Z', 'UTC');
  recordStep(record, { courseId: 'sexual-misconduct', stepId: '0.0', completedAt: '2026-09-07T10:00:00Z' });
  recordStep(record, { courseId: 'sexual-misconduct', stepId: '0.1', completedAt: '2026-09-07T11:00:00Z' });
  assert.equal(habitSummary(record, '2026-09-07T12:00:00Z').learningDays, 1, 'two steps on one day are one learning day');
  recordStep(record, { courseId: 'sexual-misconduct', stepId: '0.2', completedAt: '2026-09-08T10:00:00Z' });
  recordStep(record, { courseId: 'sexual-misconduct', stepId: '1.0', completedAt: '2026-09-21T10:00:00Z' });
  recordStep(record, { courseId: 'sexual-misconduct', stepId: '1.1', completedAt: '2026-09-22T10:00:00Z' });
  const habit = habitSummary(record, '2026-09-29T12:00:00Z');
  assert.equal(habit.weekStreak, 2, 'met, forgiven, met');
  assert.equal(habit.longestStreak, 2);
  assert.deepEqual(habit.weeks.slice(-4).map(w => w.state), ['met', 'forgiven', 'met', 'current']);
  assert.equal(habit.weeks[0].state, 'empty', 'before the driver started');
  assert.equal(habitSummary(record, '2026-10-13T12:00:00Z').weekStreak, 0, 'a second missed week resets');
});

test('this week counts once it ends, and the streak pauses when nothing required is left', () => {
  const record = createLearningRecord(monday, 'UTC');
  recordStep(record, { courseId: 'sexual-misconduct', stepId: '0.0', completedAt: monday });
  recordStep(record, { courseId: 'sexual-misconduct', stepId: '0.1', completedAt: tuesday });
  assert.equal(habitSummary(record, tuesday).met, true);
  assert.equal(habitSummary(record, tuesday).weekStreak, 0);
  recordCourseCompletion(record, 'sexual-misconduct', tuesday);
  const later = habitSummary(record, '2026-10-12T12:00:00Z');
  assert.equal(later.paused, true);
  assert.equal(later.weekStreak, 1);
  assert.deepEqual(later.weeks.slice(-3).map(w => w.state), ['paused', 'paused', 'current']);
});

test('badges belong to the curriculum and are earned in order: Halfway, Complete, Retained', () => {
  const record = createLearningRecord(monday, 'UTC');
  assert.deepEqual(awardBadges(record, { lessonsDone: 5, lessonsTotal: 11, complete: false }, monday), []);
  assert.deepEqual(awardBadges(record, { lessonsDone: 6, lessonsTotal: 11, complete: false }, monday), ['halfway']);
  assert.equal(nextCelebration(record).key, 'halfway');
  markCelebrated(record);
  assert.equal(nextCelebration(record), null, 'the celebration shows once');
  assert.deepEqual(awardBadges(record, { lessonsDone: 11, lessonsTotal: 11, complete: true }, tuesday), ['complete']);
  assert.equal(retentionOpensAt(record), '2026-10-22T12:00:00.000Z');
  assert.equal(recordRetentionCheck(record, { score: 5, completedAt: '2026-10-01T12:00:00Z' }), false, 'not before 30 days');
  assert.equal(recordRetentionCheck(record, { score: 3, completedAt: '2026-10-22T12:00:00Z' }), false);
  assert.equal(recordRetentionCheck(record, { score: 4, completedAt: '2026-10-22T12:00:00Z' }), true);
  assert.deepEqual(awardBadges(record, { lessonsDone: 11, lessonsTotal: 11, complete: true }), ['retained']);
  assert.deepEqual(earnedBadgeKeys(record), ['halfway', 'complete', 'retained']);
});

test('the leaderboard ranks by total points, hides zero-point drivers and shows the top 3 and your neighbours', () => {
  const record = createLearningRecord(monday, 'UTC');
  assert.equal(leaderboard(record).rank, null, 'no points, not listed');
  recordLesson(record, { courseId: 'sexual-misconduct', lessonId: 0, steps: 5, completedAt: monday });
  recordLesson(record, { courseId: 'sexual-misconduct', lessonId: 1, steps: 4, questions: 1, firstTryCorrect: 1, completedAt: monday });
  const board = leaderboard(record);
  assert.equal(board.rank, 9);
  assert.equal(board.size, 30);
  assert.deepEqual(board.rows.map(r => r.gap ? '…' : `${r.rank} ${r.name} ${r.points}`), ['1 Driver 2210 610', '2 Driver 4821 540', '3 Driver 1307 455', '…', '8 Driver 9013 120', '9 You 95', '10 Driver 3378 80']);
  assert.equal(board.rows[0].done, true);
});
