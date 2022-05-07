using Microsoft.AspNetCore.Mvc.Rendering;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Newtonsoft.Json;
using Web.Db;
using Web.Infrastructure;
using Web.Snippets.Microsoft.AspNetCore.Mvc.Rendering;
using Web.Snippets.System;
using Web.Snippets.System.Collections.Generic;

namespace Web.Models
{
	public partial class SuppliesViewModel
	{
		public static SuppliesViewModel FromEntity(Supplier s)
		{
			var transportTypeSelectItems = HtmlEnumExtensions.ToSelectListItems<TransportType>();
			var selected = transportTypeSelectItems.Find(i => i.Value == s.TransportType.ToString());
			if (selected != null)
			{
				selected.Selected = true;
			}

			return new SuppliesViewModel
			{
				Id = s.Id,
				ContactName = s.ContactName,
				Email = s.Email,
				PhoneNumber = s.PhoneNumber,
				Description = s.Description,
				OrganisationName = s.Name,
				SupplierType = (SupplierTypes)s.SupplierTypeId,
				SupplierTypeOther = s.SupplierTypeOther,
				Postcode = s.Postcode,
				Website = s.Website,
				TellUsMore = s.TellUsMore,
				PpeTypes = SupplierPpeTypeModel.FromSupplier(s),
				TransportType = s.TransportType,
				TransportTypeOther = s.TransportTypeOther,
				TransportTypes = transportTypeSelectItems
			};
		}
	}
}