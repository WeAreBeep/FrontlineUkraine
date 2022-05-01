using System;
using System.Collections.Generic;
using System.Linq;
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
		[EnumText("Local Charity / NGO / Foundation")]
		LocalCharity = 9,
		[EnumText("International Organisation Chapter (i.e.: Red Cross local affiliates)")]
		InternationalOrgChapter = 10,
		[EnumText("Parish / Religious Institution")]
		ReligiousInstitution = 11,
		[EnumText("Local/Regional Administrations")]
		LocalOrRegionalAdmin = 12,
		[EnumText("University")]
		University = 13,
		[EnumText("School ")]
		School = 14,
		[EnumText("Community Centre ")]
		Community = 15,
		[EnumText("Local/Regional Hospital")]
		LocalHospital = 16,
		[EnumText("Distribution Hub (UA)")]
		DistributionHub = 17,
	}

	public static class OrgTypesExtension
	{
		public static readonly List<OrgTypes> AllOrgTypes = Enum.GetValues(typeof(OrgTypes))
			.OfType<OrgTypes>()
			.ToList()
			.Where(t => t != OrgTypes.Other)
			.Append(OrgTypes.Other)
			.ToList();
	}
}
