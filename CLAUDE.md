# Private Pilates Studio "Carriage" Starter — project rules

A one-page booking website for an independent Pilates instructor who teaches one-to-one, shipped as
**Long Room Pilates** (a fictional one-room, one-instructor private studio in Tucson: an introductory
session, private reformer, private mat, mobility & movement and technique sessions — one client at a
time) for the owner to make their own. Its identity lives in `src/site.config.ts`; `CUSTOMIZE.md` is
the prompt that personalizes it. Built around **@profitstudio/booking-engine** **2.0.0-beta.3**
(pinned; lock in `booking-engine.lock.json`). The engine owns booking; this project owns the public
design.

Read before changing anything:
- `BOOKING_ENGINE.md` — the engine's rules (engine-owned; `npx booking-engine sync` replaces it).
- `node_modules/@profitstudio/booking-engine/docs/INTEGRATION.md` — the full contract. It wins on technical points.
- `DESIGN.md` — the visual system. `PHOTOS.md` — photo sources and licences.

## The Live Demo layer — leave it alone

- `src/demo/` is the public Live Demo's in-browser engine and sample data. Only
  `npm run dev:demo` / `npm run build:demo` use it (`vite --mode demo` defines
  `__BOOKING_DEMO__`); in every other build it is compiled out. Never read, edit
  or "fix" it while customizing the website.
- Keep the `__BOOKING_DEMO__ ? … : …` branches as they are: the demo wording
  (no email is sent) must stay true in the demo, and the real wording in production.
- `src/demo/engine/` is vendored from the Niche Pack workspace — edit it there.
- `src/admin-main.tsx` passes `emailDelivery={__BOOKING_DEMO__ ? 'none' : undefined}`:
  only the demo's dashboard says no email is sent. Never set it on a real site.

## Engine boundaries (from BOOKING_ENGINE.md)

- All booking data goes through the ONE instance in `src/lib/engine.ts`. Never import
  `@supabase/supabase-js` for booking data, call `booking_*` RPCs or write SQL for booking tables.
- Never edit `supabase/migrations/*_booking_engine_*.sql`, `supabase/functions/booking-mailer/`,
  `booking-engine.lock.json` or `node_modules`.
- Only the publishable key may reach the website (`VITE_SUPABASE_URL` + `VITE_SUPABASE_PUBLISHABLE_KEY`,
  both or neither). Never a secret/`service_role` key, never an email provider key, in any file or `VITE_` variable.
- Show only the slots `getAvailability()` returns; send `slot.startsAt` back unchanged; show dates and
  times in `business.timezone`. Never compute availability in the browser — the calendar only reshapes
  engine data with the engine's helpers (`monthGrid`, `groupSlotsByPartOfDay`, `isFewLeft`, `nextAvailableDay`…).
- Label slot times with the server's business-local `slot.time` / `confirmation.time` via `formatClockTime`.
- Book in two steps: `requestBooking()` → code step → `verifyBooking()`. "Send a new code" =
  `resendVerificationCode()`; "Choose another time" = await `cancelBookingRequest()`, then reload availability.
- Handle `ok: false` on every call. Show success only after `verifyBooking()` returned `ok: true`
  (pending → "Request received — we'll review your session and confirm the time shortly.",
  confirmed → "Your session is booked."). Preview answers `PREVIEW_MODE`: say so honestly, never a success screen.
- `business.policies.onlineBookingEnabled === false` (or `BOOKING_DISABLED`) → contact details instead of the flow.
- The engine sends every booking email. Never add an email service to the website.
- Keep the packaged dashboard on `/admin/` (`admin/index.html` → `src/admin-main.tsx`). Never fork or restyle it:
  `src/admin-theme.css` sets only `--pbe-accent` / `--pbe-accent-text` per mode.

## What the engine does not do — never fake it

**One booking = one private session: a reserved block of the instructor's time with ONE client, for
one service, on one calendar (one instructor, one room).** Its length is the real time with the
instructor; the buffer after it is the reset before the next client. Prices are paid at the studio —
never online. The instructor reviews and confirms every request (`autoConfirm: false`).

**Private, not group.** There are no classes, no capacities, no "spots left", no waitlists, no second
instructor and no duets on this site. Never present a session as a class, never show a capacity or a
headcount, never imply two people can share one booking.

**Kinds are read from names.** "Introductory Session", "Private Reformer Session", "Private Mat
Session"… are ordinary engine services; the website only reads their KIND from the words in the name
(`src/lib/services.ts`) to choose a photograph and to put the introduction first. "Where to start"
answers point to a session by words in its name and hide themselves when nothing matches. There are
no variants, no add-ons, and two sessions are two bookings — never present them as a course, a
package or a combined price.

**Movement, not medicine.** Pilates here is exercise. Never diagnose, never name a condition as
something a session treats, never promise or imply results ("fixes back pain", "rehab", "flat
stomach", "posture corrected", "injury-free"), never use clinical framing (patients, therapy,
treatment plans, prescriptions). The *Good for:* line describes the client's situation in their own
terms ("a steady weekly practice", "easing back in after time away") — never a condition. Anything
medical (pregnancy, an injury or operation, a doctor's care) → "check with your doctor first and tell
us before your session". The booking system screens nobody and the site never implies it does.
Never invent the instructor's name, certifications (no "certified", "STOTT", "BASI", "PMA",
"comprehensive training"), years of experience, reviews or testimonials.

A new booking feature needs a new engine version — never custom database code or browser-side logic:

- group classes, capacities, waitlists, duets or semi-private sessions;
- intake, consent or health forms, injury or medication records, client progress histories;
- linked or recurring bookings (a weekly slot), courses or series;
- deposits, cancellation fees, packages, class passes, memberships, gift cards or any online payment;
- several instructors or calendars, equipment allocation.

The booking notes field is **Anything we should know? (optional)** with the helper "For example
whether you've done Pilates before, or what you'd like to work on. Please don't include medical
details here — if you are pregnant, recovering from an injury or under a doctor's care, tell us when
we confirm." Never ask for health, injury, medication or pregnancy details in the form. Proposed
engine work: `docs/ENGINE-PROPOSAL-pilates-studio.md` in the Niche Pack workspace.

## Where things live

| What | Where |
|---|---|
| Engine instance (preview: name, `America/Phoenix`, placeholder contact) | `src/lib/engine.ts` |
| This site's preset (sample sessions, hours, policies; "clients"/"sessions") — also the dashboard's starter set | `src/lib/preset.ts` (`sitePreset`) |
| Kind (introduction · reformer · mat · mobility · technique · other, from the name), short names for the rail, page order (introduction first), booking-sheet groups (`kinds`), "Good for:" parsing, length and price terms, `cheapest`, `lengthRange` | `src/lib/services.ts` |
| What the owner can edit (every text and photo — hero photo, one-to-one photo and points, five session photos, "Where to start" answers, equipment photo and parts, first-session steps and photo, three room photos and captions, questions & policies, booking words and photo, finding-us note, logo, accent colour) | `src/content/site.ts` (`defineSiteContent`) |
| Content store + brand → CSS variable (`--accent`) | `src/lib/content.ts` |
| Design tokens — the ONLY file with raw colours, fonts, sizes, spacing | `src/styles/tokens.css` |
| Base / page / booking styles (tokens only) | `src/styles/base.css`, `site.css`, `booking.css` (note: booking.css owns `.rail`, `.parts`, `.part` for the calendar — the page uses `.crail`, `.anatomy`) |
| Sections | `src/components/*.tsx` (Header (scroll rail), Hero `#top` (live facts, open-now), Private `#private`, Sessions `#sessions` (paths, the rail tab list on ≥ 1080 px, cards below), Apparatus `#equipment` (pins on the default photo), FirstSession `#first-session` (stops on a scroll-driven rail), Room `#room`, GoodToKnow `#questions`, BookingSection `#book` (ultramarine band), Visit `#visit`, Footer); the rail ornament `Rail.tsx`; scroll reveals `src/lib/reveal.ts` (`data-reveal`); the section list for header, phone menu and footer is `src/lib/nav.ts` |
| Booking sheet (a modal `<dialog>` at `#book`; Back/Esc/✕ close it) + the `#book` band | `src/App.tsx` (open/close + history), `src/components/booking/BookingSheet.tsx`, `BookingSection.tsx`, `src/lib/dialog.ts` |
| Booking flow | `src/components/booking/` (BookingFlow = state + engine calls, root `#book-flow`; DayPicker, TimePicker, DetailsForm, CodeStep, Summary, Done) |
| "Open now" + hours changes | `src/lib/useOpening.ts`, `src/lib/hours.ts` |
| Photo variant map | `public/photos/`, `src/content/photoVariants.ts` (generated by `concepts/pilates-studio-carriage/photo-pipeline/photos.mjs`) |
| Content baked into `index.html` at build | `vite.config.ts` (`publishedSiteContent`) |

## Rules for future changes

- **Content fields:** render values as text (never `dangerouslySetInnerHTML`), images from the resolved
  `src`/`alt`. Never rename or reuse a field id on a live site — add a new id. Services, prices,
  lengths, hours, the address, phone and email are NOT content: they come from the engine.
- `src/content/site.ts` is also imported by `vite.config.ts` (Node): keep it free of local imports.
- **Every Book button** calls `startBooking()` (App): it opens the sheet, or — while online booking is off,
  unconfigured or failing — leads to the `#book` section and its contact details. A session's "Book
  this session" button passes THAT service's engine id — never a stored price or id.
- **Lengths and prices:** always from the engine (`minutesLabel`, `durationLabel`, `priceLabel`, `priceTerms`).
  Never hard-code a service, length, price or id in copy (questions and first-session steps included).
- **Sample photos:** every photo carries a "Sample photo" label until the owner replaces that field
  (`ownerFields`). Never present a stock photograph as the studio's work or a client's result, never
  show before/after images, never invent a client, a name, a licence, qualifications, years of
  experience, awards, press, reviews or testimonials.
- **Default photos:** add variants to `public/photos/` via the photo pipeline, keep the default `src`
  in `site.ts` equal to a key in `photoVariants.ts`, record the source in `PHOTOS.md`. If the
  first-screen default changes, update the `<link rel="preload">` in `index.html` (`imagesizes` must
  match `HERO_SIZES` in `src/components/Hero.tsx`).
- **Policies:** Questions & policies shows a "Sample policies" label until the owner edits `faq.items`.
- **Copy:** calm, precise, plain ("every spring set for you"); no "transform your body", "sculpt",
  "tone", "flat stomach", "perfect posture", "luxury", "elite", no result promises, no pressure, no
  clinical or rehabilitation words.
- **Style:** plain CSS with the tokens; no UI kit. 44 px tap targets, visible focus, the
  `prefers-reduced-motion` path, every text/background pair at 4.5:1 (`contrast.mjs` in the concept
  folder). The button colour on light pages is owner-editable and always carries white text
  (`--on-accent`); the ultramarine, birch and night bands are fixed (not owner-editable) so their
  contrast is known — buttons on them are chalk with ink text.
- **Composition (DESIGN.md):** four fields (ultramarine · chalk · birch · night); one tall family
  (Darker Grotesque) set light, emphasised words loaded heavy; photographs as hard-edged panels
  standing on rails; the rail as the one ornament; every section inside the one centred shell
  (`.shell`, `--page-max`) — only rails run to the screen's edges. Motion: the hero carriage gliding
  home, heavy words loading, the session carriage riding to its tab, reveals gliding in along the
  rail — all off under `prefers-reduced-motion`; never hide content without `html.js-reveal`.
- The public site stays one page (sections + in-page booking flow); no client-side path routes.

## Commands

```bash
npm run dev                              # http://localhost:5219 (preview mode without a backend)
npm run build                            # tsc -b && vite build (multi-page: / and /admin/)
npm run lint                             # oxlint (supabase/functions is ignored)
npm run dev:demo                         # the Live Demo: in-browser engine + dashboard, nothing sent
npm run build:demo                       # the public Live Demo build — never the production site
npx booking-engine doctor                # project check
npx booking-engine doctor --dist dist    # after a build: scans the output for secrets
```

Connecting a backend (Supabase, email) follows INTEGRATION.md §11 — only with the owner's go-ahead.
