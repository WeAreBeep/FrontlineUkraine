import { MantineSize, MantineTheme } from '@mantine/core';

export function getThemePrimaryColor(
  theme: MantineTheme,
  position: number = 0
) {
  return theme.colors[theme.primaryColor][position];
}

export function mediaScreenMin(theme: MantineTheme, breakpoint: MantineSize) {
  return `@media (min-width: ${theme.breakpoints[breakpoint]}px)`;
}

export function tablet(theme: MantineTheme) {
  return mediaScreenMin(theme, 'md');
}
