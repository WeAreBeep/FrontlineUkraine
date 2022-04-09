using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using Web.Db;
using Web.Snippets.System.Collections.Generic;

namespace Web.Models
{
	public partial class SuppliesViewModel
	{
		public string GetVueData()
		{
			return JsonConvert.SerializeObject(SuppliesVueData.FromViewModel(this));
		}
	}

	public class SuppliesVueData
	{
		public static SuppliesVueData FromViewModel(SuppliesViewModel s)
		{
			return new SuppliesVueData
			{
				SupplierType = s.SupplierType.ToString(),
				PpeTypes = s.PpeTypes.SelectToList(PpeTypeInfo.Project),
			};
		}

		public string SupplierType;
		public List<PpeTypeInfo> PpeTypes;
		
		public class PpeTypeInfo
		{
			public bool Selected { get; set; }
			public string CostType { get; set; }
			public int? CapacityPerWeek { get; set; }
			public int? CurrentStock { get; set; }
			public int? LeadTimeInDays { get; set; }

			public static PpeTypeInfo Project(SupplierPpeTypeModel s)
			{
				return new PpeTypeInfo {
					Selected = s.Selected,
					CostType = Convert.ToString(s.CostType),
					CapacityPerWeek = s.CapacityPerWeek,
					CurrentStock = s.CurrentStock,
					LeadTimeInDays = s.LeadTimeInDays
				};
			}
		}
	}
}
