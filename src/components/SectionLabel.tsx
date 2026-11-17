import { Rail } from './Rail';

/** A section's small label: a short rail with its carriage, then "02 · Sessions". */
export function SectionLabel({ n, children, tone }: { n?: string; children: string; tone?: 'light' | 'accent' }) {
  return (
    <p className={`label${tone ? ` label--${tone}` : ''}`}>
      <Rail className="crail--label" />
      {n && <span className="label__n">{n}</span>}
      <span>{children}</span>
    </p>
  );
}
