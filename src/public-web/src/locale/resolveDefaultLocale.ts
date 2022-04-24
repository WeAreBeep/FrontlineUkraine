import { Locale } from './type';

export const resolveDefaultLocale: (windowImpl: Window) => Locale = (
  windowImpl
) => {
  if (
    windowImpl.navigator.language
      .toLowerCase()
      .startsWith(Locale.Uk.toLowerCase())
  ) {
    return Locale.Uk;
  }
  return Locale.En;
};
