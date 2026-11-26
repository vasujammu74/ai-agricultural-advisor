export type LanguageCode = 'en' | 'te' | 'hi' | 'ta' | 'kn';

export interface Language {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
  bcp47: string;
  flag: string;
}

export const LANGUAGES: Language[] = [
  { code: 'en', label: 'English', nativeLabel: 'English', bcp47: 'en-IN', flag: 'EN' },
  { code: 'te', label: 'Telugu', nativeLabel: 'తెలుగు', bcp47: 'te-IN', flag: 'TE' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी', bcp47: 'hi-IN', flag: 'HI' },
  { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்', bcp47: 'ta-IN', flag: 'TA' },
  { code: 'kn', label: 'Kannada', nativeLabel: 'ಕನ್ನಡ', bcp47: 'kn-IN', flag: 'KN' },
];

export function getLanguage(code: LanguageCode): Language {
  return LANGUAGES.find((l) => l.code === code) || LANGUAGES[0];
}
