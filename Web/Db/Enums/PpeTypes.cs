using System.Collections.Generic;
using System.Collections.Immutable;
using Web.Snippets.System;

namespace Web.Db
{
	public enum PpeTypes
	{
		[EnumText("Type IIR Surgical Masks")]
		TypeIIRSurgicalMasks = 1,
		[EnumText("FFP1 Respirator Masks")]
		FFP1RespiratorMasks,
		[EnumText("FFP2 Respirator Masks")]
		FFP2RespiratorMasks,
		[EnumText("FFP3 Respirator Masks")]
		FFP3RespiratorMasks,
		Gowns,
		Aprons,
		Gloves,
		Scrubs,
		SafetyGlasses,
		FaceVisors,
		AlcoholHandGel,
		[EnumText("Other...")]
		Other,
		// Domestic - Sanitary
		[EnumText("Sanitary Towels (Tampons/Pads)")]
		DomesticSanitarySanitaryTowels,
		[EnumText("Nappies Size 0 (1-2.5kg, 2-5lbs")]
		DomesticSanitaryNappiesSize0,
		[EnumText("Nappies Size 1 (2 -5kg, 5-11lbs")]
		DomesticSanitaryNappiesSize1,
		[EnumText("Nappies Size 2 (3-6kg, 7-14lbs")]
		DomesticSanitaryNappiesSize2,
		[EnumText("Nappies Size 3 (4-9kg, 8-20lbs")]
		DomesticSanitaryNappiesSize3,
		[EnumText("Nappies Size 4 (7-18kg, 15-40lbs")]
		DomesticSanitaryNappiesSize4,
		[EnumText("Nappies Size 5 (11-25kg, 24-55lbs")]
		DomesticSanitaryNappiesSize5,
		[EnumText("Nappies Size 6 (16kg +, 35lbs +)")]
		DomesticSanitaryNappiesSize6,
		[EnumText("Breast pads (for breastfeeding mothers)")]
		DomesticSanitaryBreastPads,
		[EnumText("Hairbrushes")]
		DomesticSanitaryHairbrushes,
		[EnumText("Liquid soap/ Shampoo")]
		DomesticSanitaryLiquidSoap,
		[EnumText("Wet wipes (adults/children)")]
		DomesticSanitaryWetWipes,
		[EnumText("Toothbrushes")]
		DomesticSanitaryToothbrushes,
		[EnumText("Toothpaste")]
		DomesticSanitaryToothpaste,
		[EnumText("Towels")]
		DomesticSanitaryTowels,
		[EnumText("Toilet paper")]
		DomesticSanitaryToiletPaper,
		[EnumText("Pocket tissues")]
		DomesticSanitaryPocketTissues,
		[EnumText("Shaving gels and razors")]
		DomesticSanitaryShavingGelRazors,
		[EnumText("Other sanitary products")]
		DomesticSanitaryOther,
		// Domestic - Non perishable food/ drink
		[EnumText("Protein bars")]
		DomesticNonPerishableFoodDrinkProteinBars,
		[EnumText("Canned food")]
		DomesticNonPerishableFoodDrinkCannedFood,
		[EnumText("Dry food (i.e.: rice, pasta, nuts, dried fruit) / Fast cooking grains (couscous)")]
		DomesticNonPerishableFoodDrinkDryFood,
		[EnumText("Instant food (i.e.: Cup-a-soups)")]
		DomesticNonPerishableFoodDrinkInstantFood,
		[EnumText("Baby food (i.e.: powdered milk, ready-meal pouches)")]
		DomesticNonPerishableFoodDrinkBabyFood,
		[EnumText("Energy drinks")]
		DomesticNonPerishableFoodDrinkEnergyDrinks,
		[EnumText("Other (please specify)")]
		DomesticNonPerishableOther,
		// Domestic - Other
		[EnumText("Foil survival blankets")]
		DomesticOtherFoilSurvivalBlankets,
		[EnumText("Thermal clothing (new)")]
		DomesticOtherThermalClothingNew,
		[EnumText("Sleeping bags")]
		DomesticOtherSleepingBags,
		[EnumText("Bed (Hospital use)")]
		DomesticOtherBedHospital,
		[EnumText("Large/medium-sized backpacks")]
		DomesticOtherLargeOrMediumBackpacks,
		[EnumText("Power banks and charging cables")]
		DomesticOtherPowerBanksAndChargingCables,
		[EnumText("Torches with batteries/ Head torches (in sealed packs)")]
		DomesticOtherTorches,
		[EnumText("Electricity generators")]
		DomesticOtherElectricityGenerators,
		[EnumText("Boot driers")]
		DomesticOtherBootDriers,
		[EnumText("Hot water bottles")]
		DomesticOtherHotWaterBottles,
		[EnumText("Insulated flasks")]
		DomesticOtherInsulatedFlasks,
		[EnumText("Disposable tableware (cup, plates, cutlery)")]
		DomesticOtherDisposableTableware,
		[EnumText("Cooking stoves (without gas)")]
		DomesticOtherCookingStoves,
		[EnumText("Bin bags")]
		DomesticOtherBinBags,
		[EnumText("Other basics")]
		DomesticOtherOther,
		// (Non Drug) Medical Supplies - Equipment
		[EnumText("PATIENT MONITOR, w/CO2 IBP ECG NIBP TEMP, SPO2, w/acc.")]
		NonDrugMedicalSuppliesMedicalEquipmentPatientMonitor,
		[EnumText("ANAESTHESIA MACHINE, closed-circuit, trolley, w/acc")]
		NonDrugMedicalSuppliesMedicalEquipmentAnaesthesiaMachine,
		[EnumText("ECG RECORDER, portable, 12 leads, with printer and access")]
		NonDrugMedicalSuppliesMedicalEquipmentECGRecorder,
		[EnumText("DEFIBRILLATOR, AED, w/access")]
		NonDrugMedicalSuppliesMedicalEquipmentDefibrillator,
		[EnumText("SYRINGE PUMP, single-channel, AC and battery-powered, w/acc.")]
		NonDrugMedicalSuppliesMedicalEquipmentSyringePump,
		[EnumText("INFUSION PUMP, LCD, flow 0.1-1500mL/h, 220V, batt., w/acc")]
		NonDrugMedicalSuppliesMedicalEquipmentInfusionPump,
		[EnumText("EXAMINATION LIGHT, Led, overhead, mobile, adjustable, on wheels")]
		NonDrugMedicalSuppliesMedicalEquipmentExaminationLightLed,
		[EnumText("PUMP, SUCTION, FOOT-OPERATED, with tubes and connector")]
		NonDrugMedicalSuppliesMedicalEquipmentFootOperatedSuctionPump,
		[EnumText("PATIENT VENTILATOR, intensive care, for adult and paediatric, with breathing circuits and patient interface (TYPE 2)")]
		NonDrugMedicalSuppliesMedicalEquipmentPatientVentilator,
		[EnumText("SCANNER, ULTRASOUND, mobile, w/access")]
		NonDrugMedicalSuppliesMedicalEquipmentMobileUltrasoundScanner,
		[EnumText("SELF-INFLATING BAG SET, self-refilling, capacity > 1500 m adult + 3 masks (S, M, L)")]
		NonDrugMedicalSuppliesMedicalEquipmentSelfInflatingBagSet,
		[EnumText("CAPNOMETER portable, EtCO2/RR monitoring, AAA battery, w/acc.")]
		NonDrugMedicalSuppliesMedicalEquipmentCapnometer,
		[EnumText("X-RAY UNIT BASIC, mobile")]
		NonDrugMedicalSuppliesMedicalEquipmentXRayUnit,
		[EnumText("SURGICAL DRILL, cordless +accessories + drill bit")]
		NonDrugMedicalSuppliesMedicalEquipmentSurgicalDrill,
		[EnumText("DERMATOME, ELECTRICAL with battery + access.")]
		NonDrugMedicalSuppliesMedicalEquipmentDermatome,
		[EnumText("LEG TRACTION SPLINT, pre-hospital care and transport")]
		NonDrugMedicalSuppliesMedicalEquipmentLegTractionSplint,
		[EnumText("OTHER (please specify)")]
		NonDrugMedicalSuppliesMedicalEquipmentOther,
		// (Non Drug) Medical Supplies - Consumables
		[EnumText("Medical tourniquets")]
		NonDrugMedicalSuppliesConsumablesMedicalTourniquets,
		[EnumText("First aid kits (bandages, plasters, antiseptic creams, burn gels, micropore tape)")]
		NonDrugMedicalSuppliesConsumablesFirstAidKits,
		[EnumText("Viral bacterial filters & circuits for mechanical ventilation")]
		NonDrugMedicalSuppliesConsumablesViralBacteriaFilter,
		[EnumText("CENTRAL VENOUS CATHETERS, Y and straight needle, triple lumen")]
		NonDrugMedicalSuppliesConsumablesCentralVenousCatheters,
		[EnumText("SET, INTRAOSSEOUS INFUSION KIT, w/ needles and IV set")]
		NonDrugMedicalSuppliesConsumablesSetIntraosseousInfusionKit,
		[EnumText("SET, INFUSION, adult, sterile, s.u.")]
		NonDrugMedicalSuppliesConsumablesSetInfusionAdult,
		[EnumText("SET, INFUSION, paediatric, precision, sterile, s.u.")]
		NonDrugMedicalSuppliesConsumablesSetInfusionPaediatric,
		[EnumText("DRAIN, THORACIC, INSERTION-SET, complete, sterile, disposable")]
		NonDrugMedicalSuppliesConsumablesDrainThoracicInsertionSet,
		[EnumText("Insulin syringes/needles")]
		NonDrugMedicalSuppliesConsumablesInsulinSyringes,
		[EnumText("Syringe pens for diabetics")]
		NonDrugMedicalSuppliesConsumablesSyringePensDiabetics,
		[EnumText("Glucometers with test strips")]
		NonDrugMedicalSuppliesConsumablesGlucometers,
		[EnumText("X-ray cartridges")]
		NonDrugMedicalSuppliesConsumablesXRayCartridges,
		[EnumText("[(Non Drug) Medical Supplies - Consumables] OTHER (please specify)")]
		NonDrugMedicalSuppliesConsumablesOther,
		// (Non Drug) Medical Supplies - Surgical Instruments & Fixators
		[EnumText("SET, GENERAL SURGERY INSTRUMENTS, BASIC SURGERY")]
		NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsBasicSurgery,
		[EnumText("SET, GENERAL SURGERY INSTRUMENTS, DRESSING")]
		NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsDressing,
		[EnumText("SET, GENERAL SURGERY INSTRUMENTS, CRANIOTOMY,")]
		NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsCraniotomy,
		[EnumText("SET, GENERAL SURGERY INSTRUMENTS, LAPAROTOMY, + caesarean")]
		NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsLaparotomyAndCaesarean,
		[EnumText("SET, GENERAL SURGERY INSTRUMENTS, DPC (suture)")]
		NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsDPCSuture,
		[EnumText("SET, GENERAL SURGERY INSTRUMENTS, DEBRIDEMENT")]
		NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsDebridement,
		[EnumText("SET, GENERAL SURGERY INSTRUMENTS, SKIN GRAFT")]
		NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsSkinGraft,
		[EnumText("SET, GENERAL SURGERY INSTRUMENTS, FINE (paediatrics)")]
		NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsFinePaediatrics,
		[EnumText("SET, GENERAL SURGERY INSTRUMENTS, THORACOTOMY, complementary")]
		NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsThoracotomyComplementary,
		[EnumText("SET, ORTHO. SURGERY INSTRUMENTS, AMPUTATION")]
		NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsAmputation,
		[EnumText("SET, ORTHO.SURGERY INSTRUMENTS, BASIC BONE SURGERY")]
		NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsBasicBoneSurgery,
		[EnumText("SET, ORTHO.SURGERY INSTRUMENTS, BASIC BONE SURGERY, curettes")]
		NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsBasicBoneSurgeryCurettes,
		[EnumText("SET, ORTHO. SURGERY INSTRUMENTS, BONE WIRING and KIRSHNER")]
		NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsBoneWiringAndKirshner,
		[EnumText("SET, ORTHO. SURGERY INSTRUMENTS, PLASTER CASTS REMOVAL")]
		NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsPlasterCastsRemoval,
		[EnumText("SET, ORTHO. SURGERY INSTRUMENTS, TRACTION, + 10 bows")]
		NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsTractionPlusTenBows,
		[EnumText("SET, EXTERNAL FIXATION, LARGE, FIXATORS & INSTRUMENTS")]
		NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetExternalFixationLargeFixatorsAndInstruments,
		[EnumText("OTHER (please specify)")]
		NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsOther
	}

	public static class PpeTypesEnumExtension
	{
		private static List<PpeTypes> OTHER_PPE_TYPES = new List<PpeTypes>
		{
			PpeTypes.Other,
			PpeTypes.DomesticSanitaryOther,
			PpeTypes.DomesticNonPerishableOther,
			PpeTypes.DomesticOtherOther,
			PpeTypes.NonDrugMedicalSuppliesConsumablesOther,
			PpeTypes.NonDrugMedicalSuppliesMedicalEquipmentOther,
			PpeTypes.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsOther
		};

		public static readonly ImmutableHashSet<PpeTypes> CategoryDomesticSanitary = new HashSet<PpeTypes>
		{
			PpeTypes.DomesticSanitarySanitaryTowels,
			PpeTypes.DomesticSanitaryNappiesSize0,
			PpeTypes.DomesticSanitaryNappiesSize1,
			PpeTypes.DomesticSanitaryNappiesSize2,
			PpeTypes.DomesticSanitaryNappiesSize3,
			PpeTypes.DomesticSanitaryNappiesSize4,
			PpeTypes.DomesticSanitaryNappiesSize5,
			PpeTypes.DomesticSanitaryNappiesSize6,
			PpeTypes.DomesticSanitaryBreastPads,
			PpeTypes.DomesticSanitaryHairbrushes,
			PpeTypes.DomesticSanitaryLiquidSoap,
			PpeTypes.DomesticSanitaryWetWipes,
			PpeTypes.DomesticSanitaryToothbrushes,
			PpeTypes.DomesticSanitaryToothpaste,
			PpeTypes.DomesticSanitaryTowels,
			PpeTypes.DomesticSanitaryToiletPaper,
			PpeTypes.DomesticSanitaryPocketTissues,
			PpeTypes.DomesticSanitaryShavingGelRazors,
			PpeTypes.DomesticSanitaryOther,
		}.ToImmutableHashSet();

		public static readonly ImmutableHashSet<PpeTypes> CategoryDomesticNonPerishableFoodDrink = new HashSet<PpeTypes>
		{
			PpeTypes.DomesticNonPerishableFoodDrinkProteinBars,
			PpeTypes.DomesticNonPerishableFoodDrinkCannedFood,
			PpeTypes.DomesticNonPerishableFoodDrinkDryFood,
			PpeTypes.DomesticNonPerishableFoodDrinkInstantFood,
			PpeTypes.DomesticNonPerishableFoodDrinkBabyFood,
			PpeTypes.DomesticNonPerishableFoodDrinkEnergyDrinks,
			PpeTypes.DomesticNonPerishableOther,
		}.ToImmutableHashSet();

		public static readonly ImmutableHashSet<PpeTypes> CategoryDomesticOther = new HashSet<PpeTypes>
		{
			PpeTypes.DomesticOtherFoilSurvivalBlankets,
			PpeTypes.DomesticOtherThermalClothingNew,
			PpeTypes.DomesticOtherSleepingBags,
			PpeTypes.DomesticOtherBedHospital,
			PpeTypes.DomesticOtherLargeOrMediumBackpacks,
			PpeTypes.DomesticOtherPowerBanksAndChargingCables,
			PpeTypes.DomesticOtherTorches,
			PpeTypes.DomesticOtherElectricityGenerators,
			PpeTypes.DomesticOtherBootDriers,
			PpeTypes.DomesticOtherHotWaterBottles,
			PpeTypes.DomesticOtherInsulatedFlasks,
			PpeTypes.DomesticOtherDisposableTableware,
			PpeTypes.DomesticOtherCookingStoves,
			PpeTypes.DomesticOtherBinBags,
			PpeTypes.DomesticOtherOther,
		}.ToImmutableHashSet();

		public static readonly ImmutableHashSet<PpeTypes> CategoryNonDrugMedicalSuppliesEquip = new HashSet<PpeTypes>
		{
			PpeTypes.NonDrugMedicalSuppliesMedicalEquipmentPatientMonitor,
			PpeTypes.NonDrugMedicalSuppliesMedicalEquipmentAnaesthesiaMachine,
			PpeTypes.NonDrugMedicalSuppliesMedicalEquipmentECGRecorder,
			PpeTypes.NonDrugMedicalSuppliesMedicalEquipmentDefibrillator,
			PpeTypes.NonDrugMedicalSuppliesMedicalEquipmentSyringePump,
			PpeTypes.NonDrugMedicalSuppliesMedicalEquipmentInfusionPump,
			PpeTypes.NonDrugMedicalSuppliesMedicalEquipmentExaminationLightLed,
			PpeTypes.NonDrugMedicalSuppliesMedicalEquipmentFootOperatedSuctionPump,
			PpeTypes.NonDrugMedicalSuppliesMedicalEquipmentPatientVentilator,
			PpeTypes.NonDrugMedicalSuppliesMedicalEquipmentMobileUltrasoundScanner,
			PpeTypes.NonDrugMedicalSuppliesMedicalEquipmentSelfInflatingBagSet,
			PpeTypes.NonDrugMedicalSuppliesMedicalEquipmentCapnometer,
			PpeTypes.NonDrugMedicalSuppliesMedicalEquipmentXRayUnit,
			PpeTypes.NonDrugMedicalSuppliesMedicalEquipmentSurgicalDrill,
			PpeTypes.NonDrugMedicalSuppliesMedicalEquipmentDermatome,
			PpeTypes.NonDrugMedicalSuppliesMedicalEquipmentLegTractionSplint,
			PpeTypes.NonDrugMedicalSuppliesMedicalEquipmentOther,
		}.ToImmutableHashSet();

		public static readonly ImmutableHashSet<PpeTypes> CategoryNonDrugMedicalSuppliesConsumable = new HashSet<PpeTypes>
		{
			PpeTypes.NonDrugMedicalSuppliesConsumablesMedicalTourniquets,
			PpeTypes.NonDrugMedicalSuppliesConsumablesFirstAidKits,
			PpeTypes.NonDrugMedicalSuppliesConsumablesViralBacteriaFilter,
			PpeTypes.NonDrugMedicalSuppliesConsumablesCentralVenousCatheters,
			PpeTypes.NonDrugMedicalSuppliesConsumablesSetIntraosseousInfusionKit,
			PpeTypes.NonDrugMedicalSuppliesConsumablesSetInfusionAdult,
			PpeTypes.NonDrugMedicalSuppliesConsumablesSetInfusionPaediatric,
			PpeTypes.NonDrugMedicalSuppliesConsumablesDrainThoracicInsertionSet,
			PpeTypes.NonDrugMedicalSuppliesConsumablesInsulinSyringes,
			PpeTypes.NonDrugMedicalSuppliesConsumablesSyringePensDiabetics,
			PpeTypes.NonDrugMedicalSuppliesConsumablesGlucometers,
			PpeTypes.NonDrugMedicalSuppliesConsumablesXRayCartridges,
			PpeTypes.NonDrugMedicalSuppliesConsumablesOther,
		}.ToImmutableHashSet();

		public static ImmutableHashSet<PpeTypes> CategoryNonDrugMedicalSuppliesSurgicalInstrumentsAndFixators =
			new HashSet<PpeTypes>
			{
				PpeTypes.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsBasicSurgery,
				PpeTypes.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsDressing,
				PpeTypes.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsCraniotomy,
				PpeTypes
					.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsLaparotomyAndCaesarean,
				PpeTypes.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsDPCSuture,
				PpeTypes.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsDebridement,
				PpeTypes.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsSkinGraft,
				PpeTypes
					.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsFinePaediatrics,
				PpeTypes
					.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsThoracotomyComplementary,
				PpeTypes.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsAmputation,
				PpeTypes.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsBasicBoneSurgery,
				PpeTypes
					.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsBasicBoneSurgeryCurettes,
				PpeTypes
					.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsBoneWiringAndKirshner,
				PpeTypes
					.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsPlasterCastsRemoval,
				PpeTypes
					.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsTractionPlusTenBows,
				PpeTypes
					.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetExternalFixationLargeFixatorsAndInstruments,
				PpeTypes.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsOther,
			}.ToImmutableHashSet();

		public static readonly ImmutableHashSet<PpeTypes> CategoryNonDrugMedicalSuppliesPpe = new HashSet<PpeTypes>
		{
			PpeTypes.TypeIIRSurgicalMasks,
			PpeTypes.FFP1RespiratorMasks,
			PpeTypes.FFP2RespiratorMasks,
			PpeTypes.FFP3RespiratorMasks,
			PpeTypes.Gowns,
			PpeTypes.Aprons,
			PpeTypes.Gloves,
			PpeTypes.Scrubs,
			PpeTypes.SafetyGlasses,
			PpeTypes.FaceVisors,
			PpeTypes.AlcoholHandGel,
			PpeTypes.Other,
		}.ToImmutableHashSet();
		
		public static readonly List<(string Name, ImmutableHashSet<PpeTypes> CategorySet)> DomesticCategories = new List<(string Name, ImmutableHashSet<PpeTypes> CategorySet)>
		{
			(Name: "SANITARY PRODUCTS", CategorySet: CategoryDomesticSanitary),
			(Name: "NON-PERISHABLE FOOD/DRINK", CategorySet: CategoryDomesticNonPerishableFoodDrink),
			(Name: "OTHER BASICS / SHELTER EQUIPMENT", CategorySet: CategoryDomesticOther),
		};
		
		public static readonly List<(string Name, ImmutableHashSet<PpeTypes> CategorySet)> NonDrugMedicalSuppliesCategory = new List<(string Name, ImmutableHashSet<PpeTypes> CategorySet)>
		{
			(Name: "MEDICAL EQUIPMENT", CategorySet: CategoryNonDrugMedicalSuppliesEquip),
			(Name: "CONSUMABLES", CategorySet: CategoryNonDrugMedicalSuppliesConsumable),
			(Name: "SURGICAL INSTRUMENTS & FIXATORS", CategorySet: CategoryNonDrugMedicalSuppliesSurgicalInstrumentsAndFixators),
			(Name: "PPE", CategorySet: CategoryNonDrugMedicalSuppliesPpe),
		};
		
		public static bool IsOther(this PpeTypes ppeType)
		{
			return PpeTypesEnumExtension.OTHER_PPE_TYPES.Contains(ppeType);
		}
	}
}
