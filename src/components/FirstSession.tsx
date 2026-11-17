import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import type { SiteValues } from '../lib/content';
import { Emphasis } from './Emphasis';
import { Photo } from './Photo';
import { Rail } from './Rail';
import { SectionLabel } from './SectionLabel';

/**
 * Your first session, on chalk: the steps of the hour as stops along one rail — the carriage travels
 * from the first stop to the last as the section scrolls past (it simply rests at the end under
 * reduced motion) — beside a tall, light-filled photograph; then the doctor-first small print.
 */
export function FirstSession({ values, ownerFields }: { values: SiteValues; ownerFields: string[] }) {
  const steps = values['first.steps'];
  const photo = values['first.photo'];
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.setProperty('--at', '1');
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the steps' top reaches 80 % of the screen, 1 when their bottom reaches 45 %.
      const start = vh * 0.8;
      const end = vh * 0.45;
      const p = (start - r.top) / Math.max(1, start - end + r.height);
      el.style.setProperty('--at', String(Math.min(1, Math.max(0, p))));
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

  return (
    <section className={`first${photo ? '' : ' first--text'}`} id="first-session" aria-labelledby="first-title">
      <div className="shell first__grid">
        <div className="first__main">
          <header className="first__head">
            <SectionLabel n="04">First session</SectionLabel>
            <h2 id="first-title" className="section-title" data-reveal="">
              <Emphasis text={values['first.title']} />
            </h2>
            {values['first.intro'] && <p className="section-intro">{values['first.intro']}</p>}
          </header>
          {steps.length > 0 && (
            <div className="stops" ref={track} style={{ '--stops': steps.length } as CSSProperties}>
              <Rail className="crail--stops" />
              <ol className="stops__list" role="list">
                {steps.map((s, i) => (
                  <li className="stop" key={`${i}-${s.title}`}>
                    <span className="stop__dot" aria-hidden="true" />
                    <span className="stop__n" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="stop__title">{s.title}</h3>
                    {s.text && <p className="stop__text">{s.text}</p>}
                  </li>
                ))}
              </ol>
            </div>
          )}
          {values['first.note'] && <p className="first__note">{values['first.note']}</p>}
        </div>
        {photo && (
          <figure className="first__photo" data-reveal="">
            <Photo image={photo} sizes="(min-width: 1024px) 26rem, (min-width: 640px) 50vw, 100vw" />
            {!ownerFields.includes('first.photo') && <figcaption className="photo-label">Sample photo</figcaption>}
          </figure>
        )}
      </div>
    </section>
  );
}
