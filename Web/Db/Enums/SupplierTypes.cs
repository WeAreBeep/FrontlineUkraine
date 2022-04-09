using Web.Snippets.System;

namespace Web.Db
{
	public enum SupplierTypes
	{
		[EnumText("PPE manufacturer/supplier (pre-COVID-19)")]
		ExistingPPEsupplier = 1,
		[EnumText("Manufacturer/supplier adapted to make PPE in response to COVID-19")]
		AdaptedPPEsupplier,
		[EnumText("Individual/group of individuals")]
		Individuals,
		[EnumText("Other...")]
		Other
	}
}
