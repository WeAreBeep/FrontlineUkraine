using Web.Infrastructure;
using Web.Models;
using Web.Snippets.System;

namespace Web.Db
{
    public partial class SupplierPpeType
    {
		public static SupplierModel ToSupplierModel(Supplies s)
		{
			SupplierModel respVal = new SupplierModel();

			respVal.Id = s.Id;
			respVal.Timestamp = Settings.GetTimestamp(s.Timestamp);
			respVal.UshahidiId = s.UshahidiId?.ToString() ?? "";
			respVal.UshahidiUrl = Settings.GetUshahidiUrl(s.UshahidiId);

			respVal.Status = ((PostStatus)s.StatusId).GetText();
			respVal.Name = s.Name;
			respVal.SupplierType = ((SupplierTypes)s.SupplierTypeId).GetText();
			respVal.SupplierTypeOther = s.SupplierTypeOther;
			respVal.MeetsRegulations = ((MeetsRegulations)s.MeetsRegulatoryRequirementsId).GetText();
			respVal.PpeTypesSupplied = ((PpeTypes)s.PpeTypeId).GetText();
			respVal.PpeTypesOther = s.PpeTypeOther;
			respVal.Capacity = s.CapacityPerWeek.ToString();
			respVal.ContactDetails = s.PhoneNumber + " " + s.Email;
			respVal.ContactName = s.ContactName;
			respVal.Postcode = s.Postcode;
			respVal.Website = s.Website;
			respVal.Costs = ((CostTypes)s.CostTypeId).GetText();
			respVal.Description = s.Description;
			respVal.TellUsMore = s.TellUsMore;
			respVal.Longitude = s. Longitude.ToString();
			respVal.Latitude = s.Latitude.ToString();

			return respVal;
		}
    }
}
