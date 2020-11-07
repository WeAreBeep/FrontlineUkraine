using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Db
{
	public partial class NeedPpeType
	{
		public long NeedId { get; set; }
		public byte PpeTypeId { get; set; }
		public string PpeTypeOther { get; set; }
		public int? DailyShortage { get; set; }
		public string DailyShortageForWhom { get; set; }
		public int StatusId { get; set; }
		public long? SupplierId { get; set; }
		public string SupplierOther { get; set; }
		public DateTimeOffset? DateClosed { get; set; }

		public virtual Need Need { get; set; }
		public virtual PpeType PpeType { get; set; } //TODO:TD want this in EM?
		public virtual Supplier Supplier { get; set; }
	}
}
