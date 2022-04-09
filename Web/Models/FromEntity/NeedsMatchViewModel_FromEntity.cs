using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Rendering;
using Web.Db;
using Web.Microsoft.AspNetCore.Mvc.Rendering;
using Web.Snippets.Microsoft.AspNetCore.Mvc.Rendering;
using Web.Snippets.System.Collections.Generic;

namespace Web.Models
{
	public partial class NeedsMatchViewModel
	{
		public static List<NeedsMatchViewModel> FromEntities(Need s, List<Supplier> suppliers)
		{
			List<SelectListItem> supplierSelectListItems = SelectListItem_FromEntity.FromEntities(suppliers);
			return s.NeedPpeTypes.SelectToList(p => NeedsMatchViewModel.FromEntity(p, supplierSelectListItems));
		}

		public static NeedsMatchViewModel FromEntity(NeedPpeType s, List<SelectListItem> suppliers)
		{
			return new NeedsMatchViewModel
			{
				PpeType = (PpeTypes)s.PpeTypeId,
				Status = (PpeStatus)s.StatusId,
				SupplierId = s.SupplierId,
				SupplierOther = s.SupplierOther,
				DateClosed = s.DateClosed,
				Statuses = HtmlEnumExtensions.ToSelectListItems<PpeStatus>(),
				Suppliers = suppliers,
			};
		}
	}
}