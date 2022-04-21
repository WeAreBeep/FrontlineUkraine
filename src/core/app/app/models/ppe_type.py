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
    DomesticSanitaryNappies = 14
    DomesticSanitaryBreastPads = 15
    DomesticSanitaryHairbrushes = 16
    DomesticSanitaryLiquidSoap = 17
    DomesticSanitaryWetWipes = 18
    DomesticSanitaryToothbrushes = 19
    DomesticSanitaryToothpaste = 20
    DomesticSanitaryTowels = 21
    DomesticSanitaryToiletPaper = 22
    DomesticSanitaryPocketTissues = 23
    DomesticSanitaryShavingGelRazors = 24
    DomesticSanitaryOther = 25
    DomesticNonPerishableFoodDrinkProteinBars = 26
    DomesticNonPerishableFoodDrinkCannedFood = 27
    DomesticNonPerishableFoodDrinkDryFood = 28
    DomesticNonPerishableFoodDrinkInstantFood = 29
    DomesticNonPerishableFoodDrinkBabyFood = 30
    DomesticNonPerishableFoodDrinkEnergyDrinks = 31
    DomesticOtherFoilSurvivalBlankets = 32
    DomesticOtherThermalClothingNew = 33
    DomesticOtherSleepingBags = 34
    DomesticOtherLargeOrMediumBackpacks = 35
    DomesticOtherPowerBanksAndChargingCables = 36
    DomesticOtherTorches = 37
    DomesticOtherElectricityGenerators = 38
    DomesticOtherBootDriers = 39
    DomesticOtherHotWaterBottles = 40
    DomesticOtherInsulatedFlasks = 41
    DomesticOtherDisposableTableware = 42
    DomesticOtherCookingStoves = 43
    DomesticOtherBinBags = 44
    DomesticOtherOther = 45
    NonDrugMedicalSuppliesMedicalEquipmentPatientMonitor = 46
    NonDrugMedicalSuppliesMedicalEquipmentAnaesthesiaMachine = 47
    NonDrugMedicalSuppliesMedicalEquipmentECGRecorder = 48
    NonDrugMedicalSuppliesMedicalEquipmentDefibrillator = 49
    NonDrugMedicalSuppliesMedicalEquipmentSyringePump = 50
    NonDrugMedicalSuppliesMedicalEquipmentInfusionPump = 51
    NonDrugMedicalSuppliesMedicalEquipmentExaminationLightLed = 52
    NonDrugMedicalSuppliesMedicalEquipmentFootOperatedSuctionPump = 53
    NonDrugMedicalSuppliesMedicalEquipmentPatientVentilator = 54
    NonDrugMedicalSuppliesMedicalEquipmentMobileUltrasoundScanner = 55
    NonDrugMedicalSuppliesMedicalEquipmentSelfInflatingBagSet = 56
    NonDrugMedicalSuppliesMedicalEquipmentCapnometer = 57
    NonDrugMedicalSuppliesMedicalEquipmentXRayUnit = 58
    NonDrugMedicalSuppliesMedicalEquipmentSurgicalDrill = 59
    NonDrugMedicalSuppliesMedicalEquipmentDermatome = 60
    NonDrugMedicalSuppliesMedicalEquipmentLegTractionSplint = 61
    NonDrugMedicalSuppliesMedicalEquipmentOther = 62
    NonDrugMedicalSuppliesConsumablesMedicalTourniquets = 63
    NonDrugMedicalSuppliesConsumablesFirstAidKits = 64
    NonDrugMedicalSuppliesConsumablesViralBacteriaFilter = 65
    NonDrugMedicalSuppliesConsumablesCentralVenousCatheters = 66
    NonDrugMedicalSuppliesConsumablesSetIntraosseousInfusionKit = 67
    NonDrugMedicalSuppliesConsumablesSetInfusionAdult = 68
    NonDrugMedicalSuppliesConsumablesSetInfusionPaediatric = 69
    NonDrugMedicalSuppliesConsumablesDrainThoracicInsertionSet = 70
    NonDrugMedicalSuppliesConsumablesInsulinSyringes = 71
    NonDrugMedicalSuppliesConsumablesSyringePensDiabetics = 72
    NonDrugMedicalSuppliesConsumablesGlucometers = 73
    NonDrugMedicalSuppliesConsumablesXRayCartridges = 74
    NonDrugMedicalSuppliesConsumablesOther = 75
    NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsBasicSurgery = 76
    NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsDressing = 77
    NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsCraniotomy = 78
    NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsLaparotomyAndCaesarean = 79
    NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsDPCSuture = 80
    NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsDebridement = 81
    NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsSkinGraft = 82
    NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsFinePaediatrics = 83
    NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsThoracotomyComplementary = 84
    NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsAmputation = 85
    NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsBasicBoneSurgery = 86
    NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsBasicBoneSurgeryCurettes = 87
    NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsBoneWiringAndKirshner = 88
    NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsPlasterCastsRemoval = 89
    NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsTractionPlusTenBows = 90
    NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetExternalFixationLargeFixatorsAndInstruments = 91
    NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsOther = 92


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
