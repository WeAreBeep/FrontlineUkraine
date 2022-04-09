using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Shared;
using Snippets;
using Web.Db;
using Web.Snippets.System.Collections.Generic;

namespace Web.Import
{
	public class SupplierProcessor
	{
		public static Supplier FromWebSupply(WebSupply s, string currentUserId)
		{
			Supplier respVal = new Supplier {
				UshahidiId = s.UshahidiId,
				Timestamp = s.Timestamp,
				StatusId = (int)PostStatus.Published, //always 
				Name = s.Name,
				Description = s.Description,
				SupplierTypeId = s.SupplierTypeId,
				SupplierTypeOther = s.SupplierTypeOther,
				//Email = s.Email,//imports from g sheets
				Website = Urls.GetFullValidHttpUrl(s.Website),
				//PhoneNumber = s.PhoneNumber,//imports from g sheets
				//ContactName = s.ContactName,//imports from g sheets
				Postcode = s.Postcode,//NN
				TellUsMore = s.TellUsMore,
				Latitude = s.Latitude,
				Longitude = s.Longitude,
				CapacityNotes = s.CapacityNotes
			};

			respVal.SupplierPpeTypes = s.SupplierPpeTypes.SelectToList(ppe => FromWebSupplyPpeType(ppe, respVal));
			List<byte> t = s.SupplierPpeTypes.GroupBy(g => g.PpeTypeId).Where(g => g.Count() > 1).SelectToList(g => g.Key);
			if(t.Count > 0)
			{
				Debug.WriteLine($"UshahidiId {s.UshahidiId} Supplier has duplicate PPE types {HtmlHelp.BuildString(t, ", ")}");
				respVal = null;
			}
			//else
			//{
			//	if(!String.IsNullOrWhiteSpace(s.ContactDetailsForNotes)) //TODO:remove when confirmed 
			//	{
			//		SupplierNote newNote = new SupplierNote
			//		{
			//			Supplier = respVal,
			//			Note = new Note
			//			{
			//				Timestamp = DateTimeOffset.Now,
			//				UserId = currentUserId,
			//				Text = $"Contact Details From Ushahidi :{Environment.NewLine}{s.ContactDetailsForNotes}",
			//			}
			//		};
			//		respVal.SupplierNotes.Add(newNote);
			//	}
			//}
			return respVal;
		}

		public static SupplierPpeType FromWebSupplyPpeType(WebSupplyPpeType s, Supplier supplier)
		{
			return new SupplierPpeType {
				PpeTypeId = s.PpeTypeId,
				PpeTypeOther = s.PpeTypeOther,
				MeetsRegulatoryRequirementsId = (int)MeetsRegulations.NotSure,
				CostTypeId = (int)CostTypes.Other, 
				Supplier = supplier
			};
		}
	}
}