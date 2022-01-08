import React from 'react';
import { PpeTypeEnum, PpeTypeName } from '../../../../models/ppeType';
import { ColorSwatch, Group, useMantineTheme } from '@mantine/core';
import { PPE_TYPE_COLOR } from '../../constant';

export const PpeTypeEnumLabel: React.FC<{
  ppeType: PpeTypeEnum;
  count?: number;
}> = ({ ppeType, count }) => {
  const theme = useMantineTheme();
  return (
    <Group noWrap={true} spacing="xs">
      <ColorSwatch
        color={PPE_TYPE_COLOR[ppeType]}
        size={theme.fontSizes.sm}
        radius="xs"
      />
      <span style={{ fontSize: theme.fontSizes.sm }}>
        {PpeTypeName[ppeType]}
      </span>
      {count != null && <i>{count}</i>}
    </Group>
  );
};
