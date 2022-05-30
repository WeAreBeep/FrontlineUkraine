import { createStyles } from '@mantine/core';
import { POINT_COLORS } from '../../constant';
import { CategoryEnum } from '../../type';
import { tablet } from '../../../../utils/mantine';

export const useStyles = createStyles((theme, _, getRef) => {
  const needRef = getRef('need');
  const needMetRef = getRef('needMet');
  return {
    need: {
      ref: needRef,
    },
    needMet: {
      ref: needMetRef,
    },
    container: {
      maxHeight: '20rem',
      overflowY: 'auto',
      [tablet(theme)]: {
        maxHeight: '32rem',
        maxWidth: '20vw',
      },
      [`&.${needRef} h1, &.${needRef} dt`]: {
        color: POINT_COLORS[CategoryEnum.Need],
      },
      [`&.${needMetRef} h1, &.${needMetRef} dt`]: {
        color: POINT_COLORS[CategoryEnum.NeedMet],
      },
      dd: {
        marginInlineStart: theme.spacing.md,
      },
      ul: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
      },
    },
    datetime: {
      cursor: 'help',
      color: theme.colors['dark'][6],
      textAlign: 'end',
    },
  };
});
