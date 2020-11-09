using Web.Models;

namespace Web.Db
{
	public partial class SupplierPpeType
	{
		public static SupplierPpeType Create_FromViewModel(SupplierPpeTypeModel s, Supplier supplier)
		{
			SupplierPpeType respVal = new SupplierPpeType();

			respVal.Supplier = supplier;
			respVal.PpeTypeId = (byte)s.Type;
			respVal.PpeTypeOther = s.PpeOther;
			respVal.MeetsRegulatoryRequirementsId = (int)s.MeetsRegulations.Value;
			respVal.CostTypeId = (int)s.CostType.Value;
			respVal.CostTypeOther = s.CostTypeOther;
			respVal.CapacityPerWeek = s.CapacityPerWeek.Value;
			respVal.CurrentStock = s.CurrentStock.Value;
			respVal.LeadTimeInDays = s.LeadTimeInDays.Value;
			respVal.Notes = s.Notes;

			return respVal;
		}
	}
}