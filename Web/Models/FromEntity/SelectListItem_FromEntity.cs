using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Rendering;
using Web.Db;
using Web.Snippets.System.Collections.Generic;

namespace Web.Microsoft.AspNetCore.Mvc.Rendering
{
	public static class SelectListItem_FromEntity
	{
		public static List<SelectListItem> FromEntities(List<Supplier> s)
		{
			List<SelectListItem> respVal = s.SelectToList(SelectListItem_FromEntity.FromEntity);
			respVal.Add(SelectListItem_FromEntity.ForOther());
			return respVal;
		}
		public static SelectListItem ForOther()
		{
			return new SelectListItem
			{
				Value = "",//annoyingly MB will not bind form value null to an int? instead it needs undefined in form. 
				Text = "Other..."
			};
		}
		public static SelectListItem FromEntity(Supplier s)
		{
			return new SelectListItem
			{
				Value = s.Id.ToString(),
				Text = s.Name
			};
		}
	}
}
