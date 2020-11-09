using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace Web.Models
{
	public partial class EditNeedsViewModel
	{
		public string GetVueData()
		{
			return JsonConvert.SerializeObject(new
			{
				Request = NeedsVueData.FromViewModel(Request),
				NeedsMatching = NeedsMatching.Select(NeedsMatchVueData.Project)
			});
		}
	}
}