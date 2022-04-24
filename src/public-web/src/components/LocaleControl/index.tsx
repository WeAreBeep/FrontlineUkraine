import React, { useMemo } from 'react';
import { Button, SegmentedControlProps, Menu } from '@mantine/core';
import { ALL_LOCALES, Locale } from '../../locale/type';
import { useLocale } from '../../locale/LocaleProvider';

export const LocaleControl: React.FC<
  Pick<SegmentedControlProps, 'fullWidth' | 'className'>
> = () => {
  const { locale, changeLocale } = useLocale();

  const control = (
    <Button size="md" radius="xl" variant="white" uppercase={true}>
      {locale}
    </Button>
  );

  const callbacks = useMemo(() => {
    return ALL_LOCALES.reduce<Record<Locale, () => void>>((acc, key) => {
      acc[key] = () => changeLocale(key);
      return acc;
      // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
    }, {} as unknown as Record<Locale, () => void>);
  }, [changeLocale]);

  return (
    <Menu control={control}>
      <Menu.Item onClick={callbacks[Locale.En]}>English</Menu.Item>
      <Menu.Item onClick={callbacks[Locale.Uk]}>Ukrainian</Menu.Item>
    </Menu>
  );
};
