using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Microsoft.AspNetCore.Mvc.Rendering;
using Web.Db;
using Web.Infrastructure;
using Web.Snippets.System;
using Web.Snippets.System.Collections.Generic;
using Web.Snippets.System.ComponentModel.DataAnnotations;

namespace Web.Models
{
	public partial class SuppliesViewModel : SuppliesData
	{
		public List<SelectListItem> TransportTypes { get; set; }
	}
	
	public partial class SuppliesData : IValidatableObject
	{
		public long Id { get; set; }

		[Display(Name = "Organisation Name", Description = "Company or organisation name"),
		Required(ErrorMessage = Settings.ValMsgs.Required),
		StringLength(500, MinimumLength = 3, ErrorMessage = Settings.ValMsgs.StringLengthWithMinimum)]
		public string OrganisationName { get; set; }

		[Display(Name = "Description", Description = "Brief description of what your organisation does"),
		Required(ErrorMessage = Settings.ValMsgs.Required),
		StringLength(1000, MinimumLength = 3, ErrorMessage = Settings.ValMsgs.StringLengthWithMinimum)]
		public string Description { get; set; }

		[Display(Name = "Type", Description = "Which best describes your organisation?"),
		Required(ErrorMessage = Settings.ValMsgs.Required)]
		public SupplierTypes SupplierType { get; set; }

		[Display(Name = "Type Other", Description = "If the list above does not fit choose \"Other...\" and describe here"),
		StringLength(1000, MinimumLength = 3, ErrorMessage = Settings.ValMsgs.StringLengthWithMinimum),
		RequiredIf("SupplierType", SupplierTypes.Other, ErrorMessage = "Please add <b>{0}</b> to describe your Organisation Type when choosing <b>\"Other...\"</b>")]
		public string SupplierTypeOther { get; set; }

		[Display(Name = "Email", Description = "Email address"),
		Required(ErrorMessage = Settings.ValMsgs.Required),
		StringLength(320, MinimumLength = 8, ErrorMessage = Settings.ValMsgs.StringLengthWithMinimum),
		EmailAddress(ErrorMessage = Settings.ValMsgs.Email)]
		public string Email { get; set; }

		[Display(Name = "Website", Description = "Web address"),
		StringLength(2084, MinimumLength = 8, ErrorMessage = Settings.ValMsgs.StringLengthWithMinimum),
		Url(ErrorMessage = Settings.ValMsgs.Url)]
		public string Website { get; set; }

		[Display(Name = "Phone number", Description = "Phone number"),
		Required(ErrorMessage = Settings.ValMsgs.Required),
		StringLength(100, MinimumLength = 3, ErrorMessage = Settings.ValMsgs.StringLengthWithMinimum)]
		public string PhoneNumber { get; set; }

		[Display(Name = "Contact Name", Description = "Name of person who deals with PPE enquiries"),
		StringLength(100, MinimumLength = 3, ErrorMessage = Settings.ValMsgs.StringLengthWithMinimum)]
		public string ContactName { get; set; }

		[Display(Name = "Postcode", Description = "Will be added to the map to indicate location of your supplies"),
		Required(ErrorMessage = Settings.ValMsgs.Required),
		StringLength(200, MinimumLength = 3, ErrorMessage = Settings.ValMsgs.StringLengthWithMinimum)]
		public string Postcode { get; set; }

		[Display(Name = "Tell Us More", Description = "Please tell us your COVID-19 story here. We may use this in marketing/media to share good news stories")]
		public string TellUsMore { get; set; }
		
		[
			Display(Name = "Transport", Description = "Can you transport and deliver the supplies?"),
			Required(ErrorMessage = Settings.ValMsgs.Required),
			
		]
		public TransportType TransportType { get; set; }
		
		[
			Display(Name = "Other description", Description = "If the list above does not fit choose \"Other...\" and describe here"), 
			StringLength(1000, MinimumLength = 3, ErrorMessage = Settings.ValMsgs.StringLengthWithMinimum)
		]
		public string TransportTypeOther { get; set; }

		[Display(Name = "What You Can Supply", Description = "Tick as many as apply"),
		Required(ErrorMessage = Settings.ValMsgs.Required)]//N.B. this just gives us the right class for the label (*) will not do actual validation 
		public List<SupplierPpeTypeModel> PpeTypes { get; set; } = Enums.AllList<PpeTypes>().SelectToList(SupplierPpeTypeModel.FromPpeType);
		public IEnumerable<ValidationResult> Validate(ValidationContext validationContext) 
		{ 
			List<ValidationResult> respVal = new List<ValidationResult>();
			if(TransportType == TransportType.Other && String.IsNullOrWhiteSpace(TransportTypeOther))
			{
				respVal.Add(new ValidationResult(
					"Please add <b>Other description</b> to describe the availability of transport when choosing <b>\"Other...\"</b>", 
					new List<string> { $"{nameof(TransportTypeOther)}" }));
			}
			if(PpeTypes.Count(pt => pt.Selected) == 0)
			{
				respVal.Add(new ValidationResult("Please choose at least one <b>PPE Type</b> which you can supply", new List<string> { "PpeTypes" }));
			}
			return respVal;
		}
	}
}