using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;
using Web.Db;
using Web.Microsoft.AspNetCore.Mvc.Rendering;
using Web.Snippets.Microsoft.AspNetCore.Mvc.Rendering;
using Web.Snippets.System.Collections.Generic;

namespace Web.Models
{
	public partial class EditSuppliesViewModel
	{
		public static EditSuppliesViewModel FromEntities(Supplier s)
		{
			return new EditSuppliesViewModel
			{
				Supplies = SuppliesViewModel.FromEntity(s),
				Status = PostStatusViewModel.FromEntity(s),
				Location = LocationViewModel.FromEntity(s),
				Notes = NotesViewModel.FromSupplier(s),
			};
		}
	}
}