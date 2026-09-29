// The course catalogue: four curricula of four courses, sixteen in all
// (decided 2026-09-29). A badge is earned for a whole curriculum, never for
// a single course. Only Sexual misconduct education has content so far; the
// other courses are placeholders until their content arrives.
//
// Ratings, reviews and completion counts are illustrative, as drawn in Figma.
// Required and sensitive courses carry aggregate social proof only: no stars,
// no Trending tag and no rating prompt. Optional courses may carry all three.
const placeholder = (n, kicker, extra = {}) => ({ id: `course-${n}`, number: n, title: `Course ${n}`, kicker, description: 'Content coming soon', lessonCount: 4, ...extra });

export const COURSES = [
  { id: 'sexual-misconduct', number: 1, title: 'Sexual misconduct education', kicker: 'Required · Safety', required: true, sensitive: true, lessonCount: 7, proof: 'Completed by 1,240 drivers rated 4.9+', cardProof: '1,240 drivers rated 4.9+ took this' },
  { id: 'road-safety', number: 2, title: 'Road safety fundamentals', kicker: 'Optional · Driving', description: 'Available soon', lessonCount: 4, external: true },
  placeholder(3, 'Optional · Safety'),
  placeholder(4, 'Optional · Safety'),
  placeholder(5, 'Optional · Curriculum 2', {
    description: '4 lessons at your own pace',
    rating: { value: 4.8, count: 212 },
    trending: true,
    proof: 'Completed by 480 drivers rated 4.9+',
    reviews: [
      { rating: 5, age: '2 days ago', text: 'Short and practical. Worth doing before a late shift.' },
      { rating: 5, age: '1 week ago', text: 'Clear examples. I changed how I plan pickups.' },
      { rating: 4, age: '3 weeks ago', text: 'Useful, though one lesson felt long.' }
    ]
  }),
  placeholder(6, 'Optional · Curriculum 2'),
  placeholder(7, 'Optional · Curriculum 2'),
  placeholder(8, 'Optional · Curriculum 2'),
  placeholder(9, 'Optional · Curriculum 3', {
    description: '4 lessons at your own pace',
    rating: { value: 4.7, count: 180 },
    trending: true,
    proof: 'Completed by 350 drivers rated 4.9+',
    reviews: [
      { rating: 5, age: '4 days ago', text: 'Straightforward, and the examples felt real.' },
      { rating: 5, age: '2 weeks ago', text: 'Good refresher. It took one evening.' },
      { rating: 4, age: '1 month ago', text: 'Helpful overall. The last lesson could be shorter.' }
    ]
  }),
  placeholder(10, 'Optional · Curriculum 3'),
  placeholder(11, 'Optional · Curriculum 3'),
  placeholder(12, 'Optional · Curriculum 3'),
  placeholder(13, 'Optional · Curriculum 4'),
  placeholder(14, 'Optional · Curriculum 4'),
  placeholder(15, 'Optional · Curriculum 4'),
  placeholder(16, 'Optional · Curriculum 4')
];

export const CURRICULA = [
  { id: 'safety-essentials', name: 'Safety essentials', courses: ['sexual-misconduct', 'road-safety', 'course-3', 'course-4'] },
  { id: 'curriculum-2', name: 'Curriculum 2', courses: ['course-5', 'course-6', 'course-7', 'course-8'] },
  { id: 'curriculum-3', name: 'Curriculum 3', courses: ['course-9', 'course-10', 'course-11', 'course-12'] },
  { id: 'curriculum-4', name: 'Curriculum 4', courses: ['course-13', 'course-14', 'course-15', 'course-16'] }
];

export const courseById = id => COURSES.find(course => course.id === id);
export const courseByNumber = n => COURSES.find(course => course.number === Number(n));
export const curriculumOf = courseId => CURRICULA.find(curriculum => curriculum.courses.includes(courseId));
export const trendingCourses = () => COURSES.filter(course => course.trending && !course.required && !course.sensitive);
