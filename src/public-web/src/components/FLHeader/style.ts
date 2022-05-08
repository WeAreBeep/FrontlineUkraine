import { createStyles } from '@mantine/core';
import { tablet } from '../../utils/mantine';

export const useStyles = createStyles((theme) => {
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
    burger: {
      marginRight: theme.spacing.sm,
      display: 'block',
      [tablet(theme)]: {
        display: 'none',
      },
    },
    logo: {
      height: '2.3rem',
      [tablet(theme)]: {
        height: '3rem',
      },
    },
    headerItemsContainer: {
      [tablet(theme)]: {
        display: 'flex',
        alignItems: 'center',
      },
    },
    linksContainer: {
      display: 'none',
      margin: 0,
      [tablet(theme)]: {
        display: 'flex',
        lineHeight: 1,
      },
    },
    localeControl: {
      [tablet(theme)]: {
        marginLeft: theme.spacing.md,
      },
    },
    accountMenu: {
      marginLeft: theme.spacing.sm,
      [tablet(theme)]: {
        marginLeft: theme.spacing.md,
      },
    },
  };
});
