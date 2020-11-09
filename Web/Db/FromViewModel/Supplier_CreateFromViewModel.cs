using System;
using Web.Models;

namespace Web.Db
{
    public partial class Supplier
    {
		public static Supplier CreateFromViewModel(SuppliesViewModel s)
		{
			return new Supplier
			{
				Timestamp = DateTimeOffset.Now,
				StatusId = (int)PostStatus.UnderReview,//N.B for inserts 
				Name = s.OrganisationName,
				Description = s.Description,

				SupplierTypeId = (int)s.SupplierType,
				SupplierTypeOther = s.SupplierTypeOther,
				Email = s.Email,
				Website = s.Website,
				PhoneNumber = s.PhoneNumber,
				ContactName = s.ContactName,
				Postcode = s.Postcode,
				TellUsMore = s.TellUsMore
			};
		}
	}
}
