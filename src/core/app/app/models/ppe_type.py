from enum import IntEnum

from sqlalchemy import SMALLINT, Column, PrimaryKeyConstraint, Text
from sqlalchemy.orm import relationship

from app.db.base_class import FLBase


class PpeTypeEnum(IntEnum):
    TypeIIRSurgicalMasks = 1
    FFP1RespiratorMasks = 2
    FFP2RespiratorMasks = 3
    FFP3RespiratorMasks = 4
    Gowns = 5
    Aprons = 6
    Gloves = 7
    Scrubs = 8
    SafetyGlasses = 9
    FaceVisors = 10
    AlcoholHandGel = 11
    Other = 12
    DomesticSanitarySanitaryTowels = 13
    DomesticSanitaryNappiesSize0 = 14
    DomesticSanitaryNappiesSize1 = 15
    DomesticSanitaryNappiesSize2 = 16
    DomesticSanitaryNappiesSize3 = 17
    DomesticSanitaryNappiesSize4 = 18
    DomesticSanitaryNappiesSize5 = 19
    DomesticSanitaryNappiesSize6 = 20
    DomesticSanitaryBreastPads = 21
    DomesticSanitaryHairbrushes = 22
    DomesticSanitaryLiquidSoap = 23
    DomesticSanitaryWetWipes = 24
    DomesticSanitaryToothbrushes = 25
    DomesticSanitaryToothpaste = 26
    DomesticSanitaryTowels = 27
    DomesticSanitaryToiletPaper = 28
    DomesticSanitaryPocketTissues = 29
    DomesticSanitaryShavingGelRazors = 30
    DomesticSanitaryOther = 31
    DomesticNonPerishableFoodDrinkProteinBars = 32
    DomesticNonPerishableFoodDrinkCannedFood = 33
    DomesticNonPerishableFoodDrinkDryFood = 34
    DomesticNonPerishableFoodDrinkInstantFood = 35
    DomesticNonPerishableFoodDrinkBabyFood = 36
    DomesticNonPerishableFoodDrinkEnergyDrinks = 37
    DomesticNonPerishableOther = 38
    DomesticOtherFoilSurvivalBlankets = 39
    DomesticOtherThermalClothingNew = 40
    DomesticOtherSleepingBags = 41
    DomesticOtherBedHospital = 42
    DomesticOtherLargeOrMediumBackpacks = 43
    DomesticOtherPowerBanksAndChargingCables = 44
    DomesticOtherTorches = 45
    DomesticOtherElectricityGenerators = 46
    DomesticOtherBootDriers = 47
    DomesticOtherHotWaterBottles = 48
    DomesticOtherInsulatedFlasks = 49
    DomesticOtherDisposableTableware = 50
    DomesticOtherCookingStoves = 51
    DomesticOtherBinBags = 52
    DomesticOtherOther = 53
    NonDrugMedicalSuppliesMedicalEquipmentPatientMonitor = 54
    NonDrugMedicalSuppliesMedicalEquipmentAnaesthesiaMachine = 55
    NonDrugMedicalSuppliesMedicalEquipmentECGRecorder = 56
    NonDrugMedicalSuppliesMedicalEquipmentDefibrillator = 57
    NonDrugMedicalSuppliesMedicalEquipmentSyringePump = 58
    NonDrugMedicalSuppliesMedicalEquipmentInfusionPump = 59
    NonDrugMedicalSuppliesMedicalEquipmentExaminationLightLed = 60
    NonDrugMedicalSuppliesMedicalEquipmentFootOperatedSuctionPump = 61
    NonDrugMedicalSuppliesMedicalEquipmentPatientVentilator = 62
    NonDrugMedicalSuppliesMedicalEquipmentMobileUltrasoundScanner = 63
    NonDrugMedicalSuppliesMedicalEquipmentSelfInflatingBagSet = 64
    NonDrugMedicalSuppliesMedicalEquipmentCapnometer = 65
    NonDrugMedicalSuppliesMedicalEquipmentXRayUnit = 66
    NonDrugMedicalSuppliesMedicalEquipmentSurgicalDrill = 67
    NonDrugMedicalSuppliesMedicalEquipmentDermatome = 68
    NonDrugMedicalSuppliesMedicalEquipmentLegTractionSplint = 69
    NonDrugMedicalSuppliesMedicalEquipmentOther = 70
    NonDrugMedicalSuppliesConsumablesMedicalTourniquets = 71
    NonDrugMedicalSuppliesConsumablesFirstAidKits = 72
    NonDrugMedicalSuppliesConsumablesViralBacteriaFilter = 73
    NonDrugMedicalSuppliesConsumablesCentralVenousCatheters = 74
    NonDrugMedicalSuppliesConsumablesSetIntraosseousInfusionKit = 75
    NonDrugMedicalSuppliesConsumablesSetInfusionAdult = 76
    NonDrugMedicalSuppliesConsumablesSetInfusionPaediatric = 77
    NonDrugMedicalSuppliesConsumablesDrainThoracicInsertionSet = 78
    NonDrugMedicalSuppliesConsumablesInsulinSyringes = 79
    NonDrugMedicalSuppliesConsumablesSyringePensDiabetics = 80
    NonDrugMedicalSuppliesConsumablesGlucometers = 81
    NonDrugMedicalSuppliesConsumablesXRayCartridges = 82
    NonDrugMedicalSuppliesConsumablesOther = 83
    NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsBasicSurgery = 84
    NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsDressing = 85
    NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsCraniotomy = 86
    NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsLaparotomyAndCaesarean = 87
    NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsDPCSuture = 88
    NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsDebridement = 89
    NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsSkinGraft = 90
    NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsFinePaediatrics = 91
    NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsThoracotomyComplementary = 92
    NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsAmputation = 93
    NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsBasicBoneSurgery = 94
    NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsBasicBoneSurgeryCurettes = 95
    NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsBoneWiringAndKirshner = 96
    NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsPlasterCastsRemoval = 97
    NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsTractionPlusTenBows = 98
    NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetExternalFixationLargeFixatorsAndInstruments = 99
    NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsOther = 100


class PpeType(FLBase):
    __tablename__ = "PpeTypes"

    __table_args__ = (PrimaryKeyConstraint("Id", name="idx_20782_PK_PpeTypes"),)

    id = Column(
        "Id",
        SMALLINT,
        nullable=False,
        server_default="nextval(" "PpeTypes_Id_seq" "::regclass)",
    )
    name = Column("Name", Text, nullable=True)

    needs = relationship("NeedPpeType", back_populates="ppeType")
    suppliers = relationship("SupplierPpeType", back_populates="ppeType")
