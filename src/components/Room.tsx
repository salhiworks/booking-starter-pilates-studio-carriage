import type { SiteImage } from '@profitstudio/booking-engine';
import type { SiteValues } from '../lib/content';
import { Emphasis } from './Emphasis';
import { Photo } from './Photo';
import { SectionLabel } from './SectionLabel';

const FRAMES = [
  { photo: 'room.photo1', caption: 'room.caption1', shape: 'tall', sizes: '(min-width: 1024px) 28rem, (min-width: 640px) 45vw, 100vw' },
  { photo: 'room.photo2', caption: 'room.caption2', shape: 'wide', sizes: '(min-width: 1024px) 46rem, 100vw' },
  { photo: 'room.photo3', caption: 'room.caption3', shape: 'upright', sizes: '(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 100vw' },
] as const;

/**
 * The room, on ink: the heading, then three photographs hung like a long wall — a tall one, a wide
 * one and an upright one, each with a numbered caption. Frames the owner removes simply close up.
 */
export function Room({ values, ownerFields }: { values: SiteValues; ownerFields: string[] }) {
  const frames = FRAMES.map((f) => ({ ...f, image: values[f.photo] as SiteImage | null, text: values[f.caption] })).filter((f) => f.image);
  return (
    <section className="room" id="room" aria-labelledby="room-title">
      <div className="shell">
        <header className="room__head">
          <SectionLabel n="05" tone="light">
            The room
          </SectionLabel>
          <h2 id="room-title" className="section-title" data-reveal="">
            <Emphasis text={values['room.title']} />
          </h2>
          {values['room.intro'] && <p className="section-intro">{values['room.intro']}</p>}
        </header>
        {frames.length > 0 && (
          <ul className={`wall wall--${frames.length}`} role="list">
            {frames.map((f, i) => (
              <li key={f.photo} className={`wall__frame wall__frame--${f.shape}`} data-reveal="">
                <figure>
                  <Photo image={f.image!} sizes={f.sizes} />
                  {!ownerFields.includes(f.photo) && <span className="photo-label">Sample photo</span>}
                  {f.text && (
                    <figcaption className="wall__caption">
                      <span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span> {f.text}
                    </figcaption>
                  )}
                </figure>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
