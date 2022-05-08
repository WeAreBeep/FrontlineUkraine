import { MantineProvider, MantineTheme } from '@mantine/core';
import React from 'react';
import { CSSObject } from '@mantine/styles/lib/tss';

function getInputWrapperStyle(theme: MantineTheme): Record<string, CSSObject> {
  return {
    description: {
      color: `${theme.colors.gray[7]} !important`,
    },
  };
}

export const FLMantineProvider: React.FC = ({ children }) => (
  <MantineProvider
    theme={{
      fontFamily:
        '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue',
      colors: {
        flGreen: [
          '#00966B',
          '#00966B',
          '#00966B',
          '#00966B',
          '#00966B',
          '#00966B',
          '#00966B',
          '#00966B',
          '#00966B',
          '#00966B',
        ],
      },
      lineHeight: 1.5,
      primaryColor: 'flGreen',
    }}
    styles={{
      InputWrapper: getInputWrapperStyle,
      TextInput: getInputWrapperStyle,
      RadioGroup: getInputWrapperStyle,
      Textarea: getInputWrapperStyle,
    }}
  >
    {children}
  </MantineProvider>
);
