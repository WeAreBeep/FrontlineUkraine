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
    linksContainer: {
      display: 'none',
      margin: 0,
      [tablet(theme)]: {
        display: 'flex',
      },
    },
  };
});
