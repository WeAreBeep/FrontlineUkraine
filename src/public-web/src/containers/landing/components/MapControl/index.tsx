import React, { ChangeEvent, useCallback, useEffect, useMemo } from 'react';
import { CategoryEnum, CategoryVisibilityMap } from '../../type';
import { Control, useController, useForm } from 'react-hook-form';
import {
  getPpeTypeEnumFromInt,
  PPE_TYPES,
  PpeTypeEnum,
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
import { CATEGORIES, CATEGORY_NAME, POINT_COLORS } from '../../constant';
import { PpeTypeEnumLabel } from '../PpeTypeEnumLabel';
import { MapData } from '../../../../models/map';
import { Nullable } from '../../../../utils/nullable';

type BreakdownCountMap = Record<PpeTypeEnum, number>;
const defaultBreakdownCount: BreakdownCountMap = {
  [PpeTypeEnum.AlcoholHandGel]: 0,
  [PpeTypeEnum.Aprons]: 0,
  [PpeTypeEnum.FFP1RespiratorMasks]: 0,
  [PpeTypeEnum.FFP2RespiratorMasks]: 0,
  [PpeTypeEnum.FFP3RespiratorMasks]: 0,
  [PpeTypeEnum.FaceVisors]: 0,
  [PpeTypeEnum.Gloves]: 0,
  [PpeTypeEnum.Gowns]: 0,
  [PpeTypeEnum.Other]: 0,
  [PpeTypeEnum.SafetyGlasses]: 0,
  [PpeTypeEnum.Scrubs]: 0,
  [PpeTypeEnum.TypeIIRSurgicalMasks]: 0,
};

interface Props {
  visibility: CategoryVisibilityMap;
  onVisibilityChange: (updated: CategoryVisibilityMap) => void;
  mapData: Nullable<MapData>;
}

interface PpeTypeEnumCheckboxProps {
  control: Control<CategoryVisibilityMap>;
  name:
    | 'needs.breakdownVisibility'
    | 'needs_met.breakdownVisibility'
    | 'supplies.breakdownVisibility';
  breakdownCountMap: Nullable<BreakdownCountMap>;
}

const PpeTypeEnumCheckbox: React.FC<PpeTypeEnumCheckboxProps> = ({
  control,
  name,
  breakdownCountMap,
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
          label={
            <PpeTypeEnumLabel
              ppeType={option}
              count={breakdownCountMap?.[option]}
            />
          }
        />
      ))}
    </Group>
  );
};

const AccordionLabel: React.FC<{ category: CategoryEnum; count?: number }> = ({
  category,
  count,
}) => {
  const theme = useMantineTheme();
  return (
    <Group noWrap={true} spacing="xs">
      <ColorSwatch color={POINT_COLORS[category]} size={theme.fontSizes.sm} />
      <span style={{ fontSize: theme.fontSizes.sm }}>
        {CATEGORY_NAME[category]}
      </span>
      {count && <i>{count}</i>}
    </Group>
  );
};

// eslint-disable-next-line complexity
export const MapControl: React.FC<Props> = ({
  visibility,
  onVisibilityChange,
  mapData,
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

  const countMap = useMemo(() => {
    if (mapData == null) {
      return null;
    }
    return CATEGORIES.reduce<
      Record<
        CategoryEnum,
        {
          posts: number;
          totalBreakdowns: number;
          breakdownCount: BreakdownCountMap;
        }
      >
    >((acc, category) => {
      acc[category] = {
        posts: mapData.categories[category].posts.features.length,
        totalBreakdowns: mapData.categories[category].pointsCount,
        breakdownCount: mapData.categories[category].pointsBreakdowns.reduce<
          Record<PpeTypeEnum, number>
        >(
          (acc, curr) => {
            acc[getPpeTypeEnumFromInt(curr.type)!] =
              curr.geojsonFeatureCollection.features.length;
            return acc;
          },
          {
            ...defaultBreakdownCount,
          }
        ),
      };
      return acc;
      // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
    }, {} as any);
  }, [mapData]);

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
            <Radio value="post">
              Post{' '}
              {countMap?.[CategoryEnum.Need].posts && (
                <i>{countMap[CategoryEnum.Need].posts}</i>
              )}
            </Radio>
            <Radio value="breakdown">
              Breakdowns{' '}
              {countMap?.[CategoryEnum.Need].totalBreakdowns && (
                <i>{countMap[CategoryEnum.Need].totalBreakdowns}</i>
              )}
            </Radio>
          </ReactHookFormRadioGroup>
          {watchedNeedsVisibilityType === 'breakdown' && (
            <PpeTypeEnumCheckbox
              control={control}
              name="needs.breakdownVisibility"
              breakdownCountMap={
                countMap?.[CategoryEnum.Need].breakdownCount ?? null
              }
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
            <Radio value="post">
              Post{' '}
              {countMap?.[CategoryEnum.NeedMet].posts && (
                <i>{countMap[CategoryEnum.NeedMet].posts}</i>
              )}
            </Radio>
            <Radio value="breakdown">
              Breakdowns{' '}
              {countMap?.[CategoryEnum.NeedMet].totalBreakdowns && (
                <i>{countMap[CategoryEnum.NeedMet].totalBreakdowns}</i>
              )}
            </Radio>
          </ReactHookFormRadioGroup>
          {watchedNeedsMetVisibilityType === 'breakdown' && (
            <PpeTypeEnumCheckbox
              control={control}
              name="needs_met.breakdownVisibility"
              breakdownCountMap={
                countMap?.[CategoryEnum.NeedMet].breakdownCount ?? null
              }
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
            <Radio value="post">
              Post{' '}
              {countMap?.[CategoryEnum.Supply].posts && (
                <i>{countMap[CategoryEnum.Supply].posts}</i>
              )}
            </Radio>
            <Radio value="breakdown">
              Breakdowns{' '}
              {countMap?.[CategoryEnum.Supply].totalBreakdowns && (
                <i>{countMap[CategoryEnum.Supply].totalBreakdowns}</i>
              )}
            </Radio>
          </ReactHookFormRadioGroup>
          {watchedSuppliesVisibilityType === 'breakdown' && (
            <PpeTypeEnumCheckbox
              control={control}
              name="supplies.breakdownVisibility"
              breakdownCountMap={
                countMap?.[CategoryEnum.Supply].breakdownCount ?? null
              }
            />
          )}
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
