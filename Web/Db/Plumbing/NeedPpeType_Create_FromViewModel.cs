using Web.Models;

namespace Web.Db
{
	public partial class NeedPpeType
	{
		/// <summary>
		/// For Inserts
		/// </summary>
		public static NeedPpeType Create_FromViewModel(NeedPpeTypeViewModel s, Need need)
		{
			return new NeedPpeType
			{
				Need = need,
				PpeTypeId = (byte)s.Type,
				PpeTypeOther = s.PpeTypeOther,
				DailyShortage = s.DailyShortage,
				DailyShortageForWhom = s.DailyShortageForWhom,
				StatusId =  (int)PpeStatus.New //N.B for inserts 
			};
		}
	}
}