import React, { ChangeEvent, useCallback, useEffect } from 'react';
import { CategoryEnum, CategoryVisibilityMap } from '../../type';
import { Control, useController, useForm } from 'react-hook-form';
import {
  PPE_TYPES,
  PpeTypeEnum,
  PpeTypeName,
} from '../../../../models/ppeType';
import {
  Accordion,
  Checkbox,
  Group,
  Radio,
  ColorSwatch,
  useMantineTheme,
} from '@mantine/core';
import { ReactHookFormRadioGroup } from '../../../../components/ReactHookFormRadioGroup';
import { useAccordionStyles, useStyles } from './style';
import { CATEGORY_NAME, POINT_COLORS, PPE_TYPE_COLOR } from '../../constant';

interface Props {
  visibility: CategoryVisibilityMap;
  onVisibilityChange: (updated: CategoryVisibilityMap) => void;
}

interface PpeTypeEnumCheckboxProps {
  control: Control<CategoryVisibilityMap>;
  name:
    | 'needs.breakdownVisibility'
    | 'needs_met.breakdownVisibility'
    | 'supplies.breakdownVisibility';
}

const PpeTypeEnumLabel: React.FC<{ ppeType: PpeTypeEnum }> = ({ ppeType }) => {
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
    </Group>
  );
};

const PpeTypeEnumCheckbox: React.FC<PpeTypeEnumCheckboxProps> = ({
  control,
  name,
}) => {
  const theme = useMantineTheme();
  const { field } = useController({
    control,
    name,
  });
  const [value, setValue] = React.useState(
    field.value as Record<PpeTypeEnum, boolean>
  );
  const makeHandleChange = useCallback(
    (option: PpeTypeEnum) => (e: ChangeEvent<HTMLInputElement>) => {
      const valueCopy = { ...value };

      // update checkbox value
      valueCopy[option] = e.target.checked;

      // send data to react hook form
      field.onChange(valueCopy);

      // update local state
      setValue(valueCopy);
    },
    [field, value]
  );

  return (
    <Group
      noWrap={true}
      spacing="xs"
      style={{ paddingLeft: theme.spacing.sm, marginTop: theme.spacing.xs }}
      direction="column"
    >
      {PPE_TYPES.map((option) => (
        <Checkbox
          size="xs"
          onChange={makeHandleChange(option)}
          checked={value[option]}
          key={option}
          value={option}
          label={<PpeTypeEnumLabel ppeType={option} />}
        />
      ))}
    </Group>
  );
};

const AccordionLabel: React.FC<{ category: CategoryEnum }> = ({ category }) => {
  const theme = useMantineTheme();
  return (
    <Group noWrap={true} spacing="xs">
      <ColorSwatch color={POINT_COLORS[category]} size={theme.fontSizes.sm} />
      <span style={{ fontSize: theme.fontSizes.sm }}>
        {CATEGORY_NAME[category]}
      </span>
    </Group>
  );
};

export const MapControl: React.FC<Props> = ({
  visibility,
  onVisibilityChange,
}) => {
  const { classes: accordionClasses } = useAccordionStyles();
  const { classes } = useStyles();
  const { control, watch } = useForm<CategoryVisibilityMap>({
    defaultValues: visibility,
  });

  useEffect(() => {
    const { unsubscribe } = watch((data) => {
      onVisibilityChange({ ...data } as CategoryVisibilityMap);
    });
    return unsubscribe;
  }, [onVisibilityChange, watch]);

  const [
    watchedNeedsVisibilityType,
    watchedNeedsMetVisibilityType,
    watchedSuppliesVisibilityType,
  ] = watch([
    'needs.visibleType',
    'needs_met.visibleType',
    'supplies.visibleType',
  ]);

  return (
    <div className={classes.container}>
      <Accordion
        iconSize={18}
        iconPosition="right"
        classNames={accordionClasses}
      >
        <Accordion.Item label={<AccordionLabel category={CategoryEnum.Need} />}>
          <ReactHookFormRadioGroup
            size="sm"
            name="needs.visibleType"
            control={control}
            variant="vertical"
            spacing="xs"
          >
            <Radio value="post">Post</Radio>
            <Radio value="breakdown">Breakdowns</Radio>
          </ReactHookFormRadioGroup>
          {watchedNeedsVisibilityType === 'breakdown' && (
            <PpeTypeEnumCheckbox
              control={control}
              name="needs.breakdownVisibility"
            />
          )}
        </Accordion.Item>
        <Accordion.Item
          label={<AccordionLabel category={CategoryEnum.NeedMet} />}
        >
          <ReactHookFormRadioGroup
            size="sm"
            name="needs_met.visibleType"
            control={control}
            variant="vertical"
            spacing="xs"
          >
            <Radio value="post">Post</Radio>
            <Radio value="breakdown">Breakdowns</Radio>
          </ReactHookFormRadioGroup>
          {watchedNeedsMetVisibilityType === 'breakdown' && (
            <PpeTypeEnumCheckbox
              control={control}
              name="needs_met.breakdownVisibility"
            />
          )}
        </Accordion.Item>
        <Accordion.Item
          label={<AccordionLabel category={CategoryEnum.Supply} />}
        >
          <ReactHookFormRadioGroup
            size="sm"
            name="supplies.visibleType"
            control={control}
            variant="vertical"
            spacing="xs"
          >
            <Radio value="post">Post</Radio>
            <Radio value="breakdown">Breakdowns</Radio>
          </ReactHookFormRadioGroup>
          {watchedSuppliesVisibilityType === 'breakdown' && (
            <PpeTypeEnumCheckbox
              control={control}
              name="supplies.breakdownVisibility"
            />
          )}
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
