import type { SiteValues } from '../lib/content';
import { Emphasis } from './Emphasis';
import { Photo } from './Photo';
import { SectionLabel } from './SectionLabel';

/**
 * One to one, on chalk: a tall photograph of an instructor guiding a client, and beside it "1:1" set
 * very large behind the heading, the introduction and three points — one instructor, one client, one
 * plan — each on its own line of the rail.
 */
export function Private({ values, ownerFields }: { values: SiteValues; ownerFields: string[] }) {
  const photo = values['private.photo'];
  const points = values['private.points'];
  return (
    <section className={`private${photo ? '' : ' private--text'}`} id="private" aria-labelledby="private-title">
      <div className="shell private__grid">
        {photo && (
          <figure className="private__photo" data-reveal="">
            <Photo image={photo} sizes="(min-width: 1024px) 30rem, (min-width: 640px) 50vw, 100vw" />
            {!ownerFields.includes('private.photo') && <figcaption className="photo-label">Sample photo</figcaption>}
          </figure>
        )}
        <div className="private__body">
          <p className="private__ratio" aria-hidden="true">
            1<span>:</span>1
          </p>
          <SectionLabel n="01">One to one</SectionLabel>
          <h2 id="private-title" className="section-title" data-reveal="">
            <Emphasis text={values['private.title']} />
          </h2>
          {values['private.intro'] && <p className="section-intro">{values['private.intro']}</p>}
          {points.length > 0 && (
            <ul className="points" role="list">
              {points.map((p, i) => (
                <li className="point" key={`${i}-${p.title}`} data-reveal="">
                  <span className="point__n" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="point__title">{p.title}</h3>
                  {p.text && <p className="point__text">{p.text}</p>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
