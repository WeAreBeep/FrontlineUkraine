import { isLocale, Locale } from '../locale/type';

export interface IStorageService {
  getLocale(): Locale | null;
  setLocale(l: Locale): void;
  getTranslationData(language: string, key: string): string | undefined;
  setTranslationData(language: string, key: string, content: string): void;
}

export class LocalStorageService implements IStorageService {
  private static LOCALE_KEY: string = 'fl_locale';
  private static TRANSLATION_KEY: string = 'fl_translation'

  private readonly storageImpl: Storage;

  constructor(storageImpl: Storage) {
    this.storageImpl = storageImpl;
  }

  getLocale(): Locale | null {
    const raw = this.storageImpl.getItem(LocalStorageService.LOCALE_KEY);
    if (raw && isLocale(raw)) return raw;
    return null;
  }

  setLocale(l: Locale): void {
    this.storageImpl.setItem(LocalStorageService.LOCALE_KEY, l);
  }

  getTranslationData(language: string, key: string): string | undefined {
    return this.getTranslationDict(language)[key];
  }

  setTranslationData(language: string, key: string, content: string): void {
    const translationDataKey = LocalStorageService.getTranslationDictKey(language);
    try {
      this.storageImpl.setItem(translationDataKey, JSON.stringify({
        ...this.getTranslationDict(translationDataKey),
        [key]: content,
      }))
    } catch (e: unknown) {
      console.error(e);
      // NOTE: could be running out of space, reset item
      this.storageImpl.removeItem(translationDataKey);
      this.storageImpl.setItem(translationDataKey, JSON.stringify({
        [key]: content
      }))
    }
  }

  private getTranslationDict(language: string): Record<string, string | undefined> {
    const raw = this.storageImpl.getItem(LocalStorageService.getTranslationDictKey(language));
    try {
      if (!raw) {
        return {};
      }
      return JSON.parse(raw);
    } catch (e: unknown) {
      console.error(e);
      return { };
    }
  }

  private static getTranslationDictKey(language: string): string {
    return `${LocalStorageService.TRANSLATION_KEY}_${language}`;
  }
}
