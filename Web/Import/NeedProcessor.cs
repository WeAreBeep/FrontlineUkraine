using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Shared;
using Web.Db;
using Web.Infrastructure;
using Web.Snippets.System.Collections.Generic;

namespace Web.Import
{
	public class NeedProcessor
	{
		public static Need FromWebNeed(WebNeed s)
		{
			Need respVal = new Need {
				UshahidiId = s.UshahidiId,
				Timestamp = s.Timestamp,
				StatusId = (int)PostStatus.Published, //always 
				PublishAnonymously = s.PublishAnonymously,
				ContactName = s.ContactName, //NN
				JobTitle = s.JobTitle,
				Email = Settings.DefaultEmail, //Email = s.Email,//no point - empty  //TODO:ensure volunteers do this 
				//PhoneNumber = s.PhoneNumber,//no point - empty  //TODO:ensure volunteers do this 
				OrganisationName = s.OrganisationName,
				Department = s.Department,
				OrgTypeId = s.OrgTypeId,
				OrgTypeOther = s.OrgTypeOther,
				TownOrCity = s.TownOrCity,
				TweetId = s.TweetId,
				Postcode = s.Postcode, //NN
				TellUsMore = s.TellUsMore,
				Latitude = s.Latitude,
				Longitude = s.Longitude,
			};
			

			if(respVal.ContactName != null && respVal.ContactName.Length > 100)
			{
				Debugger.Break();
			}
			if(respVal.Department != null && respVal.Department.Length > 200)
			{
				Debugger.Break();
			}
			if(respVal.Email != null && respVal.Email.Length > 320)
			{
				Debugger.Break();
			}
			if(respVal.JobTitle != null && respVal.JobTitle.Length > 100)
			{
				Debugger.Break();
			}
			if(respVal.OrgTypeOther != null && respVal.OrgTypeOther.Length > 300)
			{
				Debugger.Break();
			}
			if(respVal.OrganisationName != null && respVal.OrganisationName.Length > 200)
			{
				Debugger.Break();
			}
			if(respVal.PhoneNumber != null && respVal.PhoneNumber.Length > 100)
			{
				Debugger.Break();
			}
			if(respVal.Postcode != null && respVal.Postcode.Length > 8)
			{
				Debugger.Break();
			}
			if(respVal.TownOrCity != null && respVal.TownOrCity.Length > 200)
			{
				Debugger.Break();
			}

			respVal.NeedPpeTypes = s.NeedPpeTypes.SelectToList(ppe => FromWebNeedPpeType(ppe, respVal));
			List<byte> t = s.NeedPpeTypes.GroupBy(g => g.PpeTypeId).Where(g => g.Count() > 1).SelectToList(g => g.Key);
			if(t.Count > 0)
			{
				Debug.WriteLine($"UshahidiId {s.UshahidiId} Need has duplicate PPE types {HtmlHelp.BuildString(t, ", ")}");
				respVal = null;
			}

			//if(s.UshahidiId == 471)
			//{
			//	Debug.WriteLine($"UshahidiId {s.UshahidiId} has an awesome postcode {respVal.Postcode}");
			//	respVal = null;
			//}

			return respVal;
		}

		public static NeedPpeType FromWebNeedPpeType(WebNeedPpeType s, Need n)
		{
			return new NeedPpeType {
				PpeTypeId = s.PpeTypeId,
				PpeTypeOther = s.PpeTypeOther,
				StatusId = (int)PpeStatus.New, //TODO:ensure volunteers do this 
				Need = n 
				//Other details //TODO:ensure volunteers do this 
			};
		}
	}
}