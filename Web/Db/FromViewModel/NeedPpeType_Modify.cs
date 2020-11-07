using Web.Models;

namespace Web.Db
{
	public partial class NeedPpeType
	{
		public void Modify(NeedsMatchData s)
		{
			StatusId = (int)s.Status;
			SupplierId = s.SupplierId;
			SupplierOther = s.SupplierOther;
			DateClosed = s.DateClosed;
		}

		public void Modify(NeedPpeTypeViewModel s)
		{
			PpeTypeOther = s.PpeTypeOther;
			DailyShortage = s.DailyShortage;
			DailyShortageForWhom = s.DailyShortageForWhom;
		}
	}
}