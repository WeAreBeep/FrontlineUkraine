using Web.Infrastructure;
using Web.Models;
using Web.Snippets.System;

namespace Web.Db
{
	public partial class NeedPpeType
	{
		public static NeedsMatchingModel ToRequestsRow(Request s)
		{
			NeedsMatchingModel respVal = new NeedsMatchingModel(); 

			respVal.Id = s.Id;
			respVal.Timestamp = Settings.GetTimestamp(s.Timestamp);
			respVal.UshahidiId = s.UshahidiId?.ToString() ?? "";
			respVal.UshahidiUrl = Settings.GetUshahidiUrl(s.UshahidiId);
			respVal.Status = ((PostStatus)s.StatusId).GetText();
			respVal.PpeStatus = ((PpeStatus)s.PpeStatusId).GetText();
			respVal.DateClosed = Settings.GetTimestamp(s.DateClosed);
			respVal.ContactName = s.ContactName;
			respVal.OrganisationName = s.OrganisationName;
			respVal.PpeType = ((PpeTypes)s.PpeTypeId).GetText();
			respVal.PpeTypeOther = s.PpeTypeOther;
			respVal.DailyShortage = s.DailyShortage;
			respVal.DailyShortageForWhom = s.DailyShortageForWhom;
			respVal.SuppliesOfferBy = s.SupplierName ?? "";
			respVal.SuppliesOfferByOther = s.SupplierOther;
			respVal.ContactEmail = s.Email;
			respVal.PhoneNumber = s.PhoneNumber;
			respVal.Department = s.Department;
			respVal.JobTitle = s.JobTitle;
			respVal.NeedsOrgType = ((OrgTypes)s.OrgTypeId).GetText();
			respVal.NeedsOrgTypeOther = s.OrgTypeOther;
			respVal.AddressLineOne = s.AddressLineOne;
			respVal.AddressLineTwo = s.AddressLineTwo;
			respVal.Postcode = s.Postcode;
			respVal.Town = s.TownOrCity;
			respVal.TweetId = s.TweetId?.ToString() ?? "";
			respVal.TwitterUrl = Settings.GetTwitterUrl(s.TweetId);
			respVal.Longitude = s.Longitude.ToString();
			respVal.Latitude = s.Latitude.ToString();
			respVal.TellUsMore = s.TellUsMore;
			//Notes
			respVal.NoteText = s.NoteText;
			respVal.NoteTimestamp = Settings.GetTimestamp(s.NoteTimestamp);
			respVal.NoteAuthor = s.NoteAuthor;

			return respVal;
		}
	}
}