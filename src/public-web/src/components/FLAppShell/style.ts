import { createStyles } from '@mantine/core';
import { tablet } from '../../utils/mantine';

export const FOOTER_HEIGHT = '4rem';

export const useStyles = createStyles((theme) => ({
  footerContainer: {
    height: FOOTER_HEIGHT,
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
  },
  contentContainer: {
    minHeight: `calc(100vh - 96px - ${FOOTER_HEIGHT})`,

    [tablet(theme)]: {
      minHeight: 0,
      height: `calc(100vh - 96px - ${FOOTER_HEIGHT})`,
    },
  },
}));
