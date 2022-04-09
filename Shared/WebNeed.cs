using System;
using System.Collections.Generic;
using System.Text;

namespace Shared
{
    public class WebNeed
    {
		public long? UshahidiId { get; set; }
		public DateTimeOffset Timestamp { get; set; }
		//public int StatusId { get; set; }
		public bool PublishAnonymously { get; set; }
		public string ContactName { get; set; }
		public string JobTitle { get; set; }
		public string Email { get; set; }
		public string PhoneNumber { get; set; }
		public string OrganisationName { get; set; }
		public string Department { get; set; }
		public int OrgTypeId { get; set; }
		public string OrgTypeOther { get; set; }
		public string TownOrCity { get; set; }
		public long? TweetId { get; set; }
		public string Postcode { get; set; }
		public string TellUsMore { get; set; }
		public decimal? Latitude { get; set; }
		public decimal? Longitude { get; set; }

		public List<WebNeedPpeType> NeedPpeTypes { get; set; }
    }

	public class WebNeedPpeType
	{
		public byte PpeTypeId { get; set; }
		public string PpeTypeOther { get; set; }
	}
}
