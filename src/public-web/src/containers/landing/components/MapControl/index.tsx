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
  [PpeTypeEnum.DomesticNonPerishableFoodDrinkBabyFood]: 0,
  [PpeTypeEnum.DomesticNonPerishableFoodDrinkCannedFood]: 0,
  [PpeTypeEnum.DomesticNonPerishableFoodDrinkDryFood]: 0,
  [PpeTypeEnum.DomesticNonPerishableFoodDrinkEnergyDrinks]: 0,
  [PpeTypeEnum.DomesticNonPerishableFoodDrinkInstantFood]: 0,
  [PpeTypeEnum.DomesticNonPerishableFoodDrinkProteinBars]: 0,
  [PpeTypeEnum.DomesticOtherBinBags]: 0,
  [PpeTypeEnum.DomesticOtherBootDriers]: 0,
  [PpeTypeEnum.DomesticOtherCookingStoves]: 0,
  [PpeTypeEnum.DomesticOtherDisposableTableware]: 0,
  [PpeTypeEnum.DomesticOtherElectricityGenerators]: 0,
  [PpeTypeEnum.DomesticOtherFoilSurvivalBlankets]: 0,
  [PpeTypeEnum.DomesticOtherHotWaterBottles]: 0,
  [PpeTypeEnum.DomesticOtherInsulatedFlasks]: 0,
  [PpeTypeEnum.DomesticOtherLargeOrMediumBackpacks]: 0,
  [PpeTypeEnum.DomesticOtherOther]: 0,
  [PpeTypeEnum.DomesticOtherPowerBanksAndChargingCables]: 0,
  [PpeTypeEnum.DomesticOtherSleepingBags]: 0,
  [PpeTypeEnum.DomesticOtherThermalClothingNew]: 0,
  [PpeTypeEnum.DomesticOtherTorches]: 0,
  [PpeTypeEnum.DomesticSanitaryBreastPads]: 0,
  [PpeTypeEnum.DomesticSanitaryHairbrushes]: 0,
  [PpeTypeEnum.DomesticSanitaryLiquidSoap]: 0,
  [PpeTypeEnum.DomesticSanitaryNappies]: 0,
  [PpeTypeEnum.DomesticSanitaryOther]: 0,
  [PpeTypeEnum.DomesticSanitaryPocketTissues]: 0,
  [PpeTypeEnum.DomesticSanitarySanitaryTowels]: 0,
  [PpeTypeEnum.DomesticSanitaryShavingGelRazors]: 0,
  [PpeTypeEnum.DomesticSanitaryToiletPaper]: 0,
  [PpeTypeEnum.DomesticSanitaryToothbrushes]: 0,
  [PpeTypeEnum.DomesticSanitaryToothpaste]: 0,
  [PpeTypeEnum.DomesticSanitaryTowels]: 0,
  [PpeTypeEnum.DomesticSanitaryWetWipes]: 0,
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesCentralVenousCatheters]: 0,
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesDrainThoracicInsertionSet]: 0,
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesFirstAidKits]: 0,
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesGlucometers]: 0,
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesInsulinSyringes]: 0,
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesMedicalTourniquets]: 0,
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesOther]: 0,
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesSetInfusionAdult]: 0,
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesSetInfusionPaediatric]: 0,
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesSetIntraosseousInfusionKit]: 0,
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesSyringePensDiabetics]: 0,
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesViralBacteriaFilter]: 0,
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesXRayCartridges]: 0,
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentAnaesthesiaMachine]: 0,
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentCapnometer]: 0,
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentDefibrillator]: 0,
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentDermatome]: 0,
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentECGRecorder]: 0,
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentExaminationLightLed]: 0,
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentFootOperatedSuctionPump]: 0,
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentInfusionPump]: 0,
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentLegTractionSplint]: 0,
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentMobileUltrasoundScanner]: 0,
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentOther]: 0,
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentPatientMonitor]: 0,
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentPatientVentilator]: 0,
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentSelfInflatingBagSet]: 0,
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentSurgicalDrill]: 0,
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentSyringePump]: 0,
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentXRayUnit]: 0,
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsOther]: 0,
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetExternalFixationLargeFixatorsAndInstruments]: 0,
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsBasicSurgery]: 0,
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsCraniotomy]: 0,
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsDPCSuture]: 0,
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsDebridement]: 0,
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsDressing]: 0,
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsFinePaediatrics]: 0,
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsLaparotomyAndCaesarean]: 0,
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsSkinGraft]: 0,
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsThoracotomyComplementary]: 0,
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsAmputation]: 0,
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsBasicBoneSurgery]: 0,
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsBasicBoneSurgeryCurettes]: 0,
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsBoneWiringAndKirshner]: 0,
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsPlasterCastsRemoval]: 0,
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsTractionPlusTenBows]: 0,
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
  [PpeTypeEnum.TypeIIRSurgicalMasks]: 0
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
      <ColorSwatch color={POINT_COLORS[category]} size={theme.fontSizes.sm}/>
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
    return CATEGORIES.reduce<Record<CategoryEnum,
      {
        posts: number;
        totalBreakdowns: number;
        breakdownCount: BreakdownCountMap;
      }>>((acc, category) => {
      acc[category] = {
        posts: mapData.categories[category].posts.features.length,
        totalBreakdowns: mapData.categories[category].pointsCount,
        breakdownCount: mapData.categories[category].pointsBreakdowns.reduce<Record<PpeTypeEnum, number>>(
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
        <Accordion.Item label={<AccordionLabel category={CategoryEnum.Need}/>}>
          <ReactHookFormRadioGroup
            size="sm"
            name="needs.visibleType"
            control={control}
            orientation="vertical"
            spacing="xs"
          >
            <Radio value="post" label={<>All requests{' '}
              {countMap?.[CategoryEnum.Need].posts && (
                <i>{countMap[CategoryEnum.Need].posts}</i>
              )}</>}/>
            <Radio value="breakdown" label={<>Filter items{' '}
              {countMap?.[CategoryEnum.Need].totalBreakdowns && (
                <i>{countMap[CategoryEnum.Need].totalBreakdowns}</i>
              )}</>}/>
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
          label={<AccordionLabel category={CategoryEnum.NeedMet}/>}
        >
          <ReactHookFormRadioGroup
            size="sm"
            name="needs_met.visibleType"
            control={control}
            orientation="vertical"
            spacing="xs"
          >
            <Radio value="post" label={<>All requests{' '}
              {countMap?.[CategoryEnum.NeedMet].posts && (
                <i>{countMap[CategoryEnum.NeedMet].posts}</i>
              )}</>} />
            <Radio value="breakdown" label={<>Filter items{' '}
              {countMap?.[CategoryEnum.NeedMet].totalBreakdowns && (
                <i>{countMap[CategoryEnum.NeedMet].totalBreakdowns}</i>
              )}</>} />
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
          label={<AccordionLabel category={CategoryEnum.Supply}/>}
        >
          <ReactHookFormRadioGroup
            size="sm"
            name="supplies.visibleType"
            control={control}
            orientation="vertical"
            spacing="xs"
          >
            <Radio value="post" label={<>
              All supplies{' '}
              {countMap?.[CategoryEnum.Supply].posts && (
                <i>{countMap[CategoryEnum.Supply].posts}</i>
              )}
            </>} />
            <Radio value="breakdown" label={<>Filter items{' '}
              {countMap?.[CategoryEnum.Supply].totalBreakdowns && (
                <i>{countMap[CategoryEnum.Supply].totalBreakdowns}</i>
              )}</>} />
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
