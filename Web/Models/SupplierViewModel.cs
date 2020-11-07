using System;
using System.Collections.Generic;

namespace Web.Models
{
    public class SupplierViewModel
    {
        public List<SupplierModel> Suppliers { get; set; } = new List<SupplierModel>();
        public bool UserLoggedIn {get; set; } 
    }

    public class SupplierModel
    {
        public long Id { get; set; }
        public string Timestamp { get; set; }
        public string UshahidiId { get; set; }//not visible by default
        public string UshahidiUrl { get; set; }//not visible by default

        public string Status { get; set; }

        public string Name  { get; set; }
        public string SupplierType { get; set; } 
        public string SupplierTypeOther { get; set; }//not visible by default
        public string MeetsRegulations { get; set; }
        public string PpeTypesSupplied { get; set; } 
        public string PpeTypesOther { get; set; }  //not visible by default
        public string Capacity { get; set; } 
        public string ContactDetails { get; set; }
        public string ContactName { get; set; }
        public string Postcode { get; set; }
        public string Website { get; set; }
        public string Costs { get; set; }
        public string Description { get; set; }
        public string TellUsMore { get; set; } //not visible by default
        public string Longitude { get; set; } //not visible by default
        public string Latitude { get; set; } //not visible by default

        public string NoteText { get; set; }
        public string NoteTimestamp { get; set; }
        public string NoteAuthor { get; set; }

    }
}
