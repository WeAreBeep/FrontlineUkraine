namespace Web.Db
{
    public partial class SupplierPpeType
    {
        public long SupplierId { get; set; }
        public byte PpeTypeId { get; set; }
        public string PpeTypeOther { get; set; }
        public int CostTypeId { get; set; }
        public string CostTypeOther { get; set; }
        public int CapacityPerWeek { get; set; }
        public int CurrentStock { get; set; }
        public int LeadTimeInDays { get; set; }
        public string Notes { get; set; }
        public int MeetsRegulatoryRequirementsId { get; set; }

        public virtual PpeType PpeType { get; set; }
        public virtual Supplier Supplier { get; set; }
    }
}
