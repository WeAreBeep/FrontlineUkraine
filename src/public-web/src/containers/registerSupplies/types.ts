import { PpeTypeEnum } from '../../models/ppeType';
import { TransportType } from '../../models/transportType';

export interface PpeSupplyTypeSubForm {
  can: boolean;
  typeOther: string;
  meetRegulations: string;
  costType: string;
  costTypeOther: string;
  capacityPerWeek: number;
  currentStock: number;
  leadTimeInDays: number;
  notes: string;
}

export const defaultPpeSupplyTypeSubForm: PpeSupplyTypeSubForm = {
  can: false,
  typeOther: '',
  meetRegulations: '',
  costType: '',
  costTypeOther: '',
  capacityPerWeek: 0,
  currentStock: 0,
  leadTimeInDays: 0,
  notes: '',
};

export interface RegisterSuppliesForm {
  organisationName: string;
  description: string;
  supplierType: string;
  supplierTypeOther: string;
  email: string;
  website: string;
  phoneNumber: string;
  contactName: string;
  postcode: string;
  transportType: TransportType;
  transportTypeOther: string;
  ppeTypes: { [key in PpeTypeEnum]: PpeSupplyTypeSubForm };
}

export const defaultRegisterSuppliesForm: RegisterSuppliesForm = {
  organisationName: '',
  description: '',
  supplierType: '',
  supplierTypeOther: '',
  email: '',
  website: '',
  phoneNumber: '',
  contactName: '',
  postcode: '',
  transportType: TransportType.No,
  transportTypeOther: '',
  ppeTypes: {
    [PpeTypeEnum.TypeIIRSurgicalMasks]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.FFP1RespiratorMasks]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.FFP2RespiratorMasks]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.FFP3RespiratorMasks]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.Gowns]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.Aprons]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.Gloves]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.Scrubs]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.SafetyGlasses]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.FaceVisors]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.AlcoholHandGel]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.Other]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.DomesticSanitarySanitaryTowels]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.DomesticSanitaryNappiesSize0]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.DomesticSanitaryNappiesSize1]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.DomesticSanitaryNappiesSize2]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.DomesticSanitaryNappiesSize3]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.DomesticSanitaryNappiesSize4]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.DomesticSanitaryNappiesSize5]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.DomesticSanitaryNappiesSize6]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.DomesticSanitaryBreastPads]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.DomesticSanitaryHairbrushes]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.DomesticSanitaryLiquidSoap]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.DomesticSanitaryWetWipes]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.DomesticSanitaryToothbrushes]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.DomesticSanitaryToothpaste]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.DomesticSanitaryTowels]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.DomesticSanitaryToiletPaper]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.DomesticSanitaryPocketTissues]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.DomesticSanitaryShavingGelRazors]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.DomesticSanitaryOther]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.DomesticNonPerishableFoodDrinkProteinBars]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.DomesticNonPerishableFoodDrinkCannedFood]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.DomesticNonPerishableFoodDrinkDryFood]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.DomesticNonPerishableFoodDrinkInstantFood]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.DomesticNonPerishableFoodDrinkBabyFood]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.DomesticNonPerishableFoodDrinkEnergyDrinks]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.DomesticNonPerishableOther]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.DomesticOtherFoilSurvivalBlankets]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.DomesticOtherThermalClothingNew]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.DomesticOtherSleepingBags]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.DomesticOtherBedHospital]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.DomesticOtherLargeOrMediumBackpacks]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.DomesticOtherPowerBanksAndChargingCables]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.DomesticOtherTorches]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.DomesticOtherElectricityGenerators]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.DomesticOtherBootDriers]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.DomesticOtherHotWaterBottles]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.DomesticOtherInsulatedFlasks]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.DomesticOtherDisposableTableware]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.DomesticOtherCookingStoves]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.DomesticOtherBinBags]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.DomesticOtherOther]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentPatientMonitor]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentAnaesthesiaMachine]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentECGRecorder]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentDefibrillator]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentSyringePump]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentInfusionPump]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentExaminationLightLed]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentFootOperatedSuctionPump]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentPatientVentilator]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentMobileUltrasoundScanner]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentSelfInflatingBagSet]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentCapnometer]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentXRayUnit]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentSurgicalDrill]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentDermatome]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentLegTractionSplint]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentOther]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesMedicalTourniquets]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesFirstAidKits]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesViralBacteriaFilter]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesCentralVenousCatheters]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesSetIntraosseousInfusionKit]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesSetInfusionAdult]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesSetInfusionPaediatric]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesDrainThoracicInsertionSet]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesInsulinSyringes]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesSyringePensDiabetics]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesGlucometers]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesXRayCartridges]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesOther]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsBasicSurgery]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsDressing]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsCraniotomy]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsLaparotomyAndCaesarean]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsDPCSuture]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsDebridement]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsSkinGraft]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsFinePaediatrics]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsThoracotomyComplementary]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsAmputation]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsBasicBoneSurgery]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsBasicBoneSurgeryCurettes]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsBoneWiringAndKirshner]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsPlasterCastsRemoval]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsTractionPlusTenBows]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetExternalFixationLargeFixatorsAndInstruments]:
      defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsOther]:
      defaultPpeSupplyTypeSubForm,
  },
};
