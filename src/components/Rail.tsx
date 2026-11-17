import type { CSSProperties } from 'react';

/**
 * The rail — the one ornament: the reformer drawn as a line. Two thin tracks, a carriage that rides
 * them and, where there is room, the springs that pull it home. Decorative only (aria-hidden).
 *
 * `at` places the carriage along the rail (0–1). Pieces of the page set it from their own state —
 * the header from the scroll position, the sessions list from the chosen session — and it travels
 * there on the spring curve (instant under reduced motion).
 */
export function Rail({ className, at, springs = false, style }: { className?: string; at?: number; springs?: boolean; style?: CSSProperties }) {
  const pos = at === undefined ? undefined : ({ '--at': Math.min(1, Math.max(0, at)) } as CSSProperties);
  return (
    <span className={`crail${springs ? ' crail--springs' : ''}${className ? ` ${className}` : ''}`} style={{ ...pos, ...style }} aria-hidden="true">
      <span className="crail__track" />
      {springs && <span className="crail__springs" />}
      <span className="crail__carriage" />
    </span>
  );
}
