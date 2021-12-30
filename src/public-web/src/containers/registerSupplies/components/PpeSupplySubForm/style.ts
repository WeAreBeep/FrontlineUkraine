import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => {
  return {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    iconContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    logo: {
      height: 60,
    },
    linksContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      listStyle: 'none',
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

      color: '#ffffff',
      '&:hover': {
        color: '#000000',
      },
    },
  };
});
