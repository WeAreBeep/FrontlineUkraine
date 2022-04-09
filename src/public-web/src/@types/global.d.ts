import { Config } from '../config';

declare global {
  interface Window {
    appConfig: Config;
  }
}
