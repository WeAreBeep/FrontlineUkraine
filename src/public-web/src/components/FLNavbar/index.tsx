import React from 'react';
import { MantineTheme, Navbar, NavbarProps } from '@mantine/core';
import { MainLinks } from '../MainLinks';

const getNavbarCss = (theme: MantineTheme) => ({
  background: theme.colors['gray'][0],
});

export const FLNavbar: React.FC<
  Omit<NavbarProps, 'children'> & { onClickLink?: () => void }
> = ({ onClickLink, ...rest }) => {
  return (
    <Navbar {...rest} padding="sm" sx={getNavbarCss}>
      <Navbar.Section>
        <MainLinks variant="navbar" onClick={onClickLink} />
      </Navbar.Section>
    </Navbar>
  );
};
