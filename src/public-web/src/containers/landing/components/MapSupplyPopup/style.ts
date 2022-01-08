import { createStyles } from '@mantine/core';
import { POINT_COLORS } from '../../constant';
import { CategoryEnum } from '../../type';

export const useStyles = createStyles((theme) => {
  return {
    container: {
      [`h1, dt`]: {
        color: POINT_COLORS[CategoryEnum.Supply],
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
