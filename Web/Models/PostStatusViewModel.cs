using Microsoft.AspNetCore.Mvc.Rendering;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Shared;
using Web.Db;
using Web.Infrastructure;

namespace Web.Models
{
	public partial class PostStatusViewModel : StatusData
	{
		public IEnumerable<SelectListItem> PostStatuses { get; set; }

		public string UshahidiUrl =>  Settings.GetUshahidiUrl(UshahidiId);
		public long? UshahidiId {get; set;}
	}

	public class StatusData
	{
		[Display(Name = "Status", Description = "The status of this post")]
		public PostStatus Status { get; set; }
	}
}
