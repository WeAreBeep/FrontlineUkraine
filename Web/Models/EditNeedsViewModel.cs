using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Microsoft.AspNetCore.Mvc.Rendering;
using Web.Db;
using Web.Microsoft.AspNetCore.Mvc.Rendering;
using Web.Snippets.Microsoft.AspNetCore.Mvc.Rendering;
using Web.Snippets.System;

namespace Web.Models
{
	public partial class EditNeedsViewModel
	{
		//LHS
		public NeedsViewModel Request { get; set; }
		//RHS
		public PostStatusViewModel Status { get; set; }
		public TwitterViewModel Twitter { get; set; }
		public List<NeedsMatchViewModel> NeedsMatching { get; set; }
		public LocationViewModel Location { get; set; }
		public NotesViewModel Notes { get; set; }

		public static EditNeedsViewModel FromPostData(EditNeedsPost s, List<Supplier> suppliers, List<City> cities)
		{
			List<SelectListItem> ppeStatuses = HtmlEnumExtensions.ToSelectListItems<PpeStatus>();
			List<SelectListItem> supplierSelectListItems = SelectListItem_FromEntity.FromEntities(suppliers);
			return new EditNeedsViewModel {
				Request = NeedsViewModel.FromPostData(s.Request, cities),
				Status = new PostStatusViewModel {
					Status = s.Status.Status,
					PostStatuses = HtmlEnumExtensions.ToSelectListItems<PostStatus>()
				},
				Twitter = s.Twitter,
				NeedsMatching = s.NeedsMatching.ConvertAll(ppe => new NeedsMatchViewModel {
					PpeType = ppe.PpeType,
					Status = ppe.Status,
					SupplierId = ppe.SupplierId,
					SupplierOther = ppe.SupplierOther,
					DateClosed = ppe.DateClosed,
					//
					Statuses = ppeStatuses,
					Suppliers = supplierSelectListItems,
				}),
				Notes = new NotesViewModel {
					NewNote = s.Notes.NewNote
				},
				Location = s.Location,
			};
		}
	}

	public class EditNeedsPost  : IValidatableObject
	{
		public NeedsViewModel Request { get; set; }
		public StatusData Status { get; set; }
		public TwitterViewModel Twitter { get; set; }
		public List<NeedsMatchData> NeedsMatching { get; set; }
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