import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  container: {
    padding: theme.spacing.sm,
    backgroundColor: theme.white,
  },
}));

export const useAccordionStyles = createStyles((theme, _params, getRef) => {
  const controlRef = getRef('control');
  const iconRef = getRef('icon');

  return {
    icon: { ref: iconRef },

    control: {
      ref: controlRef,
      border: 0,
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      padding: '0.5rem',
    },

    item: {
      borderBottom: 0,
      overflow: 'hidden',
      transition: `box-shadow 150ms ${theme.transitionTimingFunction}`,
      padding: 0,
    },
  };
});
