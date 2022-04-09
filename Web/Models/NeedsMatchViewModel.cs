using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Rendering;
using Web.Db;
using Web.Infrastructure;
using Web.Snippets.System.ComponentModel.DataAnnotations;

namespace Web.Models
{
	public partial class NeedsMatchViewModel : NeedsMatchData
	{
		public IEnumerable<SelectListItem> Statuses { get; set; }
		public IEnumerable<SelectListItem> Suppliers { get; set; }
	}

	public class NeedsMatchData : IValidatableObject
	{
		public PpeTypes PpeType { get; set; }
		public PpeStatus Status { get; set; }
		public long? SupplierId { get; set; }
		public string SupplierOther { get; set; }

		[Display(Name = "Date Closed"),
		RequiredIf("Status", PpeStatus.Met, ErrorMessage = "<b>Met</b> PPE needs require <b>{0}</b>") //N.B. would need to be "3" for client side to work not "Met"
		, DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")
		, DataType(DataType.DateTime, ErrorMessage = Settings.ValMsgs.Date)]
		public DateTimeOffset? DateClosed { get; set; }
		public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
		{
			List<ValidationResult> respVal = new List<ValidationResult>();
			if(Status == PpeStatus.Met)
			{
				if(SupplierId == null && (String.IsNullOrWhiteSpace(SupplierOther) || SupplierOther.Length < 3))
				{
					respVal.Add(new ValidationResult("<b>Met</b> PPE needs require either a <b>Supplier</b> or <b>Supplier Other</b>", new List<string> { $"{nameof(SupplierOther)}" }));
				}
				if(DateClosed != null && DateClosed.Value.Date > DateTimeOffset.Now.Date)
				{
					respVal.Add(new ValidationResult("<b>Date Closed</b> must be today or in the past", new List<string> { $"{nameof(DateClosed)}" })); //TODO:think can also use html5 attributes to set max value to today for ui also? 
				}
			}
			return respVal;
		}
	}

	public class NeedsMatchVueData
	{
		public PpeStatus Status { get; set; }

		/// <summary>
		/// TODO:TD this is upsetting, the MBinder does not bind null to int? only an empty value / undefined
		/// would be nice to reuse parts of VM / postdata for vue directly.
		/// Options
		/// 1. have json.net serialise int? default => "" instead of null  
		/// 2. use custom typeconverter / MB to accept the null from form  
		/// </summary>
		public string SupplierId { get; set; }

		public static NeedsMatchVueData Project(NeedsMatchData s)
		{
			//var t = Convert.ToString(s.SupplierId);
			return new NeedsMatchVueData
			{
				Status = s.Status,
				SupplierId = s.SupplierId.ToString()
			};
		}
	}
}