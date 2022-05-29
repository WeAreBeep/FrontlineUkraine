import React, { useCallback, useState } from 'react';
import { Locale } from '../../locale/type';
import { useLocale } from '../../locale/LocaleProvider';
import { Translate } from 'react-auto-translate';

export const AutoTranslatedText: React.FC<{
  children: string;
  withOriginal?: boolean;
}> = ({ children, withOriginal = true }) => {
  const { locale } = useLocale();
  const [isDifferent, setDifferent] = useState(false);
  const handleTranslated = useCallback(
    (translated: string) => {
      setDifferent(translated !== children);
    },
    [children]
  );

  const needTranslation = locale === Locale.En;

  if (!needTranslation) {
    return <>{children}</>;
  }

  return (
    <>
      <Translate onTranslated={handleTranslated}>{children}</Translate>{' '}
      {withOriginal && isDifferent && <>({children})</>}
    </>
  );
};
