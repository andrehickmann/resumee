export type TerminalFile = {
  id: string;
  file: string;
  icon: string;
  color: string;
};

/** Maps every navigable section onto the file it pretends to be in the editor chrome. */
export const terminalFiles: Record<string, Omit<TerminalFile, 'id'>> = {
  profil: { file: 'profil.md', icon: '#', color: '#a78bfa' },
  leistungen: { file: 'leistungen.ts', icon: 'TS', color: '#a78bfa' },
  stack: { file: 'stack.json', icon: '{}', color: '#5fe0ff' },
  projekte: { file: 'projekte.log', icon: '≡', color: '#aab3c5' },
  side: { file: 'side-projects/', icon: '▾', color: '#5fe0ff' },
  lebenslauf: { file: 'lebenslauf.yml', icon: '¶', color: '#f0abfc' },
  kontakt: { file: 'kontakt.sh', icon: '$', color: '#7ee7c4' }
};

/** Every section the scroll spy watches - `branchen` has no tab of its own. */
export const scrollSpyIds = [
  'profil',
  'leistungen',
  'stack',
  'branchen',
  'projekte',
  'side',
  'lebenslauf',
  'kontakt'
];

/** Sections that light up a tab other than their own. */
export const scrollSpyAlias: Record<string, string> = { branchen: 'stack' };
