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
      marginRight: theme.spacing.xl,
      display: 'block',
      [tablet(theme)]: {
        display: 'none',
      },
    },
    logo: {
      height: '3rem',
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
