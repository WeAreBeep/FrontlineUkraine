using System;
using System.Collections.Generic;

namespace Web.Db
{
    public partial class Supplies
    {
        public long Id { get; set; }
        public DateTimeOffset Timestamp { get; set; }
        public long? UshahidiId { get; set; }
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
        public decimal? Longitude { get; set; }
        public decimal? Latitude { get; set; }
        public byte PpeTypeId { get; set; }
        public string PpeTypeOther { get; set; }
        public int CostTypeId { get; set; }
        public string CostTypeOther { get; set; }
        public int? CapacityPerWeek { get; set; }
        public int? CurrentStock { get; set; }
        public int? LeadTimeInDays { get; set; }
        public string Notes { get; set; }
        public int? MeetsRegulatoryRequirementsId { get; set; }
        public string NoteText { get; set; }
        public DateTimeOffset? NoteTimestamp { get; set; }
        public string NoteAuthor { get; set; }
    }
}
