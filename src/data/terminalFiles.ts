export type TerminalFile = {
  id: string;
  file: string;
  icon: string;
  color: string;
};

/**
 * Icon and colour per section. The file *names* are not here: they read as German or
 * English words and therefore belong to the content, next to the rest of the copy
 * (`rd.files` in content.de.js / content.en.js).
 */
export const terminalFileMeta: Record<string, { icon: string; color: string }> = {
  profil: { icon: '#', color: '#a78bfa' },
  leistungen: { icon: 'TS', color: '#a78bfa' },
  stack: { icon: '{}', color: '#5fe0ff' },
  projekte: { icon: '≡', color: '#aab3c5' },
  side: { icon: '▾', color: '#5fe0ff' },
  lebenslauf: { icon: '¶', color: '#f0abfc' },
  kontakt: { icon: '$', color: '#7ee7c4' }
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

/**
 * The `rd` block of the content files: mostly strings, but also the nav list, the
 * stats labels, the easter-egg facts and the file-name map.
 */
export type TerminalCopy = Record<string, any>;
