import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import type { Business, Service, SiteImage } from '@profitstudio/booking-engine';
import type { StartBooking } from '../App';
import type { SiteValues } from '../lib/content';
import type { Resource } from '../lib/resource';
import { useMedia } from '../lib/useMedia';
import {
  durationSpoken,
  indexOrder,
  kindOf,
  KIND_LABEL,
  minutesFigure,
  priceTerms,
  shortName,
  splitDescription,
} from '../lib/services';
import type { SessionKind } from '../lib/services';
import { Emphasis } from './Emphasis';
import { Notice } from './Notice';
import { Photo } from './Photo';
import { Rail } from './Rail';
import { SectionLabel } from './SectionLabel';

interface SessionsProps {
  values: SiteValues;
  ownerFields: string[];
  services: Resource<Service[]>;
  business: Business | null;
  onRetry: () => void;
  onBook: StartBooking;
}

const PHOTO_FIELD: Record<SessionKind, keyof SiteValues & `sessions.photo${string}`> = {
  intro: 'sessions.photoIntro',
  reformer: 'sessions.photoReformer',
  mat: 'sessions.photoMat',
  mobility: 'sessions.photoMobility',
  technique: 'sessions.photoTechnique',
  other: 'sessions.photoReformer',
};

/** The session's photograph (by its kind), whether it is still the sample, or null when removed. */
function photoFor(values: SiteValues, ownerFields: string[], service: Service): { image: SiteImage; sample: boolean } | null {
  const field = PHOTO_FIELD[kindOf(service)];
  const image = values[field] as SiteImage | null;
  return image ? { image, sample: !ownerFields.includes(field) } : null;
}

/**
 * Sessions, on chalk. "Where are you starting from?" — a few answers, each pointing at the session
 * whose name holds the owner's words — then the sessions themselves, live from the engine.
 *
 * Wide screens: the rail. The sessions stand in a column beside a vertical rail (a tab list: arrow
 * keys move between them); the carriage rides to the chosen one, and the panel beside it shows its
 * photograph, description, who it is good for, its real length, its price and its own Book button.
 * Phones and tablets: every session as its own card, one after another — nothing hidden.
 */
export function Sessions({ values, ownerFields, services, business, onRetry, onBook }: SessionsProps) {
  const wide = useMedia('(min-width: 1080px)');
  const list = useMemo(() => (services.status === 'ready' ? indexOrder(services.data) : []), [services]);
  const locale = business?.locale ?? 'en-US';
  const [active, setActive] = useState<string | null>(null);
  const [flash, setFlash] = useState<string | null>(null);
  const current = list.find((s) => s.id === active) ?? list[0] ?? null;

  const paths = useMemo(
    () =>
      values['sessions.paths']
        .map((p) => {
          const words = p.match.trim().toLowerCase();
          const service = words ? list.find((s) => s.name.toLowerCase().includes(words)) : undefined;
          return service ? { label: p.label, service } : null;
        })
        .filter((p): p is { label: string; service: Service } => p !== null),
    [values, list],
  );

  const choosePath = useCallback(
    (service: Service) => {
      setActive(service.id);
      setFlash(service.id);
      if (!wide) {
        const card = document.getElementById(`session-${service.id}`);
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        card?.scrollIntoView({ block: 'start', behavior: reduce ? 'auto' : 'smooth' });
        card?.querySelector<HTMLElement>('.session-card__title')?.focus({ preventScroll: true });
      }
    },
    [wide],
  );

  useEffect(() => {
    if (!flash) return;
    const t = window.setTimeout(() => setFlash(null), 1600);
    return () => window.clearTimeout(t);
  }, [flash]);

  return (
    <section className="sessions" id="sessions" aria-labelledby="sessions-title">
      <div className="shell">
        <header className="sessions__head">
          <div>
            <SectionLabel n="02">Sessions</SectionLabel>
            <h2 id="sessions-title" className="section-title" data-reveal="">
              <Emphasis text={values['sessions.title']} />
            </h2>
            {values['sessions.intro'] && <p className="section-intro">{values['sessions.intro']}</p>}
          </div>
          {paths.length > 0 && (
            <div className="paths" role="group" aria-labelledby="paths-label">
              <p className="paths__label" id="paths-label">
                Where are you starting from?
              </p>
              <ul className="paths__list" role="list">
                {paths.map((p) => (
                  <li key={`${p.label}-${p.service.id}`}>
                    <button
                      type="button"
                      className="path"
                      aria-pressed={wide ? current?.id === p.service.id : undefined}
                      aria-controls={wide ? 'session-panel' : `session-${p.service.id}`}
                      onClick={() => choosePath(p.service)}
                    >
                      <span className="path__label">{p.label}</span>
                      <span className="path__to">
                        <span className="sr-only">: </span>
                        {shortName(p.service.name)}
                        <span aria-hidden="true"> →</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </header>

        {services.status === 'loading' && (
          <div className="sessions__loading" aria-busy="true">
            <p className="sr-only" role="status">
              Loading sessions…
            </p>
            <span className="skeleton skeleton--block" aria-hidden="true" />
          </div>
        )}
        {services.status === 'error' && (
          <Notice tone="error" action={{ label: 'Try again', onClick: onRetry }}>
            <p>We couldn’t load the sessions just now.</p>
          </Notice>
        )}
        {services.status === 'ready' && list.length === 0 && (
          <p className="sessions__empty">Sessions aren’t listed online yet — please call or email the studio.</p>
        )}

        {list.length > 0 && current && wide && (
          <RailBrowser
            list={list}
            current={current}
            flash={flash}
            locale={locale}
            values={values}
            ownerFields={ownerFields}
            onSelect={setActive}
            onBook={onBook}
          />
        )}
        {list.length > 0 && !wide && (
          <ol className="session-cards" role="list">
            {list.map((s, i) => (
              <li key={s.id} id={`session-${s.id}`} className={`session-card${flash === s.id ? ' is-flash' : ''}`} data-reveal="">
                <SessionDetail service={s} n={i + 1} locale={locale} values={values} ownerFields={ownerFields} onBook={onBook} variant="card" />
              </li>
            ))}
          </ol>
        )}

        {list.length > 0 && values['sessions.footnote'] && <p className="sessions__footnote">{values['sessions.footnote']}</p>}
      </div>
    </section>
  );
}

interface RailBrowserProps {
  list: Service[];
  current: Service;
  flash: string | null;
  locale: string;
  values: SiteValues;
  ownerFields: string[];
  onSelect: (id: string) => void;
  onBook: StartBooking;
}

/** The tab list on its rail, and the chosen session's panel. */
function RailBrowser({ list, current, flash, locale, values, ownerFields, onSelect, onBook }: RailBrowserProps) {
  const base = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const column = useRef<HTMLDivElement>(null);
  const index = Math.max(0, list.findIndex((s) => s.id === current.id));

  // The carriage rides to the chosen tab: its centre, as a share of the column's height.
  useLayoutEffect(() => {
    const tab = tabs.current[index];
    const col = column.current;
    if (!tab || !col) return;
    const place = () => {
      const top = tab.offsetTop + tab.offsetHeight / 2;
      col.style.setProperty('--carriage-y', `${top}px`);
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(col);
    return () => ro.disconnect();
  }, [index, list.length]);

  const onKey = (e: ReactKeyboardEvent<HTMLButtonElement>) => {
    const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    // Move from the tab that has focus (normally the selected one: the others are out of the Tab order).
    const from = Math.max(0, tabs.current.indexOf(e.currentTarget));
    let next: number | null = null;
    if (e.key in keys) next = (from + keys[e.key] + list.length) % list.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = list.length - 1;
    if (next === null) return;
    e.preventDefault();
    onSelect(list[next].id);
    tabs.current[next]?.focus();
  };

  return (
    <div className="rail-browser">
      <div className="rail-browser__column" ref={column}>
        <span className="rail-browser__rail" aria-hidden="true">
          <span className="rail-browser__carriage" />
        </span>
        <div className="rail-browser__tabs" role="tablist" aria-orientation="vertical" aria-label="Sessions">
          {list.map((s, i) => {
            const selected = s.id === current.id;
            const price = priceTerms(s, locale);
            return (
              <button
                key={s.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${base}-tab-${i}`}
                aria-selected={selected}
                aria-controls="session-panel"
                tabIndex={selected ? 0 : -1}
                className={`rail-tab${selected ? ' is-active' : ''}${flash === s.id ? ' is-flash' : ''}`}
                onClick={() => onSelect(s.id)}
                onKeyDown={onKey}
              >
                <span className="rail-tab__n" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="rail-tab__name">
                  {shortName(s.name)}
                  {shortName(s.name) !== s.name && <span className="sr-only"> ({s.name})</span>}
                </span>
                <span className="rail-tab__meta">
                  <span>
                    {s.durationMinutes}
                    <span aria-hidden="true"> min</span>
                    <span className="sr-only"> minutes</span>
                  </span>
                  <span>{price.kind === 'from' ? `from ${price.amount}` : price.amount}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="rail-browser__panel" role="tabpanel" id="session-panel" aria-labelledby={`${base}-tab-${index}`} tabIndex={0}>
        <SessionDetail
          key={current.id}
          service={current}
          n={index + 1}
          locale={locale}
          values={values}
          ownerFields={ownerFields}
          onBook={onBook}
          variant="panel"
        />
      </div>
    </div>
  );
}

interface SessionDetailProps {
  service: Service;
  n: number;
  locale: string;
  values: SiteValues;
  ownerFields: string[];
  onBook: StartBooking;
  variant: 'panel' | 'card';
}

/** One session: photo, kind, name, description, good for, length, price and its Book button. */
function SessionDetail({ service, n, locale, values, ownerFields, onBook, variant }: SessionDetailProps) {
  const { lead, goodFor } = splitDescription(service.description);
  const price = priceTerms(service, locale);
  const kind = kindOf(service);
  const photo = photoFor(values, ownerFields, service);
  return (
    <article className={`session session--${variant}${photo ? '' : ' session--no-photo'}`} data-kind={kind}>
      {photo && (
        <figure className="session__photo">
          <Photo image={photo.image} sizes={variant === 'panel' ? '(min-width: 1440px) 26rem, 24vw' : '(min-width: 640px) 40vw, 100vw'} />
          {photo.sample && <figcaption className="photo-label">Sample photo</figcaption>}
        </figure>
      )}
      <div className="session__body">
        <p className="session__kind">
          <span className="session__n">{String(n).padStart(2, '0')}</span>
          {kind !== 'other' && <span>{KIND_LABEL[kind]}</span>}
        </p>
        <h3 className="session-card__title session__name" tabIndex={-1}>
          {service.name}
        </h3>
        {lead && <p className="session__lead">{lead}</p>}
        {goodFor && (
          <p className="session__good">
            <span className="session__good-label">Good for</span> {goodFor}
          </p>
        )}
        <dl className="session__figures">
          <div>
            <dt>Length</dt>
            <dd>
              <span className="figure" aria-hidden="true">
                {minutesFigure(service.durationMinutes)}
                {service.durationMinutes < 120 && <small>min</small>}
              </span>
              <span className="sr-only">{durationSpoken(service.durationMinutes)}</span>
            </dd>
          </div>
          <div>
            <dt>{price.label}</dt>
            <dd>
              <span className="figure">{price.amount}</span>
              <span className="session__pay">{price.note ?? 'Paid at the studio'}</span>
            </dd>
          </div>
        </dl>
        <Rail className="crail--session" springs />
        <button type="button" className="btn btn--accent session__book" onClick={() => onBook(service.id)}>
          Book this session
          <span className="sr-only">: {service.name}</span>
          <span className="btn__arrow" aria-hidden="true">
            →
          </span>
        </button>
      </div>
    </article>
  );
}
