import { ResourceGroup } from '../models/resourceGroup';

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
          {
            id: 13,
            name: 'resourceType_DomesticSanitarySanitaryTowels_displayName',
          },
          { id: 14, name: 'resourceType_DomesticSanitaryNappies_displayName' },
          {
            id: 15,
            name: 'resourceType_DomesticSanitaryBreastPads_displayName',
          },
          {
            id: 16,
            name: 'resourceType_DomesticSanitaryHairbrushes_displayName',
          },
          {
            id: 17,
            name: 'resourceType_DomesticSanitaryLiquidSoap_displayName',
          },
          { id: 18, name: 'resourceType_DomesticSanitaryWetWipes_displayName' },
          {
            id: 19,
            name: 'resourceType_DomesticSanitaryToothbrushes_displayName',
          },
          {
            id: 20,
            name: 'resourceType_DomesticSanitaryToothpaste_displayName',
          },
          { id: 21, name: 'resourceType_DomesticSanitaryTowels_displayName' },
          {
            id: 22,
            name: 'resourceType_DomesticSanitaryToiletPaper_displayName',
          },
          {
            id: 23,
            name: 'resourceType_DomesticSanitaryPocketTissues_displayName',
          },
          {
            id: 24,
            name: 'resourceType_DomesticSanitaryShavingGelRazors_displayName',
          },
          { id: 25, name: 'resourceType_DomesticSanitaryOther_displayName' },
        ],
      },
      {
        id: 4,
        type: 'leaf',
        name: 'resourceCategory_domestic_nonPerishableFood_displayName',
        description: 'resourceCategory_domestic_nonPerishableFood_description',
        resourceTypes: [
          {
            id: 26,
            name: 'resourceType_DomesticNonPerishableFoodDrinkProteinBars_displayName',
          },
          {
            id: 27,
            name: 'resourceType_DomesticNonPerishableFoodDrinkCannedFood_displayName',
          },
          {
            id: 28,
            name: 'resourceType_DomesticNonPerishableFoodDrinkDryFood_displayName',
          },
          {
            id: 29,
            name: 'resourceType_DomesticNonPerishableFoodDrinkInstantFood_displayName',
          },
          {
            id: 30,
            name: 'resourceType_DomesticNonPerishableFoodDrinkBabyFood_displayName',
          },
          {
            id: 31,
            name: 'resourceType_DomesticNonPerishableFoodDrinkEnergyDrinks_displayName',
          },
        ],
      },
      {
        id: 5,
        type: 'leaf',
        name: 'resourceCategory_domestic_other_displayName',
        resourceTypes: [
          {
            id: 32,
            name: 'resourceType_DomesticOtherFoilSurvivalBlankets_displayName',
          },
          {
            id: 33,
            name: 'resourceType_DomesticOtherThermalClothingNew_displayName',
          },
          {
            id: 34,
            name: 'resourceType_DomesticOtherSleepingBags_displayName',
          },
          {
            id: 35,
            name: 'resourceType_DomesticOtherLargeOrMediumBackpacks_displayName',
          },
          {
            id: 36,
            name: 'resourceType_DomesticOtherPowerBanksAndChargingCables_displayName',
          },
          { id: 37, name: 'resourceType_DomesticOtherTorches_displayName' },
          {
            id: 38,
            name: 'resourceType_DomesticOtherElectricityGenerators_displayName',
          },
          { id: 39, name: 'resourceType_DomesticOtherBootDriers_displayName' },
          {
            id: 40,
            name: 'resourceType_DomesticOtherHotWaterBottles_displayName',
          },
          {
            id: 41,
            name: 'resourceType_DomesticOtherInsulatedFlasks_displayName',
          },
          {
            id: 42,
            name: 'resourceType_DomesticOtherDisposableTableware_displayName',
          },
          {
            id: 43,
            name: 'resourceType_DomesticOtherCookingStoves_displayName',
          },
          { id: 44, name: 'resourceType_DomesticOtherBinBags_displayName' },
          { id: 45, name: 'resourceType_DomesticOtherOther_displayName' },
        ],
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
          {
            id: 46,
            name: 'resourceType_NonDrugMedicalSuppliesMedicalEquipmentPatientMonitor_displayName',
          },
          {
            id: 47,
            name: 'resourceType_NonDrugMedicalSuppliesMedicalEquipmentAnaesthesiaMachine_displayName',
          },
          {
            id: 48,
            name: 'resourceType_NonDrugMedicalSuppliesMedicalEquipmentECGRecorder_displayName',
          },
          {
            id: 49,
            name: 'resourceType_NonDrugMedicalSuppliesMedicalEquipmentDefibrillator_displayName',
          },
          {
            id: 50,
            name: 'resourceType_NonDrugMedicalSuppliesMedicalEquipmentSyringePump_displayName',
          },
          {
            id: 51,
            name: 'resourceType_NonDrugMedicalSuppliesMedicalEquipmentInfusionPump_displayName',
          },
          {
            id: 52,
            name: 'resourceType_NonDrugMedicalSuppliesMedicalEquipmentExaminationLightLed_displayName',
          },
          {
            id: 53,
            name: 'resourceType_NonDrugMedicalSuppliesMedicalEquipmentFootOperatedSuctionPump_displayName',
          },
          {
            id: 54,
            name: 'resourceType_NonDrugMedicalSuppliesMedicalEquipmentPatientVentilator_displayName',
          },
          {
            id: 55,
            name: 'resourceType_NonDrugMedicalSuppliesMedicalEquipmentMobileUltrasoundScanner_displayName',
          },
          {
            id: 56,
            name: 'resourceType_NonDrugMedicalSuppliesMedicalEquipmentSelfInflatingBagSet_displayName',
          },
          {
            id: 57,
            name: 'resourceType_NonDrugMedicalSuppliesMedicalEquipmentCapnometer_displayName',
          },
          {
            id: 58,
            name: 'resourceType_NonDrugMedicalSuppliesMedicalEquipmentXRayUnit_displayName',
          },
          {
            id: 59,
            name: 'resourceType_NonDrugMedicalSuppliesMedicalEquipmentSurgicalDrill_displayName',
          },
          {
            id: 60,
            name: 'resourceType_NonDrugMedicalSuppliesMedicalEquipmentDermatome_displayName',
          },
          {
            id: 61,
            name: 'resourceType_NonDrugMedicalSuppliesMedicalEquipmentLegTractionSplint_displayName',
          },
          {
            id: 62,
            name: 'resourceType_NonDrugMedicalSuppliesMedicalEquipmentOther_displayName',
          },
        ],
      },
      {
        id: 7,
        type: 'leaf',
        name: 'resourceCategory_nonDrugMedicalSupplies_consumables_displayName',
        resourceTypes: [
          {
            id: 63,
            name: 'resourceType_NonDrugMedicalSuppliesConsumablesMedicalTourniquets_displayName',
          },
          {
            id: 64,
            name: 'resourceType_NonDrugMedicalSuppliesConsumablesFirstAidKits_displayName',
          },
          {
            id: 65,
            name: 'resourceType_NonDrugMedicalSuppliesConsumablesViralBacteriaFilter_displayName',
          },
          {
            id: 66,
            name: 'resourceType_NonDrugMedicalSuppliesConsumablesCentralVenousCatheters_displayName',
          },
          {
            id: 67,
            name: 'resourceType_NonDrugMedicalSuppliesConsumablesSetIntraosseousInfusionKit_displayName',
          },
          {
            id: 68,
            name: 'resourceType_NonDrugMedicalSuppliesConsumablesSetInfusionAdult_displayName',
          },
          {
            id: 69,
            name: 'resourceType_NonDrugMedicalSuppliesConsumablesSetInfusionPaediatric_displayName',
          },
          {
            id: 70,
            name: 'resourceType_NonDrugMedicalSuppliesConsumablesDrainThoracicInsertionSet_displayName',
          },
          {
            id: 71,
            name: 'resourceType_NonDrugMedicalSuppliesConsumablesInsulinSyringes_displayName',
          },
          {
            id: 72,
            name: 'resourceType_NonDrugMedicalSuppliesConsumablesSyringePensDiabetics_displayName',
          },
          {
            id: 73,
            name: 'resourceType_NonDrugMedicalSuppliesConsumablesGlucometers_displayName',
          },
          {
            id: 74,
            name: 'resourceType_NonDrugMedicalSuppliesConsumablesXRayCartridges_displayName',
          },
          {
            id: 75,
            name: 'resourceType_NonDrugMedicalSuppliesConsumablesOther_displayName',
          },
        ],
      },
      {
        id: 8,
        type: 'leaf',
        name: 'resourceCategory_nonDrugMedicalSupplies_surgicalInstrumentsAndFixators_displayName',
        resourceTypes: [
          {
            id: 76,
            name: 'resourceType_NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsBasicSurgery_displayName',
          },
          {
            id: 77,
            name: 'resourceType_NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsDressing_displayName',
          },
          {
            id: 78,
            name: 'resourceType_NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsCraniotomy_displayName',
          },
          {
            id: 79,
            name: 'resourceType_NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsLaparotomyAndCaesarean_displayName',
          },
          {
            id: 80,
            name: 'resourceType_NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsDPCSuture_displayName',
          },
          {
            id: 81,
            name: 'resourceType_NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsDebridement_displayName',
          },
          {
            id: 82,
            name: 'resourceType_NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsSkinGraft_displayName',
          },
          {
            id: 83,
            name: 'resourceType_NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsFinePaediatrics_displayName',
          },
          {
            id: 84,
            name: 'resourceType_NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsThoracotomyComplementary_displayName',
          },
          {
            id: 85,
            name: 'resourceType_NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsAmputation_displayName',
          },
          {
            id: 86,
            name: 'resourceType_NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsBasicBoneSurgery_displayName',
          },
          {
            id: 87,
            name: 'resourceType_NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsBasicBoneSurgeryCurettes_displayName',
          },
          {
            id: 88,
            name: 'resourceType_NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsBoneWiringAndKirshner_displayName',
          },
          {
            id: 89,
            name: 'resourceType_NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsPlasterCastsRemoval_displayName',
          },
          {
            id: 90,
            name: 'resourceType_NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsTractionPlusTenBows_displayName',
          },
          {
            id: 91,
            name: 'resourceType_NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetExternalFixationLargeFixatorsAndInstruments_displayName',
          },
          {
            id: 92,
            name: 'resourceType_NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsOther_displayName',
          },
        ],
      },
      {
        id: 9,
        type: 'leaf',
        name: 'resourceCategory_nonDrugMedicalSupplies_ppe_displayName',
        resourceTypes: [
          { id: 1, name: 'resourceType_TypeIIRSurgicalMasks_displayName' },
          { id: 2, name: 'resourceType_FFP1RespiratorMasks_displayName' },
          { id: 3, name: 'resourceType_FFP2RespiratorMasks_displayName' },
          { id: 4, name: 'resourceType_FFP3RespiratorMasks_displayName' },
          { id: 5, name: 'resourceType_Gowns_displayName' },
          { id: 6, name: 'resourceType_Aprons_displayName' },
          { id: 7, name: 'resourceType_Gloves_displayName' },
          { id: 8, name: 'resourceType_Scrubs_displayName' },
          { id: 9, name: 'resourceType_SafetyGlasses_displayName' },
          { id: 10, name: 'resourceType_FaceVisors_displayName' },
          { id: 11, name: 'resourceType_AlcoholHandGel_displayName' },
          { id: 12, name: 'resourceType_Other_displayName' },
        ],
      },
    ],
    name: 'resourceCategory_nonDrugMedicalSupplies_displayName',
  },
];
