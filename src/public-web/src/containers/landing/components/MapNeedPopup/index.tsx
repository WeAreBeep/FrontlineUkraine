import React, { useMemo } from 'react';
import { Need } from '../../../../models/need';
import {
  getPpeStatusEnumFromInt,
  PpeStatus,
} from '../../../../models/ppeStatus';
import { PpeTypeEnumLabel } from '../PpeTypeEnumLabel';
import {
  getPpeTypeEnumFromInt,
  isResourceTypeOther,
} from '../../../../models/ppeType';
import { CategoryEnum } from '../../type';
import { useStyles } from './style';

interface Props {
  need: Need;
  allowStatuses: PpeStatus[];
  variant: CategoryEnum.Need | CategoryEnum.NeedMet;
}

export const MapNeedPopup: React.FC<Props> = ({
                                                need,
                                                allowStatuses,
                                                variant,
                                              }) => {
  const { classes, cx } = useStyles();
  const allowStatusesSet = useMemo(
    () => new Set<PpeStatus>(allowStatuses),
    [allowStatuses]
  );
  const { title, otherPpeTitle, ppeTypeTitle } = useMemo(() => {
    switch (variant) {
      case CategoryEnum.Need:
        return {
          title: 'Needs Post',
          ppeTypeTitle: 'Needs',
          otherPpeTitle: 'Other Needs',
        };
      case CategoryEnum.NeedMet:
        return {
          title: 'Met Needs',
          ppeTypeTitle: 'Needs Met',
          otherPpeTitle: 'Other Needs Met',
        };
      default:
        return {
          title: 'Unknown',
          ppeTypeTitle: 'Unknown',
          otherPpeTitle: 'Unknown',
        };
    }
  }, [variant]);
  const otherTypePpeTypes = useMemo(() => {
    return need.ppeTypes.filter(({ ppeType, status, ppeTypeOther }) => {
      const typeEnum = getPpeTypeEnumFromInt(ppeType);
      const statusEnum = getPpeStatusEnumFromInt(status);
      return (
        typeEnum &&
        statusEnum &&
        isResourceTypeOther(typeEnum) &&
        allowStatusesSet.has(statusEnum) &&
        ppeTypeOther
      );
    });
  }, [allowStatusesSet, need.ppeTypes]);
  const { datetime } = useMemo(
    () => ({
      datetime: new Date(need.datetime),
    }),
    [need]
  );
  return (
    <div
      className={cx(classes.container, {
        [classes.need]: variant === CategoryEnum.Need,
        [classes.needMet]: variant === CategoryEnum.NeedMet,
      })}
    >
      <h1>{title}</h1>
      <dl>
        <dt>what3words address:</dt>
        <dd>
          <a href={`https://what3words.com/${need.postcode}`} title="what3words address" target="_blank" rel="noreferrer" >
            {need.postcode}  
          </a>
        </dd>
        <dt>Organisation:</dt>
        <dd>{need.organisation}</dd>
        {need.department && <>
          <dt>Department:</dt>
          <dd>{need.department}</dd>
        </>}
        {need.contactName && <>
          <dt>Contact name:</dt>
          <dd>{need.contactName}</dd>
        </>}
        {need.phoneNumber && <>
          <dt>Phone number:</dt>
          <dd>{need.phoneNumber}</dd>
        </>}
        <dt>{ppeTypeTitle}:</dt>
        <dd>
          <ul>
            {need.ppeTypes
              .filter(({ status: ordValue }) => {
                const status = getPpeStatusEnumFromInt(ordValue);
                return status != null && allowStatusesSet.has(status);
              })
              .map(({ ppeType }) => (
                <li key={ppeType}>
                  <PpeTypeEnumLabel
                    ppeType={getPpeTypeEnumFromInt(ppeType)!}
                    variant="compact"
                  />
                </li>
              ))}
          </ul>
        </dd>
        {otherTypePpeTypes.length > 0 && (
          <>
            <dt>{otherPpeTitle}</dt>
            {otherTypePpeTypes.map(({ ppeTypeOther, ppeType }) => (
              <dd key={`ppe_type_other_${ppeType}`}>{ppeTypeOther}</dd>
            ))}
          </>
        )}
      </dl>
      <div
        className={classes.datetime}
        title={`Received ${datetime.toLocaleString()}`}
      >
        {datetime.toLocaleString()}
      </div>
    </div>
  );
};
