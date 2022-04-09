interface Config {
  mapboxToken: string;
  apiKey: string;
  apiEndpoint: string;
  contentful: {
    deliveryApiKey: string;
    spaceId: string;
    environment: string;
    usePreviewApi: boolean;
  };
}

export const config: Config = window.appConfig;
