import React, { useMemo } from 'react';
import { AppShell, CSSObject, MantineTheme } from '@mantine/core';
import { FLHeader } from '../FLHeader';
import { FLFooter } from '../FLFooter';
import { getThemePrimaryColor } from '../../utils/mantine';
import { FOOTER_HEIGHT, useStyles } from './style';

type BackgroundColor = 'primary' | 'white';

interface Props {
  background?: BackgroundColor;
}

function makeGetAppShellCss(
  background?: BackgroundColor
): (theme: MantineTheme) => CSSObject {
  return (theme) => ({
    minHeight: '100vh',
    backgroundColor:
      background === 'white' ? theme.white : getThemePrimaryColor(theme),
    paddingBottom: FOOTER_HEIGHT,
  });
}

export const FLAppShell: React.FC<Props> = ({ background, children }) => {
  const { classes } = useStyles();
  const getAppShellCss = useMemo(
    () => makeGetAppShellCss(background),
    [background]
  );
  return (
    <>
      <AppShell sx={getAppShellCss} header={<FLHeader />} padding={0}>
        <div className={classes.contentContainer}>{children}</div>
      </AppShell>
      <div className={classes.footerContainer}>
        <FLFooter />
      </div>
    </>
  );
};
