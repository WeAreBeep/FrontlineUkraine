interface Config {
  mapboxToken: string;
  apiKey: string;
  apiEndpoint: string;
}

export const config: Config = window.appConfig;
