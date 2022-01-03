import { createStyles } from '@mantine/styles';

export const useStyles = createStyles((theme) => ({
  container: {
    height: '100%',
    backgroundColor: theme.white,
    padding: theme.spacing.md,
    overflowY: 'scroll',
  },
  partner: {
    maxWidth: '10rem',
    display: 'block',
  },
  partnerImg: {
    width: '100%',
  },
}));
