import { createLearningRecord, recordActivity, recordCourseCompletion, recordRetentionCheck, pointsTotal, coursePoints, activityCount, earnedBadgeKeys, habitSummary, demoComparison, COHORT_BANDS, ELIGIBLE_ACTIVITY_TYPES } from './gamification.js';
import { icon } from './icons.js';

// Source: United States Mandatory Sexual Misconduct Education .docx.pdf.
// Screenshots are Version A. This file implements the interactive Version B.
const variant = 'B';
const rainnResources = [
  { label: 'RAINN information and support', href: 'https://www.rainn.org/' },
  { label: 'National Sexual Assault Hotline: 1-800-656-HOPE', href: 'tel:18006564673' },
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
const freshState = () => ({ lesson: 0, step: 0, completed: [], started: false, baselineDone: false, finalCheckDone: false, finalCheckScore: null, retentionCheckDone: false, retentionScore: null, responses: {}, assessmentResponses: { baseline: [], final: [], retention: [] }, learningRecord: createLearningRecord() });
let state = freshState();
try { const saved = JSON.parse(localStorage.getItem(KEY)); if (saved && Array.isArray(saved.completed) && saved.lesson >= 0 && saved.lesson < lessons.length && saved.step >= 0 && saved.step < lessons[saved.lesson].steps.length) state = { ...state, ...saved }; } catch {}
let view = 'discover', progressTab = 'progress', errorState = '', selected = null, checked = false, correct = false, placement = {}, order = [0, 1, 2], dragged = null, watched = false, playing = false, tick = 0, timer, assessmentMode = 'baseline', assessmentIndex = 0, retentionPreview = false;
const esc = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const button = (label, action, secondary = false, disabled = false) => `<button class="u-btn u-btn--${secondary ? 'secondary' : 'primary'} u-btn--block" data-action="${action}" ${disabled ? 'disabled' : ''}>${label}</button>`;
const totalSteps = lessons.reduce((sum, lesson) => sum + lesson.steps.length, 0);
const badges = [
  { title: 'Applied', detail: 'Complete five practice activities correctly', key: 'applied' },
  { title: 'Thorough', detail: 'Complete an eligible course and its required check', key: 'thorough' },
  { title: 'Retained', detail: 'Pass a check 30 days after course completion', key: 'retained' }
];
function completedStepCount() { return lessons.reduce((sum, lesson, i) => sum + (state.completed.includes(i) ? lesson.steps.length : i === state.lesson && state.started ? state.step : 0), 0); }
function coursePercent() { return Math.round(completedStepCount() / totalSteps * 100); }
function learningPoints() { return pointsTotal(state.learningRecord); }
function earnedBadges() { const keys = earnedBadgeKeys(state.learningRecord); return badges.filter(badge => keys.includes(badge.key)); }
function retentionDue() { const completedAt = state.learningRecord.courses['sexual-misconduct']?.completedAt; return (retentionPreview || (completedAt && Date.now() >= new Date(completedAt).getTime() + 30 * 86400000)) && !state.retentionCheckDone; }
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
function learningStats() { const habit = habitSummary(state.learningRecord); return `<button class="learning-stats" data-action="rewards" aria-label="View progress across all courses"><span><b>${learningPoints()}</b><small>Points</small></span><span><b>${habit.weekStreak}</b><small>Week streak</small></span><span><b>${earnedBadges().length} of ${badges.length}</b><small>Badges</small></span></button>`; }
function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {} }
function stopVideo() { clearInterval(timer); playing = false; }
function resetActivity() { stopVideo(); selected = null; checked = false; correct = false; placement = {}; order = [0, 1, 2]; watched = false; tick = 0; }
function openStep(l, s) { state.lesson = l; state.step = s; state.started = true; view = 'activity'; errorState = ''; resetActivity(); save(); render(); }
function progressBar(value, label, className = '') { return `<div class="progress-summary ${className}"><div><span>${esc(label)}</span><b>${value}%</b></div><div class="progress-track" role="progressbar" aria-label="${esc(label)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${value}"><span style="width:${value}%"></span></div></div>`; }
function courseRing(done, total, complete = false) {
  const r = 22, c = 2 * Math.PI * r, pct = complete ? 1 : done / total;
  return `<span class="course-ring${complete ? ' is-complete' : ''}" role="img" aria-label="${done} of ${total} lessons complete"><svg viewBox="0 0 48 48" aria-hidden="true"><circle class="course-ring-track" cx="24" cy="24" r="${r}"/><circle class="course-ring-value" cx="24" cy="24" r="${r}" stroke-dasharray="${(pct * c).toFixed(2)} ${c.toFixed(2)}"/></svg>${complete ? icon('checkmark') : `<b aria-hidden="true">${done}/${total}</b>`}</span>`;
}
function mediaIcon(kind) { return icon(kind === 'pause' ? 'player_pause' : kind === 'replay' ? 'arrow_counter_clockwise' : 'player_play'); }
function fullscreenIcon() { return icon('arrow_expand'); }
function updatePlayControl(control, mode, title) {
  control.innerHTML = mediaIcon(mode);
  control.setAttribute('aria-label', `${mode === 'pause' ? 'Pause' : mode === 'replay' ? 'Replay' : 'Play'} ${title}`);
}
function shell(body, footer = '', label = 'US mandatory education', back = 'overview', context = '') {
  const navLabel = context
    ? `<span class="course-nav-context"><small>${esc(context)}</small><b>${esc(label)}</b></span>`
    : `<span class="course-nav-label">${esc(label)}</span>`;
  root.innerHTML = `<nav class="course-nav"><button data-action="${back}" aria-label="Back">${icon('arrow_left')}</button>${navLabel}<button data-action="exit" aria-label="Save and exit">${icon('x')}</button></nav><div class="course-body">${body}</div>${footer ? `<footer class="course-footer">${footer}</footer>` : ''}`;
  const title = root.querySelector('h1'); if (title) { title.tabIndex = -1; title.focus({ preventScroll: true }); }
}
function habitCard() {
  const habit = habitSummary(state.learningRecord);
  const status = habit.paused ? 'Paused until new learning is available' : habit.met ? 'Weekly goal complete' : `${habit.learningDays} of ${habit.goal} learning days this week`;
  const detail = habit.paused ? 'Your completed learning stays saved. A quiet week does not break your streak.' : habit.met ? 'Your next qualifying week can extend your streak.' : 'Learn on two different days this week, or finish everything currently available.';
  const streak = habit.weekStreak === 0 ? 'No week streak yet' : `${habit.weekStreak}-week streak`;
  return `<button class="habit-card" data-action="rewards"><span class="page-context">Weekly learning goal</span><b>${status}</b><span class="habit-meter" aria-hidden="true"><i style="width:${habit.paused || habit.met ? 100 : Math.min(100, habit.learningDays / habit.goal * 100)}%"></i></span><small>${detail}</small><strong>${streak} <span aria-hidden="true">→</span></strong></button>`;
}
function discovery() {
  const complete = state.completed.length === lessons.length;
  const primaryLabel = complete ? 'Review course' : state.started ? 'Continue course' : 'View course';
  const primaryAction = state.started && !complete ? 'start' : 'course';
  const firstName = learnerFirstName();
  const remaining = lessons[state.lesson].steps.length - state.step;
  const courseState = complete
    ? 'Complete · your learning record is up to date.'
    : state.started
      ? `Lesson ${state.lesson + 1} of ${lessons.length} · ${remaining} ${remaining === 1 ? 'activity' : 'activities'} remaining in this lesson.`
      : '7 lessons · 6 required videos · 33 activities.';
  const saveNote = state.started || complete ? '' : '<p class="priority-course-save">Completed progress saves automatically.</p>';
  const priorityCourse = `<section class="priority-course" aria-labelledby="required-course-title"><div class="priority-course-copy"><p class="priority-course-status">Required · Safety</p><h3 id="required-course-title">Sexual misconduct education</h3><p class="priority-course-state">${courseState}</p>${saveNote}</div>${courseRing(state.completed.length, lessons.length, complete)}<button class="priority-course-action" data-action="${primaryAction}">${primaryLabel}</button></section>`;
  const retentionCard = retentionDue() ? `<section class="discovery-section"><div class="section-title"><h2>Check what stayed with you</h2><span>30 days on</span></div><button class="continue-learning-card" data-action="retention-intro"><span class="continue-meta">Not scored for points</span><b>Five-question retention check</b><span>Review what you remember from Sexual misconduct education.</span><strong>Start check <span aria-hidden="true">→</span></strong></button></section>` : '';
  const explore = `<section class="discovery-section"><div class="section-title"><h2>Explore</h2><button class="text-link" data-action="library">See all</button></div><button class="optional-course" data-action="road-safety"><span><small>Optional · Driving</small><b>Road safety fundamentals</b><em>Opens the road safety course. Completion is tracked there.</em></span>${icon('chevron_right_small')}</button></section>`;
  root.innerHTML = `<nav class="discovery-nav"><span class="discovery-brand">Learning</span><button class="avatar-button" data-action="rewards" aria-label="Open ${firstName ? `${esc(firstName)}’s` : 'your'} learning progress">${firstName ? esc(firstName.slice(0, 1).toUpperCase()) : 'UL'}</button></nav><div class="course-body discovery-body"><header class="discovery-greeting"><h1 class="personal-greeting">${personalGreeting()}</h1></header><section class="discovery-section"><div class="section-title"><h2>Required</h2></div>${priorityCourse}</section>${retentionCard}<section class="discovery-section supporting-section"><div class="section-title"><h2>This week</h2><span>2 learning days</span></div>${habitCard()}</section><section class="discovery-section supporting-section"><div class="section-title"><h2>Your progress</h2><span>Across all courses</span></div>${learningStats()}</section>${explore}</div>`;
  const title = root.querySelector('h1'); if (title) { title.tabIndex = -1; title.focus({ preventScroll: true }); }
}
function overview() {
  const all = state.completed.length === lessons.length, pct = all ? 100 : coursePercent();
  const row = (lesson, i) => {
    const complete = state.completed.includes(i), current = !complete && (state.started ? i === state.lesson : i === 0);
    const eligibleCount = lesson.steps.filter(step => ELIGIBLE_ACTIVITY_TYPES.has(step.type)).length;
    const earned = state.learningRecord.activities.filter(activity => activity.courseId === 'sexual-misconduct' && activity.activityId.startsWith(`${i}.`)).length * 10;
    const status = complete ? `Complete · +${earned} points` : current && state.started ? `In progress · ${state.step + 1} of ${lesson.steps.length}` : `${lesson.steps.length} activities · up to ${eligibleCount * 10} points`;
    return `<button class="lesson-row ${current ? 'is-current' : ''} ${complete ? 'is-complete' : ''}" data-lesson="${i}"><span class="lesson-status" aria-hidden="true">${complete ? icon('checkmark') : ''}</span><span class="lesson-copy"><b>${esc(lesson.title)}</b><small>${status}</small></span><span class="arrow" aria-hidden="true">${icon('chevron_right_small')}</span></button>`;
  };
  const groups = [['Foundations', [0, 1]], ['Boundaries', [2, 3, 4]], ['Safe response', [5, 6]]]
    .map(([name, ids]) => `<section class="lesson-group"><h2>${name}</h2><div class="lesson-list">${ids.map(i => row(lessons[i], i)).join('')}</div></section>`).join('');
  shell(`<div class="course-hero" aria-hidden="true">${icon('shield_check')}</div><p class="page-context">Required · Safety</p><h1>Sexual misconduct education</h1><p class="muted lead">Practical guidance for respectful boundaries, awareness, and safe reporting.</p>${progressBar(pct, `${state.completed.length} of ${lessons.length} lessons complete`, 'course-progress')}<p class="course-facts-line">7 lessons · 6 required videos · 33 activities</p><button class="record-row" data-action="rewards"><span class="lesson-copy"><b>Your learning record</b><small>${coursePoints(state.learningRecord, 'sexual-misconduct')} points from this course · ${earnedBadges().length} badges earned</small></span><span class="arrow" aria-hidden="true">${icon('chevron_right_small')}</span></button>${groups}`, button(all ? 'Review course' : state.started ? 'Continue course' : 'Begin course', state.started || all ? 'start' : 'course-intro'), 'Course details', 'discover');
}
function courseIntro() {
  shell(`<div class="intro-mark" aria-hidden="true"><span>7</span><small>Lessons</small></div><p class="kicker">Before you begin</p><h1>Learn at your own pace</h1><p class="muted lead">This course includes sensitive topics. Pause whenever you need to; completed progress saves automatically.</p><div class="intro-list"><div><span>01</span><p><b>Start with a quick check</b><small>Five questions establish a baseline. They do not add or remove points.</small></p></div><div><span>02</span><p><b>Learn and practise</b><small>Watch required videos, make decisions, and review the source guidance.</small></p></div><div><span>03</span><p><b>Confirm what you learned</b><small>A five-question final check measures learning gain.</small></p></div></div><div class="care-note"><b>Take care of yourself</b><p>Support and reporting resources remain available throughout the course.</p></div>`, button(state.baselineDone ? 'Start lesson 1' : 'Begin quick check', state.baselineDone ? 'begin-lessons' : 'baseline') + button('Back to course', 'overview', true), 'Course introduction', 'overview');
}
function assessment() {
  const questions = assessments[assessmentMode], q = questions[assessmentIndex], chosen = state.assessmentResponses?.[assessmentMode]?.[assessmentIndex];
  const label = assessmentMode === 'baseline' ? 'Quick check' : assessmentMode === 'retention' ? '30-day retention check' : 'Final knowledge check';
  shell(`<div class="assessment-progress"><span>${label}</span><b>${assessmentIndex + 1} / ${questions.length}</b></div><div class="step-dots" aria-hidden="true">${questions.map((_, i) => `<i class="${i <= assessmentIndex ? 'is-active' : ''}"></i>`).join('')}</div><p class="activity-type">Knowledge check</p><h1>${esc(q.prompt)}</h1><p class="muted">Choose the best answer. Your result does not change your points.</p><div class="options assessment-options" role="group" aria-label="Answer choices">${q.options.map((option, i) => `<button class="option" data-assessment-choice="${i}" aria-pressed="${chosen === i}"><span class="option-key">${String.fromCharCode(65 + i)}</span><span>${esc(option)}</span></button>`).join('')}</div>`, button(assessmentIndex === questions.length - 1 ? (assessmentMode === 'baseline' ? 'Start course' : assessmentMode === 'retention' ? 'See what stayed' : 'Finish course') : 'Next question', 'assessment-next', false, chosen === undefined), label, assessmentMode === 'baseline' ? 'course-intro' : assessmentMode === 'retention' ? 'retention-intro' : 'overview');
}
function assessmentResult() {
  if (assessmentMode === 'retention') {
    const answers = state.assessmentResponses?.retention || [];
    const score = assessments.retention.reduce((sum, question, i) => sum + (answers[i] === question.answer ? 1 : 0), 0);
    const passed = score >= 4;
    shell(`<div class="result-mark ${passed ? '' : 'is-review'}" aria-hidden="true">${icon(passed ? 'checkmark' : 'arrow_counter_clockwise')}</div><p class="kicker">30-day retention check</p><h1>${passed ? 'You retained the key ideas' : 'Worth another look'}</h1><p class="muted lead">You answered ${score} of 5 questions correctly. ${passed ? 'Save your result to earn the Retained badge.' : 'Review the course, then try another check.'}</p><p class="measurement-note">This check measures retained learning. It does not add points.</p>`, button(passed ? 'Save result and view badge' : 'Review course', passed ? 'finish-retention' : 'overview') + (passed ? '' : button('Try again', 'retry-retention', true)), 'Retention check', 'discover');
    return;
  }
  const answers = state.assessmentResponses?.final || [];
  const score = assessments.final.reduce((sum, question, i) => sum + (answers[i] === question.answer ? 1 : 0), 0);
  const passed = score >= 4;
  const baselineAnswers = state.assessmentResponses?.baseline || [];
  const baselineScore = assessments.baseline.reduce((sum, question, i) => sum + (baselineAnswers[i] === question.answer ? 1 : 0), 0);
  shell(`<div class="result-mark ${passed ? '' : 'is-review'}" aria-hidden="true">${icon(passed ? 'checkmark' : 'arrow_counter_clockwise')}</div><p class="kicker">Final knowledge check</p><h1>${passed ? 'Ready to complete' : 'Review the key ideas'}</h1><p class="muted lead">${passed ? `You answered ${score} of 5 questions correctly.` : `You answered ${score} of 5 questions correctly. Review the guidance, then try again.`}</p><div class="learning-gain"><span><small>Before</small><b>${baselineScore}/5</b></span><span aria-hidden="true">→</span><span><small>Now</small><b>${score}/5</b></span></div><p class="measurement-note">Knowledge checks measure learning gain and do not award points.</p>${passed ? '<div class="care-note"><b>Your learning is recorded</b><p>Your result and course completion are saved to your learning record.</p></div>' : '<div class="review-topics"><span>Respecting boundaries</span><span>Consent and personal space</span><span>Safe reporting</span></div>'}`, button(passed ? 'Complete course' : 'Try final check again', passed ? 'finish-course' : 'retry-final') + button('Back to course', 'overview', true), 'Knowledge check result', 'overview');
}
function feedback(a) { const saved = a.type === 'text'; const tone = saved ? 'is-saved' : correct ? 'is-positive' : 'is-negative'; return `<div id="feedback" class="feedback ${tone}" role="status"><span class="feedback-mark">${icon(saved || correct ? 'checkmark' : 'x')}</span><div><b>${saved ? 'Saved as private practice' : correct ? 'Correct' : 'Not quite'}</b><p>${esc(a.feedback)}</p></div></div>`; }
function bulletList(items, className = 'takeaway-list') { return items?.length ? `<ul class="${className}">${items.map(item => `<li>${esc(item)}</li>`).join('')}</ul>` : ''; }
function resources(a) { return `<div class="resource-list">${a.resources.map(resource => { const kind = resource.href.startsWith('tel:') ? 'phone' : resource.href.startsWith('sms:') ? 'speech_bubble' : 'arrow_right_up'; return `<a href="${esc(resource.href)}" target="_blank" rel="noreferrer">${icon(kind, 'uicon resource-icon')}<span>${esc(resource.label)}</span>${icon('chevron_right_small', 'uicon resource-chevron')}</a>`; }).join('')}</div>`; }
function activity() {
  const l = lessons[state.lesson], steps = l.steps, a = steps[state.step];
  let content = '', footer = '';
  if (a.type === 'reading') {
    content = `${a.body ? `<p class="u-paragraph-medium">${esc(a.body)}</p>` : ''}${bulletList(a.bullets)}${a.groups ? `<div class="content-groups">${a.groups.map(group => `<section><h2>${esc(group.title)}</h2>${bulletList(group.items)}</section>`).join('')}</div>` : ''}${a.note ? `<div class="source-note"><b>Keep context in mind</b><p>${esc(a.note)}</p></div>` : ''}`;
    footer = button(state.step === steps.length - 1 ? 'Complete lesson' : 'Continue', 'next');
  } else if (a.type === 'resources') {
    content = `${bulletList(a.bullets)}${resources(a)}${a.note ? `<div class="source-note"><b>Important</b><p>${esc(a.note)}</p></div>` : ''}`;
    footer = button(state.step === steps.length - 1 ? 'Complete lesson' : 'Continue', 'next');
  } else if (a.type === 'video') {
    const media = videoMeta[state.lesson];
    const playMode = playing ? 'pause' : watched ? 'replay' : 'play';
    content = `<div class="video-player"><div class="video-slate" aria-hidden="true"><span>Required video</span><b>${esc(a.title)}</b></div><button class="video-play" data-action="play" aria-label="${playing ? 'Pause' : watched ? 'Replay' : 'Play'} ${esc(a.title)}">${mediaIcon(playMode)}</button><div class="video-timeline" aria-hidden="true"><span id="video-progress" style="width:${watched ? 100 : 0}%"></span></div><div class="video-runtime"><span id="video-time">${watched ? media.runtime : '0:00'} / ${media.runtime}</span><button class="video-fullscreen" data-action="fullscreen" aria-label="Enter fullscreen">${fullscreenIcon()}</button></div></div><div class="video-controls"><span class="activity-type">Mandatory video · ${media.runtime}</span><button class="text-button" data-action="captions" aria-pressed="true">CC on</button></div><p id="captions" class="caption">${esc(a.caption)}</p><details><summary>What should I look for?</summary><p>${esc(a.lookFor)}</p></details><p class="completion-requirement" id="watch-status">${watched ? 'Video complete. You can continue.' : 'Finish the video to unlock the next activity. If you leave now, this video restarts.'}</p>`;
    footer = button('Continue', 'next', false, !watched);
  } else if (a.type === 'choice') {
    content = `<div class="options" role="group" aria-label="Answer choices">${a.options.map((o, i) => `<button class="option" data-choice="${i}" aria-pressed="${selected === i}" ${checked ? 'disabled' : ''}><span class="option-key">${String.fromCharCode(65 + i)}</span><span>${esc(o)}</span></button>`).join('')}</div>`;
  } else if (a.type === 'dropdown') {
    content = `<div class="dropdown"><button class="option" data-action="dropdown" aria-expanded="false" aria-controls="dropdown-options" ${checked ? 'disabled' : ''}><span>${selected === null ? 'Choose the missing phrase' : esc(a.options[selected])}</span>${icon('chevron_down_small')}</button><div id="dropdown-options" class="dropdown-list" role="listbox" aria-label="Missing phrase" hidden>${a.options.map((o, i) => `<button role="option" aria-selected="${selected === i}" data-choice="${i}">${esc(o)}</button>`).join('')}</div></div>`;
  } else if (a.type === 'text' || a.type === 'number') {
    const val = state.responses[`${state.lesson}-${state.step}`] || '';
    content = `<label class="field">${a.type === 'text' ? 'Your response' : 'Your answer'}${a.type === 'text' ? `<textarea id="answer" maxlength="300" placeholder="Write your response…" ${checked ? 'readonly' : ''}>${esc(val)}</textarea><small id="count">${val.length}/300 characters · private practice response</small>` : `<input id="answer" inputmode="numeric" type="text" value="${esc(val)}" placeholder="Enter a number" ${checked ? 'readonly' : ''}><small>Use the information in the source content above.</small>`}</label>`;
  } else if (a.type === 'drag') {
    const card = (t, i) => `<button draggable="${!checked}" class="option match-card ${checked ? placement[i] === a.answers[i] ? 'is-correct' : 'is-incorrect' : ''}" data-card="${i}" aria-pressed="${selected === i}" ${checked ? 'disabled' : ''}><span class="drag-handle">${icon('two_lines')}</span><span>${esc(t)}</span>${selected === i ? '<small>Selected</small>' : checked ? `<small>${placement[i] === a.answers[i] ? 'Correct' : 'Review'}</small>` : ''}</button>`;
    content = `<div class="interaction-instruction"><span>${icon('arrow_up_down')}</span><p><b>Match each action</b><small>Drag a card, or select it and tap a destination.</small></p></div><div class="options card-bank" aria-label="Cards to place">${a.cards.map((t, i) => placement[i] === undefined ? card(t, i) : '').join('')}</div><div class="match-zones">${a.groups.map((g, n) => `<section class="dropzone" data-zone="${n}"><button data-place="${n}" ${checked ? 'disabled' : ''}><span>${esc(g)}</span><small>${a.cards.some((_, i) => placement[i] === n) ? 'Tap to replace' : 'Drop or tap to place'}</small></button>${a.cards.map((t, i) => placement[i] === n ? card(t, i) : '').join('')}</section>`).join('')}</div><p class="activity-count">${Object.keys(placement).length} of 3 actions matched</p>`;
  } else if (a.type === 'sort') {
    content = `<div class="interaction-instruction"><span>${icon('arrow_up_down')}</span><p><b>Build the safest sequence</b><small>Drag each step or use the arrow controls.</small></p></div><div class="options sort-list" aria-label="Sequence to arrange">${order.map((n, i) => `<div class="sort-row ${checked ? n === a.answer[i] ? 'is-correct' : 'is-incorrect' : ''}" draggable="${!checked}" data-sort="${i}"><span class="drag-handle">${icon('two_lines')}</span><b class="sort-number">${i + 1}</b><span>${esc(a.items[n])}</span><span class="sort-actions"><button data-move="${i},-1" aria-label="Move ${esc(a.items[n])} up" ${i === 0 || checked ? 'disabled' : ''}>↑</button><button data-move="${i},1" aria-label="Move ${esc(a.items[n])} down" ${i === 2 || checked ? 'disabled' : ''}>↓</button></span></div>`).join('')}</div>`;
  }
  if (!['reading', 'resources', 'video'].includes(a.type)) {
    if (checked) content += feedback(a);
    footer = checked ? button(correct || a.type === 'text' ? 'Continue' : 'Try again', correct || a.type === 'text' ? 'next' : 'retry') : button(a.type === 'text' ? 'Save reflection' : 'Check answer', 'check', false, !ready(a));
  }
  const activityLabel = a.type === 'resources' ? 'Lesson recap' : a.type === 'reading' ? 'Learn' : a.type === 'video' ? 'Watch' : 'Practice';
  const activitySteps = steps.map((_, index) => `<i class="${index < state.step ? 'is-complete' : index === state.step ? 'is-current' : ''}"></i>`).join('');
  shell(`<div class="activity-meta-row"><p class="activity-type"><span aria-hidden="true">${icon(a.type === 'video' ? 'player_play' : a.type === 'resources' ? 'checkmark' : a.type === 'reading' ? 'circle_i' : 'diamond')}</span>${activityLabel}</p></div><h1>${esc(a.title)}</h1><p class="muted lead">${esc(a.prompt)}</p>${content}`, `<div class="page-dots" role="progressbar" aria-label="Activity ${state.step + 1} of ${steps.length}" aria-valuemin="1" aria-valuemax="${steps.length}" aria-valuenow="${state.step + 1}">${activitySteps}</div>${footer}`, l.title, 'back', `Lesson ${state.lesson + 1} / ${lessons.length}`);
}
function ready(a) {
  if (['choice', 'dropdown'].includes(a.type)) return selected !== null;
  if (['text', 'number'].includes(a.type)) return !!(state.responses[`${state.lesson}-${state.step}`] || '').trim();
  if (a.type === 'drag') return Object.keys(placement).length === 3;
  return true;
}
function completion() {
  const all = state.completed.length === lessons.length, next = lessons[Math.min(state.lesson + 1, lessons.length - 1)];
  const unlocked = earnedBadges().find(badge => badge.key === 'thorough');
  const contribution = state.learningRecord.activities.filter(activity => activity.courseId === 'sexual-misconduct' && activity.activityId.startsWith(`${state.lesson}.`)).length * 10;
  const awaitingFinal = all && !state.finalCheckDone;
  shell(`<div class="result-mark" aria-hidden="true">${icon('checkmark')}</div><p class="kicker">${awaitingFinal ? 'Lessons complete' : all ? 'Course complete' : `Lesson ${state.lesson + 1} complete`}</p><h1>${awaitingFinal ? 'One final check' : all ? 'You completed the course' : esc(lessons[state.lesson].title)}</h1><p class="muted lead">${awaitingFinal ? 'You finished all seven lessons. Confirm what you learned to complete the course.' : all ? 'You completed all seven lessons in the United States mandatory safety education.' : esc(lessons[state.lesson].summary)}</p>${progressBar(all ? 100 : Math.round(state.completed.length / lessons.length * 100), `${state.completed.length} of ${lessons.length} lessons complete`, 'course-progress')}<div class="course-contribution"><span class="feedback-mark">${icon('plus')}</span><div><b>${all ? 'Course contribution recorded' : `Lesson complete · +${contribution} points`}</b><p>${all ? `${coursePoints(state.learningRecord, 'sexual-misconduct')} points from this course are in your shared record.${unlocked ? ` ${esc(unlocked.title)} badge unlocked.` : ''}` : `Your account-level total is now ${learningPoints()} points.`}</p></div></div><div class="milestone"><b>${awaitingFinal ? 'Next step' : all ? 'Your commitment' : 'Next lesson'}</b><p>${awaitingFinal ? 'Five questions · about 3 minutes' : all ? 'Keep conversations respectful, follow stated boundaries, and report concerns safely.' : `${esc(next.title)} · ${next.steps.length} activities`}</p></div>`, button(awaitingFinal ? 'Complete final check' : all ? 'View learning progress' : `Start lesson ${state.lesson + 2}`, awaitingFinal ? 'final-check' : all ? 'rewards' : 'next-lesson') + button('Back to course', 'overview', true));
}
function rewardsView() {
  const earned = earnedBadges();
  const tabs = `<div class="progress-tabs" role="tablist" aria-label="Learning record"><button role="tab" data-progress-tab="progress" aria-selected="${progressTab === 'progress'}">Progress</button><button role="tab" data-progress-tab="habit" aria-selected="${progressTab === 'habit'}">Habit</button><button role="tab" data-progress-tab="badges" aria-selected="${progressTab === 'badges'}">Badges</button><button role="tab" data-progress-tab="standing" aria-selected="${progressTab === 'standing'}">Standing</button></div>`;
  const progressContent = `<section class="progress-panel"><div class="account-total"><small>Total points</small><b>${learningPoints()}</b><span>Across all your courses</span></div><h2>Course contributions</h2><div class="course-breakdown"><div><b>Sexual misconduct education</b><small>${state.completed.length} of ${lessons.length} lessons complete · ${activityCount(state.learningRecord, 'sexual-misconduct')} eligible activities</small></div><strong>+${coursePoints(state.learningRecord, 'sexual-misconduct')}</strong></div><div class="course-breakdown"><div><b>Road safety fundamentals</b><small>External completion tracked separately</small></div><strong>—</strong></div>${progressBar(coursePercent(), `${completedStepCount()} of ${totalSteps} course steps`, 'course-progress')}<p class="measurement-note">Points are awarded once per eligible activity. Reading requires Continue, videos require full playback, and practice requires a correct answer. Resource screens and assessments award no points.</p></section>`;
  const habit = habitSummary(state.learningRecord);
  const habitContent = `<section class="progress-panel"><div class="account-total"><small>Week streak</small><b>${habit.weekStreak}</b><span>consecutive goal weeks</span></div><h2>This week's goal</h2><p class="muted">${habit.paused ? 'Paused: you have completed all currently available eligible learning.' : habit.met ? 'Goal complete for this week.' : `${habit.learningDays} of ${habit.goal} learning days complete.`}</p><div class="habit-days"><span class="${habit.learningDays >= 1 || habit.met ? 'done' : ''}">Day 1</span><span class="${habit.learningDays >= 2 || habit.met ? 'done' : ''}">Day 2</span></div><p class="measurement-note">A learning day requires the first completion of an eligible activity. The goal is two different days in a Monday–Sunday week. Finishing all available learning also meets that week's goal. A week with no eligible learning pauses the streak. One missed active week in eight can be forgiven; earned points and badges never disappear. Your learning week follows this device’s time zone (${esc(habit.timeZone)}).</p></section>`;
  const badgesContent = `<section class="progress-panel"><p class="muted">Three account-level badges recognise applied practice, course completion, and retained knowledge.</p><div class="badge-list">${badges.map((badge, index) => `<div class="badge-row ${earned.includes(badge) ? 'earned' : ''}"><span>${icon(['badge_checkmark', 'shield_check', 'star'][index] || 'badge_checkmark')}</span><div><b>${esc(badge.title)}</b><small>${earned.includes(badge) ? 'Earned across your courses' : esc(badge.detail)}</small></div></div>`).join('')}</div>${retentionDue() ? button('Take your 30-day check', 'retention-intro') : ''}</section>`;
  const standing = demoComparison(state.learningRecord);
  const bands = COHORT_BANDS.map((range, index) => `<div class="standing-band ${standing.bandIndex === index ? 'is-current' : ''}" role="listitem" aria-label="${range}${standing.bandIndex === index ? ', your example band' : ''}"><span class="standing-band-bar" aria-hidden="true">${standing.bandIndex === index ? '<i>You</i>' : ''}</span><span class="standing-band-label">${range}</span></div>`).join('');
  const standingContent = `<section class="progress-panel standing-panel"><p class="page-context">Illustrative cohort · This week</p><h2>${standing.bandIndex === null ? 'Your band will appear here' : `Your band: ${standing.label}`}</h2><p class="muted">${standing.bandIndex === null ? 'Complete a learning activity to see where you stand.' : `${standing.count} eligible ${standing.count === 1 ? 'activity' : 'activities'} completed this week.`}</p><div class="standing-bands" role="list" aria-label="Four cohort position bands">${bands}</div><p class="measurement-note">Example cohort of ${standing.cohortSize} learners. Live comparisons will use approved, privacy-safe learner data.</p></section>`;
  shell(`<p class="page-context">Across all courses</p><h1 class="learning-progress-title">Learning progress</h1><p class="muted">Points, habits, badges, and standing across your courses.</p>${tabs}${progressTab === 'progress' ? progressContent : progressTab === 'habit' ? habitContent : progressTab === 'badges' ? badgesContent : standingContent}`, button(state.started && state.completed.length < lessons.length ? 'Continue course' : 'Back to course', state.started && state.completed.length < lessons.length ? 'start' : 'overview') + button('Learning home', 'discover', true), 'Learning progress', 'discover');
}

function libraryView() {
  shell(`<p class="page-context">Course library</p><h1>Explore learning</h1><p class="muted lead">Courses available for your profile.</p><div class="filter-chips" role="group" aria-label="Course filters"><button aria-pressed="true">All</button><button>Required</button><button>Safety</button></div><div class="library-list"><button class="library-row" data-action="course"><span><small>Required · Safety</small><b>Sexual misconduct education</b><em>7 lessons · 33 activities</em></span><strong>${state.started ? 'Continue' : 'View'} →</strong></button><button class="library-row is-external" data-action="road-safety"><span><small>Optional · Safety</small><b>Road safety fundamentals</b><em>Available soon</em></span><strong>Details →</strong></button></div>`, button('Back to learning home', 'discover'), 'Course library', 'discover');
}
function roadSafetyView() {
  shell(`<p class="page-context">Available soon</p><h1>Road safety fundamentals</h1><p class="muted lead">This course is not available yet. We’ll show it here when it is ready.</p><div class="care-note"><b>Your learning record stays accurate</b><p>Road Safety does not add points, count toward your weekly goal, or unlock badges until its completion can be confirmed.</p></div>`, button('Back to course library', 'library'), 'Road safety', 'library');
}
function retentionIntro() {
  const due = retentionDue();
  shell(`<p class="page-context">30 days on · Not scored for points</p><h1>${due ? 'Still with you?' : 'Come back in 30 days'}</h1><p class="muted lead">${due ? 'Five new questions check what stayed with you from Sexual misconduct education.' : 'Your retention check becomes available 30 days after you complete the course.'}</p><div class="care-note"><b>Retained badge</b><p>Answer at least four of five questions correctly to earn it. You can review the course and try again if needed.</p></div>`, button(due ? 'Start retention check' : 'Back to learning home', due ? 'start-retention' : 'discover') + (due ? button('Not now', 'discover', true) : ''), 'Retention check', 'discover');
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
  if (errorState) { const e = errors[errorState]; shell(`<div class="placeholder" aria-hidden="true">${errorState === 'loading' ? '···' : '!'}</div><h1>${e[0]}</h1><p class="muted">${e[1]}</p>`, button(e[2], 'recover')); return; }
  if (view === 'discover') discovery(); else if (view === 'library') libraryView(); else if (view === 'road-safety') roadSafetyView(); else if (view === 'retention-intro') retentionIntro(); else if (view === 'overview') overview(); else if (view === 'intro') courseIntro(); else if (view === 'assessment') assessment(); else if (view === 'assessment-result') assessmentResult(); else if (view === 'activity') activity(); else if (view === 'complete') completion(); else if (view === 'rewards') rewardsView();
  else shell(`<p class="kicker">Progress saved</p><h1>Pick up where you left off</h1><p class="muted">You completed ${completedStepCount()} of ${totalSteps} activities. Come back whenever you’re ready.</p>${progressBar(coursePercent(), `${state.completed.length} of ${lessons.length} lessons complete`, 'course-progress')}`, button('Resume where you left off', 'start') + button('Back to learning home', 'discover', true), 'Progress saved', 'discover');
}
root.addEventListener('input', e => { if (e.target.id !== 'answer') return; state.responses[`${state.lesson}-${state.step}`] = e.target.value; save(); const check = root.querySelector('[data-action="check"]'); if (check) check.disabled = !e.target.value.trim(); const count = root.querySelector('#count'); if (count) count.textContent = `${e.target.value.length}/300 characters · private practice response`; });
root.addEventListener('click', e => {
  const el = e.target.closest('button'); if (!el || el.disabled) return;
  if (el.dataset.assessmentChoice !== undefined) { if (!state.assessmentResponses) state.assessmentResponses = { baseline: [], final: [] }; state.assessmentResponses[assessmentMode][assessmentIndex] = +el.dataset.assessmentChoice; save(); assessment(); return; }
  if (el.dataset.lesson !== undefined) { openStep(+el.dataset.lesson, 0); return; }
  if (el.dataset.progressTab) { progressTab = el.dataset.progressTab; rewardsView(); return; }
  if (el.dataset.choice !== undefined) { selected = +el.dataset.choice; activity(); root.querySelector('[data-action="check"]')?.focus(); return; }
  if (el.dataset.card !== undefined) { selected = +el.dataset.card; activity(); root.querySelector('[data-place]')?.focus(); return; }
  if (el.dataset.place !== undefined) { if (selected !== null) { placement[selected] = +el.dataset.place; selected = null; activity(); } return; }
  if (el.dataset.move) { const [i, d] = el.dataset.move.split(',').map(Number); [order[i], order[i + d]] = [order[i + d], order[i]]; activity(); root.querySelector(`[data-move="${i + d},${d}"]`)?.focus(); return; }
  const action = el.dataset.action;
  if (action === 'discover') { errorState = ''; view = 'discover'; render(); }
  if (action === 'course') { errorState = ''; view = 'overview'; render(); }
  if (action === 'overview') { errorState = ''; view = 'overview'; render(); }
  if (action === 'rewards') { errorState = ''; view = 'rewards'; render(); }
  if (action === 'library') { errorState = ''; view = 'library'; render(); }
  if (action === 'road-safety') { errorState = ''; view = 'road-safety'; render(); }
  if (action === 'retention-intro') { errorState = ''; view = 'retention-intro'; render(); }
  if (action === 'course-intro') { errorState = ''; view = 'intro'; render(); }
  if (action === 'baseline') { assessmentMode = 'baseline'; assessmentIndex = 0; view = 'assessment'; render(); }
  if (action === 'final-check') { assessmentMode = 'final'; assessmentIndex = 0; view = 'assessment'; render(); }
  if (action === 'start-retention' && retentionDue()) { assessmentMode = 'retention'; assessmentIndex = 0; view = 'assessment'; render(); }
  if (action === 'assessment-next') { const questions = assessments[assessmentMode]; if (assessmentIndex < questions.length - 1) { assessmentIndex++; render(); } else if (assessmentMode === 'baseline') { state.baselineDone = true; save(); openStep(0, 0); } else { const score = questions.reduce((sum, question, i) => sum + (state.assessmentResponses[assessmentMode][i] === question.answer ? 1 : 0), 0); if (assessmentMode === 'retention') state.retentionScore = score; else state.finalCheckScore = score; view = 'assessment-result'; save(); render(); } }
  if (action === 'retry-final') { state.assessmentResponses.final = []; state.finalCheckScore = null; assessmentMode = 'final'; assessmentIndex = 0; view = 'assessment'; save(); render(); }
  if (action === 'retry-retention') { state.assessmentResponses.retention = []; state.retentionScore = null; assessmentMode = 'retention'; assessmentIndex = 0; view = 'assessment'; save(); render(); }
  if (action === 'finish-course') { state.finalCheckDone = true; recordCourseCompletion(state.learningRecord, 'sexual-misconduct'); save(); view = 'complete'; render(); }
  if (action === 'finish-retention') { if (recordRetentionCheck(state.learningRecord, { courseId: 'sexual-misconduct', score: state.retentionScore })) state.retentionCheckDone = true; save(); progressTab = 'badges'; view = 'rewards'; render(); }
  if (action === 'begin-lessons') openStep(0, 0);
  if (action === 'start') openStep(state.completed.length === lessons.length ? 0 : state.lesson, state.completed.length === lessons.length ? 0 : state.step);
  if (action === 'exit') { save(); view = 'exit'; errorState = ''; render(); }
  if (action === 'back') { if (state.step > 0) openStep(state.lesson, state.step - 1); else { view = 'overview'; render(); } }
  if (action === 'dropdown') { const list = root.querySelector('#dropdown-options'); list.hidden = !list.hidden; el.setAttribute('aria-expanded', !list.hidden); if (!list.hidden) list.querySelector('button').focus(); }
  if (action === 'retry') { checked = false; activity(); }
  if (action === 'check') {
    const a = lessons[state.lesson].steps[state.step]; checked = true;
    const val = (state.responses[`${state.lesson}-${state.step}`] || '').trim();
    correct = a.type === 'text' || (['choice', 'dropdown'].includes(a.type) && selected === a.answer) || (a.type === 'number' && /^\d+$/.test(val) && Number(val) === a.answer) || (a.type === 'drag' && a.answers.every((n, i) => placement[i] === n)) || (a.type === 'sort' && order.every((n, i) => n === a.answer[i]));
    activity(); root.querySelector('#feedback')?.scrollIntoView({ block: 'nearest' });
  }
  if (action === 'next') { const activity = lessons[state.lesson].steps[state.step]; recordActivity(state.learningRecord, { courseId: 'sexual-misconduct', activityId: `${state.lesson}.${state.step}`, type: activity.type, correct }); if (state.step < lessons[state.lesson].steps.length - 1) openStep(state.lesson, state.step + 1); else { if (!state.completed.includes(state.lesson)) state.completed.push(state.lesson); save(); view = 'complete'; render(); } }
  if (action === 'next-lesson') openStep(Math.min(state.lesson + 1, lessons.length - 1), 0);
  if (action === 'captions') { const c = root.querySelector('#captions'); c.hidden = !c.hidden; el.textContent = c.hidden ? 'CC off' : 'CC on'; el.setAttribute('aria-pressed', !c.hidden); }
  if (action === 'fullscreen') {
    const player = el.closest('.video-player');
    if (document.fullscreenElement) document.exitFullscreen?.();
    else player?.requestFullscreen?.();
  }
  if (action === 'recover') { const wasMedia = errorState === 'media'; errorState = ''; if (wasMedia) openStep(state.lesson, state.step); else { view = 'overview'; render(); } }
  if (action === 'play') {
    const title = lessons[state.lesson].steps[state.step].title;
    if (playing) { stopVideo(); updatePlayControl(el, 'play', title); return; }
    if (watched) { tick = 0; watched = false; }
    playing = true; updatePlayControl(el, 'pause', title); root.querySelector('[data-action="next"]').disabled = true;
    const media = videoMeta[state.lesson];
    timer = setInterval(() => { tick++; const time = root.querySelector('#video-time'), progress = root.querySelector('#video-progress'); if (!time) return stopVideo(); const current = Math.min(media.duration, Math.round(media.duration * tick / 12)); time.textContent = `${Math.floor(current / 60)}:${String(current % 60).padStart(2, '0')} / ${media.runtime}`; if (progress) progress.style.width = `${Math.min(100, tick / 12 * 100)}%`; if (tick >= 12) { stopVideo(); watched = true; updatePlayControl(el, 'replay', title); root.querySelector('[data-action="next"]').disabled = false; root.querySelector('#watch-status').textContent = 'Video complete. You can continue.'; } }, 1000);
  }
});
root.addEventListener('keydown', e => { const list = root.querySelector('#dropdown-options'); if (!list || list.hidden) return; const opts = [...list.querySelectorAll('button')]; const i = opts.indexOf(document.activeElement); if (e.key === 'Escape') { list.hidden = true; const trigger = root.querySelector('[data-action="dropdown"]'); trigger.setAttribute('aria-expanded', 'false'); trigger.focus(); } if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) { e.preventDefault(); opts[e.key === 'Home' ? 0 : e.key === 'End' ? opts.length - 1 : (i + (e.key === 'ArrowDown' ? 1 : -1) + opts.length) % opts.length].focus(); } });
root.addEventListener('dragstart', e => { const el = e.target.closest('[data-card],[data-sort]'); if (!el || checked) return; dragged = { type: el.dataset.card !== undefined ? 'card' : 'sort', index: +(el.dataset.card ?? el.dataset.sort) }; el.classList.add('is-dragging'); root.querySelectorAll(dragged.type === 'card' ? '[data-zone]' : '[data-sort]').forEach(target => target.classList.add('is-valid-target')); e.dataTransfer.setData('text/plain', String(dragged.index)); });
root.addEventListener('dragover', e => { const target = e.target.closest('[data-zone],[data-sort]'); if (target) { e.preventDefault(); root.querySelectorAll('.is-drag-over').forEach(item => item.classList.remove('is-drag-over')); target.classList.add('is-drag-over'); } });
root.addEventListener('dragleave', e => { e.target.closest('[data-zone],[data-sort]')?.classList.remove('is-drag-over'); });
root.addEventListener('dragend', () => { root.querySelectorAll('.is-dragging,.is-valid-target,.is-drag-over').forEach(item => item.classList.remove('is-dragging', 'is-valid-target', 'is-drag-over')); });
root.addEventListener('drop', e => { const zone = e.target.closest('[data-zone]'), row = e.target.closest('[data-sort]'); if (!dragged) return; e.preventDefault(); if (zone && dragged.type === 'card') placement[dragged.index] = +zone.dataset.zone; if (row && dragged.type === 'sort') { const [item] = order.splice(dragged.index, 1); order.splice(+row.dataset.sort, 0, item); } dragged = null; activity(); });
function seedPreviewThrough(lastLesson, { complete = false, retained = false } = {}) {
  state = freshState();
  state.started = true;
  state.completed = lessons.slice(0, lastLesson + 1).map((_, index) => index);
  state.lesson = Math.min(lastLesson, lessons.length - 1);
  for (let lessonIndex = 0; lessonIndex <= lastLesson; lessonIndex++) {
    lessons[lessonIndex].steps.forEach((step, stepIndex) => recordActivity(state.learningRecord, { courseId: 'sexual-misconduct', activityId: `${lessonIndex}.${stepIndex}`, type: step.type, correct: true }));
  }
  if (complete) {
    const completedAt = retained ? new Date(Date.now() - 31 * 86400000).toISOString() : new Date().toISOString();
    state.finalCheckDone = true;
    recordCourseCompletion(state.learningRecord, 'sexual-misconduct', completedAt);
  }
  if (retained) {
    recordRetentionCheck(state.learningRecord, { courseId: 'sexual-misconduct', score: 5 });
    state.retentionCheckDone = true;
  }
}
const panel = document.querySelector('#review-panel');
panel.innerHTML = `<h2>Complete interactive Version B</h2><button data-preview="discover">Course discovery</button><button data-preview="library">Course library</button><button data-preview="road-safety">Road safety handoff</button><button data-preview="overview">Course overview</button><button data-preview="intro">Course introduction</button><button data-preview="baseline">Baseline check</button><button data-preview="rewards">Learning progress</button><button data-preview="habit">Weekly habit</button><button data-preview="standing">Demo comparison</button><button data-preview="retention">Retention check due</button>${lessons.map((l, n) => l.steps.map((a, s) => `<button data-jump="${n},${s}">${n + 1}.${s + 1} ${a.type} · ${a.title}</button>`).join('')).join('')}<button data-preview="final-check">Final knowledge check</button><button data-preview="complete">Course completion</button><h2>Recovery states</h2>${Object.keys(errors).map(k => `<button data-error="${k}">${errors[k][0]}</button>`).join('')}<h2>Prototype controls</h2><button data-preview="reset">Reset local Version B progress</button>`;
document.querySelector('#review-toggle').addEventListener('click', e => { panel.hidden = !panel.hidden; e.target.setAttribute('aria-expanded', !panel.hidden); });
panel.addEventListener('click', e => { const el = e.target.closest('button'); if (!el) return; if (el.dataset.jump) { openStep(...el.dataset.jump.split(',').map(Number)); return; } if (el.dataset.error) { errorState = el.dataset.error; render(); return; } errorState = ''; if (el.dataset.preview === 'reset') { state = freshState(); retentionPreview = false; save(); view = 'discover'; } else if (el.dataset.preview === 'complete') { seedPreviewThrough(lessons.length - 1, { complete: true }); view = 'complete'; } else if (el.dataset.preview === 'retention') { seedPreviewThrough(lessons.length - 1, { complete: true }); state.learningRecord.courses['sexual-misconduct'].completedAt = new Date(Date.now() - 31 * 86400000).toISOString(); retentionPreview = true; view = 'retention-intro'; } else if (el.dataset.preview === 'baseline' || el.dataset.preview === 'final-check') { assessmentMode = el.dataset.preview === 'baseline' ? 'baseline' : 'final'; assessmentIndex = 0; view = 'assessment'; } else if (['habit', 'standing', 'rewards'].includes(el.dataset.preview)) { seedPreviewThrough(2); progressTab = el.dataset.preview === 'rewards' ? 'progress' : el.dataset.preview; view = 'rewards'; } else if (el.dataset.preview === 'intro') view = 'intro'; else if (el.dataset.preview === 'road-safety') view = 'road-safety'; else if (el.dataset.preview === 'library') view = 'library'; else if (el.dataset.preview === 'overview') view = 'overview'; else view = 'discover'; render(); });

// Deterministic presentation states for design review and Figma capture.
// These do not overwrite a learner's saved progress.
const previewParams = new URLSearchParams(location.search);
const preview = previewParams.get('preview');
if (previewParams.get('review') === '1') document.body.classList.add('review-mode');
if (previewParams.get('capture') === '1') document.body.classList.add('capture-only');
const previewLesson = Number(previewParams.get('lesson'));
const previewStep = Number(previewParams.get('step'));
const validPreviewActivity = Number.isInteger(previewLesson) && Number.isInteger(previewStep) && lessons[previewLesson]?.steps[previewStep];
if (preview === 'discover') {
  state = freshState();
  view = 'discover';
} else if (preview === 'library') {
  view = 'library';
} else if (preview === 'road-safety') {
  view = 'road-safety';
} else if (preview === 'overview') {
  state = freshState();
  view = 'overview';
} else if (preview === 'intro') {
  view = 'intro';
} else if (preview === 'baseline' || preview === 'final-check') {
  assessmentMode = preview === 'baseline' ? 'baseline' : 'final';
  assessmentIndex = Math.min(4, Math.max(0, Number(previewParams.get('question')) || 0));
  view = 'assessment';
} else if (preview === 'activity' && validPreviewActivity) {
  state = freshState();
  state = { ...state, lesson: previewLesson, step: previewStep, completed: lessons.slice(0, previewLesson).map((_, i) => i), started: true };
  view = 'activity';
} else if (preview === 'lesson-complete' && Number.isInteger(previewLesson) && lessons[previewLesson]) {
  seedPreviewThrough(previewLesson);
  state.step = lessons[previewLesson].steps.length - 1;
  view = 'complete';
} else if (preview === 'achievements') {
  seedPreviewThrough(lessons.length - 1, { complete: true, retained: true });
  view = 'rewards';
  progressTab = previewParams.get('tab') || 'badges';
} else if (preview === 'rewards') {
  const tab = previewParams.get('tab') || 'progress';
  seedPreviewThrough(tab === 'badges' ? lessons.length - 1 : 2, { complete: tab === 'badges' });
  view = 'rewards';
  progressTab = tab;
} else if (preview === 'habit' || preview === 'standing') {
  seedPreviewThrough(2);
  view = 'rewards';
  progressTab = preview;
} else if (preview === 'retention') {
  seedPreviewThrough(lessons.length - 1, { complete: true });
  state.learningRecord.courses['sexual-misconduct'].completedAt = new Date(Date.now() - 31 * 86400000).toISOString();
  retentionPreview = true;
  view = 'retention-intro';
} else if (preview === 'mastery') {
  seedPreviewThrough(3);
  state.lesson = 4; state.step = 2;
  view = 'activity';
} else if (preview === 'badge') {
  seedPreviewThrough(1);
  state.step = lessons[1].steps.length - 1;
  view = 'complete';
} else if (preview === 'complete') {
  seedPreviewThrough(lessons.length - 1, { complete: true });
  state.step = lessons.at(-1).steps.length - 1;
  view = 'complete';
} else if (preview === 'resume') {
  seedPreviewThrough(1);
  state.lesson = 2; state.step = 1;
  view = 'exit';
} else if (preview === 'offline') {
  seedPreviewThrough(1);
  state.lesson = 2; state.step = 1;
  errorState = 'offline';
}
render();
