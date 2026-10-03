// The course catalogue, scoped to the PRD (reworked 2026-10-01).
//
// Uber's internal tool, Flow, assigns each driver a set of courses based on
// their experience and other factors. Every course in that set is required
// for that driver (Uber's curriculum map marks mandatory education the same
// way). The set has no name: Learning home lists it as "Required". Everything
// else is optional and lives in All courses.
//
// The demo driver's Flow set is the two required courses below. Courses 2–5
// are illustrative optional placeholders with no content yet. Ratings,
// reviews, social proof and curricula are parked: their Figma components stay
// in the library but are on no screen.
const placeholder = (n) => ({ id: `course-${n}`, number: n, title: `Course ${n}`, kicker: 'Optional', description: 'Coming soon', lessonCount: 4 });

export const COURSES = [
  { id: 'sexual-misconduct', number: 1, title: 'Sexual misconduct education', kicker: 'Required · Safety', required: true, sensitive: true, lessonCount: 7 },
  placeholder(2),
  placeholder(3),
  placeholder(4),
  placeholder(5),
  { id: 'road-safety', number: 6, title: 'Road safety fundamentals', kicker: 'Optional · Driving', description: 'Coming soon', lessonCount: 4, external: true },
  // A driver can have more than one required course: Uber's curriculum map
  // adds region-specific mandatory training (Chicago, California, Nebraska…).
  // Illustrative placeholder, no content yet.
  { id: 'regional-safety', number: 7, title: 'Regional safety training', kicker: 'Required · Safety', required: true, description: 'Coming soon', lessonCount: 4 }
];

export const courseById = id => COURSES.find(course => course.id === id);
export const courseByNumber = n => COURSES.find(course => course.number === Number(n));
export const requiredCourses = () => COURSES.filter(course => course.required);
export const optionalCourses = () => COURSES.filter(course => !course.required);
