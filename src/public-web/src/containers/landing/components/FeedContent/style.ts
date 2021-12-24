import { createStyles } from '@mantine/core';
import { tablet } from '../../../../utils/mantine';

export const useStyles = createStyles((theme) => ({
  container: {
    padding: `${theme.spacing.sm}px`,
  },
  sectionHeader: {
    color: '#ffffff',
    fontSize: '2.5em',
    margin: '1rem auto',
    whiteSpace: 'normal',
    letterSpacing: '0.03em',
    textTransform: 'uppercase',
  },
  ourVoiceTimeline: {
    display: 'none',
    [tablet(theme)]: {
      display: 'block',
    },
  },
}));
