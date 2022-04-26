import React from 'react';
import { MultilingualText as MultilingualTextModel } from '../../models/multilingualText';
import { useLocale } from '../../locale/LocaleProvider';

export const MultilingualText: React.FC<{ text: MultilingualTextModel }> = ({
  text,
}) => {
  const { locale } = useLocale();
  return <>{text[locale]}</>;
};
