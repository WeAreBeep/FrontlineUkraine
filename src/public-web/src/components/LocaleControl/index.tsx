import React from 'react';
import { SegmentedControl, SegmentedControlProps } from '@mantine/core';
import { Locale } from '../../locale/type';
import { useLocale } from '../../locale/LocaleProvider';

export const LocaleControl: React.FC<Pick<SegmentedControlProps, 'fullWidth' | 'className'>> = (props) => {
  const { locale, changeLocale } = useLocale();
  return <SegmentedControl {...props} value={locale} onChange={changeLocale} data={[
    { label: 'English', value: Locale.En },
    { label: 'украї́нська мо́ва', value: Locale.Uk }
  ]}/>
}