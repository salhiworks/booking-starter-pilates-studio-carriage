import { useState } from 'react';
import type { CSSProperties } from 'react';
import type { SiteValues } from '../lib/content';
import { Emphasis } from './Emphasis';
import { Photo } from './Photo';
import { SectionLabel } from './SectionLabel';

/**
 * Where each numbered part sits on the ORIGINAL photograph (x, y in % of the frame). With the owner's
 * own photo the numbers leave the picture and the parts read as a numbered list only.
 */
const PINS: readonly { x: number; y: number }[] = [
  { x: 35, y: 21 }, // springs
  { x: 64, y: 27 }, // strap
  { x: 50, y: 57 }, // carriage
  { x: 50, y: 84 }, // box
];

/**
 * The equipment, on birch (the colour of the reformer's wood): the reformer and tower in a tall
 * photograph with numbered pins on it, and the parts beside it — hovering a part lights its number
 * on the photograph (decoration only: the list carries the words).
 */
export function Apparatus({ values, ownerFields }: { values: SiteValues; ownerFields: string[] }) {
  const photo = values['apparatus.photo'];
  const parts = values['apparatus.parts'];
  const sample = !ownerFields.includes('apparatus.photo');
  const [lit, setLit] = useState<number | null>(null);
  return (
    <section className={`apparatus${photo ? '' : ' apparatus--text'}`} id="equipment" aria-labelledby="apparatus-title">
      <div className="shell apparatus__grid">
        <header className="apparatus__head">
          <SectionLabel n="03">The equipment</SectionLabel>
          <h2 id="apparatus-title" className="section-title" data-reveal="">
            <Emphasis text={values['apparatus.title']} />
          </h2>
          {values['apparatus.intro'] && <p className="section-intro">{values['apparatus.intro']}</p>}
        </header>
        {photo && (
          <figure className="apparatus__photo" data-reveal="">
            <Photo image={photo} sizes="(min-width: 1024px) 28rem, (min-width: 640px) 55vw, 100vw" />
            {sample &&
              parts.slice(0, PINS.length).map((_, i) => (
                <span
                  key={i}
                  className={`pin${lit === i ? ' is-lit' : ''}`}
                  style={{ '--x': `${PINS[i].x}%`, '--y': `${PINS[i].y}%` } as CSSProperties}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
              ))}
            {sample && <figcaption className="photo-label">Sample photo</figcaption>}
          </figure>
        )}
        {parts.length > 0 && (
          <ol className="anatomy" role="list">
            {parts.map((p, i) => (
              <li
                key={`${i}-${p.name}`}
                className={`anatomy__part${lit === i ? ' is-lit' : ''}`}
                onMouseEnter={() => setLit(i)}
                onMouseLeave={() => setLit(null)}
              >
                <span className="anatomy__n" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="anatomy__name">{p.name}</h3>
                {p.text && <p className="anatomy__text">{p.text}</p>}
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
