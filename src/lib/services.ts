import { formatMoney } from '@profitstudio/booking-engine';
import type { Service } from '@profitstudio/booking-engine';

/**
 * The studio's sessions. The engine (2.0.0-beta.3) has no service categories and no per-service
 * metadata, and a service's id is a database UUID this site cannot know when it is built — so
 * everything is read from the service's own engine data:
 *
 *   1. its KIND (introduction · reformer · mat · mobility · technique), from its NAME, else its
 *      description, else "other" — it picks the session's photograph and its place in "Where to start";
 *   2. who it is GOOD FOR: the part after "Good for:" in the description;
 *   3. its LENGTH: the real time in the room; its PRICE: paid at the studio, never online; zero is free.
 *
 * The site never invents a session: an owner who renames, removes or adds services sees exactly the
 * engine's list, in the dashboard's order. Stable categories need an engine version — see
 * docs/ENGINE-PROPOSAL-pilates-studio.md in the Niche Pack workspace.
 */
export type SessionKind = 'intro' | 'reformer' | 'mat' | 'mobility' | 'technique' | 'other';

/** Checked in this order: "Introductory Reformer Session" is an introduction, "Reformer Mobility" mobility. */
const KINDS: { id: Exclude<SessionKind, 'other'>; label: string; test: RegExp }[] = [
  { id: 'intro', label: 'Introduction', test: /\b(intro(?:ductory|duction)?|first|taster|new client|welcome|assessment|consultation)\b/i },
  { id: 'technique', label: 'Technique', test: /\b(technique|tune[- ]?up|refine|refinement|express|focus|30[- ]?min)\b/i },
  { id: 'mobility', label: 'Mobility', test: /\b(mobility|movement|stretch\w*|gentle|restorative|slow)\b/i },
  { id: 'mat', label: 'Mat', test: /\bmat\b/i },
  { id: 'reformer', label: 'Reformer', test: /\b(reformer|tower|cadillac|apparatus|equipment|chair)\b/i },
];

export const KIND_LABEL: Record<SessionKind, string> = {
  intro: 'Introduction',
  reformer: 'Reformer',
  mat: 'Mat',
  mobility: 'Mobility',
  technique: 'Technique',
  other: 'Session',
};

const norm = (s: string | null | undefined) => (s ?? '').trim().replace(/\s+/g, ' ');

function kindFromText(text: string): SessionKind | null {
  for (const k of KINDS) if (k.test.test(text)) return k.id;
  return null;
}

/** "Private Mat Session" → mat; "Introductory Session" → intro; "Duet" → other. */
export function kindOf(service: Pick<Service, 'name' | 'description'>): SessionKind {
  return kindFromText(service.name) ?? kindFromText(lead(service.description)) ?? 'other';
}

/**
 * The name the page sets large: the session's name without the words every session shares
 * ("Private Reformer Session" → "Reformer"; "Mobility & Movement Session" → "Mobility & Movement").
 * The full name stays in the booking sheet, the summary and every email.
 */
export function shortName(name: string): string {
  const stripped = norm(name.replace(/\b(private|one[- ]to[- ]one|1[:-]1|pilates|session|lesson)\b/gi, ' ').replace(/\s*[—–\-·:|/(),&]+\s*$/g, ''));
  return stripped || norm(name);
}

/** For the booking sheet: the introduction first ("Start here"), then every other session in the owner's order. */
export interface Kind {
  id: 'start' | 'sessions';
  label: string;
  services: Service[];
}

export function kinds(services: readonly Service[]): Kind[] {
  const start = services.filter((s) => kindOf(s) === 'intro');
  const rest = services.filter((s) => kindOf(s) !== 'intro');
  const groups: Kind[] = [];
  if (start.length) groups.push({ id: 'start', label: 'New here? Start with', services: start });
  if (rest.length) groups.push({ id: 'sessions', label: start.length ? 'Private sessions' : 'Sessions', services: rest });
  return groups;
}

/** The services in page order: the introduction first, then the owner's order. */
export function indexOrder(services: readonly Service[]): Service[] {
  return kinds(services).flatMap((k) => k.services);
}

/** The first service of a kind, in page order — for "Where to start". */
export function firstOfKind(services: readonly Service[], kind: SessionKind): Service | null {
  return indexOrder(services).find((s) => kindOf(s) === kind) ?? null;
}

export interface Described {
  lead: string;
  /** "A steady weekly practice" — the part after "Good for:", or null. */
  goodFor: string | null;
}

const GOOD_FOR = /(?:^|[\s.])(?:good for|best for|ideal for)\s*:\s*/i;

function lead(description: string | null | undefined): string {
  return splitDescription(description).lead;
}

/** "…as you go. Good for: a steady weekly practice" → { lead: "…as you go.", goodFor: "A steady weekly practice" }. */
export function splitDescription(description: string | null | undefined): Described {
  const text = (description ?? '').trim();
  const m = GOOD_FOR.exec(text);
  if (!m) return { lead: text, goodFor: null };
  const raw = text.slice(m.index + m[0].length).trim().replace(/\.$/, '');
  return {
    lead: text.slice(0, m.index + (m[0].startsWith('.') ? 1 : 0)).trim(),
    goodFor: raw ? raw[0].toUpperCase() + raw.slice(1) : null,
  };
}

/** Kept for the shared booking flow: every session is in the studio, so there is no format to show. */
export function formatOf(_service: Pick<Service, 'description'>): { kind: 'studio'; label: string } | null {
  return null;
}

/** The booking sheet shows the session's full name, with its kind as a small tag only for the introduction. */
export function splitName(name: string): { base: string; size: string | null } {
  return { base: name, size: null };
}

export type Role = SessionKind;
export function roleOf(service: Pick<Service, 'name'>): Role {
  return kindOf({ name: service.name, description: null });
}

/** "45 min", "1 h 15 min", "2 h" — the session's length, straight from the engine. */
export function durationLabel(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
}

/** Large figures: "55", "60", "90" — Pilates sessions read in minutes up to two hours. */
export function minutesFigure(minutes: number): string {
  return minutes < 120 ? String(minutes) : durationLabel(minutes);
}

/** "55 min" up to two hours, then "2 h 15 min". */
export function minutesLabel(minutes: number): string {
  return minutes < 120 ? `${minutes} min` : durationLabel(minutes);
}

/** The same, for screen readers. */
export function durationSpoken(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${minutes} minutes`;
  const hours = `${h} hour${h > 1 ? 's' : ''}`;
  return m ? `${hours} ${m} minutes` : hours;
}

/** What the booking's LENGTH means: the time in the room with the instructor. */
export interface TimeTerms {
  role: Role;
  label: string;
  note: string | null;
}

export function timeTerms(service: Pick<Service, 'name' | 'description'>): TimeTerms {
  return { role: kindOf(service), label: 'Length', note: null };
}

type PriceInput = Pick<Service, 'priceCents' | 'priceFrom' | 'currency' | 'name'>;

/** Whole dollars print without ".00" — "$105", not "$105.00". */
const money = (cents: number, currency: string, locale: string) => formatMoney(cents, currency, locale).replace(/([.,])00(?!\d)/, '');

/**
 * What the engine's price MEANS on this site:
 *   free    → no charge
 *   from    → a starting price; the instructor confirms it before the session
 *   fixed   → the price of this session, paid at the studio — not online
 *   request → no price shown: ask the studio
 */
export interface PriceTerms {
  kind: 'free' | 'from' | 'fixed' | 'request';
  label: string;
  amount: string;
  note: string | null;
}

export function priceTerms(service: PriceInput, locale: string): PriceTerms {
  if (service.priceCents === null) return { kind: 'request', label: 'Price', amount: 'Ask the studio', note: null };
  if (service.priceCents === 0) return { kind: 'free', label: 'Price', amount: 'Free', note: 'No charge' };
  const amount = money(service.priceCents, service.currency, locale);
  if (service.priceFrom) return { kind: 'from', label: 'From', amount, note: 'Confirmed with you before the session' };
  return { kind: 'fixed', label: 'Price', amount, note: null };
}

/** One line: "$105", "from $105", "Free", "Ask the studio". */
export function priceLabel(service: PriceInput, locale: string): string {
  const t = priceTerms(service, locale);
  if (t.kind === 'from') return `from ${t.amount}`;
  return t.amount;
}

/** The lowest priced service in a list (for "Sessions from $55"), or null. */
export function cheapest(services: readonly Service[]): Service | null {
  const priced = services.filter((s) => s.priceCents !== null && s.priceCents > 0);
  priced.sort((a, b) => (a.priceCents ?? 0) - (b.priceCents ?? 0));
  return priced[0] ?? null;
}

/** The shortest and longest session lengths ("30–60 min"), or null. */
export function lengthRange(services: readonly Service[]): string | null {
  if (services.length === 0) return null;
  const mins = services.map((s) => s.durationMinutes);
  const lo = Math.min(...mins);
  const hi = Math.max(...mins);
  return lo === hi ? minutesLabel(lo) : `${lo}–${minutesLabel(hi)}`;
}
