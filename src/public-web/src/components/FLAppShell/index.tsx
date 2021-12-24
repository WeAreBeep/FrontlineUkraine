import React from 'react';
import { AppShell, CSSObject, MantineTheme } from '@mantine/core';
import { FLHeader } from '../FLHeader';
import { FLFooter } from '../FLFooter';
import { getThemePrimaryColor } from '../../utils/mantine';
import { FOOTER_HEIGHT, useStyles } from './style';

function getAppShellCss(theme: MantineTheme): CSSObject {
  return ({
    minHeight: '100vh',
    backgroundColor: getThemePrimaryColor(theme),
    paddingBottom: FOOTER_HEIGHT,
  });
}

export const FLAppShell: React.FC = ({ children }) => {
  const { classes } = useStyles();
  return (
    <>
      <AppShell
        sx={getAppShellCss}
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
