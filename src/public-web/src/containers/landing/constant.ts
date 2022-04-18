import { CategoryEnum, ClusterColorStep } from './type';
import { PpeTypeEnum } from '../../models/ppeType';

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
  [PpeTypeEnum.DomesticSanitaryBreastPads]: '',
  [PpeTypeEnum.DomesticSanitaryHairbrushes]: '',
  [PpeTypeEnum.DomesticSanitaryLiquidSoap]: '',
  [PpeTypeEnum.DomesticSanitaryNappies]: '',
  [PpeTypeEnum.DomesticSanitaryOther]: '',
  [PpeTypeEnum.DomesticSanitaryPocketTissues]: '',
  [PpeTypeEnum.DomesticSanitarySanitaryTowels]: '',
  [PpeTypeEnum.DomesticSanitaryShavingGelRazors]: '',
  [PpeTypeEnum.DomesticSanitaryToiletPaper]: '',
  [PpeTypeEnum.DomesticSanitaryToothbrushes]: '',
  [PpeTypeEnum.DomesticSanitaryToothpaste]: '',
  [PpeTypeEnum.DomesticSanitaryTowels]: '',
  [PpeTypeEnum.DomesticSanitaryWetWipes]: '',
  // Domestic - Non-perishable food/ drinks
  [PpeTypeEnum.DomesticNonPerishableFoodDrinkBabyFood]: '',
  [PpeTypeEnum.DomesticNonPerishableFoodDrinkCannedFood]: '',
  [PpeTypeEnum.DomesticNonPerishableFoodDrinkDryFood]: '',
  [PpeTypeEnum.DomesticNonPerishableFoodDrinkEnergyDrinks]: '',
  [PpeTypeEnum.DomesticNonPerishableFoodDrinkInstantFood]: '',
  [PpeTypeEnum.DomesticNonPerishableFoodDrinkProteinBars]: '',
  // Domestic - Other basic/ shelter
  [PpeTypeEnum.DomesticOtherBinBags]: '',
  [PpeTypeEnum.DomesticOtherBootDriers]: '',
  [PpeTypeEnum.DomesticOtherCookingStoves]: '',
  [PpeTypeEnum.DomesticOtherDisposableTableware]: '',
  [PpeTypeEnum.DomesticOtherElectricityGenerators]: '',
  [PpeTypeEnum.DomesticOtherFoilSurvivalBlankets]: '',
  [PpeTypeEnum.DomesticOtherHotWaterBottles]: '',
  [PpeTypeEnum.DomesticOtherInsulatedFlasks]: '',
  [PpeTypeEnum.DomesticOtherLargeOrMediumBackpacks]: '',
  [PpeTypeEnum.DomesticOtherOther]: '',
  [PpeTypeEnum.DomesticOtherPowerBanksAndChargingCables]: '',
  [PpeTypeEnum.DomesticOtherSleepingBags]: '',
  [PpeTypeEnum.DomesticOtherThermalClothingNew]: '',
  [PpeTypeEnum.DomesticOtherTorches]: '',
  // (Non-drug) Medical Supplies - Medical equipments
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentAnaesthesiaMachine]: '',
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentCapnometer]: '',
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentDefibrillator]: '',
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentDermatome]: '',
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentECGRecorder]: '',
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentExaminationLightLed]: '',
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentFootOperatedSuctionPump]: '',
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentInfusionPump]: '',
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentLegTractionSplint]: '',
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentMobileUltrasoundScanner]: '',
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentOther]: '',
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentPatientMonitor]: '',
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentPatientVentilator]: '',
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentSelfInflatingBagSet]: '',
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentSurgicalDrill]: '',
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentSyringePump]: '',
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentXRayUnit]: '',
  // (Non-drug) Medical Supplies - Consumables
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesCentralVenousCatheters]: '',
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesDrainThoracicInsertionSet]: '',
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesFirstAidKits]: '',
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesGlucometers]: '',
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesInsulinSyringes]: '',
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesMedicalTourniquets]: '',
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesOther]: '',
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesSetInfusionAdult]: '',
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesSetInfusionPaediatric]: '',
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesSetIntraosseousInfusionKit]: '',
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesSyringePensDiabetics]: '',
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesViralBacteriaFilter]: '',
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesXRayCartridges]: '',
  // (Non-drug) Medical Supplies - Surgical instruments and fixators
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsOther]: '',
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetExternalFixationLargeFixatorsAndInstruments]: '',
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsBasicSurgery]: '',
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsCraniotomy]: '',
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsDPCSuture]: '',
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsDebridement]: '',
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsDressing]: '',
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsFinePaediatrics]: '',
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsLaparotomyAndCaesarean]: '',
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsSkinGraft]: '',
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsThoracotomyComplementary]: '',
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsAmputation]: '',
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsBasicBoneSurgery]: '',
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsBasicBoneSurgeryCurettes]: '',
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsBoneWiringAndKirshner]: '',
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsPlasterCastsRemoval]: '',
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsTractionPlusTenBows]: '',
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
