import React, { useMemo } from 'react';
import { PpeTypeEnumLabel } from '../PpeTypeEnumLabel';
import { getPpeTypeEnumFromInt } from '../../../../models/ppeType';
import { CategoryEnum } from '../../type';
import { useStyles } from './style';
import { CityMapData } from '../../../../models/cityMapData';
import { MultilingualText } from '../../../../components/MultilingualText';

interface Props {
  cityData: CityMapData;
  variant: CategoryEnum.Need | CategoryEnum.NeedMet;
}

export const MapCityDataPopup: React.FC<Props> = ({ cityData, variant }) => {
  const { classes, cx } = useStyles();
  const ppeTypes = useMemo(() => {
    switch (variant) {
      case CategoryEnum.Need:
        return cityData.needsResourceTypeStat;
      case CategoryEnum.NeedMet:
        return cityData.metResourceTypeStat;
      default:
        return [];
    }
  }, [variant, cityData]);
  const { title, ppeTypeTitle } = useMemo(() => {
    switch (variant) {
      case CategoryEnum.Need:
        return {
          title: 'Needs Post',
          ppeTypeTitle: 'Needs',
        };
      case CategoryEnum.NeedMet:
        return {
          title: 'Met Needs',
          ppeTypeTitle: 'Needs Met',
        };
      default:
        return {
          title: 'Unknown',
          ppeTypeTitle: 'Unknown',
        };
    }
  }, [variant]);
  return (
    <div
      className={cx(classes.container, {
        [classes.need]: variant === CategoryEnum.Need,
        [classes.needMet]: variant === CategoryEnum.NeedMet,
      })}
    >
      <h1>{title}</h1>
      <dl>
        <dt>City</dt>
        <dd>
          <MultilingualText text={cityData.city.name} />
        </dd>
        <dt>{ppeTypeTitle}:</dt>
        <dd>
          <ul>
            {ppeTypes.map(([ppeType]) => (
              <li key={ppeType}>
                <PpeTypeEnumLabel
                  ppeType={getPpeTypeEnumFromInt(ppeType)!}
                  variant="compact"
                />
              </li>
            ))}
          </ul>
        </dd>
      </dl>
    </div>
  );
};
