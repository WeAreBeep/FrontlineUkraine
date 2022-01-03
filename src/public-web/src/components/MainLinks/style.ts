import { createStyles } from '@mantine/core';
import { getThemePrimaryColor } from '../../utils/mantine';

export const useStyles = createStyles((theme) => {
  return {
    linksContainer: {
      listStyle: 'none',
      padding: 0,
    },
    headerLinksContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    navLinksContainer: {
      display: 'block',
      margin: 0,
      padding: 0,
    },
    linkItem: {
      padding: '0 1rem',
      fontSize: '1.45rem',
      letterSpacing: '0.05rem',
      fontWeight: 700,
    },
    navLinkItem: {
      padding: '0.5rem',
    },
    link: {
      textDecoration: 'none',
      transition: 'all 1s ease-out',
    },
    headerLink: {
      color: '#ffffff',
      '&:hover': {
        color: '#000000',
      },
    },
    navLink: {
      color: getThemePrimaryColor(theme),
      '&:hover': {
        textDecoration: 'underline',
        filter: 'brightness(1.25)',
      },
    },
  };
});
