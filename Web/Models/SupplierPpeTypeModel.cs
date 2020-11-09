using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Web.Db;
using Web.Infrastructure;
using Web.Snippets.System.ComponentModel.DataAnnotations;

namespace Web.Models
{
	public partial class SupplierPpeTypeModel : IValidatableObject
	{
		[Display(Name = "Type", Description = "Choose the type of PPE")]
		public PpeTypes Type { get; set; }

		public bool Selected { get; set; }

		[Display(Name = "PPE Type Other", Description = "If the list above does not fit choose \"Other...\" and describe here"),
		StringLength(1000, MinimumLength = 3, ErrorMessage = Settings.ValMsgs.StringLengthWithMinimum)]
		public string PpeOther { get; set; }

		[Display(Name = "Meets Regulations",
			Description = "Does this type of PPE you supply meet the appropriate regulatory requirements? <br/> All PPE must meet the required standards and will be tested before use by the NHS."),
		RequiredIf("Selected", true, ErrorMessage = Settings.ValMsgs.Required)]
		public MeetsRegulations? MeetsRegulations { get; set; }

		[Display(Name = "Costs", Description = "How are you offering this type of PPE"),
		RequiredIf("Selected", true, ErrorMessage = Settings.ValMsgs.Required)]
		public CostTypes? CostType { get; set; }

		[Display(Name = "Other Cost Type", Description = "Describe how are you offering this type of PPE"),
		RequiredIf("CostType", CostTypes.Other, ErrorMessage = Settings.ValMsgs.Required)]
		public string CostTypeOther { get; set; }

		[Display(Name = "Capacity", Description = "How many units you can supply per week"),
		RequiredIf("Selected", true, ErrorMessage = Settings.ValMsgs.Required),
		NumericalRange(0,1,100000000)]
		public int? CapacityPerWeek { get; set; }

		[Display(Name = "Current Stock", Description = "How many units are available immediately"),
		RequiredIf("Selected", true, ErrorMessage = Settings.ValMsgs.Required),
		NumericalRange(0,1,100000000)]
		public int? CurrentStock { get; set; }

		[Display(Name = "Lead Time", Description = "Lead times on production in days"),
		RequiredIf("Selected", true, ErrorMessage = Settings.ValMsgs.Required),
		NumericalRange(0,1,1000)]
		public int? LeadTimeInDays { get; set; }

		[Display(Name = "Notes", Description = "Any additional notes")]
		public string Notes { get; set; }
		
		public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
		{
			List<ValidationResult> respVal = new List<ValidationResult>();
			if(Type == PpeTypes.Other && Selected && String.IsNullOrWhiteSpace(PpeOther))
			{
				respVal.Add(new ValidationResult("Please add <b>PPE Type Other</b> to describe the PPE Type when choosing <b>\"Other...\"</b>", new List<string> { $"{nameof(PpeOther)}" }));
			}
			return respVal;
		}

		public static SupplierPpeTypeModel FromPpeType(PpeTypes type)
		{
			return new SupplierPpeTypeModel
			{
				Type = type,
			};
		}
	}
}