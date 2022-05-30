import React, { useCallback, useState } from 'react';
import { Locale } from '../../locale/type';
import { useLocale } from '../../locale/LocaleProvider';
import { Translate } from 'react-auto-translate';
import { Remark } from '../Remark/Remark';

export const AutoTranslatedText: React.FC<{
  children: string;
  withOriginal?: boolean;
  remark?: string;
}> = ({ children, withOriginal = true, remark = undefined }) => {
  const { locale } = useLocale();
  const [isDifferent, setDifferent] = useState(true);
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
      <span>{children}</span>
      {withOriginal && isDifferent && (
        <>
          <br />(
          <Translate onTranslated={handleTranslated}>{children}</Translate>
          {remark && <Remark remark={remark} />})
        </>
      )}
    </>
  );
};
