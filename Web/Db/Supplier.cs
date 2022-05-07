using System;
using System.Collections.Generic;

namespace Web.Db
{
    public partial class Supplier : ILocation, IPostStatus
    {
        public Supplier()
        {
            SupplierPpeTypes = new HashSet<SupplierPpeType>();
			SupplierNotes = new HashSet<SupplierNote>();
			NeedPpeTypes = new HashSet<NeedPpeType>();
        }

        public long Id { get; set; }
        public long? UshahidiId { get; set; }
        public DateTimeOffset Timestamp { get; set; }
        public int StatusId { get; set; }
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
        /// <summary>
        /// Added to retain the Ushahidi capacity data as was 
        /// </summary>
		public string CapacityNotes { get; set; }
        public TransportType TransportType { get; set; }
        public string TransportTypeOther { get; set; }

        public virtual ICollection<SupplierPpeType> SupplierPpeTypes { get; set; }
		public virtual ICollection<SupplierNote> SupplierNotes { get; set; }
		public virtual ICollection<NeedPpeType> NeedPpeTypes { get; set; }
    }
}
