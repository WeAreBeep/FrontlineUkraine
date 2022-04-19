import React, { useEffect } from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { ContentfulClient, ContentfulProvider } from 'react-contentful';
import authgear from '@authgear/web';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { RouteType } from './routes';
import * as Containers from './containers';
import { APIContextProvider } from './contexts/APIContext';
import { config } from './config';
import { ServiceProvider } from './contexts/ServiceContext';
import { LocaleProvider } from './locale/LocaleProvider';
import { FLAppShell } from './components/FLAppShell';
import { resolveDefaultLocale } from './locale/resolveDefaultLocale';

// @ts-expect-error
const contentfulClient = new ContentfulClient({
  accessToken: config.contentful.deliveryApiKey,
  space: config.contentful.spaceId,
  environment: config.contentful.environment,
});

const InnerFLApp: React.FC = () => {
  const Match = useRoutes([
    { path: RouteType.RegisterNeed, element: <Containers.RegisterNeeds /> },
    {
      path: RouteType.RegisterSupply,
      element: <Containers.RegisterSupplies />,
    },
    { path: RouteType.About, element: <Containers.About /> },
    { path: RouteType.Suppliers, element: <Containers.Suppliers /> },
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
          <LocaleProvider defaultLocale={resolveDefaultLocale(window)}>
            <FLAppShell>{Match}</FLAppShell>
          </LocaleProvider>
        </ServiceProvider>
      </APIContextProvider>
    </ContentfulProvider>
  );
};

export const FLApp: React.FC = () => {
  useEffect(() => {
    authgear
      .configure({
        clientID: config.authgear.clientID,
        endpoint: config.authgear.endpoint,
      })
      .then(
        () => {},
        (e) => {
          console.error(e);
        }
      );
  }, []);
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
