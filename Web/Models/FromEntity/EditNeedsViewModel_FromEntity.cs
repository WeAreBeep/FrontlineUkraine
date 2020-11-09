using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;
using Web.Db;
using Web.Microsoft.AspNetCore.Mvc.Rendering;
using Web.Snippets.Microsoft.AspNetCore.Mvc.Rendering;
using Web.Snippets.System.Collections.Generic;

namespace Web.Models
{
	public partial class EditNeedsViewModel
	{
		public static EditNeedsViewModel FromEntities(Need s, List<Supplier> suppliers)
		{
			return new EditNeedsViewModel
			{
				Request = NeedsViewModel.FromEntity(s),
				Status = PostStatusViewModel.FromEntity(s),
				Twitter = TwitterViewModel.FromEntity(s),
				NeedsMatching = NeedsMatchViewModel.FromEntities(s, suppliers),
				Location = LocationViewModel.FromEntity(s),
				Notes = NotesViewModel.FromNeed(s),
			};
		}
	}
}