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
		public string GetVueData()
		{
			return JsonConvert.SerializeObject(NeedsVueData.FromViewModel(this));
		}
	}

	public class NeedsVueData
	{
		public static NeedsVueData FromViewModel(NeedsViewModel s)
		{
			return new NeedsVueData
			{
				OrgType = s.OrgType.ToString(),
				OrgCityId = s.OrgCityId,
				PpeTypes = s.PpeTypes.SelectToList(PpeTypeInfo.Project),
				OrgCity = SelectListItemVueData.FromViewModel(s.OrgCity),
				Cities = SelectListItemVueData.FromViewModels(s.Cities),
			};
		}

		public string OrgType;
		public long OrgCityId;
		public List<PpeTypeInfo> PpeTypes;
		public SelectListItemVueData OrgCity;
		public List<SelectListItemVueData> Cities;

		public class PpeTypeInfo
		{
			public bool Selected { get; set; }
			public int? DailyShortage { get; set; }

			public static PpeTypeInfo Project(NeedPpeTypeViewModel s)
			{
				return new PpeTypeInfo {
					Selected = s.Selected,
					DailyShortage = s.DailyShortage
				};
			}
		}
	}
}