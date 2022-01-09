import { createStyles } from '@mantine/styles';

export const useStyles = createStyles((theme) => ({
  content: {
    color: theme.white,
    padding: '0 0.5rem',

    a: {
      color: theme.white,
    },
    'ol > li': {
      marginBlockEnd: '0.5rem',
    },
  },
}));
