import { MantineSize, MantineTheme } from '@mantine/core';

export function getThemePrimaryColor(
  theme: MantineTheme,
  position: number = 0
): string | undefined {
  return theme.colors[theme.primaryColor][position];
}

export function mediaScreenMin(theme: MantineTheme, breakpoint: MantineSize): string {
  return `@media (min-width: ${theme.breakpoints[breakpoint]}px)`;
}

export function tablet(theme: MantineTheme): string {
  return mediaScreenMin(theme, 'md');
}
