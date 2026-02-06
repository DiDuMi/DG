export const languages = ['cn', 'en'] as const;
export type Language = (typeof languages)[number];

export const languageNames: Record<Language, string> = {
  cn: '中文',
  en: 'English',
};

export function normalizeLanguage(value: string | undefined): Language {
  if (value === 'en') return 'en';
  return 'cn';
}

export function getLanguageFromPath(pathname: string): Language | null {
  const match = pathname.match(/^\/(cn|en)(\/|$)/);
  if (!match) return null;
  return normalizeLanguage(match[1]);
}

export function withLanguage(pathname: string, lang: Language): string {
  const normalized = pathname.replace(/^\/(cn|en)(\/|$)/, '/');
  const suffix = normalized.startsWith('/') ? normalized.slice(1) : normalized;
  return `/${lang}/${suffix}`.replace(/\/+$/, '/') as string;
}
