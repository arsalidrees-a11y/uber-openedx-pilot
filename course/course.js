import { createLearningRecord, recordStep, recordLesson, lessonAward, recordCourseCompletion, recordRetentionCheck, pointsTotal, coursePoints, awardBadges, badgeEarned, earnedBadgeKeys, nextCelebration, markCelebrated, retentionOpensAt, habitSummary, leaderboard, lessonMinutes, QUESTION_TYPES, BADGES } from './gamification.js';
import { courseByNumber, courseById, requiredCourses, optionalCourses } from './catalog.js';
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
// v4: the learning record changed shape on 2026-10-02 (points per lesson,
// curriculum badges), so progress saved by v3 starts fresh.
const KEY = `uber-us-mandatory-course-${variant.toLowerCase()}-v4`;
const COURSE_ID = 'sexual-misconduct';
const COURSE_TITLE = 'Sexual misconduct education';
const freshState = () => ({ lesson: 0, step: 0, completed: [], started: false, baselineDone: false, finalCheckDone: false, finalCheckScore: null, retentionCheckDone: false, retentionScore: null, responses: {}, answers: {}, newCurriculum: false, assessmentResponses: { baseline: [], final: [], retention: [] }, learningRecord: createLearningRecord() });
let state = freshState();
try { const saved = JSON.parse(localStorage.getItem(KEY)); if (saved && Array.isArray(saved.completed) && saved.learningRecord?.version === 2 && saved.lesson >= 0 && saved.lesson < lessons.length && saved.step >= 0 && saved.step < lessons[saved.lesson].steps.length) state = { ...state, ...saved }; } catch {}
let view = 'discover', progressTab = 'points', progressFrom = 'discover', errorState = '', selected = null, checked = false, correct = false, placement = {}, order = [0, 1, 2], dragged = null, watched = false, playing = false, tick = 0, timer, assessmentMode = 'baseline', assessmentIndex = 0;
// The points the lesson just finished paid (null when it was a repeat).
let lastAward = null;
// The optional course on screen and where its page was opened from.
let openCourse = courseByNumber(2), courseFrom = 'library';
// All courses filters: values within a group are alternatives (OR); Status and
// Type combine (AND). The sheet edits a draft until "Show N courses" applies it.
let filters = { status: [], type: [] }, draft = null, sheetOpen = false;
// A preview shows a prepared state for review. It never writes over the
// learner's saved progress: save() is off until the prototype is reset.
let previewing = false;
const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const record = () => state.learningRecord;
const stepsText = (n) => `${n} steps · ${lessonMinutes(n)} min`;
const courseMinutes = lessons.reduce((sum, lesson) => sum + lessonMinutes(lesson.steps.length), 0);
const questionsIn = (lesson) => lesson.steps.filter(step => QUESTION_TYPES.has(step.type)).length;
const longDate = (iso) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
const ordinal = (n) => `${n}${[, 'st', 'nd', 'rd'][n % 100 >> 3 ^ 1 && n % 10] || 'th'}`;

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
const learningPoints = () => pointsTotal(record());
const courseComplete = (id) => id === COURSE_ID ? courseStatus() === 'complete' : Boolean(record().courses[id]?.completedAt);
const allRequiredDone = () => requiredCourses().every(course => courseComplete(course.id));
// A driver's curriculum is the set of required courses Flow assigns them.
function curriculum() {
  const courses = requiredCourses();
  const lessonsTotal = courses.reduce((n, c) => n + (c.id === COURSE_ID ? lessons.length : c.lessonCount), 0);
  const done = courses.reduce((n, c) => n + (c.id === COURSE_ID ? lessonsDone() : courseComplete(c.id) ? c.lessonCount : 0), 0);
  return { lessonsDone: done, lessonsTotal, complete: allRequiredDone() };
}
const updateBadges = (now) => awardBadges(record(), curriculum(), now);
const BADGE_ART = { halfway: 'route_flag', complete: 'badge_checkmark', retained: 'arrow_counter_clockwise' };
const BADGE_COPY = {
  halfway: 'You’ve finished half of your required lessons. Keep going at your own pace.',
  complete: 'You’ve finished every required course and its final check.',
  retained: 'You passed your 30-day check. What you learned stayed with you.'
};
function badgeStates() {
  const c = curriculum(), need = Math.ceil(c.lessonsTotal / 2), opens = retentionOpensAt(record());
  return BADGES.map(b => {
    const earned = badgeEarned(record(), b.key);
    if (earned) return { ...b, state: 'earned', detail: `Earned ${longDate(earned.earnedAt)}` };
    if (b.key === 'halfway') return { ...b, state: 'progress', done: c.lessonsDone, need, detail: `${c.lessonsDone} of ${need} lessons · ${need - c.lessonsDone} to go` };
    if (b.key === 'complete') return { ...b, state: 'locked', detail: 'Finish every required course and its final check' };
    return { ...b, state: 'locked', detail: opens ? `Your 30-day check opens on ${longDate(opens)}` : 'Pass the 30-day check. It opens 30 days after Complete.' };
  });
}
const earnedBadgeCount = () => earnedBadgeKeys(record()).length;
function retentionDue() { const opens = retentionOpensAt(record()); return Boolean(opens && Date.now() >= new Date(opens).getTime()) && !badgeEarned(record(), 'retained'); }
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
function navHeader(title, back, close = false, leading = 'arrow_left') {
  const label = leading === 'x' ? 'Close' : 'Back';
  return `<nav class="nav-header"><button class="nav-header__action" data-action="${back}" aria-label="${label}">${icon(leading)}</button><span class="nav-header__title u-label-large">${esc(title)}</span>${close ? `<button class="nav-header__action" data-action="exit" aria-label="Save and exit">${icon('x')}</button>` : '<span aria-hidden="true"></span>'}</nav>`;
}
function stepFooter(primary, secondary = null, dots = null) {
  const pageDots = dots ? `<div class="page-dots" role="progressbar" aria-label="Activity ${dots[1] + 1} of ${dots[0]}" aria-valuemin="1" aria-valuemax="${dots[0]}" aria-valuenow="${dots[1] + 1}">${Array.from({ length: dots[0] }, (_, i) => `<i class="${i < dots[1] ? 'is-done' : i === dots[1] ? 'is-current' : ''}"></i>`).join('')}</div>` : '';
  const btn = (b, cls) => `<button class="btn ${cls} u-label-large" data-action="${b.action}"${b.tab ? ` data-tab="${b.tab}"` : ''} ${b.disabled ? 'disabled' : ''}>${esc(b.label)}</button>`;
  return `<footer class="step-footer">${pageDots}${btn(primary, 'btn--primary')}${secondary ? btn(secondary, 'btn--tertiary') : ''}</footer>`;
}
const bar = (pct, label) => `<div class="progress__bar" role="progressbar" aria-label="${esc(label)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}"><span style="width:${pct}%"></span></div>`;
function progress(label, pct, right = `${pct}%`) {
  return `<div class="progress"><div class="progress__label"><span class="u-label-small">${esc(label)}</span><b class="u-mono-label-small">${right}</b></div>${bar(pct, label)}</div>`;
}
function ring(done, total, complete) {
  const r = 22, c = 2 * Math.PI * r, pct = complete ? 1 : done / total;
  return `<span class="ring${complete ? ' is-complete' : ''}" role="img" aria-label="${done} of ${total} lessons complete"><svg viewBox="0 0 48 48" aria-hidden="true"><circle class="ring__track" cx="24" cy="24" r="${r}"/>${pct ? `<circle class="ring__value" cx="24" cy="24" r="${r}" stroke-dasharray="${(pct * c).toFixed(2)} ${c.toFixed(2)}" transform="rotate(-90 24 24)"/>` : ''}</svg>${complete ? icon('checkmark') : `<b class="u-label-small" aria-hidden="true">${done}/${total}</b>`}</span>`;
}
function courseCard({ kicker, title, description, done, total, complete = false, action, course = '' }) {
  return `<button class="course-card" data-action="${action}"${course ? ` data-course="${course}"` : ''}><span class="course-card__body"><span class="u-label-x-small c-secondary">${esc(kicker)}</span><span class="u-label-large c-primary">${esc(title)}</span><span class="u-paragraph-small c-secondary">${esc(description)}</span></span>${ring(done, total, complete)}</button>`;
}
// Learning / Badge row: art, name, what it takes; In progress adds a bar.
function badgeRow(b, art = BADGE_ART[b.key]) {
  const meter = b.state === 'progress' ? bar(Math.round(b.done / b.need * 100), `${b.name} progress`) : '';
  return `<div class="badge-row is-${b.state === 'progress' ? 'in-progress' : b.state}"><span class="badge-row__art">${icon(art)}</span><span class="badge-row__body"><b class="badge-row__name u-label-large">${esc(b.name)}</b><small class="u-paragraph-small c-tertiary">${esc(b.detail)}</small>${meter}</span></div>`;
}
// Learning / Badge medal: Halfway, Complete, Retained; earned or locked.
function badgeMedal(b, size = 'small') {
  return `<span class="badge-medal badge-medal--${size}${b.state === 'earned' ? ' is-earned' : ''}" aria-hidden="true">${icon(BADGE_ART[b.key])}</span>`;
}
function sectionTitle(title, trailing = '') { return `<div class="section-title"><h2 class="u-heading-small">${esc(title)}</h2>${trailing}</div>`; }
const trailing = (text) => `<span class="u-paragraph-small c-secondary">${esc(text)}</span>`;
function milestone({ kicker = '', title, body, next = false, action = '' }) {
  const tag = action ? 'button' : 'div';
  return `<${tag} class="milestone${next ? ' milestone--next' : ''}"${action ? ` data-action="${action}"` : ''}>${next ? '' : `<span class="mark">${icon('plus')}</span>`}<span class="milestone__body">${kicker ? `<span class="u-label-x-small c-tertiary">${esc(kicker)}</span>` : ''}<span class="u-label-large c-primary">${esc(title)}</span><span class="u-paragraph-small ${next ? 'c-tertiary' : 'c-secondary'}">${esc(body)}</span></span>${next ? `<span class="chevron">${icon('chevron_right_small')}</span>` : ''}</${tag}>`;
}
function checkResult({ kicker, score = '', title, body, result = 'passed' }) {
  return `<section class="check-result check-result--${result}"><p class="u-label-x-small c-tertiary">${esc(kicker)}</p>${score ? `<p class="check-result__score u-mono-heading-medium">${esc(score)}</p>` : ''}<h1 class="u-label-large c-primary">${esc(title)}</h1><p class="u-paragraph-small">${esc(body)}</p></section>`;
}
function note(title, body) { return `<div class="note"><b class="u-label-medium">${esc(title)}</b><p class="u-paragraph-small">${esc(body)}</p></div>`; }
function banner(style, iconName, title, body, action = '') { return `<div class="banner banner--${style}"><span class="banner__art">${icon(iconName)}</span><div class="banner__text"><b class="u-label-medium">${esc(title)}</b><p class="u-paragraph-medium">${esc(body)}</p></div>${action}</div>`; }
// Learning / Stat chip: points, week streak and badges in the home header.
function statChips() {
  const habit = habitSummary(record());
  const chip = (tab, iconName, value, label) => `<button class="stat-chip" data-action="progress" data-tab="${tab}" aria-label="${esc(label)}">${icon(iconName)}<span class="u-label-small">${esc(value)}</span></button>`;
  return `<div class="stat-chips">${chip('points', 'lightning', learningPoints(), `Points: ${learningPoints()}`)}${chip('streak', 'calendar', habit.weekStreak, `Week streak: ${habit.weekStreak}`)}${chip('badges', 'badge_checkmark', `${earnedBadgeCount()}/3`, `Badges: ${earnedBadgeCount()} of 3`)}</div>`;
}
// Learning / Thumbnail: a placeholder until Uber supplies course images.
const thumbnail = (size) => `<span class="thumbnail thumbnail--${size}" aria-hidden="true">${icon('shield_check')}</span>`;
// Learning / Stat tile: a plain figure and what it counts. No praise labels.
const statTile = (value, label) => `<div class="stat-tile"><b class="u-heading-medium c-primary">${esc(value)}</b><span class="u-paragraph-small c-secondary">${esc(label)}</span></div>`;
const statTiles = (...tiles) => `<div class="stat-tiles">${tiles.join('')}</div>`;
// Learning / Continue card: the one next thing to do, with lesson length.
function continueCard() {
  const status = courseStatus();
  if (status === 'complete') {
    const next = requiredCourses().find(course => !courseComplete(course.id));
    if (!next) return '';
    return continueCardMarkup({ kicker: `Start · Lesson 1 of ${next.lessonCount}`, title: next.title, meta: `${next.title} · ${stepsText(4)}`, label: 'Start', action: 'course-page', course: next.id });
  }
  if (status === 'final-pending') return continueCardMarkup({ kicker: 'Next · Final knowledge check', title: 'Final knowledge check', meta: `${COURSE_TITLE} · 5 questions · about 3 min`, pct: 100, done: lessons.length, label: 'Start check', action: 'final-check' });
  const cur = currentLesson(), lesson = lessons[cur];
  if (status === 'not-started') return continueCardMarkup({ kicker: `Start · Lesson 1 of ${lessons.length}`, title: lesson.title, meta: `${COURSE_TITLE} · ${stepsText(lesson.steps.length)}`, label: 'Start', action: state.baselineDone ? 'start' : 'course-intro' });
  return continueCardMarkup({ kicker: `Continue · Lesson ${cur + 1} of ${lessons.length}`, title: lesson.title, meta: `${COURSE_TITLE} · ${stepsText(lesson.steps.length)}`, pct: coursePercent(), done: lessonsDone(), label: 'Continue', action: 'start' });
}
function continueCardMarkup({ kicker, title, meta, pct = null, done = 0, label, action, course = '' }) {
  const prog = pct === null ? '' : `<div class="continue-card__progress">${bar(pct, 'Course progress')}<span class="u-label-x-small c-secondary">${done} of ${lessons.length} lessons complete</span></div>`;
  return `<section class="continue-card">${thumbnail('card')}<div class="continue-card__body"><div class="continue-card__info"><span class="u-label-x-small c-secondary">${esc(kicker)}</span><h2 class="u-heading-small c-primary">${esc(title)}</h2><span class="u-paragraph-small c-secondary">${esc(meta)}</span></div>${prog}<button class="btn btn--primary u-label-large" data-action="${action}"${course ? ` data-course="${course}"` : ''}>${esc(label)}</button></div></section>`;
}
// Learning / Course tile: one course in a home carousel.
function courseTile(course) {
  const done = courseComplete(course.id);
  let state_ = done ? 'complete' : 'not-started', caption, pct = null;
  if (course.id === COURSE_ID && !done && courseStatus() !== 'not-started') { state_ = 'in-progress'; pct = coursePercent(); caption = `${lessonsDone()} of ${lessons.length} lessons`; }
  else caption = done ? 'Complete' : `${course.id === COURSE_ID ? lessons.length : course.lessonCount} lessons`;
  if (state.newCurriculum && course.required) caption = done ? 'Complete · Carried over' : `${caption} · New`;
  const action = course.id === COURSE_ID ? 'data-action="course"' : course.external ? 'data-action="road-safety"' : `data-action="course-page" data-course="${course.id}"`;
  const kicker = course.kicker.replace(/^(Required|Optional) · /, '');
  return `<button class="course-tile is-${state_}" ${action}>${thumbnail('tile')}<span class="course-tile__body"><span class="course-tile__info"><span class="u-label-x-small c-secondary">${esc(kicker)}</span><span class="u-label-medium c-primary">${esc(course.title)}</span></span><span class="course-tile__footer">${pct !== null ? bar(pct, `${course.title} progress`) : ''}<span class="u-label-x-small ${done ? 'c-positive' : 'c-secondary'}">${esc(caption)}</span></span></span></button>`;
}
const carousel = (courses) => `<div class="carousel">${courses.map(courseTile).join('')}</div>`;
// Learning / This week: the week streak goal, two learning days Monday to Sunday.
function thisWeek() {
  const h = habitSummary(record()), n = h.weekStreak;
  let title, body;
  if (allRequiredDone()) { title = 'Streak paused'; body = `Nothing required is left, so your ${n}-week streak is safe. Optional courses still count as learning days.`; }
  else if (h.met) { title = 'Goal met this week'; body = `Your streak grows to ${n + 1} weeks when the week ends.`; }
  else if (h.learningDays) { title = `${h.learningDays} of ${h.goal} learning days`; body = n ? `One more day this week keeps your ${n}-week streak going.` : 'One more day this week starts your week streak.'; }
  else { title = `0 of ${h.goal} learning days`; body = n ? `Learn on ${h.goal} days this week to keep your ${n}-week streak going.` : `Learn on ${h.goal} days this week to start a week streak.`; }
  const letters = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const days = h.days.map((d, i) => { const s = d.learned ? 'learned' : d.today ? 'today' : d.past ? 'missed' : 'upcoming'; return `<span class="day"><span class="day__mark is-${s}">${s === 'learned' ? icon('circle_check_uber') : ''}</span><span class="u-label-x-small ${d.today ? 'c-primary' : 'c-tertiary'}">${letters[i]}</span></span>`; }).join('');
  return `<button class="this-week" data-action="progress" data-tab="streak"><span class="u-label-large c-primary">${esc(title)}</span><span class="this-week__days" role="img" aria-label="${h.learningDays} learning ${h.learningDays === 1 ? 'day' : 'days'} this week">${days}</span><span class="u-paragraph-small c-secondary">${esc(body)}</span></button>`;
}
const streakLabel = () => { const n = habitSummary(record()).weekStreak; return n ? `${n}-week streak` : 'No streak yet'; };
// Learning / Week history: the last eight weeks, newest on the right.
function weekHistory() {
  const h = habitSummary(record());
  const label = (w, i) => i === 7 ? 'Now' : new Date(`${w.start}T12:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
  return `<div class="week-history" role="img" aria-label="Last eight weeks: ${h.weeks.map(w => w.state).join(', ')}"><div class="week-history__weeks">${h.weeks.map(w => `<span class="week-cell is-${w.state}">${w.state === 'met' ? icon('circle_check_uber') : ''}</span>`).join('')}</div><div class="week-history__dates">${h.weeks.map((w, i) => `<span class="u-label-x-small ${i === 7 ? 'c-primary' : 'c-tertiary'}">${label(w, i)}</span>`).join('')}</div></div>`;
}
// Learning / Leaderboard row: You, others under a random name, and a gap.
function leaderboardRow(row) {
  if (row.gap) return '<div class="lb-gap" aria-hidden="true"><i></i><i></i><i></i></div>';
  return `<div class="lb-row${row.you ? ' is-you' : ''}"><span class="lb-row__rank u-label-medium">${row.rank}</span><span class="lb-row__avatar" aria-hidden="true">${icon('person')}</span><span class="lb-row__body"><b class="u-label-medium">${esc(row.name)}</b>${row.done ? '<span class="lb-tag u-label-x-small">All courses done</span>' : ''}</span><b class="u-label-medium c-primary">${row.points}</b></div>`;
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
function emptyState(title, body) { return `<div class="empty"><span class="empty__art">${icon('circle_exclamation_mark')}</span><h1 class="empty__title u-heading-x-small">${esc(title)}</h1><p class="u-paragraph-medium">${esc(body)}</p></div>`; }

function shell({ nav = '', hero = '', body, footer = '', bodyClass = '' }) {
  root.innerHTML = `${nav}${hero}<div class="screen-body ${bodyClass}">${body}</div>${footer}`;
  const title = root.querySelector('h1'); if (title) { title.tabIndex = -1; title.focus({ preventScroll: true }); }
}
const kicker = (text) => `<p class="kicker u-label-x-small">${esc(text)}</p>`;
const heading = (text, cls = 'u-heading-large') => `<h1 class="${cls}">${esc(text)}</h1>`;
const lead = (text) => `<p class="lead u-paragraph-medium">${esc(text)}</p>`;

// ---------- Screens: one function per Figma screen ----------
// The Course card stays in All courses; Learning home uses Course tiles.
function requiredCourseCard({ kicker = 'Required · Safety' } = {}) {
  const status = courseStatus(), cur = currentLesson();
  const description = status === 'not-started' ? '7 lessons' : status === 'complete' ? 'Complete' : status === 'final-pending' ? 'Next: Final check' : `Next: ${lessons[cur].title}`;
  return courseCard({ kicker, title: COURSE_TITLE, description, done: lessonsDone(), total: lessons.length, complete: status === 'complete', action: 'course' });
}
// Every other course in the catalogue. Road safety hands off to its own
// provider; the placeholders open a course page with no content yet.
function catalogCard(course, { kicker = course.kicker } = {}) {
  if (course.id === COURSE_ID) return requiredCourseCard({ kicker });
  const done = courseComplete(course.id);
  return courseCard({ kicker, title: course.title, description: done ? 'Complete' : course.description, done: done ? course.lessonCount : 0, total: course.lessonCount, complete: done, action: course.external ? 'road-safety' : 'course-page', course: course.external ? '' : course.id });
}
const requiredDoneCount = () => requiredCourses().filter(course => courseComplete(course.id)).length;
// Required courses in All courses: there can be several, with a done count.
function requiredSection() {
  const courses = requiredCourses();
  const count = courses.length > 1 ? trailing(`${requiredDoneCount()} of ${courses.length} done`) : '';
  return `${sectionTitle('Required', count)}<div class="stack-8">${courses.map(course => catalogCard(course)).join('')}</div>`;
}
// ---------- All courses: every course available, any time, with filters ----------
const STATUSES = [['not-started', 'Not started'], ['in-progress', 'In progress'], ['completed', 'Completed']];
const TYPES = [['required', 'Required'], ['optional', 'Optional']];
const QUICK_FILTERS = [['type', 'required', 'Required'], ['type', 'optional', 'Optional'], ['status', 'in-progress', 'In progress'], ['status', 'completed', 'Completed']];
const allCourses = () => [...requiredCourses(), ...optionalCourses()];
function courseState(course) {
  if (course.id !== COURSE_ID) return courseComplete(course.id) ? 'completed' : 'not-started';
  const status = courseStatus();
  return status === 'complete' ? 'completed' : status === 'not-started' ? 'not-started' : 'in-progress';
}
const courseType = (course) => course.required ? 'required' : 'optional';
const matchesFilters = (course, f) => (!f.status.length || f.status.includes(courseState(course))) && (!f.type.length || f.type.includes(courseType(course)));
const filterCount = (f) => f.status.length + f.type.length;
const coursesLabel = (n) => `${n} ${n === 1 ? 'course' : 'courses'}`;
const noFilters = () => ({ status: [], type: [] });
// Learning / Filter bar: a Filters chip that opens the sheet, then Base
// selection Tags for one-tap filters (Uber Eats pattern).
function filterBar() {
  const n = filterCount(filters);
  const chip = (attrs, on, label, trail = '') => `<button class="filter-tag${on ? ' is-selected' : ''}" ${attrs}><span class="u-label-medium">${label}</span>${trail}</button>`;
  return `<div class="filter-bar" role="group" aria-label="Filter courses">${chip('data-action="open-filters" aria-haspopup="dialog"', n > 0, n ? `Filters · ${n}` : 'Filters', icon('chevron_down_small'))}${QUICK_FILTERS.map(([group, value, label]) => { const on = filters[group].includes(value); return chip(`data-filter="${group}:${value}" aria-pressed="${on}"`, on, label); }).join('')}</div>`;
}
// Learning / Results line: the count, with Reset once any filter is on.
function resultsLine(count) {
  return `<div class="results-line" role="status"><span class="u-label-medium c-primary">${coursesLabel(count)}</span>${filterCount(filters) ? '<button class="pill-btn u-label-medium" data-action="reset-filters">Reset</button>' : ''}</div>`;
}
// Learning / Filters sheet: checkbox rows with counts; the primary button
// states the live result of the draft.
function filtersSheet() {
  const courses = allCourses();
  const count = (group, value) => courses.filter(course => (group === 'status' ? courseState(course) : courseType(course)) === value).length;
  const row = (group, value, label) => { const on = draft[group].includes(value); return `<button class="check-row" role="checkbox" aria-checked="${on}" data-draft="${group}:${value}"><span class="u-label-medium c-primary">${label} (${count(group, value)})</span><span class="check-box${on ? ' is-checked' : ''}" aria-hidden="true">${on ? icon('checkmark') : ''}</span></button>`; };
  const shown = courses.filter(course => matchesFilters(course, draft)).length;
  return `<button class="sheet-scrim" data-action="close-filters" aria-label="Close filters" tabindex="-1"></button><section class="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title"><header class="sheet__header"><span class="sheet__grabber" aria-hidden="true"></span><h2 id="sheet-title" class="u-heading-x-small" tabindex="-1">Filters</h2></header><h3 class="sheet__heading u-heading-small">Status</h3>${STATUSES.map(([v, l]) => row('status', v, l)).join('')}<hr class="sheet__divider"><h3 class="sheet__heading u-heading-small">Type</h3>${TYPES.map(([v, l]) => row('type', v, l)).join('')}<footer class="sheet__footer"><button class="btn btn--primary u-label-large" data-action="apply-filters">Show ${coursesLabel(shown)}</button><button class="btn btn--tertiary u-label-large" data-action="reset-filters">Reset</button></footer></section>`;
}
// Learning / All courses row: the way in from Learning home.
function allCoursesRow() {
  return `<button class="list-row" data-action="all-courses"><span class="list-row__text"><span class="list-row__body"><b class="u-label-medium c-primary">All courses</b><small class="u-paragraph-small c-secondary">Every course available to you, any time</small></span><span class="u-label-medium c-primary">${allCourses().length}</span></span><span class="list-row__control">${icon('chevron_right_small')}</span></button>`;
}
// Base Banner, positive with a text button: every required course is done.
function caughtUpBanner() {
  const body = earnedBadgeCount() === 3 ? 'You’ve finished your required courses and earned all three badges.' : `Every required course is done. Your 30-day check opens on ${longDate(retentionOpensAt(record()) || new Date().toISOString())}.`;
  return banner('positive', 'circle_check', 'You’re all caught up', body, '<button class="banner__action u-label-medium" data-action="all-courses">All courses</button>');
}
// Base Banner, accent with a dismiss button: a new curriculum, shown once.
function newCurriculumBanner() {
  return banner('accent', 'circle_i', 'New required courses', 'Uber gave you a new set of required courses. Your points, streak and earlier badges stay.', `<button class="banner__dismiss" data-action="dismiss-notice" aria-label="Dismiss">${icon('x')}</button>`);
}
// Required first, unfinished before finished.
const requiredOrdered = () => { const courses = requiredCourses(); return [...courses.filter(c => !courseComplete(c.id)), ...courses.filter(c => courseComplete(c.id))]; };
function discovery() {
  const caughtUp = allRequiredDone();
  const notice = state.newCurriculum ? newCurriculumBanner() : caughtUp ? caughtUpBanner() : '';
  const retention = retentionDue() ? `${sectionTitle('Check what stayed with you', trailing('30 days on'))}${milestone({ kicker: 'No points', title: 'Your 30-day check', body: 'Five questions on your required courses.', next: true, action: 'retention-intro' })}` : '';
  const optional = caughtUp ? `${sectionTitle('Optional courses', trailing(coursesLabel(optionalCourses().length)))}${carousel(optionalCourses())}` : '';
  root.innerHTML = `<header class="discovery-header"><span class="discovery-header__logo" role="img" aria-label="Uber">${icon('uber_logo')}</span>${statChips()}</header><div class="screen-body screen-body--roomy"><h1 class="personal-greeting u-heading-large">${personalGreeting()}</h1>${notice}${caughtUp ? '' : continueCard()}${sectionTitle('Required', trailing(`${requiredDoneCount()} of ${requiredCourses().length} done`))}${carousel(requiredOrdered())}${optional}${retention}${sectionTitle('This week', trailing(streakLabel()))}${thisWeek()}${allCoursesRow()}</div>`;
  const title = root.querySelector('h1'); if (title) { title.tabIndex = -1; title.focus({ preventScroll: true }); }
}
// Badge earned: a calm, one-time screen on the way back to Learning home.
function badgeView() {
  const earned = nextCelebration(record());
  if (!earned) { view = 'discover'; discovery(); return; }
  const b = { ...BADGES.find(x => x.key === earned.key), state: 'earned' };
  shell({ bodyClass: 'screen-body--centre', body: `<div class="celebration">${badgeMedal(b, 'large')}<div class="celebration__words"><p class="u-label-small c-secondary">Badge earned</p><h1 class="u-heading-large c-primary">${esc(b.name)}</h1><p class="u-paragraph-medium c-secondary">${esc(BADGE_COPY[b.key])}</p><p class="u-label-x-small c-tertiary">Earned ${longDate(earned.earnedAt)}</p></div></div>`, footer: stepFooter({ label: 'Continue', action: 'celebrated' }, { label: 'See your badges', action: 'celebrated-badges' }) });
}
function libraryView() {
  const shown = allCourses().filter(course => matchesFilters(course, filters));
  let list;
  if (!filterCount(filters)) list = `<section class="course-group">${requiredSection()}</section><section class="course-group">${sectionTitle('Optional')}${optionalCourses().map(course => catalogCard(course)).join('')}</section>`;
  else if (shown.length) list = `<div class="stack-8">${shown.map(course => catalogCard(course)).join('')}</div>`;
  else list = `<div class="no-results"><h2 class="u-heading-small c-primary">No courses match these filters</h2><p class="u-paragraph-medium c-secondary">Try fewer filters, or clear them to see every course.</p><button class="pill-btn u-label-medium" data-action="reset-filters">Clear filters</button></div>`;
  shell({ nav: navHeader('All courses', 'discover'), body: `${heading('All courses')}${lead('Every course available to you, any time.')}${filterBar()}${resultsLine(shown.length)}${list}`, footer: stepFooter({ label: 'Back to learning home', action: 'discover' }) });
  if (sheetOpen) { root.insertAdjacentHTML('beforeend', filtersSheet()); root.querySelector('#sheet-title').focus({ preventScroll: true }); }
}
function roadSafetyView() {
  shell({ nav: navHeader('Road safety', 'library'), body: `${kicker('Available soon')}${heading('Road safety fundamentals')}${lead('This course is not available yet. We’ll show it here when it is ready.')}${banner('accent', 'circle_i', 'Your learning record stays accurate', 'Road safety doesn’t add points, learning days or badges yet, because its completion is tracked outside this app.')}`, footer: stepFooter({ label: 'Back to all courses', action: 'library' }) });
}
function lessonRow(lesson, i) {
  const status = lessonStatus(i);
  const inLesson = status === 'current' && state.started && state.lesson === i;
  const description = status === 'complete' ? 'Complete' : inLesson ? `In progress · ${state.step + 1} of ${lesson.steps.length}` : stepsText(lesson.steps.length);
  const mark = status === 'complete' ? icon('circle_check') : '<i></i>';
  const content = `<span class="lesson-row__status" aria-hidden="true">${mark}</span><span class="lesson-row__content"><span class="lesson-row__body"><b class="u-label-medium c-primary">${esc(lesson.title)}</b><small class="u-paragraph-small c-secondary">${esc(description)}</small></span>${status === 'upcoming' ? '' : `<span class="chevron">${icon('chevron_right_small')}</span>`}</span>`;
  return status === 'upcoming' ? `<div class="lesson-row is-upcoming" aria-label="${esc(lesson.title)}, not yet available">${content}</div>` : `<button class="lesson-row is-${status}" data-lesson="${i}">${content}</button>`;
}
function overview() {
  const status = courseStatus();
  const groups = [['Foundations', [0, 1]], ['Boundaries', [2, 3, 4]], ['Safe response', [5, 6]]].map(([name, ids]) => `<section class="group"><h2 class="u-heading-small">${name}</h2>${ids.map(i => lessonRow(lessons[i], i)).join('')}</section>`).join('');
  const recordRow = milestone({ kicker: 'Shared across courses', title: 'Your learning record', body: `${coursePoints(record(), COURSE_ID)} points from this course`, next: true, action: 'progress' });
  const primary = { 'not-started': { label: 'Begin course', action: 'course-intro' }, 'in-progress': { label: 'Continue course', action: 'start' }, 'final-pending': { label: 'Complete final check', action: 'final-check' }, complete: { label: 'Review course', action: 'review' } }[status];
  shell({ nav: navHeader('Course details', 'discover'), hero: safetyHero(status === 'complete'), bodyClass: 'screen-body--roomy', body: `${kicker('Required · Safety')}${heading(COURSE_TITLE)}${lead('Practical guidance for respectful boundaries, awareness, and safe reporting.')}${progress(`${lessonsDone()} of ${lessons.length} lessons complete`, coursePercent())}<p class="u-paragraph-small c-tertiary">${lessons.length} lessons · 6 required videos · about ${courseMinutes} min</p>${recordRow}${groups}`, footer: stepFooter(primary) });
}
// Course details for any other course. Only the required course has
// content so far, so every lesson here reads "Content coming soon".
function coursePage() {
  const course = openCourse;
  const lessonRows = Array.from({ length: course.lessonCount }, (_, i) => {
    const content = `<span class="lesson-row__status" aria-hidden="true"><i></i></span><span class="lesson-row__content"><span class="lesson-row__body"><b class="u-label-medium c-primary">Lesson ${i + 1}</b><small class="u-paragraph-small c-secondary">Content coming soon</small></span>${i === 0 ? `<span class="chevron">${icon('chevron_right_small')}</span>` : ''}</span>`;
    return i === 0 ? `<button class="lesson-row is-current" data-action="course-soon">${content}</button>` : `<div class="lesson-row is-upcoming" aria-label="Lesson ${i + 1}, not yet available">${content}</div>`;
  }).join('');
  shell({ nav: navHeader('Course details', courseFrom), bodyClass: 'screen-body--roomy', body: `${kicker(course.kicker)}${heading(course.title)}${lead('Course description coming soon.')}<p class="u-paragraph-small c-tertiary">${course.lessonCount} lessons · about 20 minutes</p><section class="group"><h2 class="u-heading-small">Lessons</h2>${lessonRows}</section>`, footer: stepFooter({ label: 'Start course', action: 'course-soon' }) });
}
// Starting a placeholder course: the same "not available yet" pattern as
// Road safety, until the course has content.
function courseSoonView() {
  shell({ nav: navHeader(openCourse.title, 'course-page'), body: `${kicker('Content coming soon')}${heading(openCourse.title)}${lead('The lessons for this course are not ready yet. We’ll show them here when they are.')}`, footer: stepFooter({ label: 'Back to course', action: 'course-page' }) });
}
function courseIntro() {
  const steps = [['01', 'Start with a quick check', 'Five questions establish a baseline. They do not add or remove points.'], ['02', 'Learn and practise', 'Watch required videos, make decisions, and review the source guidance.'], ['03', 'Confirm what you learned', 'A five-question final check measures learning gain.']];
  shell({ nav: navHeader('Course introduction', 'overview'), body: `${kicker('Before you begin')}${heading('Learn at your own pace')}${lead('This course includes sensitive topics. Pause whenever you need to; completed progress saves automatically.')}<div>${steps.map(([n, t, d]) => `<div class="intro-step"><span class="u-mono-label-small">${n}</span><div><b class="u-label-medium">${t}</b><p class="u-paragraph-small">${d}</p></div></div>`).join('')}</div>${banner('warning', 'alert', 'Take care of yourself', 'Support and reporting resources remain available throughout the course.')}`, footer: stepFooter(state.baselineDone ? { label: 'Start lesson 1', action: 'begin-lessons' } : { label: 'Begin quick check', action: 'baseline' }, { label: 'Back to course', action: 'overview' }) });
}
const assessmentLabel = () => assessmentMode === 'baseline' ? 'Quick check' : assessmentMode === 'retention' ? '30-day check' : 'Final knowledge check';
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
    shell({ nav: navHeader('30-day check', 'discover'), body: `${checkResult({ kicker: '30-day check', score: `${score} / 5`, title: passed ? 'You retained the key ideas' : 'Worth another look', body: `You answered ${score} of 5 questions correctly. ${passed ? 'Save your result to earn the Retained badge.' : 'Review the missed topics, then try again, as often as you need.'}`, result: passed ? 'passed' : 'retry' })}<p class="u-paragraph-small c-secondary">This check measures retained learning. It does not add points.</p>`, footer: passed ? stepFooter({ label: 'Save result and view badge', action: 'finish-retention' }) : stepFooter({ label: 'Review course', action: 'overview' }, { label: 'Try again', action: 'retry-retention' }) });
    return;
  }
  const score = scoreOf('final'), passed = score >= 4, baseline = scoreOf('baseline');
  shell({ nav: navHeader('Knowledge check result', 'overview'), body: `${checkResult({ kicker: 'Final knowledge check', score: `${score} / 5`, title: passed ? 'Ready to complete' : 'Review, then try again', body: passed ? `You answered ${score} of 5 questions correctly.` : `You answered ${score} of 5 questions correctly. There is no penalty: revisit the lessons, then try again.`, result: passed ? 'passed' : 'retry' })}<div class="gain"><span><small class="u-label-small c-secondary">Before</small><b class="u-mono-heading-medium">${baseline}/5</b></span><span><small class="u-label-small c-secondary">Now</small><b class="u-mono-heading-medium">${score}/5</b></span></div><p class="u-paragraph-small c-secondary">Checks don’t add points. Passing this one counts toward your Complete badge.</p>${passed ? note('Your learning is recorded', 'Your result and course completion are saved to your learning record.') : note('Review these topics', 'Respecting boundaries · Consent and personal space · Safe reporting')}`, footer: stepFooter(passed ? { label: 'Complete course', action: 'finish-course' } : { label: 'Try final check again', action: 'retry-final' }, { label: 'Back to course', action: 'overview' }) });
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
    content = `<div class="video-player${playing ? ' is-playing' : ''}"><div class="video-player__title"${playing ? ' hidden' : ''}><small class="u-label-x-small">${watched ? `${icon('checkmark')}Watched` : 'Required video'}</small><b class="u-heading-x-small">${esc(a.title)}</b></div><div class="video-player__centre"><button class="circle-btn" data-action="play" aria-label="${mode === 'pause' ? 'Pause' : mode === 'replay' ? 'Replay' : 'Play'} ${esc(a.title)}">${icon(mode === 'pause' ? 'player_pause' : mode === 'replay' ? 'arrow_counter_clockwise' : 'player_play')}</button></div><div class="video-player__controls"><div class="video-player__timeline" aria-hidden="true"><span id="video-progress" style="width:${watched ? 100 : 0}%"></span></div><div class="video-player__row"><span id="video-time" class="u-mono-label-x-small">${watched ? media.runtime : '0:00'} / ${media.runtime}</span><span class="video-player__tools"><button data-action="captions" aria-pressed="true" aria-label="Captions">${icon('closed_captioning')}</button><button data-action="fullscreen" aria-label="Enter fullscreen">${icon('arrow_expand')}</button></span></div></div></div><div class="video-controls"><span class="u-label-small">Mandatory video · ${media.runtime}</span><button class="pill u-label-small" data-action="captions" aria-pressed="true">CC on</button></div><p id="captions" class="u-paragraph-medium c-primary">${esc(a.caption)}</p><details class="accordion"><summary><span class="accordion__text"><b class="u-label-medium">What should I look for?</b></span><span class="accordion__control">${icon('chevron_down_small')}</span></summary><p class="accordion__body u-paragraph-small">${esc(a.lookFor)}</p></details><p class="u-paragraph-small c-secondary" id="watch-status">${watched ? 'Video complete. You can continue.' : 'Finish the video to unlock the next step. If you leave now, this video restarts.'}</p>`;
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
    // Right or wrong, the driver sees a short explanation and continues: no
    // retry and no requeue. Only a correct first answer earns the bonus.
    if (checked) content += a.type === 'text' ? feedbackBlock('saved', 'Saved as private practice', a.feedback) : feedbackBlock(correct ? 'correct' : 'incorrect', correct ? 'Correct' : 'Not quite', a.feedback);
    footer = checked ? stepFooter({ label: lastStep ? 'Complete lesson' : 'Continue', action: 'next' }, null, dots) : stepFooter({ label: a.type === 'text' ? 'Save reflection' : 'Check answer', action: 'check', disabled: !ready(a) }, null, dots);
  }
  shell({ nav: navHeader(`Lesson ${state.lesson + 1} of ${lessons.length}`, 'back', true), body: `${activityHeader(activityMode(a.type))}${heading(a.title)}${lead(a.prompt)}${content}`, footer });
}
function ready(a) {
  if (['choice', 'dropdown'].includes(a.type)) return selected !== null;
  if (['text', 'number'].includes(a.type)) return !!(state.responses[`${state.lesson}-${state.step}`] || '').trim();
  if (a.type === 'drag') return Object.keys(placement).length === 3;
  return true;
}
// Lesson results: two plain figures, "+45 points" and "100% correct".
function lessonResults(i) {
  const award = lastAward && lastAward.lessonId === i ? lastAward : null;
  const points = statTile(`+${award ? award.points : 0}`, 'points');
  const accuracy = award && award.questions ? statTile(`${Math.round(award.firstTryCorrect / award.questions * 100)}%`, 'correct') : statTile(`${lessons[i].steps.length}`, 'steps finished');
  return `${statTiles(points, accuracy)}${award ? '' : '<p class="u-paragraph-small c-secondary">Repeating a lesson earns no points.</p>'}`;
}
function completion() {
  const status = courseStatus();
  const back = { label: 'Back to course', action: 'overview' };
  if (status === 'complete') {
    shell({ nav: navHeader(COURSE_TITLE, 'overview'), body: `${checkResult({ kicker: 'Course complete', title: 'You completed the course', body: 'You completed all seven lessons in the United States mandatory safety education.' })}${progress(`${lessons.length} of ${lessons.length} lessons complete`, 100)}${milestone({ title: 'Course contribution recorded', body: `${coursePoints(record(), COURSE_ID)} points from this course are in your total.` })}${note('Your commitment', 'Keep conversations respectful, follow stated boundaries, and report concerns safely.')}`, footer: stepFooter({ label: 'View learning progress', action: 'progress', tab: 'points' }, back) });
    return;
  }
  if (status === 'final-pending') {
    shell({ nav: navHeader(`Lesson ${state.lesson + 1} of ${lessons.length}`, 'overview'), body: `${checkResult({ kicker: 'Lessons complete', title: 'One final check', body: 'You finished all seven lessons. Confirm what you learned to complete the course.' })}${lessonResults(state.lesson)}${progress(`${lessonsDone()} of ${lessons.length} lessons complete`, coursePercent())}${milestone({ kicker: 'Next step', title: 'Final knowledge check', body: 'Five questions · about 3 minutes', next: true, action: 'final-check' })}`, footer: stepFooter({ label: 'Complete final check', action: 'final-check' }, back) });
    return;
  }
  const next = currentLesson();
  shell({ nav: navHeader(`Lesson ${state.lesson + 1} of ${lessons.length}`, 'overview'), body: `${checkResult({ kicker: `Lesson ${state.lesson + 1} complete`, title: lessons[state.lesson].title, body: lessons[state.lesson].summary })}${lessonResults(state.lesson)}${progress(`${lessonsDone()} of ${lessons.length} lessons complete`, coursePercent())}${milestone({ kicker: 'Next lesson', title: lessons[next].title, body: stepsText(lessons[next].steps.length), next: true, action: 'next-lesson' })}`, footer: stepFooter({ label: `Start lesson ${next + 1}`, action: 'next-lesson' }, back) });
}
// Your progress: one full-page sheet; each home chip opens its tab.
const PROGRESS_TABS = [['points', 'Points'], ['streak', 'Streak'], ['badges', 'Badges'], ['leaderboard', 'Leaderboard']];
function contributionRow(title, meta, value, external = false) {
  return `<div class="contribution-row${external ? ' is-external' : ''}"><span class="contribution-row__body"><b class="u-label-medium c-primary">${esc(title)}</b><small class="u-paragraph-small c-tertiary">${esc(meta)}</small></span><b class="contribution-row__value u-mono-label-medium">${esc(value)}</b></div>`;
}
function progressView() {
  const tabBar = `<div class="tabs" role="tablist" aria-label="Your progress">${PROGRESS_TABS.map(([key, label]) => `<button role="tab" data-progress-tab="${key}" aria-selected="${progressTab === key}"><span class="u-label-small">${label}</span></button>`).join('')}</div>`;
  let panel = '';
  if (progressTab === 'points') {
    const last = [...record().lessons].sort((a, b) => a.completedAt.localeCompare(b.completedAt)).at(-1);
    const regional = courseById('regional-safety');
    const rows = `${contributionRow(COURSE_TITLE, `${lessonsDone()} of ${lessons.length} lessons complete`, `+${coursePoints(record(), COURSE_ID)}`)}${contributionRow(regional.title, courseComplete(regional.id) ? 'Complete' : 'Not started', `${coursePoints(record(), regional.id)}`)}${contributionRow('Road safety fundamentals', 'Tracked outside this app, so it adds no points', '—', true)}`;
    panel = `${statTiles(statTile(learningPoints(), 'total points'), statTile(last ? `+${last.points}` : '0', 'from your last lesson'))}<section class="group"><h2 class="u-heading-x-small">By course</h2>${rows}</section><p class="u-paragraph-small c-secondary">Finish a lesson for the first time to earn 10 points for each step, plus 5 for each question you get right on the first try. Repeats and checks add nothing, and points are never taken away.</p>`;
  } else if (progressTab === 'streak') {
    const h = habitSummary(record()), weeks = (n) => `${n} ${n === 1 ? 'week' : 'weeks'}`;
    panel = `${statTiles(statTile(weeks(h.weekStreak), 'current streak'), statTile(weeks(h.longestStreak), 'longest streak'))}${thisWeek()}<p class="u-label-large c-primary">Last 8 weeks</p>${weekHistory()}<p class="u-paragraph-small c-secondary">Learn on 2 days a week, Monday to Sunday, to keep your streak. Optional courses count too. One missed week in any eight is forgiven (the outlined week); a second one starts your streak again. If nothing required is left, your streak pauses.</p>`;
  } else if (progressTab === 'badges') {
    const badges = badgeStates();
    panel = `<p class="lead u-paragraph-medium">Three badges for your required courses, earned in order. They’re never taken away.</p><div class="badge-shelf">${badges.map(b => `<span class="badge-shelf__item">${badgeMedal(b)}<span class="u-label-small c-secondary">${esc(b.name)}</span></span>`).join('')}</div><div>${badges.map(b => badgeRow(b)).join('')}</div>${retentionDue() ? '<button class="btn btn--primary u-label-large" data-action="retention-intro">Take your 30-day check</button>' : ''}`;
  } else {
    const board = leaderboard(record(), undefined, { done: allRequiredDone() && optionalCourses().every(c => courseComplete(c.id)) });
    const totals = board.rank ? statTiles(statTile(ordinal(board.rank), 'your rank'), statTile(learningPoints(), 'your points')) : '<p class="u-paragraph-medium c-secondary">Finish a lesson to join your group’s leaderboard.</p>';
    panel = `<p class="u-label-x-small c-secondary">${esc(board.city)} · Started learning in ${esc(board.month)} · ${board.size} drivers</p>${totals}<div class="leaderboard">${board.rows.map(leaderboardRow).join('')}</div><p class="u-paragraph-small c-tertiary">Ranked by total points among drivers in your city who started learning the same month. Other drivers’ names are hidden, and drivers with no points yet aren’t listed. Points never reset.</p>`;
  }
  shell({ nav: navHeader('Your progress', 'close-progress', false, 'x'), body: `${tabBar}${panel}`, footer: stepFooter({ label: 'Continue learning', action: 'continue-learning' }) });
}
function retentionIntro() {
  const due = retentionDue(), opens = retentionOpensAt(record());
  const retained = badgeStates().find(b => b.key === 'retained');
  shell({ nav: navHeader('30-day check', 'discover'), body: `${kicker('30-day check · No points')}${heading(due ? 'Still with you?' : 'Come back in 30 days')}${lead(due ? 'Five questions check what stayed with you from your required courses.' : `Your 30-day check opens ${opens ? `on ${longDate(opens)}` : '30 days after you finish your required courses'}.`)}${badgeRow({ ...retained, detail: 'Answer four of five correctly to earn it. If you miss some, review those topics and try again, as often as you need.' }, 'lock')}`, footer: due ? stepFooter({ label: 'Start 30-day check', action: 'start-retention' }, { label: 'Not now', action: 'discover' }) : stepFooter({ label: 'Back to learning home', action: 'discover' }) });
}
function resumeView() {
  const cur = currentLesson();
  shell({ nav: navHeader('Progress saved', 'discover'), body: `${kicker('Progress saved')}${heading('Pick up where you left off')}${lead(`You finished ${lessonsDone()} of ${lessons.length} lessons${cur === null ? '' : `, and lesson ${cur + 1} keeps your place`}. Come back whenever you’re ready.`)}${progress(`${lessonsDone()} of ${lessons.length} lessons complete`, coursePercent())}`, footer: stepFooter({ label: 'Resume where you left off', action: 'start' }, { label: 'Back to learning home', action: 'discover' }) });
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
  // A newly earned badge is celebrated once, on the way back to Learning home.
  if (view === 'discover' && nextCelebration(record())) view = 'badge';
  ({ discover: discovery, badge: badgeView, library: libraryView, 'road-safety': roadSafetyView, 'retention-intro': retentionIntro, overview, intro: courseIntro, assessment, 'assessment-result': assessmentResult, activity, complete: completion, progress: progressView, exit: resumeView, 'course-page': coursePage, 'course-soon': courseSoonView }[view] || discovery)();
}

// ---------- Interaction ----------
function finishLesson() {
  const i = state.lesson, lesson = lessons[i];
  const questions = lesson.steps.map((step, s) => QUESTION_TYPES.has(step.type) ? s : null).filter(s => s !== null);
  const firstTryCorrect = questions.filter(s => state.answers[`${i}.${s}`] === true).length;
  lastAward = recordLesson(record(), { courseId: COURSE_ID, lessonId: i, steps: lesson.steps.length, questions: questions.length, firstTryCorrect });
  if (!state.completed.includes(i)) state.completed.push(i);
  updateBadges();
}
root.addEventListener('input', e => { if (e.target.id !== 'answer') return; state.responses[`${state.lesson}-${state.step}`] = e.target.value; save(); const check = root.querySelector('[data-action="check"]'); if (check) check.disabled = !e.target.value.trim(); const count = root.querySelector('#count'); if (count) count.textContent = `${e.target.value.length}/300`; });
root.addEventListener('click', e => {
  const el = e.target.closest('button'); if (!el || el.disabled) return;
  if (el.dataset.assessmentChoice !== undefined) { state.assessmentResponses[assessmentMode] ||= []; state.assessmentResponses[assessmentMode][assessmentIndex] = +el.dataset.assessmentChoice; save(); assessment(); return; }
  if (el.dataset.lesson !== undefined) { const i = +el.dataset.lesson; openStep(i, state.started && state.lesson === i ? state.step : 0); return; }
  if (el.dataset.progressTab) { progressTab = el.dataset.progressTab; progressView(); return; }
  if (el.dataset.filter) { const [group, value] = el.dataset.filter.split(':'); filters = { ...filters, [group]: filters[group].includes(value) ? filters[group].filter(v => v !== value) : [...filters[group], value] }; libraryView(); root.querySelector(`[data-filter="${el.dataset.filter}"]`)?.focus(); return; }
  if (el.dataset.draft) { const [group, value] = el.dataset.draft.split(':'); draft = { ...draft, [group]: draft[group].includes(value) ? draft[group].filter(v => v !== value) : [...draft[group], value] }; libraryView(); root.querySelector(`[data-draft="${el.dataset.draft}"]`)?.focus(); return; }
  if (el.dataset.choice !== undefined) { selected = +el.dataset.choice; activity(); root.querySelector('[data-action="check"]')?.focus(); return; }
  if (el.dataset.card !== undefined) { selected = +el.dataset.card; activity(); root.querySelector('[data-place]')?.focus(); return; }
  if (el.dataset.place !== undefined) { if (selected !== null) { placement[selected] = +el.dataset.place; selected = null; activity(); } return; }
  if (el.dataset.move) { const [i, d] = el.dataset.move.split(',').map(Number); [order[i], order[i + d]] = [order[i + d], order[i]]; activity(); root.querySelector(`[data-move="${i + d},${d}"]`)?.focus(); return; }
  const action = el.dataset.action;
  const go = (next) => { errorState = ''; if (next !== 'library') sheetOpen = false; view = next; render(); };
  if (action === 'discover') go('discover');
  if (action === 'course' || action === 'overview') go('overview');
  if (action === 'progress') { progressTab = el.dataset.tab || 'points'; progressFrom = view === 'progress' ? progressFrom : view; go('progress'); }
  if (action === 'close-progress') go(['discover', 'overview', 'complete'].includes(progressFrom) ? progressFrom : 'discover');
  if (action === 'continue-learning') { const status = courseStatus(); if (status === 'in-progress') { const cur = currentLesson(); openStep(cur, state.lesson === cur ? state.step : 0); } else if (status === 'final-pending') { assessmentMode = 'final'; assessmentIndex = 0; go('assessment'); } else if (status === 'not-started') go('intro'); else go('discover'); }
  if (action === 'celebrated') { markCelebrated(record()); save(); go('discover'); }
  if (action === 'celebrated-badges') { markCelebrated(record()); save(); progressTab = 'badges'; progressFrom = 'discover'; go('progress'); }
  if (action === 'dismiss-notice') { state.newCurriculum = false; save(); discovery(); }
  if (action === 'library') go('library');
  if (action === 'all-courses') { filters = noFilters(); go('library'); }
  if (action === 'open-filters') { draft = { status: [...filters.status], type: [...filters.type] }; sheetOpen = true; libraryView(); }
  if (action === 'close-filters') { sheetOpen = false; libraryView(); root.querySelector('[data-action="open-filters"]')?.focus(); }
  if (action === 'apply-filters') { filters = draft; sheetOpen = false; libraryView(); }
  if (action === 'reset-filters') { filters = noFilters(); sheetOpen = false; libraryView(); }
  if (action === 'road-safety') go('road-safety');
  if (action === 'course-page') { if (el.dataset.course) { openCourse = courseById(el.dataset.course); courseFrom = view === 'discover' ? 'discover' : 'library'; } go('course-page'); }
  if (action === 'course-soon') go('course-soon');
  if (action === 'retention-intro') go('retention-intro');
  if (action === 'course-intro') go('intro');
  if (action === 'baseline') { assessmentMode = 'baseline'; assessmentIndex = 0; go('assessment'); }
  if (action === 'final-check') { assessmentMode = 'final'; assessmentIndex = 0; go('assessment'); }
  if (action === 'start-retention' && retentionDue()) { assessmentMode = 'retention'; assessmentIndex = 0; go('assessment'); }
  if (action === 'assessment-next') { const questions = assessments[assessmentMode]; if (assessmentIndex < questions.length - 1) { assessmentIndex++; render(); } else if (assessmentMode === 'baseline') { state.baselineDone = true; save(); openStep(0, 0); } else { const score = scoreOf(assessmentMode); if (assessmentMode === 'retention') state.retentionScore = score; else state.finalCheckScore = score; view = 'assessment-result'; save(); render(); } }
  if (action === 'retry-final') { state.assessmentResponses.final = []; state.finalCheckScore = null; assessmentMode = 'final'; assessmentIndex = 0; view = 'assessment'; save(); render(); }
  if (action === 'retry-retention') { state.assessmentResponses.retention = []; state.retentionScore = null; assessmentMode = 'retention'; assessmentIndex = 0; view = 'assessment'; save(); render(); }
  if (action === 'finish-course') { state.finalCheckDone = true; recordCourseCompletion(record(), COURSE_ID); updateBadges(); save(); go('complete'); }
  if (action === 'finish-retention') { if (recordRetentionCheck(record(), { score: state.retentionScore })) { state.retentionCheckDone = true; updateBadges(); } save(); go('discover'); }
  if (action === 'begin-lessons') openStep(0, 0);
  if (action === 'start') { const cur = currentLesson(); if (cur === null) openStep(0, 0); else openStep(cur, state.lesson === cur ? state.step : 0); }
  if (action === 'review') openStep(0, 0);
  if (action === 'exit') { save(); go('exit'); }
  if (action === 'back') { if (state.step > 0) openStep(state.lesson, state.step - 1); else go('overview'); }
  if (action === 'dropdown') { const list = root.querySelector('#dropdown-options'); list.hidden = !list.hidden; el.setAttribute('aria-expanded', !list.hidden); if (!list.hidden) list.querySelector('button').focus(); }
  if (action === 'check') {
    const a = lessons[state.lesson].steps[state.step]; checked = true;
    const val = (state.responses[`${state.lesson}-${state.step}`] || '').trim();
    correct = a.type === 'text' || (['choice', 'dropdown'].includes(a.type) && selected === a.answer) || (a.type === 'number' && /^\d+$/.test(val) && Number(val) === a.answer) || (a.type === 'drag' && a.answers.every((n, i) => placement[i] === n)) || (a.type === 'sort' && order.every((n, i) => n === a.answer[i]));
    // Only the first answer counts toward the bonus.
    const key = `${state.lesson}.${state.step}`;
    if (QUESTION_TYPES.has(a.type) && !(key in state.answers)) { state.answers[key] = correct; save(); }
    activity(); root.querySelector('#feedback')?.scrollIntoView?.({ block: 'nearest' });
  }
  if (action === 'next') {
    recordStep(record(), { courseId: COURSE_ID, stepId: `${state.lesson}.${state.step}` });
    if (state.step < lessons[state.lesson].steps.length - 1) openStep(state.lesson, state.step + 1);
    else { finishLesson(); save(); go('complete'); }
  }
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
    timer = setInterval(() => { tick++; const time = root.querySelector('#video-time'), barEl = root.querySelector('#video-progress'); if (!time) return stopVideo(); const current = Math.min(media.duration, Math.round(media.duration * tick / 12)); time.textContent = `${Math.floor(current / 60)}:${String(current % 60).padStart(2, '0')} / ${media.runtime}`; if (barEl) barEl.style.width = `${Math.min(100, tick / 12 * 100)}%`; if (tick >= 12) { stopVideo(); watched = true; activity(); } }, 1000);
  }
});
root.addEventListener('keydown', e => { if (e.key === 'Escape' && sheetOpen) { sheetOpen = false; libraryView(); root.querySelector('[data-action="open-filters"]')?.focus(); return; } const list = root.querySelector('#dropdown-options'); if (!list || list.hidden) return; const opts = [...list.querySelectorAll('button')]; const i = opts.indexOf(document.activeElement); if (e.key === 'Escape') { list.hidden = true; const trigger = root.querySelector('[data-action="dropdown"]'); trigger.setAttribute('aria-expanded', 'false'); trigger.focus(); } if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) { e.preventDefault(); opts[e.key === 'Home' ? 0 : e.key === 'End' ? opts.length - 1 : (i + (e.key === 'ArrowDown' ? 1 : -1) + opts.length) % opts.length].focus(); } });
root.addEventListener('dragstart', e => { const el = e.target.closest('[data-card],[data-sort]'); if (!el || checked) return; dragged = { type: el.dataset.card !== undefined ? 'card' : 'sort', index: +(el.dataset.card ?? el.dataset.sort) }; el.classList.add(dragged.type === 'card' ? 'is-selected' : 'is-dragging'); e.dataTransfer.setData('text/plain', String(dragged.index)); });
root.addEventListener('dragover', e => { const target = e.target.closest('[data-zone],[data-sort]'); if (target) { e.preventDefault(); root.querySelectorAll('.is-drag-over').forEach(item => item.classList.remove('is-drag-over')); target.classList.add('is-drag-over'); } });
root.addEventListener('dragleave', e => { e.target.closest('[data-zone],[data-sort]')?.classList.remove('is-drag-over'); });
root.addEventListener('dragend', () => { root.querySelectorAll('.is-dragging,.is-drag-over').forEach(item => item.classList.remove('is-dragging', 'is-drag-over')); });
root.addEventListener('drop', e => { const zone = e.target.closest('[data-zone]'), row = e.target.closest('[data-sort]'); if (!dragged) return; e.preventDefault(); if (zone && dragged.type === 'card') placement[dragged.index] = +zone.dataset.zone; if (row && dragged.type === 'sort') { const [item] = order.splice(dragged.index, 1); order.splice(+row.dataset.sort, 0, item); } dragged = null; selected = null; activity(); });

// ---------- Prepared states, one per Figma screen ----------
// Dates are real, so the streak, badges and leaderboard are computed by
// gamification.js rather than typed in. The numbers reproduce the Figma
// screens: 95 points mid-course (lesson 2 paid 45), a 2-week streak with one
// forgiven week, 360 points for the whole course (one first-try miss in
// lesson 7, the "not quite" numeric answer).
function weekStart(weeksAgo, day, hour = 10) { const d = new Date(); d.setHours(hour, 0, 0, 0); d.setDate(d.getDate() - (d.getDay() + 6) % 7 - weeksAgo * 7 + day); return d.toISOString(); }
// Finish lesson i on the given dates (steps spread across them).
function seedLesson(i, dates, { wrong = [] } = {}) {
  const lesson = lessons[i];
  lesson.steps.forEach((step, s) => {
    const at = dates[Math.min(dates.length - 1, Math.floor(s * dates.length / lesson.steps.length))];
    recordStep(record(), { courseId: COURSE_ID, stepId: `${i}.${s}`, completedAt: at });
    if (QUESTION_TYPES.has(step.type)) state.answers[`${i}.${s}`] = !wrong.includes(s);
  });
  const questions = lesson.steps.filter(step => QUESTION_TYPES.has(step.type)).length;
  recordLesson(record(), { courseId: COURSE_ID, lessonId: i, steps: lesson.steps.length, questions, firstTryCorrect: questions - wrong.length, completedAt: dates.at(-1) });
  if (!state.completed.includes(i)) state.completed.push(i);
}
function baseState(assignedWeeksAgo) {
  state = freshState();
  state.learningRecord = createLearningRecord(weekStart(assignedWeeksAgo, 0, 9));
  record().courses['regional-safety'] = { assignedAt: weekStart(assignedWeeksAgo, 0, 9), completedAt: null, eligible: true };
  state.baselineDone = true; state.started = true;
  state.assessmentResponses.baseline = [1, 0, 0, 0, 0];
}
// Mid-course: lesson 1 three weeks ago (two days), nothing two weeks ago
// (forgiven), lesson 2 last week (two days), one step of lesson 3 this Monday.
function seedMidCourse(lessonsToFinish = 2) {
  baseState(3);
  const w = (k, d) => weekStart(k, d);
  const plan = [[w(3, 0), w(3, 1)], [w(1, 0), w(1, 1)], [w(1, 2)], [w(1, 3)], [w(1, 4)], [w(0, 0)], [w(0, 0)]];
  for (let i = 0; i < lessonsToFinish; i++) seedLesson(i, plan[i], { wrong: i === 6 ? [2] : [] });
  if (lessonsToFinish === 2) { recordStep(record(), { courseId: COURSE_ID, stepId: '2.0', completedAt: weekStart(0, 0, 9) }); state.lesson = 2; state.step = 1; }
  else { state.lesson = Math.min(lessonsToFinish, lessons.length - 1); state.step = lessonsToFinish >= lessons.length ? lessons.at(-1).steps.length - 1 : 0; }
  updateBadges(weekStart(0, 0)); markCelebrated(record());
}
// The whole course over three weeks, finished on Tuesday last week. With
// firstWeekDays = 1 the first week falls short, leaving a 2-week streak.
function seedComplete({ weeksBack = 0, firstWeekDays = 2, finalCheck = true } = {}) {
  baseState(3 + weeksBack);
  const w = (k, d) => weekStart(k + weeksBack, d);
  const plan = [[w(3, 0)], [w(3, 0)], [w(3, firstWeekDays === 2 ? 1 : 0)], [w(2, 0)], [w(2, 1)], [w(1, 0)], [w(1, 1)]];
  plan.forEach((dates, i) => seedLesson(i, dates, { wrong: i === 6 ? [2] : [] }));
  state.lesson = lessons.length - 1; state.step = lessons.at(-1).steps.length - 1;
  state.assessmentResponses.final = assessments.final.map(q => q.answer); state.finalCheckScore = 5;
  if (finalCheck) { state.finalCheckDone = true; recordCourseCompletion(record(), COURSE_ID, w(1, 1)); }
  updateBadges(w(1, 1)); markCelebrated(record());
  return w;
}
// Regional safety training has no content yet: its four lessons are seeded
// as finished (4 steps, one question each, all right first time: 45 each).
function seedRegionalDone(at) {
  for (let i = 0; i < 4; i++) recordLesson(record(), { courseId: 'regional-safety', lessonId: i, steps: 4, questions: 1, firstTryCorrect: 1, completedAt: at });
  recordCourseCompletion(record(), 'regional-safety', at);
}
const demos = {
  correct: () => { selected = lessons[state.lesson].steps[state.step].answer; checked = true; correct = true; },
  incorrect: () => { state.responses[`${state.lesson}-${state.step}`] = '21'; checked = true; correct = false; },
  saved: () => { state.responses[`${state.lesson}-${state.step}`] = 'I can keep conversation respectful and follow the Community Guidelines.'; checked = true; correct = true; },
  matching: () => { placement = { 0: 0 }; selected = 1; }
};
const LEGACY_TABS = { progress: 'points', habit: 'streak', standing: 'leaderboard' };
function applyPreview(name, params = new URLSearchParams()) {
  previewing = true; errorState = ''; resetActivity(); filters = noFilters(); sheetOpen = false; lastAward = null;
  const lesson = Number(params.get('lesson')), step = Number(params.get('step'));
  if (name === 'discover') {
    const stage = params.get('stage');
    if (stage === 'new') state = freshState();
    else if (stage === 'new-curriculum') {
      seedComplete({ firstWeekDays: 1 });
      // A new curriculum this week: Regional safety training joins the finished course.
      record().courses['regional-safety'] = { assignedAt: weekStart(0, 0, 8), completedAt: null, eligible: true };
      recordStep(record(), { courseId: COURSE_ID, stepId: 'review.0', completedAt: weekStart(0, 0, 9) });
      state.newCurriculum = true;
    } else if (stage === 'caught-up') {
      const w = seedComplete({ weeksBack: 5 });
      seedRegionalDone(w(1, 2));
      updateBadges(w(1, 2));
      record().retentionChecks.push({ score: 5, completedAt: weekStart(1, 2) });
      updateBadges(weekStart(1, 2)); markCelebrated(record());
    } else seedMidCourse();
    view = 'discover';
  }
  else if (name === 'badge') { seedMidCourse(6); record().badges.forEach(b => { b.celebrated = false; }); view = 'badge'; }
  else if (name === 'library') {
    seedMidCourse(); view = 'library';
    const list = (key, allowed) => (params.get(key) || '').split(',').filter(v => allowed.some(([a]) => a === v));
    filters = { status: list('status', STATUSES), type: list('type', TYPES) };
    sheetOpen = params.get('sheet') === 'filters'; draft = sheetOpen ? { status: [...filters.status], type: [...filters.type] } : null;
  }
  else if (name === 'road-safety') { state = freshState(); view = 'road-safety'; }
  else if (name === 'overview') { if (params.get('stage') === 'complete') seedComplete(); else seedMidCourse(); view = 'overview'; }
  else if (name === 'intro') { state = freshState(); view = 'intro'; }
  else if (name === 'resume') { seedMidCourse(); view = 'exit'; }
  else if (name === 'baseline') { state = freshState(); assessmentMode = 'baseline'; assessmentIndex = Math.min(4, Math.max(0, Number(params.get('question')) || 0)); if (params.get('demo') === 'selected') state.assessmentResponses.baseline[assessmentIndex] = 1; view = 'assessment'; }
  else if (name === 'final-check') { seedComplete({ finalCheck: false }); state.assessmentResponses.final = []; assessmentMode = 'final'; assessmentIndex = 0; view = 'assessment'; }
  else if (name === 'final-result') { seedComplete({ finalCheck: false }); assessmentMode = 'final'; view = 'assessment-result'; }
  else if (name === 'activity' && lessons[lesson]?.steps[step]) { seedMidCourse(lesson); state.lesson = lesson; state.step = step; view = 'activity'; demos[params.get('demo')]?.(); }
  else if (name === 'lesson-complete' && lessons[lesson]) { seedMidCourse(lesson + 1); state.lesson = lesson; state.step = lessons[lesson].steps.length - 1; lastAward = lessonAward(record(), COURSE_ID, lesson); view = 'complete'; }
  else if (name === 'complete') { seedComplete(); view = 'complete'; }
  else if (name === 'retention') { const w = seedComplete({ weeksBack: 5 }); seedRegionalDone(w(1, 2)); updateBadges(w(1, 2)); markCelebrated(record()); view = 'retention-intro'; }
  else if (name === 'progress' || name === 'rewards') { seedMidCourse(); const tab = params.get('tab') || 'points'; progressTab = LEGACY_TABS[tab] || tab; progressFrom = 'discover'; view = 'progress'; }
  else if (name === 'offline') { seedMidCourse(); errorState = 'offline'; }
  else if (name === 'course') {
    const course = courseByNumber(params.get('id')) || courseByNumber(2);
    if (course.id === COURSE_ID) return applyPreview('overview', params);
    if (course.external) return applyPreview('road-safety', params);
    state = freshState(); openCourse = course; courseFrom = 'library'; view = 'course-page';
  }
  else { previewing = false; return false; }
  return true;
}

// Review panel: every prepared state, plus each activity and recovery state.
const panel = document.querySelector('#review-panel');
const figmaScreens = [['discover', 'Learning home'], ['discover', 'Learning home · first visit', 'stage=new'], ['discover', 'Learning home · new curriculum', 'stage=new-curriculum'], ['badge', 'Badge earned · Halfway', 'badge=halfway'], ['discover', 'Learning home · all caught up', 'stage=caught-up'], ['library', 'All courses'], ['library', 'All courses · filters open', 'sheet=filters&status=in-progress&type=required'], ['library', 'All courses · filtered', 'status=in-progress&type=required'], ['library', 'All courses · no results', 'status=completed&type=optional'], ['road-safety', 'Road safety'], ['overview', 'Course details'], ['overview', 'Course details · complete', 'stage=complete'], ['intro', 'Course introduction'], ['resume', 'Save and resume'], ['baseline', 'Knowledge check question', 'demo=selected'], ['final-result', 'Check result · final'], ['lesson-complete', 'Lesson results', 'lesson=1'], ['complete', 'Course complete'], ['course', 'Course details · optional', 'id=2'], ['retention', 'Retention invite'], ['progress', 'Your progress · Points', 'tab=points'], ['progress', 'Your progress · Streak', 'tab=streak'], ['progress', 'Your progress · Badges', 'tab=badges'], ['progress', 'Your progress · Leaderboard', 'tab=leaderboard'], ['offline', 'System state · offline']];
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
