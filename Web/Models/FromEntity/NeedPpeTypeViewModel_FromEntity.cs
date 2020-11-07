using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Db;
using Web.Snippets.System;
using Web.Snippets.System.Collections.Generic;

namespace Web.Models
{
	public partial class NeedPpeTypeViewModel
	{
		public static NeedPpeTypeViewModel FromEntity(NeedPpeType s)
		{
			return new NeedPpeTypeViewModel
			{
				Selected = true,
				Type = (PpeTypes)s.PpeTypeId,//TODO:rename this to PpeType as per NeedsMatchViewModel
				PpeTypeOther = s.PpeTypeOther,
				DailyShortage = s.DailyShortage,
				DailyShortageForWhom = s.DailyShortageForWhom
			};
		}

		public static List<NeedPpeTypeViewModel> FromNeed(Need s)
		{
			List<NeedPpeTypeViewModel> respVal = new List<NeedPpeTypeViewModel>();
			List<NeedPpeTypeViewModel> chosenItems = s.NeedPpeTypes.SelectToList(NeedPpeTypeViewModel.FromEntity);
			List<NeedPpeTypeViewModel> fullList = Enums.AllList<PpeTypes>().SelectToList(NeedPpeTypeViewModel.FromPpeType);
			foreach(NeedPpeTypeViewModel emptyOption in fullList)
			{
				NeedPpeTypeViewModel existing = chosenItems.SingleOrDefault(p => p.Type == emptyOption.Type);
				respVal.Add(existing ?? emptyOption);
			}
			return respVal;
		}
	}
}