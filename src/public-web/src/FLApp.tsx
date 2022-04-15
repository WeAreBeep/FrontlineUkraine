import React from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { ContentfulClient, ContentfulProvider } from 'react-contentful';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { RouteType } from './routes';
import * as Containers from './containers';
import { APIContextProvider } from './contexts/APIContext';
import { config } from './config';
import { ServiceProvider } from './contexts/ServiceContext';
import { LocaleProvider } from './locale/LocaleProvider';
import { FLAppShell } from './components/FLAppShell';
import { Locale } from './locale/type';

// @ts-expect-error
const contentfulClient = new ContentfulClient({
  accessToken: config.contentful.deliveryApiKey,
  space: config.contentful.spaceId,
  environment: config.contentful.environment,
});

const InnerFLApp: React.FC = () => {
  const Match = useRoutes([
    { path: RouteType.RequestPpe, element: <Containers.RequestPpe /> },
    {
      path: RouteType.RegisterSupplies,
      element: <Containers.RegisterSupplies />,
    },
    { path: RouteType.About, element: <Containers.About /> },
    { path: RouteType.Partners, element: <Containers.Partners /> },
    { path: RouteType.ContactUs, element: <Containers.ContactUs /> },
    {
      path: RouteType.TermsAndConditions,
      element: <Containers.TermsAndConditions />,
    },
    { path: RouteType.Landing, element: <Containers.Landing /> },
  ]);
  return (
    <ContentfulProvider client={contentfulClient}>
      <APIContextProvider>
        <ServiceProvider windowImpl={window}>
          <LocaleProvider defaultLocale={Locale.Uk}>
            <FLAppShell>{Match}</FLAppShell>
          </LocaleProvider>
        </ServiceProvider>
      </APIContextProvider>
    </ContentfulProvider>
  );
};

export const FLApp: React.FC = () => {
  return (
    <MantineProvider
      theme={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue',
        colors: {
          flGreen: [
            '#00966B',
            '#00966B',
            '#00966B',
            '#00966B',
            '#00966B',
            '#00966B',
            '#00966B',
            '#00966B',
            '#00966B',
            '#00966B',
          ],
        },
        primaryColor: 'flGreen',
      }}
    >
      <NotificationsProvider>
        <BrowserRouter>
          <InnerFLApp />
        </BrowserRouter>
      </NotificationsProvider>
    </MantineProvider>
  );
};
