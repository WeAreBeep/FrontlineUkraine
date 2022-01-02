import { createStyles } from '@mantine/core';

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
      listStyle: 'none',
      padding: 0,
      display: 'block',
    },
    linkItem: {
      padding: '0 1rem',
      fontSize: '1.45rem',
      letterSpacing: '0.05rem',
      fontWeight: 700,
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
      color: theme.colors.dark[0],
      '&:hover': {
        color: theme.colors.dark[2],
      },
    },
  };
});
