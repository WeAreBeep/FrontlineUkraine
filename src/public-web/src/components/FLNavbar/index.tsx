import React from 'react';
import { MantineTheme, Navbar, NavbarProps, Divider } from '@mantine/core';
import { MainLinks } from '../MainLinks';
import { LocaleControl } from '../LocaleControl';

const getNavbarCss = (theme: MantineTheme) => ({
  background: theme.colors['gray'][0],
});

export const FLNavbar: React.FC<
  Omit<NavbarProps, 'children'> & { onClickLink?: () => void }
> = ({ onClickLink, ...rest }) => {
  return (
    <Navbar {...rest} padding="sm" sx={getNavbarCss}>
      <Navbar.Section grow={true} >
        <MainLinks variant="navbar" onClick={onClickLink} />
      </Navbar.Section>
      <Divider my="sm" variant="solid" />
      <Navbar.Section>
        <LocaleControl fullWidth={true} />
      </Navbar.Section>
    </Navbar>
  );
};
