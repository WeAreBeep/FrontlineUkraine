import React from 'react';
import { getDisplayNameMessageID, PpeTypeEnum } from '../../../../models/ppeType';
import { ColorSwatch, Group } from '@mantine/core';
import { PPE_TYPE_COLOR } from '../../constant';
import { useStyles } from './style';
import { FormattedMessage } from '../../../../locale/FormattedMessage';

export const PpeTypeEnumLabel: React.FC<{
  ppeType: PpeTypeEnum;
  count?: number;
  variant?: 'regular' | 'compact';
}> = ({ ppeType, count, variant }) => {
  const variant_ = variant ?? 'regular';
  const { theme, cx, classes } = useStyles();
  return (
    <Group
      noWrap={true}
      spacing="xs"
      className={cx(classes.container, {
        [classes.regular]: variant_ === 'regular',
        [classes.compact]: variant_ === 'compact',
      })}
    >
      <ColorSwatch
        color={PPE_TYPE_COLOR[ppeType]}
        size={theme.fontSizes.sm}
        radius="xs"
      />
      <span>
        <FormattedMessage id={getDisplayNameMessageID(ppeType)} />
      </span>
      {count != null && <i>{count}</i>}
    </Group>
  );
};
