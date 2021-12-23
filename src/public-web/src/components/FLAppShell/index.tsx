import React from 'react';
import { AppShell } from '@mantine/core';
import { FLHeader } from '../FLHeader';
import { FLFooter } from '../FLFooter';
import { getThemePrimaryColor } from '../../utils/mantine';
import { FOOTER_HEIGHT, useStyles } from './style';

export function FLAppShell({ children }: { children: React.ReactNode }) {
  const { classes } = useStyles();
  return (
    <>
      <AppShell
        sx={(theme) => ({
          minHeight: '100vh',
          backgroundColor: getThemePrimaryColor(theme),
          paddingBottom: FOOTER_HEIGHT,
        })}
        header={<FLHeader />}
        padding={0}
      >
        <div className={classes.contentContainer}>{children}</div>
      </AppShell>
      <div className={classes.footerContainer}>
        <FLFooter />
      </div>
    </>
  );
}
