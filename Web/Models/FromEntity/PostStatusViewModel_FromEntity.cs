using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Db;
using Web.Snippets.Microsoft.AspNetCore.Mvc.Rendering;

namespace Web.Models
{
	public partial class PostStatusViewModel
	{
		public static PostStatusViewModel FromEntity(IPostStatus s)
		{
			return new PostStatusViewModel
			{
				Status = (PostStatus)s.StatusId,
				UshahidiId = s.UshahidiId,
				PostStatuses = HtmlEnumExtensions.ToSelectListItems<PostStatus>()
			};
		}
	}
}
