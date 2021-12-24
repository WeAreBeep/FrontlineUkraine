import React from 'react';
import { useRoutes, BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { RouteType } from './routes';
import * as Containers from './containers';
import { FLAppShell } from './components/FLAppShell';

const InnerFLApp: React.FC = () => {
  const Match = useRoutes([
    { path: RouteType.RequestPpe, element: <Containers.RequestPpe /> },
    {
      path: RouteType.RegisterSupplies,
      element: <Containers.RegisterSupplies />,
    },
    { path: RouteType.About, element: <Containers.About /> },
    { path: RouteType.Partners, element: <Containers.Partners /> },
    { path: RouteType.Landing, element: <Containers.Landing /> },
  ]);
  return (
    <MantineProvider
      theme={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue',
        colors: {
          'flGreen': ['#00966B'],
        },
        primaryColor: 'flGreen'
      }}
    >
      <FLAppShell>{Match}</FLAppShell>
    </MantineProvider>
  );
}

export const FLApp: React.FC = () => {
  return (
    <BrowserRouter>
      <InnerFLApp />
    </BrowserRouter>
  );
}
