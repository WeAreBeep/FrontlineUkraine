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
		Other
	}
}
