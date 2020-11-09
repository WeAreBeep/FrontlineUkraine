using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Shared;
using Web.Db;
using Web.Snippets.System;
using Web.Snippets.System.Collections.Generic;

namespace Web.Map
{
	public class SupplyM : MapBase
	{
		public static SupplyM ProjectFromDb(Supplier s)
        {
			SupplyM respVal = new SupplyM();

			respVal.Id = s.Id;
			respVal.DateTime = s.Timestamp.UtcDateTime;
			respVal.Postcode = s.Postcode;
			respVal.Latitude = s.Latitude;
			respVal.Longitude = s.Longitude;

			respVal.Organisation = s.Name;

			respVal.Description = s.Description;//
			respVal.Website = s.Website;//

			respVal.CapacityNotes = s.CapacityNotes;

			List<PpeTypes> ppeTypesList = s.SupplierPpeTypes.SelectToList(p => (PpeTypes)p.PpeTypeId);
			respVal.PpeTypes = ppeTypesList.SelectToList(p => p.GetText());
			if(ppeTypesList.Contains(Db.PpeTypes.Other))
			{
				SupplierPpeType otherDetails = s.SupplierPpeTypes.Single(p => p.PpeTypeId == (byte)Db.PpeTypes.Other);
				respVal.OtherPpeTypes = otherDetails.PpeTypeOther;
			}

			return respVal;
        }
        public string Description { get; set; }  
		public string CapacityNotes {get; set; }
		public string Website { get; set; }
		public bool WebsiteValid => !String.IsNullOrWhiteSpace(Website);
		public string WebsiteHtml => WebsiteValid ? $"<a class='website_link' target='_blank' title='Visit supplier website' href='{Website}'><i class='fas fa-link fa-2x'></i></a>" : "";
	}

	public class NeedM : MapBase
	{
		public static NeedM ProjectFromDb(Need s)
		{
			NeedM respVal = new NeedM();

			respVal.Id = s.Id;
			respVal.DateTime = s.Timestamp.UtcDateTime;
			respVal.Postcode = s.Postcode;
			respVal.Latitude = s.Latitude;
			respVal.Longitude = s.Longitude;

			respVal.Organisation = s.OrganisationName;

			List<PpeTypes> ppeTypesList = s.NeedPpeTypes.Where(n=>n.StatusId!=(int)PpeStatus.Met).SelectToList(p => (PpeTypes)p.PpeTypeId);
			respVal.PpeTypes = ppeTypesList.SelectToList(p => p.GetText());
			if(ppeTypesList.Contains(Db.PpeTypes.Other))
			{
				NeedPpeType otherDetails = s.NeedPpeTypes.Single(p => p.PpeTypeId == (byte)Db.PpeTypes.Other);
				respVal.OtherPpeTypes = otherDetails.PpeTypeOther;
			}
			respVal.TweetId = Convert.ToString(s.TweetId);
			return respVal;
		}

		public static NeedM ProjectFromDbMet(Need s)
		{
			NeedM respVal = new NeedM();

			respVal.Id = s.Id;
			respVal.DateTime = s.Timestamp.UtcDateTime;
			respVal.Postcode = s.Postcode;
			respVal.Latitude = s.Latitude;
			respVal.Longitude = s.Longitude;

			respVal.Organisation = s.OrganisationName;

			List<PpeTypes> ppeTypesList = s.NeedPpeTypes.Where(n => n.StatusId == (int)PpeStatus.Met).SelectToList(p => (PpeTypes)p.PpeTypeId);
			respVal.PpeTypes = ppeTypesList.SelectToList(p => p.GetText());
			if (ppeTypesList.Contains(Db.PpeTypes.Other))
			{
				NeedPpeType otherDetails = s.NeedPpeTypes.Single(p => p.PpeTypeId == (byte)Db.PpeTypes.Other);
				respVal.OtherPpeTypes = otherDetails.PpeTypeOther;
			}
			respVal.TweetId = Convert.ToString(s.TweetId);
			return respVal;
		}

	
	public string TweetId { get; set; }
		public bool TwitterIdValid => !String.IsNullOrWhiteSpace(TweetId)
									&& new Regex(@"^[0-9]+$").IsMatch(TweetId);
		public string TwitterHtml => TwitterIdValid ? $"<a class='twitter_link' target='_blank' title='View related tweet' href='https://twitter.com/i/web/status/{TweetId}'><i class='fab fa-twitter fa-2x'></i></a>" : "";
	}

	public class MapBase
	{
		public long Id { get; set; }
		public DateTime DateTime { get; set; }
		public string Organisation { get; set; }
		public string Postcode { get; set; }
				
		public List<string> PpeTypes { get; set; }
		public string OtherPpeTypes { get; set; }
		public decimal? Latitude { get; set; }
		public decimal? Longitude { get; set; }
		public string PostedHtml => HtmlHelp.PostedHtml(DateTime);
		public List<decimal> LocationArry => new List<decimal> {
			Latitude.Value,
			Longitude.Value
		};
	}
}