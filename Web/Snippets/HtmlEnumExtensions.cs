using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;
using Web.Snippets.System;
using Web.Snippets.System.Collections.Generic;

namespace Web.Snippets.Microsoft.AspNetCore.Mvc.Rendering
{
	public static class HtmlEnumExtensions
	{
		public static List<SelectListItem> ToSelectListItems<TSource>() where TSource : Enum
		{
			return Enums.AllList<TSource>().SelectToList(s => new SelectListItem
			{
				Value = Convert.ToInt32(s).ToString(),
				Text = s.GetText()
			});
		}

		public static List<SelectListItem> ToSelectListItemsNamedValue<TSource>() where TSource : Enum
		{
			return Enums.AllList<TSource>().SelectToList(s => new SelectListItem
			{
				Value = s.ToString(),
				Text = s.GetText()
			});
		}
	}
}
