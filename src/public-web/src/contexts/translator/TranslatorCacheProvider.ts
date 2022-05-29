import type { CacheProvider } from 'react-auto-translate/src/types';
import { IStorageService } from '../../services/StorageService';
import md5 from 'crypto-js/md5';
import Hex from 'crypto-js/enc-hex';

export class TranslatorCacheProvider implements CacheProvider {
  private readonly storageProvider: IStorageService;

  constructor(storageProvider: IStorageService) {
    this.storageProvider = storageProvider;
    this.get.bind(this);
    this.set.bind(this);
  }

  async get(language: string, key: string): Promise<string | undefined> {
    const storageKeyWordArray = md5(key);
    const storageKeyStr = Hex.stringify(storageKeyWordArray);
    return this.storageProvider.getTranslationData(language, storageKeyStr)
  }

  set(language: string, key: string, translation: string): void {
    const storageKeyWordArray = md5(key);
    const storageKeyStr = Hex.stringify(storageKeyWordArray);
    this.storageProvider.setTranslationData(language, storageKeyStr, translation);
  }
}