import { CategoryEnum, ClusterColorStep } from './type';
import { PpeTypeEnum } from '../../models/ppeType';
import { LngLatBoundsLike } from 'mapbox-gl';

export const CATEGORIES: CategoryEnum[] = [
  CategoryEnum.Need,
  CategoryEnum.NeedMet,
  CategoryEnum.Supply,
];

export const CLUSTER_COLORS: Record<string, ClusterColorStep> = {
  needs: {
    small: {
      outer: 'rgb(241, 211, 87)',
      inner: 'rgb(240, 194, 12)',
    },
    medium: {
      outer: 'rgb(253, 156, 115)',
      inner: 'rgb(241, 128, 23)',
    },
    large: {
      outer: 'rgb(165, 26, 26)',
      inner: 'rgb(165, 26, 26)',
    },
  },
  needs_met: {
    small: {
      outer: 'rgb(0, 127, 255)',
      inner: 'rgb(0, 101, 204)',
    },

    medium: {
      outer: 'rgb(81, 129, 179)',
      inner: 'rgb(94, 94, 255)',
    },

    large: {
      outer: 'rgb(94, 94, 255)',
      inner: 'rgb(25, 25, 255)',
    },
  },
  supplies: {
    small: {
      outer: 'rgb(181, 226, 140)',
      inner: 'rgb(110, 204, 57)',
    },

    medium: {
      outer: 'rgb(73, 186, 74)',
      inner: 'rgb(55, 177, 82)',
    },

    large: {
      outer: 'rgb(0, 150, 107)',
      inner: 'rgb(13, 118, 88)',
    },
  },
};

export const POINT_COLORS: Record<CategoryEnum, string> = {
  [CategoryEnum.Need]: '#A51A1A',
  [CategoryEnum.NeedMet]: '#0065cc',
  [CategoryEnum.Supply]: '#00966B',
};

export const CATEGORY_NAME: Record<CategoryEnum, string> = {
  [CategoryEnum.Need]: 'Needs',
  [CategoryEnum.NeedMet]: 'Needs Met',
  [CategoryEnum.Supply]: 'Supplies',
};

export const PPE_TYPE_COLOR: Record<PpeTypeEnum, string> = {
  // Domestic - Sanitary
  [PpeTypeEnum.DomesticSanitaryBreastPads]: '#ede284',
  [PpeTypeEnum.DomesticSanitaryHairbrushes]: '#ace5b1',
  [PpeTypeEnum.DomesticSanitaryLiquidSoap]: '#6092ff',
  [PpeTypeEnum.DomesticSanitaryNappiesSize0]: '#a1bae0',
  [PpeTypeEnum.DomesticSanitaryNappiesSize1]: '#88b23a',
  [PpeTypeEnum.DomesticSanitaryNappiesSize2]: '#dcedea',
  [PpeTypeEnum.DomesticSanitaryNappiesSize3]: '#68592e',
  [PpeTypeEnum.DomesticSanitaryNappiesSize4]: '#4d6038',
  [PpeTypeEnum.DomesticSanitaryNappiesSize5]: '#976fdb',
  [PpeTypeEnum.DomesticSanitaryNappiesSize6]: '#231b02',
  [PpeTypeEnum.DomesticSanitaryOther]: '#bcc966',
  [PpeTypeEnum.DomesticSanitaryPocketTissues]: '#ddd2d7',
  [PpeTypeEnum.DomesticSanitarySanitaryTowels]: '#5a5e55',
  [PpeTypeEnum.DomesticSanitaryShavingGelRazors]: '#2ca5a1',
  [PpeTypeEnum.DomesticSanitaryToiletPaper]: '#13182d',
  [PpeTypeEnum.DomesticSanitaryToothbrushes]: '#6d274a',
  [PpeTypeEnum.DomesticSanitaryToothpaste]: '#161c07',
  [PpeTypeEnum.DomesticSanitaryTowels]: '#91f2f2',
  [PpeTypeEnum.DomesticSanitaryWetWipes]: '#6c7268',
  // Domestic - Non-perishable food/ drinks
  [PpeTypeEnum.DomesticNonPerishableFoodDrinkBabyFood]: '#3a0716',
  [PpeTypeEnum.DomesticNonPerishableFoodDrinkCannedFood]: '#584cb5',
  [PpeTypeEnum.DomesticNonPerishableFoodDrinkDryFood]: '#101410',
  [PpeTypeEnum.DomesticNonPerishableFoodDrinkEnergyDrinks]: '#6e9e6d',
  [PpeTypeEnum.DomesticNonPerishableFoodDrinkInstantFood]: '#6a8c1a',
  [PpeTypeEnum.DomesticNonPerishableFoodDrinkProteinBars]: '#221b28',
  [PpeTypeEnum.DomesticNonPerishableOther]: '#d1c6a5',
  // Domestic - Other basic/ shelter
  [PpeTypeEnum.DomesticOtherBinBags]: '#547264',
  [PpeTypeEnum.DomesticOtherBootDriers]: '#b74073',
  [PpeTypeEnum.DomesticOtherCookingStoves]: '#3f3f33',
  [PpeTypeEnum.DomesticOtherDisposableTableware]: '#000a00',
  [PpeTypeEnum.DomesticOtherElectricityGenerators]: '#895a0d',
  [PpeTypeEnum.DomesticOtherFoilSurvivalBlankets]: '#90cc82',
  [PpeTypeEnum.DomesticOtherHotWaterBottles]: '#396bad',
  [PpeTypeEnum.DomesticOtherInsulatedFlasks]: '#f2f2f2',
  [PpeTypeEnum.DomesticOtherLargeOrMediumBackpacks]: '#8d60a0',
  [PpeTypeEnum.DomesticOtherOther]: '#545654',
  [PpeTypeEnum.DomesticOtherPowerBanksAndChargingCables]: '#3f3b3f',
  [PpeTypeEnum.DomesticOtherSleepingBags]: '#0ad63d',
  [PpeTypeEnum.DomesticOtherBedHospital]: '#757eaa',
  [PpeTypeEnum.DomesticOtherThermalClothingNew]: '#FFDA00',
  [PpeTypeEnum.DomesticOtherTorches]: '#E3DD26',
  // (Non-drug) Medical Supplies - Medical equipments
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentAnaesthesiaMachine]:
    '#FDEB46',
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentCapnometer]: '#6FECE1',
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentDefibrillator]: '#397984',
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentDermatome]: '#53FDEE',
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentECGRecorder]: '#8C3A46',
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentExaminationLightLed]:
    '#C4AF03',
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentFootOperatedSuctionPump]:
    '#45A432',
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentInfusionPump]: '#EAFF51',
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentLegTractionSplint]:
    '#3221C8',
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentMobileUltrasoundScanner]:
    '#CACA4D',
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentOther]: '#5F8A78',
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentPatientMonitor]: '#B94576',
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentPatientVentilator]:
    '#B078DE',
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentSelfInflatingBagSet]:
    '#F71A5C',
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentSurgicalDrill]: '#10E3CB',
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentSyringePump]: '#FFE112',
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentXRayUnit]: '#683D00',
  // (Non-drug) Medical Supplies - Consumables
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesCentralVenousCatheters]:
    '#1A998E',
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesDrainThoracicInsertionSet]:
    '#617093',
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesFirstAidKits]: '#F0FE74',
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesGlucometers]: '#E89B77',
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesInsulinSyringes]: '#800C08',
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesMedicalTourniquets]: '#B84DA6',
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesOther]: '#C94797',
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesSetInfusionAdult]: '#103DE8',
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesSetInfusionPaediatric]:
    '#B9307C',
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesSetIntraosseousInfusionKit]:
    '#ED3244',
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesSyringePensDiabetics]:
    '#448F89',
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesViralBacteriaFilter]: '#478FCC',
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesXRayCartridges]: '#343607',
  // (Non-drug) Medical Supplies - Surgical instruments and fixators
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsOther]:
    '#ED45F5',
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetExternalFixationLargeFixatorsAndInstruments]:
    '#D9FB59',
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsBasicSurgery]:
    '#DB9856',
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsCraniotomy]:
    '#5e0c31',
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsDPCSuture]:
    '#449B97',
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsDebridement]:
    '#B86F39',
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsDressing]:
    '#24AA5E',
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsFinePaediatrics]:
    '#8E414B',
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsLaparotomyAndCaesarean]:
    '#1A219D',
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsSkinGraft]:
    '#86CAAF',
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsThoracotomyComplementary]:
    '#BBA8EA',
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsAmputation]:
    '#16E19F',
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsBasicBoneSurgery]:
    '#d8686d',
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsBasicBoneSurgeryCurettes]:
    '#c69bc6',
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsBoneWiringAndKirshner]:
    '#98FD77',
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsPlasterCastsRemoval]:
    '#18E0C8',
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsTractionPlusTenBows]:
    '#43461E',
  // (Non-drug) Medical Supplies - PPE
  // Blues
  [PpeTypeEnum.TypeIIRSurgicalMasks]: '#A0C7E1',
  [PpeTypeEnum.FFP1RespiratorMasks]: '#4C80B6',
  [PpeTypeEnum.FFP2RespiratorMasks]: '#0C4C96',
  [PpeTypeEnum.FFP3RespiratorMasks]: '#20254B',
  // Greens
  [PpeTypeEnum.Gowns]: '#64AE3F',
  [PpeTypeEnum.Aprons]: '#21652D',
  [PpeTypeEnum.Gloves]: '#71C2AC',
  [PpeTypeEnum.Scrubs]: '#00966B',
  // Purples
  [PpeTypeEnum.SafetyGlasses]: '#9388AA',
  [PpeTypeEnum.FaceVisors]: '#4B3F72',
  [PpeTypeEnum.AlcoholHandGel]: '#54243C',
  //Grey
  [PpeTypeEnum.Other]: '#706F6F',
};

// Include UK and Ukraine
// Type: [sw, ne]
export const DEFAULT_MAP_BOUNDS: LngLatBoundsLike = [
  {
    lng: 22.153077355573117,
    lat: 45.13695366955437,
  },
  {
    lng: 39.8317035268714,
    lat: 52.72912564207206,
  },
];
