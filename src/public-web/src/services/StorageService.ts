import { isLocale, Locale } from '../locale/type';

export interface IStorageService {
  getLocale(): Locale | null;
  setLocale(l: Locale): void;
}

export class LocalStorageService implements IStorageService {
  private static LOCALE_KEY: string = 'locale';

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
}
