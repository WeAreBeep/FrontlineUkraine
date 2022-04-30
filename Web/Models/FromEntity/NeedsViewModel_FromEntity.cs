using Microsoft.AspNetCore.Mvc.Rendering;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Newtonsoft.Json;
using Web.Db;
using Web.Infrastructure;
using Web.Snippets.System;
using Web.Snippets.System.Collections.Generic;

namespace Web.Models
{
	public partial class NeedsViewModel
	{
		public static NeedsViewModel FromEntity(Need s)
		{
			return new NeedsViewModel
			{
				Id = s.Id,
				PublishAnonymously = s.PublishAnonymously,
				ContactName = s.ContactName,
				Email = s.Email,
				PhoneNumber = s.PhoneNumber,
				OrganisationName = s.OrganisationName,
				OrgType = (OrgTypes)s.OrgTypeId,
				OrgTypeOther = s.OrgTypeOther,
				OrgRegCode = s.OrgRegCode,
				OrgCityId = s.OrgCityId,
				AddressLineOne = s.AddressLineOne,
				AddressLineTwo = s.AddressLineTwo,
				Postcode = s.Postcode,
				JobTitle = s.JobTitle,
				Department = s.Department,
				TownOrCity = s.TownOrCity,
				TellUsMore = s.TellUsMore,
				PpeTypes = NeedPpeTypeViewModel.FromNeed(s)
			};
		}
	}
}