import { createStyles } from '@mantine/core';
import { tablet } from '../../utils/mantine';

export const FOOTER_HEIGHT = '4rem';
export const HEADER_HEIGHT = '4.2rem';

export const useStyles = createStyles((theme) => ({
  navbar: {
    position: 'fixed',
    left: 0,
    top: HEADER_HEIGHT,
    height: `calc(100vh - ${HEADER_HEIGHT})`,

    [tablet(theme)]: {
      display: 'none',
    },
  },
  footerContainer: {
    position: 'static',
    [tablet(theme)]: {
      height: FOOTER_HEIGHT,
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
    },
  },
  contentContainer: {
    // Need to check the position of the header before updating the height of the container.
    // If the header is fixed position, you need to use padding.
    paddingTop: HEADER_HEIGHT,
    minHeight: `calc(100vh - ${HEADER_HEIGHT})`,

    [tablet(theme)]: {
      paddingTop: HEADER_HEIGHT,
      minHeight: 0,
      height: `calc(100vh - ${HEADER_HEIGHT} - ${FOOTER_HEIGHT})`,
      overflowY: 'scroll',
    },
  },
}));
