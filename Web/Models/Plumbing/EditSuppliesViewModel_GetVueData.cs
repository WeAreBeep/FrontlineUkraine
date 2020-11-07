using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace Web.Models
{
	public partial class EditSuppliesViewModel
	{
		public string GetVueData()
		{
			return JsonConvert.SerializeObject(new
			{
				Supplies = SuppliesVueData.FromViewModel(Supplies),
			});
		}
	}
}