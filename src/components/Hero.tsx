import type { Business, Service } from '@profitstudio/booking-engine';
import type { StartBooking } from '../App';
import { bookLink } from '../lib/bookLink';
import type { SiteValues } from '../lib/content';
import type { Resource } from '../lib/resource';
import { cheapest, lengthRange, priceLabel } from '../lib/services';
import type { OpeningInfo } from '../lib/useOpening';
import { Emphasis } from './Emphasis';
import { Photo } from './Photo';

/** imagesizes must match the preload in index.html. */
export const HERO_SIZES = '(min-width: 1024px) min(36vw, 34rem), (min-width: 640px) 60vw, 100vw';

interface HeroProps {
  values: SiteValues;
  ownerFields: string[];
  services: Resource<Service[]>;
  business: Business | null;
  opening: OpeningInfo;
  onBook: StartBooking;
}

/**
 * The first screen, on ultramarine. The headline on the left (its heavy words the loaded spring),
 * the introduction, the main action and three live facts from the engine (the lowest price, the range
 * of lengths, one client at a time). On the right, an upright photograph standing on the rail like a
 * carriage, its springs running off to the screen's edge — on load it glides out along the rail and
 * settles back, the way a carriage comes home under control. The photograph's height follows the
 * screen's, so the action stays in the first screen from 320 × 568 to 2560 × 1440.
 */
export function Hero({ values, ownerFields, services, business, opening, onBook }: HeroProps) {
  const photo = values['hero.photo'];
  const own = ownerFields.includes('hero.photo');
  const kicker = values['hero.kicker'].trim();
  const place = values['hero.place'].trim();
  return (
    <section className={`hero${photo ? '' : ' hero--no-photo'}`} id="top" aria-labelledby="hero-title">
      <div className="hero__shell">
        <div className="hero__copy">
          <p className="hero__kicker">
            {kicker && <span>{kicker}</span>}
            {place && <span>{place}</span>}
            {opening.status && (
              <span className="hero__open" data-open={opening.status.open}>
                <span className="hero__open-dot" aria-hidden="true" />
                {opening.status.text}
              </span>
            )}
          </p>
          <h1 id="hero-title" className="hero__title">
            <Emphasis text={values['hero.title']} />
          </h1>
          {values['hero.lede'] && <p className="hero__lede">{values['hero.lede']}</p>}
          <div className="hero__actions">
            <a className="btn btn--chalk btn--large" href="#book" onClick={bookLink(onBook)}>
              {values['hero.cta']}
              <span className="btn__arrow" aria-hidden="true">
                →
              </span>
            </a>
            <a className="hero__link" href="#sessions">
              Where to start
            </a>
          </div>
          <Facts services={services} business={business} />
        </div>
        {photo && (
          <figure className="hero__photo">
            <div className="hero__carriage">
              <Photo image={photo} sizes={HERO_SIZES} priority className="frame--hero" />
              {!own && <figcaption className="photo-label">Sample photo</figcaption>}
            </div>
            <span className="hero__springs" aria-hidden="true" />
          </figure>
        )}
      </div>
    </section>
  );
}

/** "From $55 · 30–60 min · One client at a time" — live from the engine. */
function Facts({ services, business }: { services: Resource<Service[]>; business: Business | null }) {
  if (services.status !== 'ready' || services.data.length === 0) return null;
  const locale = business?.locale ?? 'en-US';
  const low = cheapest(services.data);
  const range = lengthRange(services.data);
  return (
    <dl className="hero__facts">
      {low && (
        <div>
          <dt>From</dt>
          <dd>{priceLabel(low, locale).replace(/^from /, '')}</dd>
        </div>
      )}
      {range && (
        <div>
          <dt>Length</dt>
          <dd>{range}</dd>
        </div>
      )}
      <div>
        <dt>In the room</dt>
        <dd>One client</dd>
      </div>
    </dl>
  );
}
