import { createStyles } from '@mantine/styles';
import { tablet } from '../../utils/mantine';

export const useStyles = createStyles((theme) => ({
  ourVoiceTimeline: {
    padding: `${theme.spacing.sm}px`,
    display: 'block',
    [tablet(theme)]: {
      display: 'none',
    },
  },
}));
