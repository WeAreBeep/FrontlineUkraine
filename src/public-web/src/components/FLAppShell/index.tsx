import React, { useCallback, useMemo, useState } from 'react';
import { AppShell, CSSObject, MantineTheme } from '@mantine/core';
import { FLHeader } from '../FLHeader';
import { FLFooter } from '../FLFooter';
import { getThemePrimaryColor, tablet } from '../../utils/mantine';
import { FOOTER_HEIGHT, useStyles } from './style';
import { FLNavbar } from '../FLNavbar';
import { useScrollLock } from '@mantine/hooks';

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
    [tablet(theme)]: {
      paddingBottom: FOOTER_HEIGHT,
    },
  });
}

export const FLAppShell: React.FC<Props> = ({ background, children }) => {
  const { classes } = useStyles();
  const [_, setScrollLocked] = useScrollLock();
  const [menuOpened, setMenuOpened] = useState(false);
  const handleMenuToggle = useCallback(() => {
    const isMenuVisible = !menuOpened;
    setMenuOpened(isMenuVisible);
    setScrollLocked(isMenuVisible);
  }, [menuOpened, setScrollLocked]);
  const getAppShellCss = useMemo(
    () => makeGetAppShellCss(background),
    [background]
  );
  return (
    <>
      <AppShell
        sx={getAppShellCss}
        header={
          <FLHeader
            burgerOpened={menuOpened}
            onBurgerClick={handleMenuToggle}
          />
        }
        padding={0}
        navbarOffsetBreakpoint="md"
        navbar={
          <FLNavbar
            hiddenBreakpoint="md"
            hidden={!menuOpened}
            className={classes.navbar}
            onClick={handleMenuToggle}
          />
        }
      >
        <div className={classes.contentContainer}>{children}</div>
      </AppShell>
      <div className={classes.footerContainer}>
        <FLFooter />
      </div>
    </>
  );
};
