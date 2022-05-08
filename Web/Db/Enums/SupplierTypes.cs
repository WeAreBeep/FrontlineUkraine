using Web.Snippets.System;

namespace Web.Db
{
	public enum SupplierTypes
	{
		[EnumText("Manufacturer/Supplier")]
		Manufacturer = 1,
		[EnumText("Aid Organisation/Charity")]
		AidOrganisationOrCharity,
		[EnumText("Community Group")]
		CommunityGroup,
		[EnumText("Other (please specify)")]
		Other
	}
}
