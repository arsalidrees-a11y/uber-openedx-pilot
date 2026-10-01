// The course catalogue, scoped to the PRD (reworked 2026-10-01).
//
// Uber's internal tool, Flow, decides which optional courses each driver is
// recommended, from their experience and other factors. The set has no name
// and is not a curriculum: the interface shows it as "Recommended for you"
// and counts how many are done. Flow owns the choice; this file stands in for
// what Flow would send.
//
// The four recommended courses are illustrative and go beyond pilot scope
// (the PRD allows two course shells). They have no content yet. Ratings,
// reviews, social proof and curricula are parked: their Figma components
// stay in the library but are on no screen.
const placeholder = (n) => ({ id: `course-${n}`, number: n, title: `Course ${n}`, kicker: 'Optional', description: 'Content coming soon', lessonCount: 4 });

export const COURSES = [
  { id: 'sexual-misconduct', number: 1, title: 'Sexual misconduct education', kicker: 'Required · Safety', required: true, sensitive: true, lessonCount: 7 },
  placeholder(2),
  placeholder(3),
  placeholder(4),
  placeholder(5),
  { id: 'road-safety', number: 6, title: 'Road safety fundamentals', kicker: 'Optional · Driving', description: 'Available soon', lessonCount: 4, external: true }
];

// Flow's recommendation for the demo driver, in Flow's order.
export const RECOMMENDED = ['course-2', 'course-3', 'course-4', 'course-5'];

export const courseById = id => COURSES.find(course => course.id === id);
export const courseByNumber = n => COURSES.find(course => course.number === Number(n));
export const recommendedCourses = () => RECOMMENDED.map(courseById);
export const moreCourses = () => COURSES.filter(course => !course.required && !RECOMMENDED.includes(course.id));
