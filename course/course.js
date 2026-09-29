import { createLearningRecord, recordActivity, recordCourseCompletion, recordRetentionCheck, pointsTotal, coursePoints, activityCount, earnedBadgeKeys, curriculumProgress, habitSummary, demoComparison, COHORT_BANDS, ELIGIBLE_ACTIVITY_TYPES } from './gamification.js';
import { CURRICULA, courseById, courseByNumber, curriculumOf, trendingCourses } from './catalog.js';
import { icon } from './icons.js';

// Source: United States Mandatory Sexual Misconduct Education .docx.pdf.
// Screenshots are Version A. This file implements the interactive Version B.
const variant = 'B';
const rainnResources = [
  { label: 'RAINN information and support', href: 'https://www.rainn.org/' },
  { label: 'National Sexual Assault Hotline', detail: 'Call 1-800-656-HOPE', href: 'tel:18006564673' },
  { label: 'RAINN online support', href: 'https://online.rainn.org/' }
];
const videoMeta = [
  { duration: 261, runtime: '4:21' },
  { duration: 247, runtime: '4:07' },
  { duration: 200, runtime: '3:20' },
  { duration: 231, runtime: '3:51' },
  { duration: 256, runtime: '4:16' },
  { duration: 256, runtime: '4:16' }
];
const lessons = [
  {
    title: 'Helping to create a safe community',
    summary: 'Understand the shared role drivers, riders, and rideshare companies play in community safety.',
    steps: [
      { type: 'reading', title: 'We all have a role to play', prompt: 'Start with the purpose of this mandatory education.', body: 'Everyone deserves a safe and respectful experience. Sexual misconduct and sexual assault are serious issues that affect people of every race, ethnicity, gender, sexuality, and background. Drivers, riders, and rideshare companies each have a role in helping keep the community safe. Uber developed this education with RAINN.' },
      { type: 'reading', title: 'What you will learn', prompt: 'By the end of this lesson, you will be able to:', bullets: ['Recognize how Uber’s Community Guidelines support drivers and riders.', 'Know what to expect from the remaining course videos.', 'Identify survivor resources and understand how RAINN can provide support.'] },
      { type: 'video', title: 'Helping to create a safe community', prompt: 'Watch the complete source video before continuing.', caption: 'This video introduces the shared role of drivers, riders, and Uber in community safety.', transcript: 'Approved source video and transcript to be supplied by the content owner.', lookFor: 'Notice how the Community Guidelines support both drivers and riders.' },
      { type: 'text', title: 'Your role in the community', prompt: 'In one sentence, describe one way drivers can help create a safe and respectful experience.', feedback: 'Your response is private practice and is not automatically graded. The source emphasizes respect, the Community Guidelines, and shared responsibility for safety.' },
      { type: 'resources', title: 'Remember these takeaways', prompt: 'Review the lesson before continuing.', bullets: ['We all have a role to play in helping keep the Uber community safe.', 'Uber’s Community Guidelines support drivers in addition to riders.'], resources: [{ label: 'Support and information', href: 'https://endingviolencecanada.org/getting-help/' }] }
    ]
  },
  {
    title: 'Respecting privacy',
    summary: 'Keep conversations comfortable and respectful.',
    steps: [
      { type: 'reading', title: 'Let’s talk — or maybe not', prompt: 'Conversation comfort varies from person to person.', body: 'Riders and drivers have different comfort levels with conversation. A rider may not wish to discuss their personal life. Even when a comment is meant to be friendly, some topics can make people uncomfortable.' },
      { type: 'video', title: 'Respecting privacy', prompt: 'Watch the complete source video before continuing.', caption: 'This video covers comfortable, respectful conversation.', transcript: 'Approved source video and transcript to be supplied by the content owner.', lookFor: 'Notice what to do when you are unsure how a question or comment may be received.' },
      { type: 'choice', title: 'Choose the respectful response', prompt: 'You are unsure whether a personal question may make a rider uncomfortable. What does the source recommend?', options: ['Ask it, but explain that you are being friendly', 'Do not say it', 'Ask the rider to share only part of the answer'], answer: 1, feedback: 'If you are unsure how someone might respond to a question or comment, the source says it is best not to say it.' },
      { type: 'resources', title: 'Remember these takeaways', prompt: 'Review the lesson and support options.', bullets: ['Our actions are not always understood the way we hope.', 'If you are unsure how a comment may be received, it is best not to say it.', 'Use Help in the Uber app to report an uncomfortable experience.'], resources: rainnResources }
    ]
  },
  {
    title: 'Conversational boundaries',
    summary: 'Avoid comments that may feel flirtatious or personal.',
    steps: [
      { type: 'reading', title: 'Uber is not a dating app', prompt: 'Friendly conversation must not become flirtatious.', body: 'Drivers and riders share the simple goal of reaching a destination safely and uneventfully. Flirting while using the app is inappropriate for drivers and riders and is against Uber’s Community Guidelines.' },
      { type: 'video', title: 'Conversational boundaries', prompt: 'Watch the complete source video before continuing.', caption: 'This video explains what to do when a rider begins flirting.', transcript: 'Approved source video and transcript to be supplied by the content owner.', lookFor: 'Listen for the options to address, redirect, or clearly name the boundary.' },
      { type: 'choice', title: 'A rider keeps flirting', prompt: 'You communicated a boundary and the rider does not respect it. What is the appropriate next step?', options: ['Continue the trip and ignore it', 'Pull over where you can end the trip safely and report it', 'Share personal contact information to calm the situation'], answer: 1, feedback: 'The source says you can pull over where the trip can be ended safely and report the behavior to Uber.' },
      { type: 'resources', title: 'Remember these takeaways', prompt: 'Review the lesson and support options.', bullets: ['Uber is not a dating app.', 'You can address flirting directly, redirect the conversation, or reference the Community Guidelines.', 'If a rider does not respect a stated boundary, end the trip safely and report it.'], resources: rainnResources }
    ]
  },
  {
    title: 'Respecting personal space',
    summary: 'Respect physical boundaries and ask before offering assistance.',
    steps: [
      { type: 'reading', title: 'Your space, your bubble', prompt: 'Personal-space needs change by person and situation.', body: 'A personal-space boundary can be thought of as a bubble. Everyone’s bubble is different, but physical touch is rarely appropriate while using the Uber app.' },
      { type: 'video', title: 'Respecting personal space', prompt: 'Watch the complete source video before continuing.', caption: 'This video covers physical boundaries and offering assistance.', transcript: 'Approved source video and transcript to be supplied by the content owner.', lookFor: 'Notice what must happen before providing physical assistance.' },
      { type: 'dropdown', title: 'Complete the guidance', prompt: 'If you think a rider may need physical assistance, ask for their ___ first.', options: ['destination', 'consent', 'rating'], answer: 1, feedback: 'The source says to ask for the rider’s consent before providing physical assistance.' },
      { type: 'resources', title: 'Remember these takeaways', prompt: 'Review the lesson and support options.', bullets: ['Do not touch strangers or people you just met.', 'Sexual contact is prohibited by the Community Guidelines, even if consensual. This applies to riders too.', 'Ask for consent before offering physical assistance.'], resources: rainnResources }
    ]
  },
  {
    title: 'Sexual violence awareness',
    summary: 'Recognize sexual violence and know how to find support.',
    steps: [
      { type: 'reading', title: 'Take a deep breath', prompt: 'Pause if you need time to care for yourself.', body: 'Sexual violence affects every community regardless of cultural background, gender expression, socio-economic status, sexual orientation, or age. This is a heavy but important topic. You can pause and take time to care for yourself if needed.' },
      { type: 'video', title: 'Sexual violence awareness', prompt: 'Watch the complete source video before continuing.', caption: 'This video defines sexual violence and explains available support.', transcript: 'Approved source video and transcript to be supplied by the content owner.', lookFor: 'Listen for the role of explicit agreement and the reporting resources available.' },
      { type: 'choice', title: 'Check the definition', prompt: 'Which statement matches the source definition of sexual violence?', options: ['Any sexual interaction that both parties have not explicitly agreed to', 'Only behavior that causes a visible injury', 'Only behavior reported during a trip'], answer: 0, feedback: 'The source defines sexual violence as any sexual interaction that both parties have not explicitly agreed to.' },
      { type: 'resources', title: 'Remember these takeaways', prompt: 'Review the lesson and support options.', bullets: ['Sexual violence is any sexual interaction that both parties have not explicitly agreed to.', 'Examples include groping, forcible kissing, public masturbation, exposing sexual body parts, sexual assault, and rape.', 'Sexual violence has no place on the Uber platform or in any community.', 'If you have witnessed or experienced sexual violence, consider reporting it to Uber.'], resources: rainnResources }
    ]
  },
  {
    title: 'Bystander intervention',
    summary: 'Use direct, distract, or delegate approaches when it is safe.',
    steps: [
      { type: 'reading', title: 'You can make a difference', prompt: 'Notice when a situation may be unsafe.', body: 'Most rides are uneventful, but you may encounter a situation where someone appears to need help. Drivers can play a role in looking out for each other’s safety. Bystander intervention includes three main approaches.' },
      { type: 'video', title: 'Bystander intervention', prompt: 'Watch the complete source video before continuing.', caption: 'This video introduces direct, distract, and delegate approaches.', transcript: 'Approved source video and transcript to be supplied by the content owner.', lookFor: 'Listen for the three approaches and remember to act only when it is safe.' },
      { type: 'drag', title: 'Match the three approaches', prompt: 'Place each example with the bystander approach it represents.', cards: ['Clearly name the concerning behavior', 'Create a harmless interruption', 'Ask another person or authority for help'], groups: ['Direct', 'Distract', 'Delegate'], answers: [0, 1, 2], feedback: 'Direct addresses the situation, distract interrupts it, and delegate brings in another person or authority.' },
      { type: 'resources', title: 'Remember these takeaways', prompt: 'Review the lesson and safety resources.', bullets: ['If a safety issue occurs, you may directly intervene, distract, or delegate.', 'You can report inappropriate behavior to Uber when it is safe to do so.', 'Proactive steps and reporting can help make the community safer.'], resources: [{ label: 'Uber Community Guidelines', href: 'https://www.uber.com/us/en/safety/uber-community-guidelines/' }, { label: 'Uber’s approach to safety', href: 'https://www.uber.com/safety/' }, ...rainnResources] }
    ]
  },
  {
    title: 'Spotting human trafficking',
    summary: 'Recognize possible signs, remember details, and report safely.',
    steps: [
      { type: 'reading', title: 'You can help notice when something is not right', prompt: 'This final module focuses on awareness and safe reporting.', body: 'As a driver, you see many people and places. Your awareness can help keep people safe.', bullets: ['Recognize possible signs of human trafficking.', 'Know how to report when you suspect something is wrong.', 'Connect with trained professionals who can help.'] },
      { type: 'reading', title: 'What is human trafficking?', prompt: 'Understand the definition before reviewing possible signs.', body: 'Human trafficking is a serious crime and a violation of human rights. Traffickers use force, fraud, or coercion to compel people into labor or commercial sex. Commercial sex involving a minor under 18 is trafficking even without force or coercion.', bullets: ['Trafficking can happen to people of any age, gender, or background.', 'It does not always involve movement across borders or cities; it can happen in a person’s neighborhood or home.', 'Traffickers often rely on secrecy, manipulation, and limited public awareness.', 'Uber partners with organizations including PACT and Polaris to raise awareness and help drivers recognize warning signs.'] },
      { type: 'number', title: 'Check the definition', prompt: 'Commercial sex involving someone under what age is considered trafficking, even without force or coercion?', answer: 18, feedback: 'The source defines a minor as someone under 18.' },
      { type: 'reading', title: 'Recognizing possible signs', prompt: 'Consider patterns across location, behavior, and interactions.', groups: [{ title: 'Location', items: ['Pickups or drop-offs near hotels, motels, or transportation hubs, particularly late at night.', 'Trips to or from locations that appear closely monitored or unsafe for minors or vulnerable people.', 'Deliveries to or from businesses where workers seem fearful, overworked, or unable to speak freely.'] }, { title: 'Behavior', items: ['A rider appears scared, disoriented, unusually quiet, submissive, or shows signs of abuse such as bruises or cuts.', 'A Guest Rider is travelling without the Account Holder and may be unsure of the destination or basic trip details.'] }, { title: 'Interactions', items: ['A rider does not control their own identification, wallet, or phone.', 'A rider is being coached to lie about their age or identity.'] }], note: 'One indicator alone is not necessarily proof of human trafficking. Consider it with other signs and the surrounding context.' },
      { type: 'resources', title: 'Learn more from specialist organizations', prompt: 'These organizations provide additional information about human trafficking.', resources: [{ label: 'Uber human-trafficking information', href: 'https://www.uber.com/blog/' }, { label: 'PACT — Protect All Children from Trafficking', href: 'https://www.wearepact.org/' }, { label: 'Polaris — Freedom happens now', href: 'https://polarisproject.org/' }], note: 'PACT works to end the commercial sexual exploitation of children through awareness, advocacy, policy, and legislation. Polaris works to end sex and labor trafficking and help survivors reclaim their freedom.' },
      { type: 'sort', title: 'Put safe reporting in order', prompt: 'Arrange the source reporting sequence. Drag the rows or use the arrows.', items: ['Report immediate danger to 911, contact the hotline, and report to Uber', 'Stay safe and do not confront anyone', 'Remember factual details about what you observed'], answer: [1, 2, 0], feedback: 'First protect your safety, then remember factual details, then report through the appropriate channel.' },
      { type: 'reading', title: 'Remember useful details', prompt: 'Record observations only when it is safe to do so.', bullets: ['The date, time, and location of the incident.', 'What the person looked like, including age, hair, clothing, or tattoos.', 'Any names or nicknames you heard.', 'Exactly what made you concerned.'] },
      { type: 'resources', title: 'Report suspected human trafficking', prompt: 'Stay safe and never confront anyone directly.', bullets: ['If someone is in immediate danger, call 911.', 'Contact the National Human Trafficking Hotline at 1-888-373-7888 or text “Help” to 233733. It is available 24/7, anonymous, and free.', 'Report the concern to Uber.'], resources: [{ label: 'Call 911 for immediate danger', href: 'tel:911' }, { label: 'Call the National Human Trafficking Hotline', href: 'tel:18883737888' }, { label: 'Text Help to 233733', href: 'sms:233733?body=Help' }], note: 'If a rider is in distress or you suspect an unaccompanied minor is a victim and you need to cancel, leave them in a well-lit location that appears safe. If their safety is at risk or you are unsure, call 911.' }
    ]
  }
];

const assessments = {
  baseline: [
    { prompt: 'You are unsure whether a personal question may make a rider uncomfortable. What is the safest choice?', options: ['Ask, but explain your intention', 'Do not ask the question', 'Ask only near the end of the trip'], answer: 1 },
    { prompt: 'Before offering physical assistance, what should you do?', options: ['Ask for consent', 'Explain why the rider needs help', 'Wait for another person to decide'], answer: 0 },
    { prompt: 'If you notice possible signs of human trafficking, what comes first?', options: ['Confront the people involved', 'Protect your safety and do not confront anyone', 'Post the details publicly'], answer: 1 },
    { prompt: 'A rider starts flirting during a trip. Which response supports the Community Guidelines?', options: ['Flirt back if it feels harmless', 'Redirect or clearly state a boundary', 'Exchange contact details after the trip'], answer: 1 },
    { prompt: 'Which statement best describes sexual violence?', options: ['Only conduct that causes a visible injury', 'Any sexual interaction both parties have not explicitly agreed to', 'Only conduct reported during a trip'], answer: 1 }
  ],
  final: [
    { prompt: 'A rider continues flirting after you clearly state a boundary. What should you do?', options: ['Ignore it and finish the trip', 'End the trip safely and report the behavior', 'Share contact information to calm the situation'], answer: 1 },
    { prompt: 'Which statement best reflects consent?', options: ['Silence is enough', 'Both people explicitly agree', 'Consent is assumed during a trip'], answer: 1 },
    { prompt: 'What is the safest reporting sequence?', options: ['Confront, record, then report', 'Report first, then check whether it was safe', 'Stay safe, remember factual details, then report'], answer: 2 },
    { prompt: 'Which option is one of the three bystander approaches?', options: ['Direct', 'Diagnose', 'Debate'], answer: 0 },
    { prompt: 'Commercial sex involving a minor is trafficking when the person is under what age?', options: ['16', '18', '21'], answer: 1 }
  ],
  retention: [
    { prompt: 'A rider asks a personal question that makes you uncomfortable. What can you do?', options: ['Set a boundary or redirect the conversation', 'Share personal details to avoid conflict', 'End every trip immediately'], answer: 0 },
    { prompt: 'When should you ask before physically helping a rider?', options: ['Only when the rider complains', 'Before offering physical assistance', 'After the trip has ended'], answer: 1 },
    { prompt: 'Someone may be in immediate danger. What should you do first?', options: ['Confront the people involved', 'Post the details online', 'Protect your safety and call 911'], answer: 2 },
    { prompt: 'Which is a safe bystander approach?', options: ['Distract when it is safe to do so', 'Record a video before acting', 'Ignore every concern'], answer: 0 },
    { prompt: 'What is true about possible trafficking signs?', options: ['One sign always proves trafficking', 'Consider signs together and report safely', 'Only police can notice warning signs'], answer: 1 }
  ]
};

const root = document.querySelector('#course');
const KEY = `uber-us-mandatory-course-${variant.toLowerCase()}-v3`;
const COURSE_ID = 'sexual-misconduct';
const COURSE_TITLE = 'Sexual misconduct education';
const freshState = () => ({ lesson: 0, step: 0, completed: [], started: false, baselineDone: false, finalCheckDone: false, finalCheckScore: null, retentionCheckDone: false, retentionScore: null, responses: {}, assessmentResponses: { baseline: [], final: [], retention: [] }, ratings: {}, learningRecord: createLearningRecord() });
let state = freshState();
try { const saved = JSON.parse(localStorage.getItem(KEY)); if (saved && Array.isArray(saved.completed) && saved.lesson >= 0 && saved.lesson < lessons.length && saved.step >= 0 && saved.step < lessons[saved.lesson].steps.length) state = { ...state, ...saved }; } catch {}
let view = 'discover', progressTab = 'progress', errorState = '', selected = null, checked = false, correct = false, placement = {}, order = [0, 1, 2], dragged = null, watched = false, playing = false, tick = 0, timer, assessmentMode = 'baseline', assessmentIndex = 0;
// The optional course on screen, where its page was opened from, and the
// rating being drafted for it.
let openCourse = courseByNumber(5), courseFrom = 'library', draftStars = 0, draftReview = '';
// A preview shows a prepared state for review. It never writes over the
// learner's saved progress: save() is off until the prototype is reset.
let previewing = false;
const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const totalSteps = lessons.reduce((sum, lesson) => sum + lesson.steps.length, 0);
const eligibleIn = (lesson) => lesson.steps.filter(step => ELIGIBLE_ACTIVITY_TYPES.has(step.type)).length;

// ---------- One state model: every screen reads these ----------
const lessonsDone = () => state.completed.length;
const coursePercent = () => Math.round(lessonsDone() / lessons.length * 100);
function courseStatus() {
  if (lessonsDone() === lessons.length) return state.finalCheckDone ? 'complete' : 'final-pending';
  return state.started || lessonsDone() ? 'in-progress' : 'not-started';
}
function currentLesson() {
  if (state.started && !state.completed.includes(state.lesson)) return state.lesson;
  const next = lessons.findIndex((_, i) => !state.completed.includes(i));
  return next === -1 ? null : next;
}
function lessonStatus(i) { return state.completed.includes(i) ? 'complete' : i === currentLesson() ? 'current' : 'upcoming'; }
function completedActivities() { return lessons.reduce((sum, lesson, i) => sum + (state.completed.includes(i) ? lesson.steps.length : i === state.lesson && state.started ? state.step : 0), 0); }
const learningPoints = () => pointsTotal(state.learningRecord);
const lessonPoints = (i) => state.learningRecord.activities.filter(a => a.courseId === COURSE_ID && a.activityId.startsWith(`${i}.`)).length * 10;
// One badge per curriculum, earned when all four of its courses are complete.
const earnedBadgeCount = () => earnedBadgeKeys(state.learningRecord).length;
const courseComplete = (id) => Boolean(state.learningRecord.courses[id]?.completedAt);
const SAFETY = curriculumOf(COURSE_ID);
function retentionDue() { const completedAt = state.learningRecord.courses[COURSE_ID]?.completedAt; return Boolean(completedAt && Date.now() >= new Date(completedAt).getTime() + 30 * 86400000) && !state.retentionCheckDone; }
const DEMO_LEARNER_FIRST_NAME = 'Sam';
function learnerFirstName() {
  const supplied = globalThis.learnerProfile?.firstName ?? new URLSearchParams(location.search).get('firstName') ?? DEMO_LEARNER_FIRST_NAME;
  return typeof supplied === 'string' ? supplied.trim().split(/\s+/)[0].slice(0, 32) : '';
}
function personalGreeting() {
  const hour = new Date().getHours();
  const salutation = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const name = learnerFirstName();
  return `${salutation}${name ? `, ${esc(name)}` : ''}.`;
}
function save() { if (previewing) return; try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {} }
function stopVideo() { clearInterval(timer); playing = false; }
function resetActivity() { stopVideo(); selected = null; checked = false; correct = false; placement = {}; order = [0, 1, 2]; watched = false; tick = 0; }
function openStep(l, s) { state.lesson = l; state.step = s; state.started = true; view = 'activity'; errorState = ''; resetActivity(); save(); render(); }

// ---------- Components: one function per Figma component ----------
const txt = (tag, cls, text) => `<${tag} class="${cls}">${text}</${tag}>`;
function navHeader(title, back, close = false) {
  return `<nav class="nav-header"><button class="nav-header__action" data-action="${back}" aria-label="Back">${icon('arrow_left')}</button><span class="nav-header__title u-label-large">${esc(title)}</span>${close ? `<button class="nav-header__action" data-action="exit" aria-label="Save and exit">${icon('x')}</button>` : '<span aria-hidden="true"></span>'}</nav>`;
}
function stepFooter(primary, secondary = null, dots = null) {
  const pageDots = dots ? `<div class="page-dots" role="progressbar" aria-label="Activity ${dots[1] + 1} of ${dots[0]}" aria-valuemin="1" aria-valuemax="${dots[0]}" aria-valuenow="${dots[1] + 1}">${Array.from({ length: dots[0] }, (_, i) => `<i class="${i < dots[1] ? 'is-done' : i === dots[1] ? 'is-current' : ''}"></i>`).join('')}</div>` : '';
  const btn = (b, cls) => `<button class="btn ${cls} u-label-large" data-action="${b.action}" ${b.disabled ? 'disabled' : ''}>${esc(b.label)}</button>`;
  return `<footer class="step-footer">${pageDots}${btn(primary, 'btn--primary')}${secondary ? btn(secondary, 'btn--tertiary') : ''}</footer>`;
}
function progress(label, pct, right = `${pct}%`) {
  return `<div class="progress"><div class="progress__label"><span class="u-label-small">${esc(label)}</span><b class="u-mono-label-small">${right}</b></div><div class="progress__bar" role="progressbar" aria-label="${esc(label)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}"><span style="width:${pct}%"></span></div></div>`;
}
function ring(done, total, complete) {
  const r = 22, c = 2 * Math.PI * r, pct = complete ? 1 : done / total;
  return `<span class="ring${complete ? ' is-complete' : ''}" role="img" aria-label="${done} of ${total} lessons complete"><svg viewBox="0 0 48 48" aria-hidden="true"><circle class="ring__track" cx="24" cy="24" r="${r}"/>${pct ? `<circle class="ring__value" cx="24" cy="24" r="${r}" stroke-dasharray="${(pct * c).toFixed(2)} ${c.toFixed(2)}" transform="rotate(-90 24 24)"/>` : ''}</svg>${complete ? icon('checkmark') : `<b class="u-label-small" aria-hidden="true">${done}/${total}</b>`}</span>`;
}
// Learning / Rating, Trending tag, Social proof and Review. Stars and Trending
// are for optional courses only; required and sensitive courses get proof.
function rating({ value, count }) { return `<span class="rating">${icon('star')}<b class="u-label-small c-primary">${value.toFixed(1)}</b><span class="u-paragraph-small c-secondary">· ${count.toLocaleString('en-US')} drivers</span></span>`; }
const trendingTag = () => `<span class="trending-tag u-label-x-small">${icon('chart_line')}Trending</span>`;
function socialProof(text) { return `<span class="social-proof">${icon('person_multiple')}<span class="u-paragraph-small">${esc(text)}</span></span>`; }
function review(r) { return `<div class="review"><span class="review__head">${icon('star')}<b class="u-label-small c-primary">${r.rating}</b><span class="u-paragraph-x-small c-tertiary">· ${esc(r.age)}</span></span><p class="u-paragraph-small c-primary">${esc(r.text)}</p></div>`; }
const STAR_WORDS = ['Tap a star to rate', 'Poor', 'Fair', 'Okay', 'Good', 'Great'];
function ratingInput(value) {
  return `<div class="rating-input"><div class="rating-input__stars" role="radiogroup" aria-label="Rate this course">${[1, 2, 3, 4, 5].map(n => `<button role="radio" aria-checked="${n === value}" aria-label="${n} ${n === 1 ? 'star' : 'stars'}" data-stars="${n}">${icon(n <= value ? 'star' : 'star_outlined')}</button>`).join('')}</div><span class="u-paragraph-small c-secondary">${STAR_WORDS[value]}</span></div>`;
}
// Learning / Curriculum header: four courses, one badge.
function curriculumHeader(curriculum) {
  const done = curriculumProgress(state.learningRecord, curriculum), total = curriculum.courses.length;
  const stage = done === total ? 'complete' : done ? 'in-progress' : 'not-started';
  const meta = stage === 'complete' ? `Badge earned · ${total} of ${total} courses` : `${done} of ${total} courses · Badge when all ${total} are done`;
  return `<div class="curriculum-header is-${stage}"><span class="curriculum-header__art">${icon('badge_checkmark')}</span><span class="curriculum-header__body"><b class="u-heading-x-small c-primary">${esc(curriculum.name)}</b><span class="u-paragraph-small c-secondary">${meta}</span><span class="curriculum-header__meter" role="img" aria-label="${done} of ${total} courses complete">${curriculum.courses.map((_, i) => `<i class="${i < done ? 'is-done' : ''}"></i>`).join('')}</span></span></div>`;
}
function courseCard({ kicker, title, description, done, total, complete = false, action, course = '', stars = null, trending = false, proof = '' }) {
  const meta = stars ? `<span class="course-card__meta">${rating(stars)}${trending ? trendingTag() : ''}</span>` : '';
  return `<button class="course-card" data-action="${action}"${course ? ` data-course="${course}"` : ''}><span class="course-card__body"><span class="u-label-x-small c-secondary">${esc(kicker)}</span><span class="u-label-large c-primary">${esc(title)}</span><span class="u-paragraph-small c-secondary">${esc(description)}</span>${meta}${proof ? socialProof(proof) : ''}</span>${ring(done, total, complete)}</button>`;
}
function sectionTitle(title, trailing = '') { return `<div class="section-title"><h2 class="u-heading-small">${esc(title)}</h2>${trailing}</div>`; }
function milestone({ kicker = '', title, body, next = false, action = '' }) {
  const tag = action ? 'button' : 'div';
  return `<${tag} class="milestone${next ? ' milestone--next' : ''}"${action ? ` data-action="${action}"` : ''}>${next ? '' : `<span class="mark">${icon('plus')}</span>`}<span class="milestone__body">${kicker ? `<span class="u-label-x-small c-tertiary">${esc(kicker)}</span>` : ''}<span class="u-label-large c-primary">${esc(title)}</span><span class="u-paragraph-small ${next ? 'c-tertiary' : 'c-secondary'}">${esc(body)}</span></span>${next ? `<span class="chevron">${icon('chevron_right_small')}</span>` : ''}</${tag}>`;
}
function checkResult({ kicker, score = '', title, body, result = 'passed' }) {
  return `<section class="check-result check-result--${result}"><p class="u-label-x-small c-tertiary">${esc(kicker)}</p>${score ? `<p class="check-result__score u-mono-heading-medium">${esc(score)}</p>` : ''}<h1 class="u-label-large c-primary">${esc(title)}</h1><p class="u-paragraph-small">${esc(body)}</p></section>`;
}
function note(title, body) { return `<div class="note"><b class="u-label-medium">${esc(title)}</b><p class="u-paragraph-small">${esc(body)}</p></div>`; }
function banner(style, iconName, title, body) { return `<div class="banner banner--${style}"><span class="banner__art">${icon(iconName)}</span><div class="banner__text"><b class="u-label-medium">${esc(title)}</b><p class="u-paragraph-medium">${esc(body)}</p></div></div>`; }
function weeklyGoal(kicker = 'Weekly learning goal') {
  const habit = habitSummary(state.learningRecord);
  const title = habit.paused ? 'Paused until new learning is available' : habit.met ? 'Goal met this week' : `${habit.learningDays} of ${habit.goal} learning days this week`;
  const body = habit.paused ? 'Your completed learning stays saved. A quiet week does not break your streak.' : habit.met ? 'Your streak grows when the week ends. A week with no new learning available pauses it.' : habit.learningDays ? 'One more day this week meets your goal.' : 'Learn on two different days this week, or finish everything currently available.';
  const streak = habit.weekStreak === 0 ? 'No week streak yet' : `${habit.weekStreak}-week streak`;
  const days = Array.from({ length: habit.goal }, (_, i) => `<i class="${i < habit.learningDays ? 'is-done' : ''}"></i>`).join('');
  return `<button class="weekly-goal${habit.met ? ' is-met' : ''}" data-action="habit"><span class="u-label-x-small c-tertiary">${esc(kicker)}</span><span class="u-label-large c-primary">${esc(title)}</span><span class="weekly-goal__meter" aria-hidden="true">${days}</span><span class="u-paragraph-small c-secondary">${esc(body)}</span><span class="u-label-small c-primary">${esc(streak)}</span></button>`;
}
function learningStats() {
  const habit = habitSummary(state.learningRecord);
  const tile = (value, label) => `<span><b class="u-heading-small c-primary">${esc(value)}</b><small class="u-paragraph-x-small c-secondary">${label}</small></span>`;
  return `<button class="learning-stats" data-action="rewards" aria-label="View progress across all courses">${tile(learningPoints(), 'Points')}${tile(habit.weekStreak, 'Week streak')}${tile(`${earnedBadgeCount()} of ${CURRICULA.length}`, 'Badges')}</button>`;
}
function safetyHero(complete) { return `<div class="safety-hero" data-state="${complete ? 'complete' : 'not-complete'}" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i>${icon(complete ? 'shield_check' : 'shield')}</div>`; }
function activityHeader(mode) {
  const icons = { Learn: 'circle_i', Watch: 'player_play', Practice: 'diamond', 'Lesson recap': 'checkmark' };
  return `<div class="activity-header"><span class="activity-header__icon">${icon(icons[mode])}</span><span class="u-label-small">${mode}</span></div>`;
}
function answerOption(i, label, stateName, attrs) {
  const resultIcon = stateName === 'correct' ? icon('circle_check') : stateName === 'incorrect' ? icon('circle_x') : '';
  return `<button class="answer is-${stateName}" ${attrs} aria-pressed="${stateName === 'selected' || stateName === 'correct' || stateName === 'incorrect'}" ${stateName === 'disabled' ? 'disabled' : ''}><span class="answer__key u-label-small">${String.fromCharCode(65 + i)}</span><span class="answer__label u-paragraph-medium">${esc(label)}</span>${resultIcon}</button>`;
}
function feedbackBlock(result, title, body) {
  const mark = result === 'incorrect' ? `<span class="mark mark--negative">${icon('x')}</span>` : result === 'saved' ? `<span class="mark mark--inverse">${icon('checkmark')}</span>` : `<span class="mark">${icon('checkmark')}</span>`;
  return `<div id="feedback" class="feedback feedback--${result}" role="status"><div class="feedback__head">${mark}<b class="u-label-large">${esc(title)}</b></div><p class="u-paragraph-small">${esc(body)}</p></div>`;
}
function resourceDetail(r) {
  if (r.detail) return r.detail;
  if (r.href.startsWith('tel:')) { const n = r.href.slice(4); return `Call ${n.length === 11 ? `${n[0]}-${n.slice(1, 4)}-${n.slice(4, 7)}-${n.slice(7)}` : n}`; }
  if (r.href.startsWith('sms:')) return `Text HELP to ${r.href.slice(4).split('?')[0]}`;
  return new URL(r.href).hostname.replace(/^www\./, '');
}
function resourceRow(r) {
  const kind = r.href.startsWith('tel:') ? 'phone' : r.href.startsWith('sms:') ? 'speech_bubble' : 'arrow_right_up';
  return `<a class="resource-row" href="${esc(r.href)}" target="_blank" rel="noreferrer">${icon(kind)}<span class="resource-row__body"><b class="u-label-medium">${esc(r.label)}</b><p class="u-paragraph-small">${esc(resourceDetail(r))}</p></span><span class="chevron">${icon('chevron_right_small')}</span></a>`;
}
function bullets(items) { return items?.length ? `<ul class="bullets">${items.map(item => `<li class="u-paragraph-medium">${esc(item)}</li>`).join('')}</ul>` : ''; }
function pointsTotalCard(title, subtitle, total) { return `<div class="points-total"><span><b class="u-label-large c-primary">${esc(title)}</b><small class="u-paragraph-small c-secondary">${esc(subtitle)}</small></span><b class="u-heading-medium c-primary">${esc(total)}</b></div>`; }
function emptyState(title, body) { return `<div class="empty"><span class="empty__art">${icon('circle_exclamation_mark')}</span><h1 class="empty__title u-heading-x-small">${esc(title)}</h1><p class="u-paragraph-medium">${esc(body)}</p></div>`; }

function shell({ nav, hero = '', body, footer = '', bodyClass = '' }) {
  root.innerHTML = `${nav}${hero}<div class="screen-body ${bodyClass}">${body}</div>${footer}`;
  const title = root.querySelector('h1'); if (title) { title.tabIndex = -1; title.focus({ preventScroll: true }); }
}
const kicker = (text) => `<p class="kicker u-label-x-small">${esc(text)}</p>`;
const heading = (text, cls = 'u-heading-large') => `<h1 class="${cls}">${esc(text)}</h1>`;
const lead = (text) => `<p class="lead u-paragraph-medium">${esc(text)}</p>`;

// ---------- Screens: one function per Figma screen ----------
// Card copy is trimmed to fit one line each (2026-09-29). On Learning home the
// section heading already says Required, so the kicker drops it there.
function requiredCourseCard({ kicker = 'Required · Safety' } = {}) {
  const status = courseStatus(), cur = currentLesson();
  const description = status === 'not-started' ? '7 lessons' : status === 'complete' ? 'Complete' : status === 'final-pending' ? 'Next: Final check' : `Next: ${lessons[cur].title}`;
  return courseCard({ kicker, title: COURSE_TITLE, description, done: lessonsDone(), total: lessons.length, complete: status === 'complete', action: 'course', proof: courseById(COURSE_ID).cardProof });
}
// Every other course in the catalogue. Road safety hands off to its own
// provider; the placeholders open a course page with no content yet.
function catalogCard(course) {
  if (course.id === COURSE_ID) return requiredCourseCard();
  const done = courseComplete(course.id);
  return courseCard({ kicker: course.kicker, title: course.title, description: course.description, done: done ? course.lessonCount : 0, total: course.lessonCount, complete: done, action: course.external ? 'road-safety' : 'course-page', course: course.external ? '' : course.id, stars: course.rating, trending: course.trending, proof: '' });
}
function discovery() {
  const firstName = learnerFirstName();
  const retention = retentionDue() ? `${sectionTitle('Check what stayed with you', '<span class="u-paragraph-small c-secondary">30 days on</span>')}${milestone({ kicker: 'Not scored for points', title: 'Five-question retention check', body: `Review what you remember from ${COURSE_TITLE}.`, next: true, action: 'retention-intro' })}` : '';
  root.innerHTML = `<header class="discovery-header"><span class="discovery-header__logo" role="img" aria-label="Uber">${icon('uber_logo')}</span><button class="avatar u-label-medium" data-action="rewards" aria-label="Open ${firstName ? `${esc(firstName)}’s` : 'your'} learning progress">${firstName ? esc(firstName.slice(0, 1).toUpperCase()) : '·'}</button></header><div class="screen-body screen-body--roomy"><h1 class="personal-greeting u-heading-large">${personalGreeting()}</h1>${sectionTitle('Required')}${requiredCourseCard({ kicker: 'Safety' })}${retention}${sectionTitle('This week', '<span class="u-paragraph-small c-secondary">2 learning days</span>')}${weeklyGoal()}${sectionTitle('Your progress', '<span class="u-paragraph-small c-secondary">Across all courses</span>')}${learningStats()}${sectionTitle('Trending now', '<button class="link u-paragraph-small" data-action="library">See all</button>')}${trendingCourses().map(catalogCard).join('')}</div>`;
  const title = root.querySelector('h1'); if (title) { title.tabIndex = -1; title.focus({ preventScroll: true }); }
}
function libraryView() {
  const groups = CURRICULA.map(curriculum => `<section class="curriculum-group">${curriculumHeader(curriculum)}${curriculum.courses.map(id => catalogCard(courseById(id))).join('')}</section>`).join('');
  shell({ nav: navHeader('Course library', 'discover'), body: `${kicker('Course library')}${heading('Explore learning')}${lead('Courses available for your profile.')}${groups}`, footer: stepFooter({ label: 'Back to learning home', action: 'discover' }) });
}
function roadSafetyView() {
  shell({ nav: navHeader('Road safety', 'library'), body: `${kicker('Available soon')}${heading('Road safety fundamentals')}${lead('This course is not available yet. We’ll show it here when it is ready.')}${banner('accent', 'circle_i', 'Your learning record stays accurate', 'Road Safety does not add points, count toward your weekly goal, or unlock badges until its completion can be confirmed.')}`, footer: stepFooter({ label: 'Back to course library', action: 'library' }) });
}
function lessonRow(lesson, i) {
  const status = lessonStatus(i);
  const inLesson = status === 'current' && state.started && state.lesson === i;
  const description = status === 'complete' ? `Complete · +${lessonPoints(i)} points` : inLesson ? `In progress · ${state.step + 1} of ${lesson.steps.length}` : `${lesson.steps.length} activities · up to ${eligibleIn(lesson) * 10} points`;
  const mark = status === 'complete' ? icon('circle_check') : '<i></i>';
  const content = `<span class="lesson-row__status" aria-hidden="true">${mark}</span><span class="lesson-row__content"><span class="lesson-row__body"><b class="u-label-medium c-primary">${esc(lesson.title)}</b><small class="u-paragraph-small c-secondary">${esc(description)}</small></span>${status === 'upcoming' ? '' : `<span class="chevron">${icon('chevron_right_small')}</span>`}</span>`;
  return status === 'upcoming' ? `<div class="lesson-row is-upcoming" aria-label="${esc(lesson.title)}, not yet available">${content}</div>` : `<button class="lesson-row is-${status}" data-lesson="${i}">${content}</button>`;
}
function overview() {
  const status = courseStatus();
  const groups = [['Foundations', [0, 1]], ['Boundaries', [2, 3, 4]], ['Safe response', [5, 6]]].map(([name, ids]) => `<section class="group"><h2 class="u-heading-small">${name}</h2>${ids.map(i => lessonRow(lessons[i], i)).join('')}</section>`).join('');
  const badges = earnedBadgeCount();
  const record = milestone({ kicker: 'Shared across courses', title: 'Your learning record', body: `${coursePoints(state.learningRecord, COURSE_ID)} points from this course · ${badges} ${badges === 1 ? 'badge' : 'badges'} earned`, next: true, action: 'rewards' });
  const primary = { 'not-started': { label: 'Begin course', action: 'course-intro' }, 'in-progress': { label: 'Continue course', action: 'start' }, 'final-pending': { label: 'Complete final check', action: 'final-check' }, complete: { label: 'Review course', action: 'review' } }[status];
  shell({ nav: navHeader('Course details', 'discover'), hero: safetyHero(status === 'complete'), bodyClass: 'screen-body--roomy', body: `${kicker('Required · Safety')}${heading(COURSE_TITLE)}${lead('Practical guidance for respectful boundaries, awareness, and safe reporting.')}${progress(`${lessonsDone()} of ${lessons.length} lessons complete`, coursePercent())}<p class="u-paragraph-small c-tertiary">7 lessons · 6 required videos · 33 activities</p>${socialProof(courseById(COURSE_ID).proof)}${record}${curriculumHeader(SAFETY)}${groups}`, footer: stepFooter(primary) });
}
// Course details for an optional course. Only the required course has
// content so far, so every lesson here reads "Content coming soon".
function coursePage() {
  const course = openCourse, curriculum = curriculumOf(course.id);
  const lessonRows = Array.from({ length: course.lessonCount }, (_, i) => {
    const content = `<span class="lesson-row__status" aria-hidden="true"><i></i></span><span class="lesson-row__content"><span class="lesson-row__body"><b class="u-label-medium c-primary">Lesson ${i + 1}</b><small class="u-paragraph-small c-secondary">Content coming soon</small></span>${i === 0 ? `<span class="chevron">${icon('chevron_right_small')}</span>` : ''}</span>`;
    return i === 0 ? `<button class="lesson-row is-current" data-action="course-soon">${content}</button>` : `<div class="lesson-row is-upcoming" aria-label="Lesson ${i + 1}, not yet available">${content}</div>`;
  }).join('');
  const reviews = course.reviews ? `<section class="group">${sectionTitle('Reviews', `<span class="u-paragraph-small c-secondary">From ${course.rating.count.toLocaleString('en-US')} drivers</span>`)}${course.reviews.map(review).join('')}</section>` : '';
  const meta = course.rating ? `<div class="course-page__rating">${rating(course.rating)}${course.trending ? trendingTag() : ''}</div>` : '';
  shell({ nav: navHeader('Course details', courseFrom), bodyClass: 'screen-body--roomy', body: `${kicker(course.kicker)}${heading(course.title)}${lead('Course description coming soon.')}${meta}${course.proof ? socialProof(course.proof) : ''}<p class="u-paragraph-small c-tertiary">${course.lessonCount} lessons · about 20 minutes</p>${curriculumHeader(curriculum)}${reviews}<section class="group"><h2 class="u-heading-small">Lessons</h2>${lessonRows}</section>`, footer: stepFooter({ label: 'Start course', action: 'course-soon' }) });
}
// Starting a placeholder course: the same "not available yet" pattern as
// Road safety, until the course has content.
function courseSoonView() {
  shell({ nav: navHeader(openCourse.title, 'course-page'), body: `${kicker('Content coming soon')}${heading(openCourse.title)}${lead('The lessons for this course are not ready yet. We’ll show them here when they are.')}`, footer: stepFooter({ label: 'Back to course', action: 'course-page' }) });
}
// Rate this course: shown when an optional course is completed. Required and
// sensitive courses never ask for stars.
function rateView() {
  const course = openCourse;
  shell({ nav: navHeader(course.title, 'course-page'), body: `${checkResult({ kicker: 'Course complete', title: course.title, body: `You finished all ${course.lessonCount === 4 ? 'four' : course.lessonCount} lessons. Your points are in your learning record.` })}<h2 class="u-heading-small">How was this course?</h2>${ratingInput(draftStars)}<label class="field"><span class="field__label-row"><span class="u-label-medium">Add a one-line review (optional)</span><span id="review-count" class="field__count u-label-medium">${draftReview.length}/120</span></span><textarea id="review" class="field__input u-paragraph-medium" maxlength="120" rows="2" placeholder="What stood out?">${esc(draftReview)}</textarea><small class="field__hint u-paragraph-small">Shown to other drivers without your name</small></label>`, footer: stepFooter({ label: 'Submit rating', action: 'submit-rating', disabled: !draftStars }, { label: 'Skip', action: 'discover' }) });
}
// Curriculum complete: the moment a badge is earned.
function curriculumCompleteView() {
  const curriculum = CURRICULA.find(c => earnedBadgeKeys(state.learningRecord).includes(c.id)) || SAFETY;
  const next = CURRICULA.find(c => !earnedBadgeKeys(state.learningRecord).includes(c.id));
  shell({ nav: navHeader(curriculum.name, 'discover'), body: `${checkResult({ kicker: 'Curriculum complete', title: curriculum.name, body: `You completed all ${curriculum.courses.length === 4 ? 'four' : curriculum.courses.length} courses in this curriculum.` })}${curriculumHeader(curriculum)}${next ? milestone({ kicker: 'Next curriculum', title: next.name, body: `${next.courses.length} courses · Badge when all ${next.courses.length} are done`, next: true, action: 'library' }) : ''}`, footer: stepFooter({ label: 'View badges', action: 'badges' }, { label: 'Learning home', action: 'discover' }) });
}
function courseIntro() {
  const steps = [['01', 'Start with a quick check', 'Five questions establish a baseline. They do not add or remove points.'], ['02', 'Learn and practise', 'Watch required videos, make decisions, and review the source guidance.'], ['03', 'Confirm what you learned', 'A five-question final check measures learning gain.']];
  shell({ nav: navHeader('Course introduction', 'overview'), body: `${kicker('Before you begin')}${heading('Learn at your own pace')}${lead('This course includes sensitive topics. Pause whenever you need to; completed progress saves automatically.')}<div>${steps.map(([n, t, d]) => `<div class="intro-step"><span class="u-mono-label-small">${n}</span><div><b class="u-label-medium">${t}</b><p class="u-paragraph-small">${d}</p></div></div>`).join('')}</div>${banner('warning', 'alert', 'Take care of yourself', 'Support and reporting resources remain available throughout the course.')}`, footer: stepFooter(state.baselineDone ? { label: 'Start lesson 1', action: 'begin-lessons' } : { label: 'Begin quick check', action: 'baseline' }, { label: 'Back to course', action: 'overview' }) });
}
const assessmentLabel = () => assessmentMode === 'baseline' ? 'Quick check' : assessmentMode === 'retention' ? '30-day retention check' : 'Final knowledge check';
function assessment() {
  const questions = assessments[assessmentMode], q = questions[assessmentIndex], chosen = state.assessmentResponses?.[assessmentMode]?.[assessmentIndex];
  const last = assessmentIndex === questions.length - 1;
  const next = last ? (assessmentMode === 'baseline' ? 'Start course' : assessmentMode === 'retention' ? 'See what stayed' : 'Finish check') : 'Next question';
  shell({ nav: navHeader(assessmentLabel(), assessmentMode === 'baseline' ? 'course-intro' : assessmentMode === 'retention' ? 'retention-intro' : 'overview'), body: `${progress(assessmentLabel(), Math.round((assessmentIndex + 1) / questions.length * 100), `${assessmentIndex + 1} / ${questions.length}`)}${kicker('Knowledge check')}${heading(q.prompt, 'u-heading-medium')}${lead('Choose the best answer. Your result does not change your points.')}<div class="stack-8" role="group" aria-label="Answer choices">${q.options.map((option, i) => answerOption(i, option, chosen === i ? 'selected' : 'default', `data-assessment-choice="${i}"`)).join('')}</div>`, footer: stepFooter({ label: next, action: 'assessment-next', disabled: chosen === undefined }) });
}
const scoreOf = (mode) => assessments[mode].reduce((sum, question, i) => sum + (state.assessmentResponses?.[mode]?.[i] === question.answer ? 1 : 0), 0);
function assessmentResult() {
  if (assessmentMode === 'retention') {
    const score = scoreOf('retention'), passed = score >= 4;
    shell({ nav: navHeader('Retention check', 'discover'), body: `${checkResult({ kicker: '30-day retention check', score: `${score} / 5`, title: passed ? 'You retained the key ideas' : 'Worth another look', body: `You answered ${score} of 5 questions correctly. ${passed ? 'Save your result to your learning record.' : 'Review the course, then try another check.'}`, result: passed ? 'passed' : 'retry' })}<p class="u-paragraph-small c-secondary">This check measures retained learning. It doesn’t add points or award a badge.</p>`, footer: passed ? stepFooter({ label: 'Save result', action: 'finish-retention' }) : stepFooter({ label: 'Review course', action: 'overview' }, { label: 'Try again', action: 'retry-retention' }) });
    return;
  }
  const score = scoreOf('final'), passed = score >= 4, baseline = scoreOf('baseline');
  shell({ nav: navHeader('Knowledge check result', 'overview'), body: `${checkResult({ kicker: 'Final knowledge check', score: `${score} / 5`, title: passed ? 'Ready to complete' : 'Review, then try again', body: passed ? `You answered ${score} of 5 questions correctly.` : `You answered ${score} of 5 questions correctly. There is no penalty: revisit the lessons, then try again.`, result: passed ? 'passed' : 'retry' })}<div class="gain"><span><small class="u-label-small c-secondary">Before</small><b class="u-mono-heading-medium">${baseline}/5</b></span><span><small class="u-label-small c-secondary">Now</small><b class="u-mono-heading-medium">${score}/5</b></span></div><p class="u-paragraph-small c-secondary">Knowledge checks measure learning gain and do not award points.</p>${passed ? note('Your learning is recorded', 'Your result and course completion are saved to your learning record.') : note('Review these topics', 'Respecting boundaries · Consent and personal space · Safe reporting')}`, footer: stepFooter(passed ? { label: 'Complete course', action: 'finish-course' } : { label: 'Try final check again', action: 'retry-final' }, { label: 'Back to course', action: 'overview' }) });
}
function activityMode(type) { return type === 'reading' ? 'Learn' : type === 'video' ? 'Watch' : type === 'resources' ? 'Lesson recap' : 'Practice'; }
function activity() {
  const l = lessons[state.lesson], steps = l.steps, a = steps[state.step];
  const dots = [steps.length, state.step];
  const lastStep = state.step === steps.length - 1;
  let content = '', footer = '';
  if (a.type === 'reading') {
    content = `${a.body ? `<p class="u-paragraph-medium c-primary">${esc(a.body)}</p>` : ''}${bullets(a.bullets)}${a.groups ? a.groups.map(group => `<section class="group group--gap"><h2 class="u-heading-x-small">${esc(group.title)}</h2>${bullets(group.items)}</section>`).join('') : ''}${a.note ? note('Keep context in mind', a.note) : ''}`;
    footer = stepFooter({ label: lastStep ? 'Complete lesson' : 'Continue', action: 'next' }, null, dots);
  } else if (a.type === 'resources') {
    const phoneLike = (a.resources || []).some(r => !r.href.startsWith('http'));
    content = `${a.bullets ? `<div class="stack-8">${a.bullets.map(b => `<div class="takeaway">${icon('checkmark')}<p class="u-paragraph-medium">${esc(b)}</p></div>`).join('')}</div>` : ''}${a.resources ? `<section class="group"><h2 class="u-heading-x-small">${phoneLike || a.bullets ? 'Support' : 'Resources'}</h2>${a.resources.map(resourceRow).join('')}</section>` : ''}${a.note ? note('Important', a.note) : ''}`;
    footer = stepFooter({ label: lastStep ? 'Complete lesson' : 'Continue', action: 'next' }, null, dots);
  } else if (a.type === 'video') {
    const media = videoMeta[state.lesson];
    const mode = playing ? 'pause' : watched ? 'replay' : 'play';
    content = `<div class="video-player${playing ? ' is-playing' : ''}"><div class="video-player__title"${playing ? ' hidden' : ''}><small class="u-label-x-small">${watched ? `${icon('checkmark')}Watched` : 'Required video'}</small><b class="u-heading-x-small">${esc(a.title)}</b></div><div class="video-player__centre"><button class="circle-btn" data-action="play" aria-label="${mode === 'pause' ? 'Pause' : mode === 'replay' ? 'Replay' : 'Play'} ${esc(a.title)}">${icon(mode === 'pause' ? 'player_pause' : mode === 'replay' ? 'arrow_counter_clockwise' : 'player_play')}</button></div><div class="video-player__controls"><div class="video-player__timeline" aria-hidden="true"><span id="video-progress" style="width:${watched ? 100 : 0}%"></span></div><div class="video-player__row"><span id="video-time" class="u-mono-label-x-small">${watched ? media.runtime : '0:00'} / ${media.runtime}</span><span class="video-player__tools"><button data-action="captions" aria-pressed="true" aria-label="Captions">${icon('closed_captioning')}</button><button data-action="fullscreen" aria-label="Enter fullscreen">${icon('arrow_expand')}</button></span></div></div></div><div class="video-controls"><span class="u-label-small">Mandatory video · ${media.runtime}</span><button class="pill u-label-small" data-action="captions" aria-pressed="true">CC on</button></div><p id="captions" class="u-paragraph-medium c-primary">${esc(a.caption)}</p><details class="accordion"><summary><span class="accordion__text"><b class="u-label-medium">What should I look for?</b></span><span class="accordion__control">${icon('chevron_down_small')}</span></summary><p class="accordion__body u-paragraph-small">${esc(a.lookFor)}</p></details><p class="u-paragraph-small c-secondary" id="watch-status">${watched ? 'Video complete. You can continue.' : 'Finish the video to unlock the next activity. If you leave now, this video restarts.'}</p>`;
    footer = stepFooter({ label: 'Continue', action: 'next', disabled: !watched }, null, dots);
  } else if (a.type === 'choice') {
    content = `<div class="stack-8" role="group" aria-label="Answer choices">${a.options.map((o, i) => answerOption(i, o, checked ? (i === selected ? (correct ? 'correct' : 'incorrect') : 'disabled') : selected === i ? 'selected' : 'default', `data-choice="${i}"`)).join('')}</div>`;
  } else if (a.type === 'dropdown') {
    content = `<div class="select"><button class="select__trigger" data-action="dropdown" aria-expanded="false" aria-controls="dropdown-options" ${checked ? 'disabled' : ''}><span class="u-paragraph-large${selected === null ? ' is-placeholder' : ''}">${selected === null ? 'Choose the missing phrase' : esc(a.options[selected])}</span>${icon('chevron_down_small')}</button><div id="dropdown-options" class="select__list" role="listbox" aria-label="Missing phrase" hidden>${a.options.map((o, i) => `<button class="u-paragraph-medium" role="option" aria-selected="${selected === i}" data-choice="${i}">${esc(o)}</button>`).join('')}</div></div>`;
  } else if (a.type === 'number') {
    const val = state.responses[`${state.lesson}-${state.step}`] || '';
    content = `<label class="field"><span class="u-label-large">Your answer</span><input id="answer" class="field__input u-paragraph-large" inputmode="numeric" type="text" value="${esc(val)}" placeholder="Enter a number" ${checked ? 'readonly' : ''}><small class="field__hint u-paragraph-small">Use the information in the source content above.</small></label>`;
  } else if (a.type === 'text') {
    const val = state.responses[`${state.lesson}-${state.step}`] || '';
    content = `<label class="field"><span class="field__label-row"><span class="u-label-medium">Your response</span><span id="count" class="field__count u-label-medium">${val.length}/300</span></span><textarea id="answer" class="field__input u-paragraph-medium" maxlength="300" placeholder="Write your response…" ${checked ? 'readonly' : ''}>${esc(val)}</textarea><small class="field__hint u-paragraph-small">Private practice response</small></label>`;
  } else if (a.type === 'drag') {
    const cardState = (i) => checked ? (placement[i] === a.answers[i] ? 'correct' : 'incorrect') : selected === i ? 'selected' : placement[i] !== undefined ? 'placed' : 'default';
    const card = (t, i) => { const s = cardState(i); return `<button draggable="${!checked}" class="match-card is-${s}" data-card="${i}" aria-pressed="${selected === i}" ${checked ? 'disabled' : ''}><span class="grab">${icon('grabber')}</span><span class="match-card__label u-paragraph-medium">${esc(t)}</span>${s === 'correct' ? icon('circle_check') : s === 'incorrect' ? icon('circle_x') : ''}</button>`; };
    const zone = (g, n) => {
      const inside = a.cards.map((t, i) => placement[i] === n ? i : null).filter(i => i !== null);
      const zoneState = checked && inside.length ? (inside.every(i => a.answers[i] === n) ? 'correct' : 'incorrect') : inside.length ? 'filled' : selected !== null ? 'target' : 'empty';
      const hint = { empty: 'Drop or tap to place', target: 'Tap to place here', filled: 'Tap the card to move it', correct: 'Matches', incorrect: 'Review this match' }[zoneState];
      return `<section class="drop-zone is-${zoneState}" data-zone="${n}"><button class="drop-zone__head" data-place="${n}" ${checked ? 'disabled' : ''}><b class="u-label-medium">${esc(g)}</b><small class="u-paragraph-x-small">${hint}</small></button>${inside.map(i => card(a.cards[i], i)).join('')}</section>`;
    };
    content = `${note('Match each action', 'Drag a card, or select it and tap a destination.')}<div class="stack-8" aria-label="Cards to place">${a.cards.map((t, i) => placement[i] === undefined ? card(t, i) : '').join('')}</div><div class="stack-8">${a.groups.map(zone).join('')}</div><p class="u-paragraph-small c-secondary">${Object.keys(placement).length} of 3 actions matched</p>`;
  } else if (a.type === 'sort') {
    content = `${note('Build the safest sequence', 'Drag each step or use the arrow controls.')}<div class="stack-8" aria-label="Sequence to arrange">${order.map((n, i) => `<div class="sort-row ${checked ? (n === a.answer[i] ? 'is-correct' : 'is-incorrect') : ''}" draggable="${!checked}" data-sort="${i}"><span class="grab">${icon('grabber')}</span><b class="sort-row__number u-label-small">${i + 1}</b><span class="sort-row__label u-paragraph-medium">${esc(a.items[n])}</span><span class="sort-row__arrows"><button class="circle-btn circle-btn--small" data-move="${i},-1" aria-label="Move ${esc(a.items[n])} up" ${i === 0 || checked ? 'disabled' : ''}>${icon('chevron_up_small')}</button><button class="circle-btn circle-btn--small" data-move="${i},1" aria-label="Move ${esc(a.items[n])} down" ${i === order.length - 1 || checked ? 'disabled' : ''}>${icon('chevron_down_small')}</button></span></div>`).join('')}</div>`;
  }
  if (!['reading', 'resources', 'video'].includes(a.type)) {
    if (checked) content += a.type === 'text' ? feedbackBlock('saved', 'Saved as private practice', a.feedback) : feedbackBlock(correct ? 'correct' : 'incorrect', correct ? 'Correct' : 'Not quite', a.feedback);
    footer = checked ? stepFooter(correct || a.type === 'text' ? { label: 'Continue', action: 'next' } : { label: 'Try again', action: 'retry' }, null, dots) : stepFooter({ label: a.type === 'text' ? 'Save reflection' : 'Check answer', action: 'check', disabled: !ready(a) }, null, dots);
  }
  shell({ nav: navHeader(`Lesson ${state.lesson + 1} of ${lessons.length}`, 'back', true), body: `${activityHeader(activityMode(a.type))}${heading(a.title)}${lead(a.prompt)}${content}`, footer });
}
function ready(a) {
  if (['choice', 'dropdown'].includes(a.type)) return selected !== null;
  if (['text', 'number'].includes(a.type)) return !!(state.responses[`${state.lesson}-${state.step}`] || '').trim();
  if (a.type === 'drag') return Object.keys(placement).length === 3;
  return true;
}
function completion() {
  const status = courseStatus();
  const back = { label: 'Back to course', action: 'overview' };
  if (status === 'complete') {
    shell({ nav: navHeader(COURSE_TITLE, 'overview'), body: `${checkResult({ kicker: 'Course complete', title: 'You completed the course', body: 'You completed all seven lessons in the United States mandatory safety education.' })}${progress(`${lessons.length} of ${lessons.length} lessons complete`, 100)}${milestone({ title: 'Course contribution recorded', body: `${coursePoints(state.learningRecord, COURSE_ID)} points from this course are in your shared record.` })}<section class="group"><h2 class="u-heading-x-small">Curriculum progress</h2>${curriculumHeader(SAFETY)}</section>${note('Your commitment', 'Keep conversations respectful, follow stated boundaries, and report concerns safely.')}`, footer: stepFooter({ label: 'View learning progress', action: 'rewards' }, back) });
    return;
  }
  const lessonTitle = lessons[state.lesson].title, contribution = lessonPoints(state.lesson);
  const points = milestone({ title: `Lesson complete · +${contribution} points`, body: `Your account-level total is now ${learningPoints()} points.` });
  if (status === 'final-pending') {
    shell({ nav: navHeader(`Lesson ${state.lesson + 1} of ${lessons.length}`, 'overview'), body: `${checkResult({ kicker: 'Lessons complete', title: 'One final check', body: 'You finished all seven lessons. Confirm what you learned to complete the course.' })}${progress(`${lessonsDone()} of ${lessons.length} lessons complete`, coursePercent())}${points}${milestone({ kicker: 'Next step', title: 'Final knowledge check', body: 'Five questions · about 3 minutes', next: true, action: 'final-check' })}`, footer: stepFooter({ label: 'Complete final check', action: 'final-check' }, back) });
    return;
  }
  const next = currentLesson();
  shell({ nav: navHeader(`Lesson ${state.lesson + 1} of ${lessons.length}`, 'overview'), body: `${checkResult({ kicker: `Lesson ${state.lesson + 1} complete`, title: lessonTitle, body: lessons[state.lesson].summary })}${progress(`${lessonsDone()} of ${lessons.length} lessons complete`, coursePercent())}${points}${milestone({ kicker: 'Next lesson', title: lessons[next].title, body: `${lessons[next].steps.length} activities · Up to ${eligibleIn(lessons[next]) * 10} points`, next: true, action: 'next-lesson' })}`, footer: stepFooter({ label: `Start lesson ${next + 1}`, action: 'next-lesson' }, back) });
}
function rewardsView() {
  const tabs = [['progress', 'Progress'], ['habit', 'Habit'], ['badges', 'Badges'], ['standing', 'Standing']];
  const tabBar = `<div class="tabs" role="tablist" aria-label="Learning record">${tabs.map(([key, label]) => `<button role="tab" data-progress-tab="${key}" aria-selected="${progressTab === key}"><span class="u-label-small">${label}</span></button>`).join('')}</div>`;
  let panel = '';
  if (progressTab === 'progress') {
    panel = `${pointsTotalCard('Total points', 'Across all your courses', learningPoints())}<section class="group"><h2 class="u-heading-small">Course contributions</h2><div class="contribution-row"><span class="contribution-row__body"><b class="u-label-medium c-primary">${COURSE_TITLE}</b><small class="u-paragraph-small c-tertiary">${lessonsDone()} of ${lessons.length} lessons complete · ${activityCount(state.learningRecord, COURSE_ID)} eligible activities</small></span><b class="contribution-row__value u-mono-label-medium">+${coursePoints(state.learningRecord, COURSE_ID)}</b></div><div class="contribution-row is-external"><span class="contribution-row__body"><b class="u-label-medium c-primary">Road safety fundamentals</b><small class="u-paragraph-small c-tertiary">External completion tracked separately</small></span><b class="contribution-row__value u-mono-label-medium">—</b></div></section>${progress(`${lessonsDone()} of ${lessons.length} lessons complete`, coursePercent())}<p class="u-paragraph-small c-secondary">Points are awarded once per eligible activity. Reading requires Continue, videos require full playback, and practice requires a correct answer. Resource screens and assessments award no points.</p>`;
  } else if (progressTab === 'habit') {
    const habit = habitSummary(state.learningRecord);
    panel = `${pointsTotalCard('Week streak', 'Consecutive goal weeks', habit.weekStreak)}${weeklyGoal()}<p class="u-paragraph-small c-secondary">A learning day requires the first completion of an eligible activity. The goal is two different days in a Monday–Sunday week. Finishing all available learning also meets that week’s goal. A week with no eligible learning pauses the streak. One missed active week in eight can be forgiven; earned points and badges never disappear.</p>`;
  } else if (progressTab === 'badges') {
    panel = `<p class="lead u-paragraph-medium">Earn a badge for each curriculum you finish: four curricula, sixteen courses.</p><div class="stack-8">${CURRICULA.map(curriculumHeader).join('')}</div>`;
  } else {
    const standing = demoComparison(state.learningRecord);
    const bands = COHORT_BANDS.map((range, index) => { const current = standing.bandIndex === index; return `<div class="cohort__band${current ? ' is-current' : ''}" role="listitem" aria-label="${range}${current ? ', your example band' : ''}"><span class="cohort__block">${current ? '<b class="u-label-x-small">You</b>' : ''}</span><span class="standing-band-label ${current ? 'u-label-x-small c-primary' : 'u-paragraph-x-small c-tertiary'}">${range}</span></div>`; }).join('');
    panel = `<section class="cohort standing-panel"><p class="u-label-x-small c-tertiary">Illustrative cohort · This week</p><h2 class="u-heading-small">${standing.bandIndex === null ? 'Your band appears after your first activity' : `Your band: ${standing.label}`}</h2><div class="cohort__bands" role="list" aria-label="Four cohort position bands">${bands}</div><p class="u-paragraph-x-small c-tertiary">Example cohort of ${standing.cohortSize} learners. Live comparisons will use approved, privacy-safe learner data.</p></section>`;
  }
  const status = courseStatus();
  const primary = status === 'in-progress' ? { label: 'Continue course', action: 'start' } : status === 'final-pending' ? { label: 'Complete final check', action: 'final-check' } : { label: 'Back to course', action: 'overview' };
  shell({ nav: navHeader('Learning progress', 'discover'), body: `${kicker('Across all courses')}${heading('Learning progress')}${lead('Points, habits, badges, and standing across your courses.')}${tabBar}${panel}`, footer: stepFooter(primary, { label: 'Learning home', action: 'discover' }) });
}
function retentionIntro() {
  const due = retentionDue();
  shell({ nav: navHeader('Retention check', 'discover'), body: `${kicker('30 days on · Not scored for points')}${heading(due ? 'Still with you?' : 'Come back in 30 days')}${lead(due ? `Five new questions check what stayed with you from ${COURSE_TITLE}.` : 'Your retention check becomes available 30 days after you complete the course.')}${note('What this check does', 'It measures what stayed with you. It doesn’t add points or award a badge, and you can review the course first.')}`, footer: due ? stepFooter({ label: 'Start retention check', action: 'start-retention' }, { label: 'Not now', action: 'discover' }) : stepFooter({ label: 'Back to learning home', action: 'discover' }) });
}
function resumeView() {
  shell({ nav: navHeader('Progress saved', 'discover'), body: `${kicker('Progress saved')}${heading('Pick up where you left off')}${lead(`You completed ${completedActivities()} of ${totalSteps} activities. Come back whenever you’re ready.`)}${progress(`${lessonsDone()} of ${lessons.length} lessons complete`, coursePercent())}`, footer: stepFooter({ label: 'Resume where you left off', action: 'start' }, { label: 'Back to learning home', action: 'discover' }) });
}
const errors = {
  loading: ['Loading your course', 'Your course and saved progress are being retrieved.', 'Finish loading'],
  timeout: ['This is taking longer than expected', 'We could not finish loading your course. Your saved progress has not changed.', 'Try again'],
  empty: ['No course assigned yet', 'Your available learning will appear here when a course is assigned.', 'Back to course'],
  enrollment: ['We could not open this course', 'Your enrollment could not be confirmed. Try again or return to available learning.', 'Try again'],
  offline: ['You’re offline', 'Reconnect to load the next activity. Your practice progress is saved on this browser.', 'Try again'],
  expired: ['Your session has ended', 'Reopen learning from the Uber app to sign in again. Your saved course progress will be available after sign-in.', 'Back to learning home'],
  denied: ['This course isn’t available', 'Your account does not have access to this course. Return to your available learning.', 'Back to course'],
  unsupported: ['This view isn’t supported', 'Open learning in a supported version of the Uber app.', 'Back to course'],
  media: ['The video couldn’t load', 'Check your connection and try loading the video again.', 'Retry video']
};
function render() {
  stopVideo();
  if (errorState) { const e = errors[errorState]; shell({ nav: navHeader(COURSE_TITLE, 'discover'), bodyClass: 'screen-body--centre', body: emptyState(e[0], e[1]), footer: stepFooter({ label: e[2], action: 'recover' }) }); return; }
  ({ discover: discovery, library: libraryView, 'road-safety': roadSafetyView, 'retention-intro': retentionIntro, overview, intro: courseIntro, assessment, 'assessment-result': assessmentResult, activity, complete: completion, rewards: rewardsView, exit: resumeView, 'course-page': coursePage, 'course-soon': courseSoonView, rate: rateView, 'curriculum-complete': curriculumCompleteView }[view] || discovery)();
}

// ---------- Interaction ----------
root.addEventListener('input', e => { if (e.target.id === 'review') { draftReview = e.target.value; root.querySelector('#review-count').textContent = `${draftReview.length}/120`; return; } if (e.target.id !== 'answer') return; state.responses[`${state.lesson}-${state.step}`] = e.target.value; save(); const check = root.querySelector('[data-action="check"]'); if (check) check.disabled = !e.target.value.trim(); const count = root.querySelector('#count'); if (count) count.textContent = `${e.target.value.length}/300`; });
root.addEventListener('click', e => {
  const el = e.target.closest('button'); if (!el || el.disabled) return;
  if (el.dataset.assessmentChoice !== undefined) { state.assessmentResponses[assessmentMode] ||= []; state.assessmentResponses[assessmentMode][assessmentIndex] = +el.dataset.assessmentChoice; save(); assessment(); return; }
  if (el.dataset.lesson !== undefined) { const i = +el.dataset.lesson; openStep(i, state.started && state.lesson === i ? state.step : 0); return; }
  if (el.dataset.progressTab) { progressTab = el.dataset.progressTab; rewardsView(); return; }
  if (el.dataset.stars) { draftStars = +el.dataset.stars; rateView(); root.querySelector(`[data-stars="${draftStars}"]`)?.focus(); return; }
  if (el.dataset.choice !== undefined) { selected = +el.dataset.choice; activity(); root.querySelector('[data-action="check"]')?.focus(); return; }
  if (el.dataset.card !== undefined) { selected = +el.dataset.card; activity(); root.querySelector('[data-place]')?.focus(); return; }
  if (el.dataset.place !== undefined) { if (selected !== null) { placement[selected] = +el.dataset.place; selected = null; activity(); } return; }
  if (el.dataset.move) { const [i, d] = el.dataset.move.split(',').map(Number); [order[i], order[i + d]] = [order[i + d], order[i]]; activity(); root.querySelector(`[data-move="${i + d},${d}"]`)?.focus(); return; }
  const action = el.dataset.action;
  const go = (next) => { errorState = ''; view = next; render(); };
  if (action === 'discover') go('discover');
  if (action === 'course' || action === 'overview') go('overview');
  if (action === 'rewards') { progressTab = 'progress'; go('rewards'); }
  if (action === 'habit') { progressTab = 'habit'; go('rewards'); }
  if (action === 'library') go('library');
  if (action === 'road-safety') go('road-safety');
  if (action === 'course-page') { if (el.dataset.course) { openCourse = courseById(el.dataset.course); courseFrom = view === 'discover' ? 'discover' : 'library'; } go('course-page'); }
  if (action === 'course-soon') go('course-soon');
  if (action === 'submit-rating' && draftStars) { state.ratings = { ...state.ratings, [openCourse.id]: { stars: draftStars, review: draftReview.trim() } }; save(); go('discover'); }
  if (action === 'badges') { progressTab = 'badges'; go('rewards'); }
  if (action === 'retention-intro') go('retention-intro');
  if (action === 'course-intro') go('intro');
  if (action === 'baseline') { assessmentMode = 'baseline'; assessmentIndex = 0; go('assessment'); }
  if (action === 'final-check') { assessmentMode = 'final'; assessmentIndex = 0; go('assessment'); }
  if (action === 'start-retention' && retentionDue()) { assessmentMode = 'retention'; assessmentIndex = 0; go('assessment'); }
  if (action === 'assessment-next') { const questions = assessments[assessmentMode]; if (assessmentIndex < questions.length - 1) { assessmentIndex++; render(); } else if (assessmentMode === 'baseline') { state.baselineDone = true; save(); openStep(0, 0); } else { const score = scoreOf(assessmentMode); if (assessmentMode === 'retention') state.retentionScore = score; else state.finalCheckScore = score; view = 'assessment-result'; save(); render(); } }
  if (action === 'retry-final') { state.assessmentResponses.final = []; state.finalCheckScore = null; assessmentMode = 'final'; assessmentIndex = 0; view = 'assessment'; save(); render(); }
  if (action === 'retry-retention') { state.assessmentResponses.retention = []; state.retentionScore = null; assessmentMode = 'retention'; assessmentIndex = 0; view = 'assessment'; save(); render(); }
  if (action === 'finish-course') { state.finalCheckDone = true; recordCourseCompletion(state.learningRecord, COURSE_ID); save(); go(earnedBadgeKeys(state.learningRecord).includes(SAFETY.id) ? 'curriculum-complete' : 'complete'); }
  if (action === 'finish-retention') { if (recordRetentionCheck(state.learningRecord, { courseId: COURSE_ID, score: state.retentionScore })) state.retentionCheckDone = true; save(); go('discover'); }
  if (action === 'begin-lessons') openStep(0, 0);
  if (action === 'start') { const cur = currentLesson(); if (cur === null) openStep(0, 0); else openStep(cur, state.lesson === cur ? state.step : 0); }
  if (action === 'review') openStep(0, 0);
  if (action === 'exit') { save(); go('exit'); }
  if (action === 'back') { if (state.step > 0) openStep(state.lesson, state.step - 1); else go('overview'); }
  if (action === 'dropdown') { const list = root.querySelector('#dropdown-options'); list.hidden = !list.hidden; el.setAttribute('aria-expanded', !list.hidden); if (!list.hidden) list.querySelector('button').focus(); }
  if (action === 'retry') { checked = false; activity(); }
  if (action === 'check') {
    const a = lessons[state.lesson].steps[state.step]; checked = true;
    const val = (state.responses[`${state.lesson}-${state.step}`] || '').trim();
    correct = a.type === 'text' || (['choice', 'dropdown'].includes(a.type) && selected === a.answer) || (a.type === 'number' && /^\d+$/.test(val) && Number(val) === a.answer) || (a.type === 'drag' && a.answers.every((n, i) => placement[i] === n)) || (a.type === 'sort' && order.every((n, i) => n === a.answer[i]));
    activity(); root.querySelector('#feedback')?.scrollIntoView?.({ block: 'nearest' });
  }
  if (action === 'next') { const step = lessons[state.lesson].steps[state.step]; recordActivity(state.learningRecord, { courseId: COURSE_ID, activityId: `${state.lesson}.${state.step}`, type: step.type, correct }); if (state.step < lessons[state.lesson].steps.length - 1) openStep(state.lesson, state.step + 1); else { if (!state.completed.includes(state.lesson)) state.completed.push(state.lesson); save(); go('complete'); } }
  if (action === 'next-lesson') { const next = currentLesson(); if (next !== null) openStep(next, 0); }
  if (action === 'captions') { const c = root.querySelector('#captions'); c.hidden = !c.hidden; root.querySelectorAll('[data-action="captions"]').forEach(b => b.setAttribute('aria-pressed', !c.hidden)); const pill = root.querySelector('.pill[data-action="captions"]'); if (pill) pill.textContent = c.hidden ? 'CC off' : 'CC on'; }
  if (action === 'fullscreen') { const player = el.closest('.video-player'); if (document.fullscreenElement) document.exitFullscreen?.(); else player?.requestFullscreen?.(); }
  if (action === 'recover') { const wasMedia = errorState === 'media'; errorState = ''; if (wasMedia) openStep(state.lesson, state.step); else go('overview'); }
  if (action === 'play') {
    const title = lessons[state.lesson].steps[state.step].title;
    const setControl = (mode) => { el.innerHTML = icon(mode === 'pause' ? 'player_pause' : mode === 'replay' ? 'arrow_counter_clockwise' : 'player_play'); el.setAttribute('aria-label', `${mode === 'pause' ? 'Pause' : mode === 'replay' ? 'Replay' : 'Play'} ${title}`); root.querySelector('.video-player__title').hidden = mode === 'pause'; };
    if (playing) { stopVideo(); setControl('play'); return; }
    if (watched) { tick = 0; watched = false; }
    playing = true; setControl('pause'); root.querySelector('[data-action="next"]').disabled = true;
    const media = videoMeta[state.lesson];
    timer = setInterval(() => { tick++; const time = root.querySelector('#video-time'), bar = root.querySelector('#video-progress'); if (!time) return stopVideo(); const current = Math.min(media.duration, Math.round(media.duration * tick / 12)); time.textContent = `${Math.floor(current / 60)}:${String(current % 60).padStart(2, '0')} / ${media.runtime}`; if (bar) bar.style.width = `${Math.min(100, tick / 12 * 100)}%`; if (tick >= 12) { stopVideo(); watched = true; activity(); } }, 1000);
  }
});
root.addEventListener('keydown', e => { const list = root.querySelector('#dropdown-options'); if (!list || list.hidden) return; const opts = [...list.querySelectorAll('button')]; const i = opts.indexOf(document.activeElement); if (e.key === 'Escape') { list.hidden = true; const trigger = root.querySelector('[data-action="dropdown"]'); trigger.setAttribute('aria-expanded', 'false'); trigger.focus(); } if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) { e.preventDefault(); opts[e.key === 'Home' ? 0 : e.key === 'End' ? opts.length - 1 : (i + (e.key === 'ArrowDown' ? 1 : -1) + opts.length) % opts.length].focus(); } });
root.addEventListener('dragstart', e => { const el = e.target.closest('[data-card],[data-sort]'); if (!el || checked) return; dragged = { type: el.dataset.card !== undefined ? 'card' : 'sort', index: +(el.dataset.card ?? el.dataset.sort) }; el.classList.add(dragged.type === 'card' ? 'is-selected' : 'is-dragging'); e.dataTransfer.setData('text/plain', String(dragged.index)); });
root.addEventListener('dragover', e => { const target = e.target.closest('[data-zone],[data-sort]'); if (target) { e.preventDefault(); root.querySelectorAll('.is-drag-over').forEach(item => item.classList.remove('is-drag-over')); target.classList.add('is-drag-over'); } });
root.addEventListener('dragleave', e => { e.target.closest('[data-zone],[data-sort]')?.classList.remove('is-drag-over'); });
root.addEventListener('dragend', () => { root.querySelectorAll('.is-dragging,.is-drag-over').forEach(item => item.classList.remove('is-dragging', 'is-drag-over')); });
root.addEventListener('drop', e => { const zone = e.target.closest('[data-zone]'), row = e.target.closest('[data-sort]'); if (!dragged) return; e.preventDefault(); if (zone && dragged.type === 'card') placement[dragged.index] = +zone.dataset.zone; if (row && dragged.type === 'sort') { const [item] = order.splice(dragged.index, 1); order.splice(+row.dataset.sort, 0, item); } dragged = null; selected = null; activity(); });

// ---------- Prepared states, one per Figma screen ----------
// Dates are real, so the weekly goal, streak and standing are computed by
// gamification.js rather than typed in: two goal weeks behind the learner,
// one learning day so far this week.
function weekStart(weeksAgo, day, hour = 10) { const d = new Date(); d.setHours(hour, 0, 0, 0); d.setDate(d.getDate() - (d.getDay() + 6) % 7 - weeksAgo * 7 + day); return d.toISOString(); }
function recordLesson(record, i, dates) {
  lessons[i].steps.forEach((step, s) => recordActivity(record, { courseId: COURSE_ID, activityId: `${i}.${s}`, type: step.type, correct: true, completedAt: dates[Math.min(s, dates.length - 1)] }));
}
const lessonDates = (w, now) => [[w(2, 0), w(2, 0), w(2, 1), w(2, 1), w(2, 1)], [w(1, 0), w(1, 1), now, now], [w(1, 2)], [w(1, 3)], [w(1, 4)], [now], [now]];
function seedLessons(n, weeksBack = 0) {
  state = freshState();
  const w = (k, d) => weekStart(k + weeksBack, d);
  const now = new Date(Date.now() - weeksBack * 7 * 86400000).toISOString();
  state.learningRecord = createLearningRecord(weekStart(2 + weeksBack, 0, 9));
  state.baselineDone = true; state.started = true;
  state.assessmentResponses.baseline = [1, 0, 0, 0, 0];
  const dates = lessonDates(w, now);
  for (let i = 0; i < n; i++) recordLesson(state.learningRecord, i, dates[i]);
  state.completed = lessons.slice(0, n).map((_, i) => i);
  state.lesson = Math.min(n, lessons.length - 1);
  state.step = n >= lessons.length ? lessons.at(-1).steps.length - 1 : 0;
  return now;
}
function seed(stage, { weeksBack = 0 } = {}) {
  if (stage === 'mid-course') { seedLessons(2); return; }
  const now = seedLessons(lessons.length, weeksBack);
  state.assessmentResponses.final = assessments.final.map(q => q.answer); state.finalCheckScore = 5;
  if (stage === 'lessons-done') return;
  state.finalCheckDone = true;
  recordCourseCompletion(state.learningRecord, COURSE_ID, now);
}
const demos = {
  correct: () => { selected = lessons[state.lesson].steps[state.step].answer; checked = true; correct = true; },
  incorrect: () => { state.responses[`${state.lesson}-${state.step}`] = '21'; checked = true; correct = false; },
  saved: () => { state.responses[`${state.lesson}-${state.step}`] = 'I can keep conversation respectful and follow the Community Guidelines.'; checked = true; correct = true; },
  matching: () => { placement = { 0: 0 }; selected = 1; }
};
function applyPreview(name, params = new URLSearchParams()) {
  previewing = true; errorState = ''; resetActivity(); draftStars = 0; draftReview = '';
  const lesson = Number(params.get('lesson')), step = Number(params.get('step'));
  if (name === 'discover') { state = freshState(); view = 'discover'; }
  else if (name === 'library') { seed('mid-course'); view = 'library'; }
  else if (name === 'road-safety') { state = freshState(); view = 'road-safety'; }
  else if (name === 'overview') { seed(params.get('stage') === 'complete' ? 'complete' : 'mid-course'); view = 'overview'; }
  else if (name === 'intro') { state = freshState(); view = 'intro'; }
  else if (name === 'resume') { seed('mid-course'); view = 'exit'; }
  else if (name === 'baseline') { state = freshState(); assessmentMode = 'baseline'; assessmentIndex = Math.min(4, Math.max(0, Number(params.get('question')) || 0)); if (params.get('demo') === 'selected') state.assessmentResponses.baseline[assessmentIndex] = 1; view = 'assessment'; }
  else if (name === 'final-check') { seed('lessons-done'); state.assessmentResponses.final = []; assessmentMode = 'final'; assessmentIndex = 0; view = 'assessment'; }
  else if (name === 'final-result') { seed('lessons-done'); assessmentMode = 'final'; view = 'assessment-result'; }
  else if (name === 'activity' && lessons[lesson]?.steps[step]) { seedLessons(lesson); state.lesson = lesson; state.step = step; view = 'activity'; demos[params.get('demo')]?.(); }
  else if (name === 'lesson-complete' && lessons[lesson]) { seedLessons(lesson + 1); state.lesson = lesson; state.step = lessons[lesson].steps.length - 1; view = 'complete'; }
  else if (name === 'complete') { seed('complete'); view = 'complete'; }
  else if (name === 'retention') { seed('complete', { weeksBack: 5 }); view = 'retention-intro'; }
  else if (name === 'rewards') { seed('mid-course'); progressTab = params.get('tab') || 'progress'; view = 'rewards'; }
  else if (name === 'offline') { seed('mid-course'); errorState = 'offline'; }
  else if (name === 'course' || name === 'rate') {
    const course = courseByNumber(params.get('id')) || courseByNumber(5);
    if (course.id === COURSE_ID) return applyPreview('overview', params);
    if (course.external) return applyPreview('road-safety', params);
    state = freshState(); openCourse = course; courseFrom = 'library'; view = name === 'course' ? 'course-page' : 'rate';
    if (name === 'rate') { recordCourseCompletion(state.learningRecord, course.id, new Date().toISOString(), false); draftStars = params.has('stars') ? Math.min(5, Math.max(0, Number(params.get('stars')) || 0)) : 4; draftReview = draftStars ? 'Clear and quick. Worth doing before a shift.' : ''; }
  }
  else if (name === 'curriculum-complete') { seed('complete'); for (const id of SAFETY.courses.slice(1)) recordCourseCompletion(state.learningRecord, id, new Date().toISOString(), false); view = 'curriculum-complete'; }
  else { previewing = false; return false; }
  return true;
}

// Review panel: every prepared state, plus each activity and recovery state.
const panel = document.querySelector('#review-panel');
const figmaScreens = [['discover', 'Learning home'], ['library', 'Course library'], ['road-safety', 'Road safety'], ['overview', 'Course details'], ['overview', 'Course details · complete', 'stage=complete'], ['intro', 'Course introduction'], ['resume', 'Save and resume'], ['baseline', 'Knowledge check question', 'demo=selected'], ['final-result', 'Check result · final'], ['lesson-complete', 'Lesson complete', 'lesson=1'], ['complete', 'Course complete'], ['course', 'Course details · optional', 'id=5'], ['rate', 'Rate this course', 'id=5'], ['curriculum-complete', 'Curriculum complete'], ['retention', 'Retention invite'], ['rewards', 'Learning progress · Progress', 'tab=progress'], ['rewards', 'Learning progress · Habit', 'tab=habit'], ['rewards', 'Learning progress · Badges', 'tab=badges'], ['rewards', 'Learning progress · Standing', 'tab=standing'], ['offline', 'System state · offline']];
panel.innerHTML = `<h2>Figma screens</h2>${figmaScreens.map(([p, label, q]) => `<button data-preview="${p}" data-query="${q || ''}">${label}</button>`).join('')}<h2>Every activity</h2>${lessons.map((l, n) => l.steps.map((a, s) => `<button data-preview="activity" data-query="lesson=${n}&step=${s}">${n + 1}.${s + 1} ${a.type} · ${esc(a.title)}</button>`).join('')).join('')}<h2>Recovery states</h2>${Object.keys(errors).map(k => `<button data-error="${k}">${errors[k][0]}</button>`).join('')}<h2>Prototype controls</h2><button data-reset>Reset local progress</button>`;
document.querySelector('#review-toggle').addEventListener('click', e => { panel.hidden = !panel.hidden; e.target.setAttribute('aria-expanded', !panel.hidden); });
panel.addEventListener('click', e => {
  const el = e.target.closest('button'); if (!el) return;
  if (el.dataset.error) { errorState = el.dataset.error; render(); return; }
  if (el.dataset.reset !== undefined) { previewing = false; state = freshState(); save(); view = 'discover'; errorState = ''; render(); return; }
  applyPreview(el.dataset.preview, new URLSearchParams(el.dataset.query)); render();
});

const params = new URLSearchParams(location.search);
if (params.get('review') === '1') document.body.classList.add('review-mode');
if (params.get('capture') === '1') document.body.classList.add('capture-only');
if (params.get('preview')) applyPreview(params.get('preview'), params);
render();
