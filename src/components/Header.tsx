import { useEffect, useRef, useState } from 'react';
import type { StartBooking } from '../App';
import { bookLink } from '../lib/bookLink';
import type { SiteValues } from '../lib/content';
import { NAV } from '../lib/nav';
import { Rail } from './Rail';

/** The owner's logo when set, otherwise the name mark: the name, with the descriptor small beside it. */
export function Wordmark({ values }: { values: SiteValues }) {
  const logo = values['brand.logo'];
  const name = values['brand.wordmark'];
  const descriptor = values['brand.descriptor'].trim();
  return (
    <a className="wordmark" href="#top" aria-label={`${name}${descriptor ? ` ${descriptor}` : ''} — top of the page`}>
      {logo ? (
        <img className="wordmark__logo" src={logo.src} alt="" width={logo.width ?? 160} height={logo.height ?? 40} decoding="async" />
      ) : (
        <>
          <span className="wordmark__name">{name}</span>
          {descriptor && <span className="wordmark__descriptor">{descriptor}</span>}
        </>
      )}
    </a>
  );
}

/**
 * A slim bar: the name mark, the sections, one booking action — and along its lower edge the rail,
 * whose carriage rides from one end to the other as the page scrolls (the reformer's carriage going
 * out, and coming home at the top). Transparent on ultramarine at the top, chalk once scrolled.
 * Phones: the name, a compact Book button and a Menu toggle (a light list, not a drawer).
 */
export function Header({ values, onBook }: { values: SiteValues; onBook: StartBooking }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const rail = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 8);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      rail.current?.style.setProperty('--at', String(max > 0 ? Math.min(1, Math.max(0, y / max)) : 0));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const book = bookLink(onBook);
  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="site-header__bar">
        <Wordmark values={values} />
        <nav className="site-nav" aria-label="Sections">
          <ul>
            {NAV.filter((item) => item.header !== false).map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="site-header__actions">
          <a
            className="btn btn--header"
            href="#book"
            onClick={(e) => {
              setOpen(false);
              book(e);
            }}
          >
            <span className="btn__long">{values['hero.cta']}</span>
            <span className="btn__short" aria-hidden="true">
              Book
            </span>
          </a>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="phone-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="menu-toggle__lines" aria-hidden="true" />
            <span className="sr-only">{open ? 'Close menu' : 'Menu'}</span>
          </button>
        </div>
      </div>
      <span className="site-header__rail" ref={rail}>
        <Rail className="crail--progress" />
      </span>
      <nav id="phone-menu" className="phone-menu" aria-label="Sections" hidden={!open}>
        <ul>
          {NAV.map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
