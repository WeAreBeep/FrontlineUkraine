using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Db;
using Web.Snippets.System;
using Web.Snippets.System.Collections.Generic;

namespace Web.Models
{
	public partial class SupplierPpeTypeModel
	{
		public static SupplierPpeTypeModel FromEntity(SupplierPpeType s)
		{
			return new SupplierPpeTypeModel
			{
				CapacityPerWeek = s.CapacityPerWeek,
				CostType = (CostTypes)s.CostTypeId,
				CostTypeOther = s.CostTypeOther,
				CurrentStock = s.CurrentStock,
				LeadTimeInDays = s.LeadTimeInDays,
				MeetsRegulations = (MeetsRegulations)s.MeetsRegulatoryRequirementsId,
				Type = (PpeTypes)s.PpeTypeId,
				Selected = true

			};
		}

		public static List<SupplierPpeTypeModel> FromSupplier(Supplier s)
		{
			List<SupplierPpeTypeModel> respVal = new List<SupplierPpeTypeModel>();
			List<SupplierPpeTypeModel> chosenItems = s.SupplierPpeTypes.SelectToList(SupplierPpeTypeModel.FromEntity);
			List<SupplierPpeTypeModel> fullList = Enums.AllList<PpeTypes>().SelectToList(SupplierPpeTypeModel.FromPpeType);
			foreach(SupplierPpeTypeModel emptyOption in fullList)
			{
				SupplierPpeTypeModel existing = chosenItems.SingleOrDefault(p => p.Type == emptyOption.Type);
				respVal.Add(existing ?? emptyOption);
			}
			return respVal;
		}
	}
}