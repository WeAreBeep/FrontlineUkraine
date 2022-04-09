using Web.Snippets.System;

namespace Web.Db
{
	public enum MeetsRegulations
	{
		Yes = 1,
		No,
		[EnumText("I'm not sure")]
		NotSure
	}
}
