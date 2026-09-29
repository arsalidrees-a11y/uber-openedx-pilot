import test from 'node:test';
import assert from 'node:assert/strict';
import { createLearningRecord, recordActivity, recordCourseCompletion, recordRetentionCheck, pointsTotal, coursePoints, earnedBadgeKeys, curriculumProgress, habitSummary, demoComparison, COHORT_BANDS } from './gamification.js';
import { CURRICULA } from './catalog.js';

const monday = '2026-09-21T12:00:00Z';
const tuesday = '2026-09-22T12:00:00Z';

test('points are awarded once for each eligible completion, never for retries or assessments', () => {
  const record = createLearningRecord(monday, 'UTC');
  assert.equal(recordActivity(record, { courseId: 'sexual-misconduct', activityId: '0.0', type: 'reading', completedAt: monday }), true);
  assert.equal(recordActivity(record, { courseId: 'sexual-misconduct', activityId: '0.0', type: 'reading', completedAt: tuesday }), false);
  assert.equal(recordActivity(record, { courseId: 'sexual-misconduct', activityId: '0.1', type: 'choice', correct: false, completedAt: monday }), false);
  assert.equal(recordActivity(record, { courseId: 'sexual-misconduct', activityId: '0.1', type: 'choice', correct: true, completedAt: monday }), true);
  assert.equal(recordActivity(record, { courseId: 'sexual-misconduct', activityId: '0.2', type: 'resources', completedAt: monday }), false);
  assert.equal(recordActivity(record, { courseId: 'sexual-misconduct', activityId: 'baseline', type: 'assessment', completedAt: monday }), false);
  assert.equal(pointsTotal(record), 20);
  assert.equal(coursePoints(record, 'sexual-misconduct'), 20);
});

test('one account record can accept distinct courses without a second currency', () => {
  const record = createLearningRecord(monday, 'UTC');
  recordActivity(record, { courseId: 'sexual-misconduct', activityId: '0.0', type: 'reading', completedAt: monday });
  recordActivity(record, { courseId: 'future-course', activityId: '0.0', type: 'video', completedAt: monday });
  assert.equal(pointsTotal(record), 20);
  assert.equal(coursePoints(record, 'sexual-misconduct'), 10);
  assert.equal(coursePoints(record, 'future-course'), 10);
});

test('weekly habit goal requires two distinct learning days and one missed week is forgiven', () => {
  const record = createLearningRecord(monday, 'UTC');
  recordActivity(record, { courseId: 'sexual-misconduct', activityId: '0.0', type: 'reading', completedAt: monday });
  recordActivity(record, { courseId: 'sexual-misconduct', activityId: '0.1', type: 'reading', completedAt: monday });
  assert.equal(habitSummary(record, monday).learningDays, 1);
  assert.equal(habitSummary(record, monday).met, false);
  recordActivity(record, { courseId: 'sexual-misconduct', activityId: '0.2', type: 'video', completedAt: tuesday });
  assert.equal(habitSummary(record, tuesday).met, true);
  assert.equal(habitSummary(record, tuesday).weekStreak, 1);
  assert.equal(habitSummary(record, '2026-10-05T12:00:00Z').weekStreak, 1);
  assert.equal(habitSummary(record, '2026-10-12T12:00:00Z').weekStreak, 0);
});

test('finishing all available learning meets the goal and pauses future weeks', () => {
  const record = createLearningRecord(monday, 'UTC');
  recordActivity(record, { courseId: 'sexual-misconduct', activityId: '0.0', type: 'reading', completedAt: monday });
  recordCourseCompletion(record, 'sexual-misconduct', monday);
  assert.equal(habitSummary(record, monday).met, true);
  assert.equal(habitSummary(record, monday).weekStreak, 1);
  assert.equal(habitSummary(record, '2026-09-28T12:00:00Z').paused, true);
  assert.equal(habitSummary(record, '2026-09-28T12:00:00Z').weekStreak, 1);
});

test('a badge is earned for a whole curriculum, never for one course or a retention check', () => {
  const record = createLearningRecord(monday, 'UTC');
  for (let index = 0; index < 5; index++) recordActivity(record, { courseId: 'sexual-misconduct', activityId: `practice-${index}`, type: 'choice', correct: true, completedAt: monday });
  assert.deepEqual(earnedBadgeKeys(record), []);
  recordCourseCompletion(record, 'sexual-misconduct', monday);
  assert.deepEqual(earnedBadgeKeys(record), []);
  assert.equal(curriculumProgress(record, CURRICULA[0]), 1);
  assert.equal(recordRetentionCheck(record, { courseId: 'sexual-misconduct', score: 5, completedAt: tuesday }), false);
  assert.equal(recordRetentionCheck(record, { courseId: 'sexual-misconduct', score: 3, completedAt: '2026-10-22T12:00:00Z' }), false);
  assert.equal(recordRetentionCheck(record, { courseId: 'sexual-misconduct', score: 4, completedAt: '2026-10-22T12:00:00Z' }), true);
  assert.deepEqual(earnedBadgeKeys(record), []);
  for (const id of ['road-safety', 'course-3']) recordCourseCompletion(record, id, tuesday, false);
  assert.deepEqual(earnedBadgeKeys(record), []);
  recordCourseCompletion(record, 'course-4', tuesday, false);
  assert.deepEqual(earnedBadgeKeys(record), ['safety-essentials']);
  assert.equal(CURRICULA.length, 4);
  assert.equal(CURRICULA.flatMap(curriculum => curriculum.courses).length, 16);
});

test('cohort comparison assigns one of four non-overlapping 1–100% bands', () => {
  assert.deepEqual(COHORT_BANDS, ['1–25%', '26–50%', '51–75%', '76–100%']);
  const record = createLearningRecord(monday, 'UTC');
  assert.equal(demoComparison(record, monday).bandIndex, null);
  for (let count = 1; count <= 11; count++) {
    recordActivity(record, { courseId: 'sexual-misconduct', activityId: `reading-${count}`, type: 'reading', completedAt: monday });
    if ([1, 4, 7, 10].includes(count)) assert.equal(demoComparison(record, monday).bandIndex, { 1: 3, 4: 2, 7: 1, 10: 0 }[count]);
  }
  assert.equal(demoComparison(record, monday).cohortSize, 120);
});
