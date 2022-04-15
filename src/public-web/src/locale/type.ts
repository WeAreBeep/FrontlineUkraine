import enMessage from './messages/en';

export type MessageID = keyof typeof enMessage;

export type Messages = {[k in MessageID]: string};

export enum Locale {
  En = 'en',
  Uk = 'uk'
}

export const ALL_LOCALES = [
  Locale.En,
  Locale.Uk,
];

export function isLocale(sth: unknown): sth is Locale {
  return ALL_LOCALES.some(l => sth === l);
}