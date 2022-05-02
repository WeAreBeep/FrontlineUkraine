import { MantineSize, MantineTheme } from '@mantine/core';

export function getThemePrimaryColor(
  theme: MantineTheme,
  position: number = 0
): string | undefined {
  return theme.colors[theme.primaryColor][position];
}

export function mediaMinWidthConstraint(
  theme: MantineTheme,
  breakpoint: MantineSize
): string {
  return `(min-width: ${theme.breakpoints[breakpoint]}px)`;
}

export function mediaScreenMin(
  theme: MantineTheme,
  breakpoint: MantineSize
): string {
  return `@media ${mediaMinWidthConstraint(theme, breakpoint)}`;
}

export function tablet(theme: MantineTheme): string {
  return mediaScreenMin(theme, 'md');
}

export function tabletConstraint(theme: MantineTheme): string {
  return mediaMinWidthConstraint(theme, 'md');
}
