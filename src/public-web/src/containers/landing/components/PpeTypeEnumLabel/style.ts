import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme, _, getRef) => {
  const regularRef = getRef('regular');
  const compactRef = getRef('compact');

  return {
    regular: { ref: regularRef },
    compact: { ref: compactRef },
    container: {
      [`&.${regularRef}`]: {
        fontSize: theme.fontSizes.sm,
      },
      [`&.${compactRef}`]: {
        fontSize: theme.fontSizes.xs,
      },
    },
  };
});
