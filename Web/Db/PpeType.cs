using System.Collections.Generic;

namespace Web.Db
{
    /// <summary>
    /// TODO:remove this from model?
    /// </summary>
    public partial class PpeType
    {
        public PpeType()
        {
			NeedPpeTypes = new HashSet<NeedPpeType>();
            SupplierPpeTypes = new HashSet<SupplierPpeType>();
        }

        public byte Id { get; set; }
        public string Name { get; set; }

        
		public virtual ICollection<NeedPpeType> NeedPpeTypes { get; set; }
        public virtual ICollection<SupplierPpeType> SupplierPpeTypes { get; set; }
    }
}
