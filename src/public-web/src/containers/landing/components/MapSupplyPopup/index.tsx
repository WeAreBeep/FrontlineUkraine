import React, { useMemo } from 'react';
import { PpeTypeEnumLabel } from '../PpeTypeEnumLabel';
import { getPpeTypeEnumFromInt, PpeTypeEnum } from '../../../../models/ppeType';
import { useStyles } from './style';
import { Supply } from '../../../../models/supply';
import { AutoTranslatedText } from '../../../../components/AutoTranslatedText';
import { RemarkContextProvider } from '../../../../components/Remark/RemarkContext';
import { RemarkLegend } from '../../../../components/Remark/RemarkLegend';
import { useLocale } from '../../../../locale/LocaleProvider';

interface Props {
  supply: Supply;
}

export const MapSupplyPopup: React.FC<Props> = ({ supply }) => {
  const { classes, cx } = useStyles();
  const { renderToString } = useLocale();

  const otherTypePpeType = useMemo(() => {
    const otherTypePpeType = supply.ppeTypes.find(
      ({ ppeType }) => PpeTypeEnum.Other === getPpeTypeEnumFromInt(ppeType)
    );
    if (otherTypePpeType == null) {
      return null;
    }
    if (otherTypePpeType.ppeTypeOther == null) {
      return null;
    }
    return otherTypePpeType;
  }, [supply.ppeTypes]);
  const { datetime } = useMemo(
    () => ({
      datetime: new Date(supply.datetime),
    }),
    [supply]
  );
  const remarks = useMemo(
    () => ({
      '*': renderToString('map_pop_up_translate_by_google_description'),
    }),
    [renderToString]
  );
  return (
    <RemarkContextProvider remarks={remarks}>
      <div className={cx(classes.container)}>
        <h1>Supplies Post</h1>
        <dl>
          <dt>Postcode:</dt>
          <dd>{supply.postcode}</dd>
          <dt>Organisation:</dt>
          <dd>
            {supply.website != null && supply.website.length !== 0 ? (
              <a href={supply.website}>
                <AutoTranslatedText remark="*">
                  {supply.website}
                </AutoTranslatedText>
              </a>
            ) : (
              <AutoTranslatedText remark="*">
                {supply.organisation}
              </AutoTranslatedText>
            )}
          </dd>
          {supply.description && (
            <>
              <dt>Description:</dt>
              <dd>
                <AutoTranslatedText remark="*">
                  {supply.description}
                </AutoTranslatedText>
              </dd>
            </>
          )}
          <dt>Supplies:</dt>
          <dd>
            <ul>
              {supply.ppeTypes.map(({ ppeType }) => (
                <li key={ppeType}>
                  <PpeTypeEnumLabel
                    ppeType={getPpeTypeEnumFromInt(ppeType)!}
                    variant="compact"
                  />
                </li>
              ))}
            </ul>
          </dd>
          {otherTypePpeType && (
            <>
              <dt>Other Supplies:</dt>
              <dd>
                <AutoTranslatedText remark="*">
                  {otherTypePpeType.ppeTypeOther ?? ''}
                </AutoTranslatedText>
              </dd>
            </>
          )}
          {supply.capacityNotes && (
            <>
              <dt>Capacity Notes:</dt>
              <dd>
                <AutoTranslatedText remark="*">
                  {supply.capacityNotes}
                </AutoTranslatedText>
              </dd>
            </>
          )}
        </dl>
        <div
          className={classes.datetime}
          title={`Received ${datetime.toLocaleString()}`}
        >
          {datetime.toLocaleString()}
        </div>
        <RemarkLegend />
      </div>
    </RemarkContextProvider>
  );
};
