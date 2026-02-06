import cn from '../content/site/cn.json';
import en from '../content/site/en.json';
import type { Language } from './i18n';

export type SiteContent = typeof cn;

export function getSiteContent(lang: Language): SiteContent {
  return lang === 'en' ? (en as SiteContent) : (cn as SiteContent);
}
