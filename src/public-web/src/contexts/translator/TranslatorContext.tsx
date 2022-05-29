import React from 'react';
import { useService } from '../ServiceContext';
import { TranslatorCacheProvider } from './TranslatorCacheProvider';
import { useLocale } from '../../locale/LocaleProvider';
import { Translator } from 'react-auto-translate';
import { Locale } from '../../locale/type';
import { config } from '../../config';

export const TranslatorProvider: React.FC = ({ children }) => {
  const { storage } = useService();
  const { locale } = useLocale();
  const cacheProvider = React.useMemo(
    () => new TranslatorCacheProvider(storage),
    [storage]
  );

  return (
    <Translator
      to={locale}
      from={Locale.Uk}
      googleApiKey={config.googleTranslationApiKey}
      cacheProvider={cacheProvider}
    >
      {children as string}
    </Translator>
  );
};
