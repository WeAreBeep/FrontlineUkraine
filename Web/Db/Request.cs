using System;
using System.Collections.Generic;

namespace Web.Db
{
    public partial class Request
    {
        public long Id { get; set; }
        public DateTimeOffset Timestamp { get; set; }
        public long? UshahidiId { get; set; }
        public int StatusId { get; set; }
        public string ContactName { get; set; }
        public string OrganisationName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Department { get; set; }
        public string JobTitle { get; set; }
        public int OrgTypeId { get; set; }
        public string OrgTypeOther { get; set; }
        public string AddressLineOne { get; set; }
        public string AddressLineTwo { get; set; }
        public string Postcode { get; set; }
        public string TownOrCity { get; set; }
        public long? TweetId { get; set; }
        public decimal? Longitude { get; set; }
        public decimal? Latitude { get; set; }
        public string TellUsMore { get; set; }
        public byte PpeTypeId { get; set; }
        public string PpeTypeOther { get; set; }
        public int? DailyShortage { get; set; }
        public string DailyShortageForWhom { get; set; }
        public int PpeStatusId { get; set; }
        public long? SupplierId { get; set; }
        public string SupplierOther { get; set; }
        public DateTimeOffset? DateClosed { get; set; }
        public string SupplierName { get; set; }
        public string NoteText { get; set; }
        public DateTimeOffset? NoteTimestamp { get; set; }
        public string NoteAuthor { get; set; }
    }
}
