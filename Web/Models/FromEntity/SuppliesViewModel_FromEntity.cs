using Microsoft.AspNetCore.Mvc.Rendering;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Newtonsoft.Json;
using Web.Db;
using Web.Infrastructure;
using Web.Snippets.System;
using Web.Snippets.System.Collections.Generic;

namespace Web.Models
{
	public partial class SuppliesViewModel
	{
		public static SuppliesViewModel FromEntity(Supplier s)
		{
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
				PpeTypes = SupplierPpeTypeModel.FromSupplier(s)
			};
		}
	}
}