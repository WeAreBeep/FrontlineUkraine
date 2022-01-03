import { createStyles } from '@mantine/core';
import { getThemePrimaryColor, tablet } from '../../utils/mantine';

export const useStyles = createStyles((theme) => ({
  groupContainer: {
    padding: '0.5rem',

    [tablet(theme)]: {
      padding: 0,
    },
  },
  footer: {
    backgroundColor: getThemePrimaryColor(theme),
    boxShadow: '-1px -6px 12px rgba(0, 0, 0, 0.3)',
  },
  container: {
    color: '#ffffff',
    padding: '0.25rem',
    a: {
      transition: 'all 1s ease-out',
      color: '#ffffff',
      '&:hover': {
        color: '#000000',
      },
    },
    [tablet(theme)]: {
      padding: '1rem',
    },
  },
  footerLinkItem: {
    padding: '0.25rem',
    [tablet(theme)]: {
      padding: '0.5rem',
    },
  },
}));
