import type { Preset } from '@profitstudio/booking-engine';

/**
 * Long Room Pilates' own preset (INTEGRATION.md §5): the sample services, hours and policies preview
 * mode shows, and the starter set the dashboard offers an owner who has no services yet
 * (<BookingAdmin presets>). Prices are in US dollars, in cents.
 *
 * WHAT A BOOKING IS HERE. One booking = ONE private session: a reserved block of the instructor's time
 * with ONE client, on the studio's one calendar (one instructor, one room), for ONE service. There are
 * no classes, no capacities, no second instructor. Its length is the real time in the room; the
 * buffer after it is the reset (springs, straps, a wipe-down) before the next client. The instructor
 * reviews and confirms every request (`autoConfirm: false`).
 *
 * WHAT A PRICE IS HERE. The engine has one price per service: the price of that session, paid at the
 * studio — never online. No packages, memberships or credits (they need an engine with payments).
 *
 * Movement, not medicine: a description never promises a result or treats a condition, and the
 * booking form never asks health questions (see CLAUDE.md). A description may end with "Good for: …"
 * — who it usually suits, in the client's own terms. The website shows it as its own line.
 *
 * The website reads each session's KIND (introduction · reformer · mat · mobility · technique) from
 * its name (src/lib/services.ts) to pick its photograph and its place in "Where to start".
 */
export const sitePreset = {
  id: 'pilates-studio',
  label: 'Private Pilates Studio',
  terminology: { customer: 'client', customers: 'clients', booking: 'session', bookings: 'sessions' },
  previewBusiness: {
    name: 'Sample Pilates Studio',
    currency: 'USD',
    locale: 'en-US',
    contact: {
      email: 'hello@example.com',
      phone: '+1 520-555-0100',
      address: '100 Example Street, Tucson, AZ',
    },
  },
  policies: {
    slotIntervalMinutes: 15,
    minNoticeMinutes: 720,
    maxAdvanceDays: 42,
    autoConfirm: false,
    requirePhone: true,
    pendingHoldMinutes: 1440,
    verificationWindowMinutes: 15,
  },
  // One instructor: early starts for before work, two long days with evenings, a short Saturday; closed Sunday.
  workingHours: [
    { weekday: 1, start: '07:00', end: '19:00' },
    { weekday: 2, start: '06:30', end: '14:00' },
    { weekday: 3, start: '07:00', end: '19:00' },
    { weekday: 4, start: '06:30', end: '14:00' },
    { weekday: 5, start: '07:00', end: '15:00' },
    { weekday: 6, start: '08:00', end: '12:00' },
  ],
  services: [
    {
      name: 'Introductory Session',
      description:
        'Your first hour here. We talk through how you move day to day and what you would like from Pilates, then learn the basics together — breathing, the reformer’s springs and straps, a few mat essentials. Good for: anyone new to Pilates, or new to this studio',
      durationMinutes: 60,
      bufferAfterMinutes: 15,
      priceCents: 7500,
      priceFrom: false,
    },
    {
      name: 'Private Reformer Session',
      description:
        'One-to-one on the reformer, with the tower when it helps: springs set for you, every movement cued and adjusted as you go. The heart of most people’s practice here. Good for: a steady weekly practice',
      durationMinutes: 55,
      bufferAfterMinutes: 15,
      priceCents: 10500,
      priceFrom: false,
    },
    {
      name: 'Private Mat Session',
      description:
        'Classical mat work with small props — a ring, a ball, a foam roller — built into a sequence you can take home and repeat. Good for: practising between sessions, with no equipment at home',
      durationMinutes: 55,
      bufferAfterMinutes: 15,
      priceCents: 9000,
      priceFrom: false,
    },
    {
      name: 'Mobility & Movement Session',
      description:
        'A slower session across the reformer and the mat: lighter springs, fuller ranges and time to notice how you move. Good for: easing back in after time away',
      durationMinutes: 45,
      bufferAfterMinutes: 15,
      priceCents: 8000,
      priceFrom: false,
    },
    {
      name: 'Pilates Technique Session',
      description:
        'Half an hour on one thing you want to understand better — footwork, the hundred, rolling like a ball, a transition from your classes. Good for: refining one movement',
      durationMinutes: 30,
      bufferAfterMinutes: 15,
      priceCents: 5500,
      priceFrom: false,
    },
  ],
} satisfies Preset;
