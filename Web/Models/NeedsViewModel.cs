using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Web.Db;
using Web.Infrastructure;
using Web.Microsoft.AspNetCore.Mvc.Rendering;
using Web.Snippets.System;
using Web.Snippets.System.Collections.Generic;
using Web.Snippets.System.ComponentModel.DataAnnotations;

namespace Web.Models
{
	public partial class NeedsViewModel
	{
		public static NeedsViewModel FromPostData(NeedsViewModel request, List<City> cities)
		{
			var citySelectListItems = SelectListItem_FromEntity.FromEntities(cities, request.OrgCityId);
			return new NeedsViewModel
			{
				Id = request.Id,
				PublishAnonymously = request.PublishAnonymously,
				ContactName = request.ContactName,
				Email = request.Email,
				PhoneNumber = request.PhoneNumber,
				OrganisationName = request.OrganisationName,
				OrgRegCode = request.OrgRegCode,
				OrgCityId = request.OrgCityId,
				OrgType = request.OrgType,
				OrgTypeOther = request.OrgTypeOther,
				AddressLineOne = request.AddressLineOne,
				AddressLineTwo = request.AddressLineTwo,
				Postcode = request.Postcode,
				JobTitle = request.JobTitle,
				Department = request.Department,
				TownOrCity = request.TownOrCity,
				TellUsMore = request.TellUsMore,
				PpeTypes = request.PpeTypes,
				Cities = citySelectListItems,
				OrgCity = citySelectListItems.Find(i => i.Selected),
			};
		}
		public List<SelectListItem> Cities { get; set; }
		public SelectListItem OrgCity { get; set; }
	}
	public partial class NeedsViewModel : IValidatableObject
	{
		public long Id { get; set; }

		[Display(Name = "Publish Anonymously", Description = "Check this if you do not wish your name to be published on the Frontline Map")]
		public bool PublishAnonymously { get; set; }

		[Display(
			Name = "Your Name",
			Description = "If you tick 'Publish Anonymously' this will not be published on the website nor shared outside the Frontline team. If you don't leave your name, we will delivery PPE package to the department you entered."
		),
		StringLength(200)]
		public string ContactName { get; set; }

		[Display(Name = "Email", Description = "We need to contact you to confirm information and successful delivery."),
		Required(ErrorMessage = Settings.ValMsgs.Required),
		StringLength(100, MinimumLength = 3, ErrorMessage = Settings.ValMsgs.StringLengthWithMinimum),
		EmailAddress(ErrorMessage = Settings.ValMsgs.Email)]
		public string Email { get; set; }

		[Display(Name = "Phone number", Description = "Our delivery service need this for successful delivery. It will be deleted when your needs are met."),
		Required(ErrorMessage = Settings.ValMsgs.Required),
		StringLength(100, MinimumLength = 3, ErrorMessage = Settings.ValMsgs.StringLengthWithMinimum)]
		public string PhoneNumber { get; set; }

		[Display(Name = "Organisation Name", Description = "Organisation or Company name"),
		Required(ErrorMessage = Settings.ValMsgs.Required),
		StringLength(200, MinimumLength = 3, ErrorMessage = Settings.ValMsgs.StringLengthWithMinimum)]
		public string OrganisationName { get; set; }
		
		[
			Display(Name = "USREOU Code* / Registration No.", Description = "This is the 7 digits unique registration code for all public/charitable Ukrainian organisations. This will helps us verify and ensure that aid gets to the right places to be distributed to citizens in need"),
			Required(ErrorMessage = Settings.ValMsgs.Required),
			RegularExpression(@"^[\d]{7}$", ErrorMessage = "<b>{0}</b> is the 7 digits unique registration code.")
		]
		public string OrgRegCode { get; set; }
		
		[Display(Name = "City", Description = "Organisation city"), Required(ErrorMessage = Settings.ValMsgs.Required)]
		public long OrgCityId { get; set; }

		[Display(Name = "Type", Description = "Which best describes your organisation?"),
		Required(ErrorMessage = Settings.ValMsgs.Required)]
		public OrgTypes OrgType { get; set; }

		[Display(Name = "Type Other", Description = "If the list above does not fit choose \"Other...\" and describe here"),
		StringLength(1000, MinimumLength = 3, ErrorMessage = Settings.ValMsgs.StringLengthWithMinimum),
		RequiredIf("OrgType", OrgTypes.Other, ErrorMessage = "Please add <b>{0}</b> to describe your Organisation Type when choosing <b>\"Other...\"</b>")]
		public string OrgTypeOther { get; set; }

		[Display(Name = "Address line 1"),
		Required(ErrorMessage = Settings.ValMsgs.Required)]
		public string AddressLineOne { get; set; }

		[Display(Name = "Address line 2")]
		public string AddressLineTwo { get; set; }

		[Display(Name = "what3words address", Description = "Will be added to the map to locate your Needs"),
		Required(ErrorMessage = Settings.ValMsgs.Required),
		RegularExpression("^(/{3})?.+\\..+\\..+$", ErrorMessage = "{0} should have 3 words connected with fullstops(.)")]
		public string Postcode { get; set; }

		[Display(Name = "Job Title", Description = "This will not be published on the site. It will be used for anonymous data reporting."),
		Required(ErrorMessage = Settings.ValMsgs.Required),
		StringLength(200, MinimumLength = 3, ErrorMessage = Settings.ValMsgs.StringLengthWithMinimum)]
		public string JobTitle { get; set; }

		[Display(Name = "Department", Description = "This will not be published on the site. It will be used for anonymous data reporting."),
		Required(ErrorMessage = Settings.ValMsgs.Required),
		StringLength(200, MinimumLength = 3, ErrorMessage = Settings.ValMsgs.StringLengthWithMinimum)]
		public string Department { get; set; }

		[Display(Name = "Town/City", Description = ""),
		StringLength(200, MinimumLength = 3, ErrorMessage = Settings.ValMsgs.StringLengthWithMinimum)]
		public string TownOrCity { get; set; }

		[Display(Name = "Tell Us More", Description = "Tell us more about how the shortage affects you"),
		StringLength(10000, MinimumLength = 3, ErrorMessage = Settings.ValMsgs.StringLengthWithMinimum)]
		public string TellUsMore { get; set; }

		[Display(Name = "Needs", Description = "Tick as many as apply"),
		Required(ErrorMessage = Settings.ValMsgs.Required)] //N.B. this just gives us the right class for the label (*) will not do actual validation 
		public List<NeedPpeTypeViewModel> PpeTypes { get; set; } = Enums.AllList<PpeTypes>().SelectToList(NeedPpeTypeViewModel.FromPpeType);
		public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
		{
			List<ValidationResult> respVal = new List<ValidationResult>();
			if (!String.IsNullOrEmpty(ContactName) && ContactName.Length > 0 && ContactName.Length < 3)
			{
				respVal.Add(new ValidationResult(Settings.ValMsgs.StringLengthWithMinimum));
			}
			if(PpeTypes.Count(pt => pt.Selected) == 0)
			{
				respVal.Add(new ValidationResult("Please choose at least one <b>PPE Type</b> which you need", new List<string> { "PpeTypes" }));
			}
			return respVal;
		}
	}
}