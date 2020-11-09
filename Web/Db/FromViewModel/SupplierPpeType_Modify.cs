using Web.Models;

namespace Web.Db
{
    public partial class SupplierPpeType
    {
        public void Modify(SupplierPpeTypeModel s)
        {
            PpeTypeOther = s.PpeOther;
            CostTypeId = (int)s.CostType;
            CostTypeOther = s.CostTypeOther;
            CapacityPerWeek = s.CapacityPerWeek.Value;
            CurrentStock = s.CurrentStock.Value;
            LeadTimeInDays = s.LeadTimeInDays.Value;
            MeetsRegulatoryRequirementsId = (int)s.MeetsRegulations.Value;
        }
    }
}