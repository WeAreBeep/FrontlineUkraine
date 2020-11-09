using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.Rendering;
using Web.Db;
using Web.Snippets.Microsoft.AspNetCore.Mvc.Rendering;
using Web.Snippets.System;

namespace Web.Models
{
	public partial class EditSuppliesViewModel 
	{
		//LHS
		public SuppliesViewModel Supplies { get; set; }
		//RHS
		public PostStatusViewModel Status { get; set; }
		public LocationViewModel Location { get; set; }

		public NotesViewModel Notes { get; set; }

		public static EditSuppliesViewModel FromPostData(EditSuppliesPost s)
		{
			return new EditSuppliesViewModel
			{
				Supplies = s.Supplies,
				Status = new PostStatusViewModel
				{
					Status = s.Status.Status,
					PostStatuses = HtmlEnumExtensions.ToSelectListItems<PostStatus>()
				},	
				Location = s.Location,
				Notes = new NotesViewModel()
				{
					NewNote = s.Notes.NewNote
				}
			};
		}
	}

	public class EditSuppliesPost : IValidatableObject
	{
		public SuppliesViewModel Supplies { get; set; }

		public StatusData Status { get; set; }

		public LocationViewModel Location { get; set; }

		public NotesData Notes { get; set; }

		public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
		{
			List<ValidationResult> respVal = new List<ValidationResult>();
			if(Status.Status == PostStatus.Published)
			{
				if(Location.Longitude == null)
				{
					respVal.Add(new ValidationResult($"Please add <b>Longitude</b> when saving as <b>{PostStatus.Published.GetText()}</b>",
						new List<string> { $"{nameof(Location)}.{nameof(Location.Longitude)}" }));
				}

				if(Location.Latitude == null)
				{
					respVal.Add(new ValidationResult($"Please add <b>Latitude</b> when saving as <b>{PostStatus.Published.GetText()}</b>",
						new List<string> { $"{nameof(Location)}.{nameof(Location.Latitude)}" }));
				}
			}
			return respVal;
		}
	}
}