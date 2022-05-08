import { CSSObject, Global, MantineTheme } from '@mantine/core';
import React from 'react';

const makeStyle: (theme: MantineTheme) => CSSObject = (theme: MantineTheme) => ({
  '*, *::before, *::after': {
    boxSizing: 'border-box',
  },

  body: {
    ...theme.fn.fontStyles(),
    lineHeight: theme.lineHeight,
  },
})

export const FLGlobalStyle: React.FC = () => {
  return (
    <Global
      styles={makeStyle}
    />
  );
}