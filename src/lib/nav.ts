/** The page's sections, in order — the header, the phone menu and the footer all list these. */
export const NAV: readonly { href: string; label: string; header?: false }[] = [
  { href: '#private', label: 'One to one' },
  { href: '#sessions', label: 'Sessions' },
  { href: '#equipment', label: 'The equipment', header: false },
  { href: '#first-session', label: 'First session' },
  { href: '#questions', label: 'Questions', header: false },
  { href: '#visit', label: 'Visit' },
];
