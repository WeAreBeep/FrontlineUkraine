import { ResourceGroup } from '../models/resourceGroup';
import { PPE_TYPES_ORDINAL_MAP, PpeTypeEnum } from '../models/ppeType';
import { MessageID } from '../locale/type';
import { ResourceType } from '../models/resourceType';

const ResourceTypeMessageIdMap: { [key in PpeTypeEnum]: MessageID } = {
  DomesticSanitarySanitaryTowels:
    'resourceType_DomesticSanitarySanitaryTowels_displayName',
  DomesticSanitaryNappiesSize0:
    'resourceType_DomesticSanitaryNappiesSize0_displayName',
  DomesticSanitaryNappiesSize1:
    'resourceType_DomesticSanitaryNappiesSize1_displayName',
  DomesticSanitaryNappiesSize2:
    'resourceType_DomesticSanitaryNappiesSize2_displayName',
  DomesticSanitaryNappiesSize3:
    'resourceType_DomesticSanitaryNappiesSize3_displayName',
  DomesticSanitaryNappiesSize4:
    'resourceType_DomesticSanitaryNappiesSize4_displayName',
  DomesticSanitaryNappiesSize5:
    'resourceType_DomesticSanitaryNappiesSize5_displayName',
  DomesticSanitaryNappiesSize6:
    'resourceType_DomesticSanitaryNappiesSize6_displayName',
  DomesticSanitaryBreastPads:
    'resourceType_DomesticSanitaryBreastPads_displayName',
  DomesticSanitaryHairbrushes:
    'resourceType_DomesticSanitaryHairbrushes_displayName',
  DomesticSanitaryLiquidSoap:
    'resourceType_DomesticSanitaryLiquidSoap_displayName',
  DomesticSanitaryWetWipes: 'resourceType_DomesticSanitaryWetWipes_displayName',
  DomesticSanitaryToothbrushes:
    'resourceType_DomesticSanitaryToothbrushes_displayName',
  DomesticSanitaryToothpaste:
    'resourceType_DomesticSanitaryToothpaste_displayName',
  DomesticSanitaryTowels: 'resourceType_DomesticSanitaryTowels_displayName',
  DomesticSanitaryToiletPaper:
    'resourceType_DomesticSanitaryToiletPaper_displayName',
  DomesticSanitaryPocketTissues:
    'resourceType_DomesticSanitaryPocketTissues_displayName',
  DomesticSanitaryShavingGelRazors:
    'resourceType_DomesticSanitaryShavingGelRazors_displayName',
  DomesticSanitaryOther: 'resourceType_DomesticSanitaryOther_displayName',
  DomesticNonPerishableFoodDrinkProteinBars:
    'resourceType_DomesticNonPerishableFoodDrinkProteinBars_displayName',
  DomesticNonPerishableFoodDrinkCannedFood:
    'resourceType_DomesticNonPerishableFoodDrinkCannedFood_displayName',
  DomesticNonPerishableFoodDrinkDryFood:
    'resourceType_DomesticNonPerishableFoodDrinkDryFood_displayName',
  DomesticNonPerishableFoodDrinkInstantFood:
    'resourceType_DomesticNonPerishableFoodDrinkInstantFood_displayName',
  DomesticNonPerishableFoodDrinkBabyFood:
    'resourceType_DomesticNonPerishableFoodDrinkBabyFood_displayName',
  DomesticNonPerishableFoodDrinkEnergyDrinks:
    'resourceType_DomesticNonPerishableFoodDrinkEnergyDrinks_displayName',
  DomesticNonPerishableOther:
    'resourceType_DomesticNonPerishableOther_displayName',
  DomesticOtherFoilSurvivalBlankets:
    'resourceType_DomesticOtherFoilSurvivalBlankets_displayName',
  DomesticOtherThermalClothingNew:
    'resourceType_DomesticOtherThermalClothingNew_displayName',
  DomesticOtherSleepingBags:
    'resourceType_DomesticOtherSleepingBags_displayName',
  DomesticOtherBedHospital: 'resourceType_DomesticOtherBedHospital_displayName',
  DomesticOtherLargeOrMediumBackpacks:
    'resourceType_DomesticOtherLargeOrMediumBackpacks_displayName',
  DomesticOtherPowerBanksAndChargingCables:
    'resourceType_DomesticOtherPowerBanksAndChargingCables_displayName',
  DomesticOtherTorches: 'resourceType_DomesticOtherTorches_displayName',
  DomesticOtherElectricityGenerators:
    'resourceType_DomesticOtherElectricityGenerators_displayName',
  DomesticOtherBootDriers: 'resourceType_DomesticOtherBootDriers_displayName',
  DomesticOtherHotWaterBottles:
    'resourceType_DomesticOtherHotWaterBottles_displayName',
  DomesticOtherInsulatedFlasks:
    'resourceType_DomesticOtherInsulatedFlasks_displayName',
  DomesticOtherDisposableTableware:
    'resourceType_DomesticOtherDisposableTableware_displayName',
  DomesticOtherCookingStoves:
    'resourceType_DomesticOtherCookingStoves_displayName',
  DomesticOtherBinBags: 'resourceType_DomesticOtherBinBags_displayName',
  DomesticOtherOther: 'resourceType_DomesticOtherOther_displayName',
  NonDrugMedicalSuppliesMedicalEquipmentPatientMonitor:
    'resourceType_NonDrugMedicalSuppliesMedicalEquipmentPatientMonitor_displayName',
  NonDrugMedicalSuppliesMedicalEquipmentAnaesthesiaMachine:
    'resourceType_NonDrugMedicalSuppliesMedicalEquipmentAnaesthesiaMachine_displayName',
  NonDrugMedicalSuppliesMedicalEquipmentECGRecorder:
    'resourceType_NonDrugMedicalSuppliesMedicalEquipmentECGRecorder_displayName',
  NonDrugMedicalSuppliesMedicalEquipmentDefibrillator:
    'resourceType_NonDrugMedicalSuppliesMedicalEquipmentDefibrillator_displayName',
  NonDrugMedicalSuppliesMedicalEquipmentSyringePump:
    'resourceType_NonDrugMedicalSuppliesMedicalEquipmentSyringePump_displayName',
  NonDrugMedicalSuppliesMedicalEquipmentInfusionPump:
    'resourceType_NonDrugMedicalSuppliesMedicalEquipmentInfusionPump_displayName',
  NonDrugMedicalSuppliesMedicalEquipmentExaminationLightLed:
    'resourceType_NonDrugMedicalSuppliesMedicalEquipmentExaminationLightLed_displayName',
  NonDrugMedicalSuppliesMedicalEquipmentFootOperatedSuctionPump:
    'resourceType_NonDrugMedicalSuppliesMedicalEquipmentFootOperatedSuctionPump_displayName',
  NonDrugMedicalSuppliesMedicalEquipmentPatientVentilator:
    'resourceType_NonDrugMedicalSuppliesMedicalEquipmentPatientVentilator_displayName',
  NonDrugMedicalSuppliesMedicalEquipmentMobileUltrasoundScanner:
    'resourceType_NonDrugMedicalSuppliesMedicalEquipmentMobileUltrasoundScanner_displayName',
  NonDrugMedicalSuppliesMedicalEquipmentSelfInflatingBagSet:
    'resourceType_NonDrugMedicalSuppliesMedicalEquipmentSelfInflatingBagSet_displayName',
  NonDrugMedicalSuppliesMedicalEquipmentCapnometer:
    'resourceType_NonDrugMedicalSuppliesMedicalEquipmentCapnometer_displayName',
  NonDrugMedicalSuppliesMedicalEquipmentXRayUnit:
    'resourceType_NonDrugMedicalSuppliesMedicalEquipmentXRayUnit_displayName',
  NonDrugMedicalSuppliesMedicalEquipmentSurgicalDrill:
    'resourceType_NonDrugMedicalSuppliesMedicalEquipmentSurgicalDrill_displayName',
  NonDrugMedicalSuppliesMedicalEquipmentDermatome:
    'resourceType_NonDrugMedicalSuppliesMedicalEquipmentDermatome_displayName',
  NonDrugMedicalSuppliesMedicalEquipmentLegTractionSplint:
    'resourceType_NonDrugMedicalSuppliesMedicalEquipmentLegTractionSplint_displayName',
  NonDrugMedicalSuppliesMedicalEquipmentOther:
    'resourceType_NonDrugMedicalSuppliesMedicalEquipmentOther_displayName',
  NonDrugMedicalSuppliesConsumablesMedicalTourniquets:
    'resourceType_NonDrugMedicalSuppliesConsumablesMedicalTourniquets_displayName',
  NonDrugMedicalSuppliesConsumablesFirstAidKits:
    'resourceType_NonDrugMedicalSuppliesConsumablesFirstAidKits_displayName',
  NonDrugMedicalSuppliesConsumablesViralBacteriaFilter:
    'resourceType_NonDrugMedicalSuppliesConsumablesViralBacteriaFilter_displayName',
  NonDrugMedicalSuppliesConsumablesCentralVenousCatheters:
    'resourceType_NonDrugMedicalSuppliesConsumablesCentralVenousCatheters_displayName',
  NonDrugMedicalSuppliesConsumablesSetIntraosseousInfusionKit:
    'resourceType_NonDrugMedicalSuppliesConsumablesSetIntraosseousInfusionKit_displayName',
  NonDrugMedicalSuppliesConsumablesSetInfusionAdult:
    'resourceType_NonDrugMedicalSuppliesConsumablesSetInfusionAdult_displayName',
  NonDrugMedicalSuppliesConsumablesSetInfusionPaediatric:
    'resourceType_NonDrugMedicalSuppliesConsumablesSetInfusionPaediatric_displayName',
  NonDrugMedicalSuppliesConsumablesDrainThoracicInsertionSet:
    'resourceType_NonDrugMedicalSuppliesConsumablesDrainThoracicInsertionSet_displayName',
  NonDrugMedicalSuppliesConsumablesInsulinSyringes:
    'resourceType_NonDrugMedicalSuppliesConsumablesInsulinSyringes_displayName',
  NonDrugMedicalSuppliesConsumablesSyringePensDiabetics:
    'resourceType_NonDrugMedicalSuppliesConsumablesSyringePensDiabetics_displayName',
  NonDrugMedicalSuppliesConsumablesGlucometers:
    'resourceType_NonDrugMedicalSuppliesConsumablesGlucometers_displayName',
  NonDrugMedicalSuppliesConsumablesXRayCartridges:
    'resourceType_NonDrugMedicalSuppliesConsumablesXRayCartridges_displayName',
  NonDrugMedicalSuppliesConsumablesOther:
    'resourceType_NonDrugMedicalSuppliesConsumablesOther_displayName',
  NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsBasicSurgery:
    'resourceType_NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsBasicSurgery_displayName',
  NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsDressing:
    'resourceType_NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsDressing_displayName',
  NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsCraniotomy:
    'resourceType_NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsCraniotomy_displayName',
  NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsLaparotomyAndCaesarean:
    'resourceType_NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsLaparotomyAndCaesarean_displayName',
  NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsDPCSuture:
    'resourceType_NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsDPCSuture_displayName',
  NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsDebridement:
    'resourceType_NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsDebridement_displayName',
  NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsSkinGraft:
    'resourceType_NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsSkinGraft_displayName',
  NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsFinePaediatrics:
    'resourceType_NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsFinePaediatrics_displayName',
  NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsThoracotomyComplementary:
    'resourceType_NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsThoracotomyComplementary_displayName',
  NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsAmputation:
    'resourceType_NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsAmputation_displayName',
  NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsBasicBoneSurgery:
    'resourceType_NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsBasicBoneSurgery_displayName',
  NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsBasicBoneSurgeryCurettes:
    'resourceType_NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsBasicBoneSurgeryCurettes_displayName',
  NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsBoneWiringAndKirshner:
    'resourceType_NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsBoneWiringAndKirshner_displayName',
  NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsPlasterCastsRemoval:
    'resourceType_NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsPlasterCastsRemoval_displayName',
  NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsTractionPlusTenBows:
    'resourceType_NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsTractionPlusTenBows_displayName',
  NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetExternalFixationLargeFixatorsAndInstruments:
    'resourceType_NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetExternalFixationLargeFixatorsAndInstruments_displayName',
  NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsOther:
    'resourceType_NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsOther_displayName',
  TypeIIRSurgicalMasks: 'resourceType_TypeIIRSurgicalMasks_displayName',
  FFP1RespiratorMasks: 'resourceType_FFP1RespiratorMasks_displayName',
  FFP2RespiratorMasks: 'resourceType_FFP2RespiratorMasks_displayName',
  FFP3RespiratorMasks: 'resourceType_FFP3RespiratorMasks_displayName',
  Gowns: 'resourceType_Gowns_displayName',
  Aprons: 'resourceType_Aprons_displayName',
  Gloves: 'resourceType_Gloves_displayName',
  Scrubs: 'resourceType_Scrubs_displayName',
  SafetyGlasses: 'resourceType_SafetyGlasses_displayName',
  FaceVisors: 'resourceType_FaceVisors_displayName',
  AlcoholHandGel: 'resourceType_AlcoholHandGel_displayName',
  Other: 'resourceType_Other_displayName',
};

function toResourceType(type: PpeTypeEnum): ResourceType {
  return {
    id: PPE_TYPES_ORDINAL_MAP[type],
    name: ResourceTypeMessageIdMap[type],
  };
}

export const RESOURCE_GROUPS: ResourceGroup[] = [
  {
    id: 1,
    type: 'node',
    subGroups: [
      {
        id: 3,
        type: 'leaf',
        name: 'resourceCategory_domestic_sanitaryProducts_displayName',
        resourceTypes: [
          PpeTypeEnum.DomesticSanitarySanitaryTowels,
          PpeTypeEnum.DomesticSanitaryNappiesSize0,
          PpeTypeEnum.DomesticSanitaryNappiesSize1,
          PpeTypeEnum.DomesticSanitaryNappiesSize2,
          PpeTypeEnum.DomesticSanitaryNappiesSize3,
          PpeTypeEnum.DomesticSanitaryNappiesSize4,
          PpeTypeEnum.DomesticSanitaryNappiesSize5,
          PpeTypeEnum.DomesticSanitaryNappiesSize6,
          PpeTypeEnum.DomesticSanitaryBreastPads,
          PpeTypeEnum.DomesticSanitaryHairbrushes,
          PpeTypeEnum.DomesticSanitaryLiquidSoap,
          PpeTypeEnum.DomesticSanitaryWetWipes,
          PpeTypeEnum.DomesticSanitaryToothbrushes,
          PpeTypeEnum.DomesticSanitaryToothpaste,
          PpeTypeEnum.DomesticSanitaryTowels,
          PpeTypeEnum.DomesticSanitaryToiletPaper,
          PpeTypeEnum.DomesticSanitaryPocketTissues,
          PpeTypeEnum.DomesticSanitaryShavingGelRazors,
          PpeTypeEnum.DomesticSanitaryOther,
        ].map(toResourceType),
      },
      {
        id: 4,
        type: 'leaf',
        name: 'resourceCategory_domestic_nonPerishableFood_displayName',
        description: 'resourceCategory_domestic_nonPerishableFood_description',
        resourceTypes: [
          PpeTypeEnum.DomesticNonPerishableFoodDrinkProteinBars,
          PpeTypeEnum.DomesticNonPerishableFoodDrinkCannedFood,
          PpeTypeEnum.DomesticNonPerishableFoodDrinkDryFood,
          PpeTypeEnum.DomesticNonPerishableFoodDrinkInstantFood,
          PpeTypeEnum.DomesticNonPerishableFoodDrinkBabyFood,
          PpeTypeEnum.DomesticNonPerishableFoodDrinkEnergyDrinks,
          PpeTypeEnum.DomesticNonPerishableOther,
        ].map(toResourceType),
      },
      {
        id: 5,
        type: 'leaf',
        name: 'resourceCategory_domestic_other_displayName',
        resourceTypes: [
          PpeTypeEnum.DomesticOtherFoilSurvivalBlankets,
          PpeTypeEnum.DomesticOtherThermalClothingNew,
          PpeTypeEnum.DomesticOtherSleepingBags,
          PpeTypeEnum.DomesticOtherBedHospital,
          PpeTypeEnum.DomesticOtherLargeOrMediumBackpacks,
          PpeTypeEnum.DomesticOtherPowerBanksAndChargingCables,
          PpeTypeEnum.DomesticOtherTorches,
          PpeTypeEnum.DomesticOtherElectricityGenerators,
          PpeTypeEnum.DomesticOtherBootDriers,
          PpeTypeEnum.DomesticOtherHotWaterBottles,
          PpeTypeEnum.DomesticOtherInsulatedFlasks,
          PpeTypeEnum.DomesticOtherDisposableTableware,
          PpeTypeEnum.DomesticOtherCookingStoves,
          PpeTypeEnum.DomesticOtherBinBags,
          PpeTypeEnum.DomesticOtherOther,
        ].map(toResourceType),
      },
    ],
    name: 'resourceCategory_domestic_displayName',
  },
  {
    id: 2,
    type: 'node',
    subGroups: [
      {
        id: 6,
        type: 'leaf',
        name: 'resourceCategory_nonDrugMedicalSupplies_medicalEquipment_displayName',
        resourceTypes: [
          PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentPatientMonitor,
          PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentAnaesthesiaMachine,
          PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentECGRecorder,
          PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentDefibrillator,
          PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentSyringePump,
          PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentInfusionPump,
          PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentExaminationLightLed,
          PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentFootOperatedSuctionPump,
          PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentPatientVentilator,
          PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentMobileUltrasoundScanner,
          PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentSelfInflatingBagSet,
          PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentCapnometer,
          PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentXRayUnit,
          PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentSurgicalDrill,
          PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentDermatome,
          PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentLegTractionSplint,
          PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentOther,
        ].map(toResourceType),
      },
      {
        id: 7,
        type: 'leaf',
        name: 'resourceCategory_nonDrugMedicalSupplies_consumables_displayName',
        resourceTypes: [
          PpeTypeEnum.NonDrugMedicalSuppliesConsumablesMedicalTourniquets,
          PpeTypeEnum.NonDrugMedicalSuppliesConsumablesFirstAidKits,
          PpeTypeEnum.NonDrugMedicalSuppliesConsumablesViralBacteriaFilter,
          PpeTypeEnum.NonDrugMedicalSuppliesConsumablesCentralVenousCatheters,
          PpeTypeEnum.NonDrugMedicalSuppliesConsumablesSetIntraosseousInfusionKit,
          PpeTypeEnum.NonDrugMedicalSuppliesConsumablesSetInfusionAdult,
          PpeTypeEnum.NonDrugMedicalSuppliesConsumablesSetInfusionPaediatric,
          PpeTypeEnum.NonDrugMedicalSuppliesConsumablesDrainThoracicInsertionSet,
          PpeTypeEnum.NonDrugMedicalSuppliesConsumablesInsulinSyringes,
          PpeTypeEnum.NonDrugMedicalSuppliesConsumablesSyringePensDiabetics,
          PpeTypeEnum.NonDrugMedicalSuppliesConsumablesGlucometers,
          PpeTypeEnum.NonDrugMedicalSuppliesConsumablesXRayCartridges,
          PpeTypeEnum.NonDrugMedicalSuppliesConsumablesOther,
        ].map(toResourceType),
      },
      {
        id: 8,
        type: 'leaf',
        name: 'resourceCategory_nonDrugMedicalSupplies_surgicalInstrumentsAndFixators_displayName',
        resourceTypes: [
          PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsBasicSurgery,
          PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsDressing,
          PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsCraniotomy,
          PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsLaparotomyAndCaesarean,
          PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsDPCSuture,
          PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsDebridement,
          PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsSkinGraft,
          PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsFinePaediatrics,
          PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsThoracotomyComplementary,
          PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsAmputation,
          PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsBasicBoneSurgery,
          PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsBasicBoneSurgeryCurettes,
          PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsBoneWiringAndKirshner,
          PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsPlasterCastsRemoval,
          PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsTractionPlusTenBows,
          PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetExternalFixationLargeFixatorsAndInstruments,
          PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsOther,
        ].map(toResourceType),
      },
      {
        id: 9,
        type: 'leaf',
        name: 'resourceCategory_nonDrugMedicalSupplies_ppe_displayName',
        resourceTypes: [
          PpeTypeEnum.TypeIIRSurgicalMasks,
          PpeTypeEnum.FFP1RespiratorMasks,
          PpeTypeEnum.FFP2RespiratorMasks,
          PpeTypeEnum.FFP3RespiratorMasks,
          PpeTypeEnum.Gowns,
          PpeTypeEnum.Aprons,
          PpeTypeEnum.Gloves,
          PpeTypeEnum.Scrubs,
          PpeTypeEnum.SafetyGlasses,
          PpeTypeEnum.FaceVisors,
          PpeTypeEnum.AlcoholHandGel,
          PpeTypeEnum.Other,
        ].map(toResourceType),
      },
    ],
    name: 'resourceCategory_nonDrugMedicalSupplies_displayName',
  },
];
