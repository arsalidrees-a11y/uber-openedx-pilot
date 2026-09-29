# Uber app patterns the learning experience follows

Studied on 2026-09-28 from the Uber and Uber Eats iOS apps on Mobbin. Base
supplies the parts; these screens show how Uber assembles them. Where the
prototype had invented its own arrangement, it now follows the one below.

## The closest analogue: Safety checkup

A safety course is, structurally, what Uber already ships as the Safety
checkup: a list of safety topics the learner works through, each opening a
short step sequence.

- [Checkup list](https://mobbin.com/flows/906e4700-e81a-4b50-a010-09f0082bafbf):
  full-bleed blue hero band with a shield, then a large bold title and one
  line of description. Each topic is a row: status circle (outline when not
  done, green check when done), title, grey description, chevron, hairline
  divider. No numbered markers, no path rail.
- [Checkup entry on Account](https://mobbin.com/screens/b5becf3a-7859-4932-a272-b5523dab5ddb):
  a grey card with title, description and a progress ring reading "3/7". The
  course's entry point on Learning home uses the same shape.
- [Step screens](https://mobbin.com/flows/ef521e59-e5e7-45b9-99bc-2604a410b07a):
  illustration band with a round back button laid over it, large title, body
  copy, page dots just above a full-width black button, and a text button
  under it ("Skip"). Option cards are white with a light border; the selected
  one gets a 2px black border.
- Completion is confirmed with a dark toast at the top ("Setup complete").

## Totals and records

- [Account](https://mobbin.com/screens/d9bcee19-f059-4932-b703-7aa85908a404):
  three grey quick tiles (icon over label), then grey cards. Money is a
  label on the left and a large value on the right ("Uber Cash · $25.00").
- [Uber One](https://mobbin.com/screens/043f99cf-5767-4e53-8b22-baad8e8d0078):
  "Total savings this cycle" is a full-width grey band, label left, value
  right. Benefits are icon, bold title, grey description. Sections break with
  a thick grey divider.

Black is for primary buttons, the tab indicator and the toast. Uber does not
put totals on black cards.

## Lists, actions, navigation

- [Settings](https://mobbin.com/screens/e8e39d71-7781-4275-bf4a-20d1042a8953):
  bold section headings; rows are a plain 24px icon, title, grey
  description, chevron. No circle behind the icon.
- [Uber Eats checkout](https://mobbin.com/screens/e9d30576-6c0d-4213-b4b1-689a38c6760e):
  secondary actions are small grey pills ("View details", "Share"); summary
  lines put the label left and the value right.
- [Schedule delivery](https://mobbin.com/screens/f3aa3a0a-dcb3-4b58-8cbf-56e85cd3b746):
  primary black button with a full-width grey secondary under it.
- [Activity](https://mobbin.com/screens/e93a2415-cec1-4cf2-a139-1db7911e1cb1):
  large page title, bold section headings, an empty state as a bordered card
  with a text link ("Reserve your ride →") and illustration.
- Navigation bars: close or back on the left, a centred Label-size title,
  nothing else.

## What changed because of this

| Before | After |
|---|---|
| Course path with numbered markers on a vertical rail | Checkup rows: status circle, title, description, chevron, divider; section headings group the lessons |
| Large course card with a black action | Checkup card: grey, title and description, progress ring "3/7" |
| Course details opened on a black progress card | Blue safety hero band, large title, then the checkup list |
| Learning stats as one strip with dividers | Three grey tiles, as on Account |
| Points total on a black card | Grey band, label left, value right, as Uber Cash and Uber One savings |
| Activity header with a dot stepper | Mode and position as one quiet line; page dots move above the action, as in the step screens |
| Resource rows with an icon in a grey circle | Plain 24px icon rows, as in Settings |
| Try again as a rectangular secondary button | Grey pill, as Uber's secondary actions |
