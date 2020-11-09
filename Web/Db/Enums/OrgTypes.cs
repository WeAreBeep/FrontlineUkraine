using Web.Snippets.System;

namespace Web.Db
{
	public enum OrgTypes
	{
		[EnumText("NHS Hospital")]
		NhsHospital = 1,
		CareHome,
		[EnumText("GP Surgery")]
		GpSurgery,
		PrivateHospital,
		ShelteredHousing,
		CivicInfrastructure,
		Dentists = 8,
		[EnumText("Other...")]
		Other = 7,
	}
}
