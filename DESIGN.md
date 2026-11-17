# Carriage — the visual system

The reformer, drawn as architecture. Pilates is control: a carriage moved out against springs and
brought home slowly, a body placed precisely in a room. The page is built the same way — from **four
fields**, **one tall typeface that changes weight**, **photographs standing on rails** and **one
ornament**. No beige, no candles, no soft-focus wellness: a saturated gallery-wall blue, a clean
chalk room, the honey wood of the apparatus and a blue-black night.

## Tokens (src/styles/tokens.css — the only file with raw values)

| | |
|---|---|
| Ultramarine `--field` #2330c4 | the first screen, the header at the top, the booking band, the booking sheet's header (white on it 9.2:1) |
| Chalk `--paper` #f4f4f1 | the reading pages: one to one, first session, questions, visit |
| White `--raised` #ffffff | the sessions section, inputs, the booking sheet |
| Birch `--birch` #ead0a8 | the equipment band; the heavy words, carriages and focus on ultramarine and night (6.3:1 on ultramarine) |
| Night `--night` / `--ink` #0b0f2e | type · the room band, the footer |
| Accent `--accent` #2330c4 | buttons on light pages, heavy words, the carriages on light pages, selected choices (owner-editable; white on it 9.2:1, as text 8.5:1 on chalk) |
| Muted `--muted` #545970 | secondary text (≥ 6:1 on chalk, white and sky wash) |
| Sky wash `--oat` #e9ecf8 | the booking summary, notes |

Fixed fields (ultramarine, birch, night) are not owner-editable, so their contrast is known; buttons
on them are chalk with night-ink text. The owner's accent colours the buttons and heavy words on the
light pages only.

Type: **Darker Grotesque** (variable weight 300–900) for every heading, figure and the name mark —
tall, narrow letters that feel like a body lengthening; **Rethink Sans** for reading text and labels.

- Headings are set **light** (300–520) and large, with tight leading (0.82–0.88).
- A heading's *emphasised* words are the **same letters loaded heavy** (860) — in the accent on light
  pages, in birch on ultramarine and night. In the first-screen headline they take their own line.
- **The load is the motion:** heavy words arrive at a lighter weight and load as their heading comes
  into view; the chosen session's name loads heavy on the rail; questions load heavy when opened. All
  of it is off under `prefers-reduced-motion`.
- Labels: 12 px Rethink Sans capitals, wide tracking, after a short rail; figures (length, price) in
  Darker Grotesque 300, very large.

Shape: photographs as **hard-edged panels** (2 px corners), never pills or arches; buttons and pins
with small, machined corners (4 px) or round pins; no drop shadows except the first-screen and booking
photographs, which cast one long, soft shadow on ultramarine.

## The rail — the one ornament (components/Rail.tsx, `.crail`)

Two thin tracks, a **carriage** (a small rounded block in the accent or birch) and, where there is
room, **springs** (a coil of fine lines) running from the rail's start to the carriage. `--at` (0–1)
places the carriage. It appears:

- under the header, where the carriage rides with the scroll (out to the end of the page, home at the
  top);
- before every section label (small, the carriage at rest);
- under the first-screen photograph, which **is** the carriage: a birch plate under it, the tracks
  running to both edges of the screen, the springs pulling toward the right edge — longer on wider
  monitors;
- as the vertical rail beside the session list, its carriage riding to the chosen session;
- under each session's figures (with springs), through the four stops of a first session (a
  scroll-driven carriage), under the room's photographs, and under the footer's name.

## Composition, section by section

Every section, the header bar and the bands share ONE centred shell (`.shell`, page max 88 rem +
gutters): wide monitors get wider margins, never a wider composition — only the rails run to the
screen's edges.

- **Header:** sticky; ultramarine at the top of the page, chalk once scrolled. The name mark in
  Darker Grotesque 800 (it lightens on hover), a small descriptor, four links with a drawn underline,
  a chalk (then accent) *Book a session*. The progress rail along its lower edge. Phones: name,
  *Book*, a square menu toggle.
- **First screen (ultramarine):** a 7 / 5 grid. Left, from the top: the kicker (what · where ·
  open-now from the engine), then — bottom-aligned — the headline (light, with the heavy birch line),
  the introduction, a chalk *Book a session* and *Where to start*, and three live facts (from $ ·
  length range · one client). Right: the upright photograph on its rail and carriage plate, gliding
  in from the left on load and settling with a little overshoot. Its height follows the screen's
  (`100svh` minus header and paddings, 22–50 rem), so the action stays in the first screen from 320
  × 568 to 2560 × 1440. The headline size follows width and height (`min(8vw, 14svh)`, max 8.5 rem).
  Phones: kicker, headline, introduction, a full-width action, then the photograph (5:4) on its
  rail, then the facts; short phones drop the place and the introduction.
- **One to one (chalk):** a tall photograph (2:3) beside "1:1" set huge in outline behind the label,
  the heading, the introduction and three points on single rules.
- **Sessions (white):** heading and introduction beside **"Where are you starting from?"** — five
  answers as rows that slide a little on hover. Wide screens (≥ 1080 px): **the rail browser** — the
  sessions as a vertical tab list (number, short name set large and light, length and price), a
  vertical rail beside it whose carriage rides to the chosen tab, and a sticky panel with the
  session's photograph and its full name, description, *Good for*, length and price in large figures,
  the rail with springs and *Book this session*. The panel glides in on change. Phones and tablets:
  every session as a card (16:10 photograph, then the same body), two columns from 640 px.
- **The equipment (birch):** heading and introduction, then the four parts in a 2 × 2 grid with round
  ultramarine numbers; beside them a tall photograph of the reformer and tower with the same numbers
  pinned on it — hovering a part lifts its pin.
- **First session (chalk):** the heading, then four stops along one horizontal rail (vertical on
  phones) whose carriage travels with the scroll; the doctor-first small print with an accent edge;
  a tall, light-filled photograph (sticky on desktop).
- **The room (night):** heading beside its introduction, then three photographs hung along one long
  wall — tall · wide · upright, bottoms on one line — a rail running under them edge to edge, and
  numbered captions.
- **Questions & policies (chalk):** sticky heading with the "Sample policies" tag; native disclosure
  rows; the square plus turns accent and the question loads heavy when open.
- **Booking band (ultramarine):** an upright photograph beside the heading, three numbered steps on
  rules (numbers in birch, light) and a chalk *Choose a session*.
- **Visit (chalk):** hours (today in bold, open-now), contact, finding us.
- **Footer (night):** tagline, a chalk Book button, sections, contact, and the **name mark set very
  large and light, standing on the rail** (its size follows its length), the carriage in birch.

## The booking sheet

The shared booking flow (`booking.css`) on these tokens: an ultramarine header with the sheet title,
chalk body, sky-wash summary, accent selections. Step titles are light like the page's headings;
each session's name in the list is Darker Grotesque, heavy. The introduction is grouped first as
"New here? Start with", then "Private sessions".

## Motion

The spring (`--ease-spring`, a small overshoot) for anything that travels: the first-screen carriage
gliding home, carriages riding along rails, reveals gliding in from the left, the session panel,
button arrows. Weight changes (`--dur-load`) for type. Nothing bounces, spins or loops. Under
`prefers-reduced-motion`: no glide, no load (heavy words are heavy at once), no reveals hidden, the
first-session carriage rests at the end.

## Accessibility

Text pairs ≥ 4.5:1 (`concepts/pilates-studio-carriage/contrast.mjs`); 44 px targets; visible focus
(ink on light pages, white on ultramarine and night); the session rail is a real tab list (arrow
keys, Home, End; only the chosen tab in the Tab order); every session's Book button names its
session for screen readers; pins are decorative (the list carries the words); no horizontal scroll
from 320 px.
