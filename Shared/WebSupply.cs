using System;
using System.Collections.Generic;
using System.Text;

namespace Shared
{
    public class WebSupply
    {
		public long? UshahidiId { get; set; }
		public DateTimeOffset Timestamp { get; set; }
		//public int StatusId { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public int SupplierTypeId { get; set; }
		public string SupplierTypeOther { get; set; }
		public string Email { get; set; }
		public string Website { get; set; }
		public string PhoneNumber { get; set; }
		public string ContactName { get; set; }
		public string Postcode { get; set; }
		public string TellUsMore { get; set; }
		public decimal? Latitude { get; set; }
		public decimal? Longitude { get; set; }
		public string CapacityNotes { get; set; }
		public List<WebSupplyPpeType> SupplierPpeTypes { get; set; }

		public string ContactDetailsForNotes { get; set; }
    }

	public class WebSupplyPpeType
	{
		public byte PpeTypeId { get; set; }
		public string PpeTypeOther { get; set; }
	}
}
