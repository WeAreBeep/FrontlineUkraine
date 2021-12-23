import { createStyles } from '@mantine/core';
import { getThemePrimaryColor } from '../../utils/mantine';

export const useStyles = createStyles((theme) => ({
  footer: {
    backgroundColor: getThemePrimaryColor(theme),
    boxShadow: '-1px -6px 12px rgba(0, 0, 0, 0.3)',
  },
  container: {
    color: '#ffffff',
    padding: '1rem',
    a: {
      textDecoration: 'none',
      transition: 'all 1s ease-out',

      color: '#ffffff',
      '&:hover': {
        color: '#000000',
      },
    },
  },
  footerLinkItem: {
    padding: '0.5rem',
  },
}));
