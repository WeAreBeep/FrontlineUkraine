using Web.Snippets.System;

namespace Web.Db
{
	public enum CostTypes
	{
		[EnumText("Free of Charge")]
		Free = 1,
		Charged,
		[EnumText("Other...")]
		Other
	}
}
