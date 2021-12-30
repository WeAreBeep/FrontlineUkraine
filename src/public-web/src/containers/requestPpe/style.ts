import { createStyles } from '@mantine/styles';

export const useStyles = createStyles((theme) => ({
  scrollContainer: {
    backgroundColor: theme.white,
    height: '100%',
    overflowY: 'scroll',
  },
}));
