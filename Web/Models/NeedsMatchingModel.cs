using System;
using System.Collections.Generic;
using Web.Db;

namespace Web.Models
{
    public class NeedsMatchingModel
    {
        public long Id { get; set; }//this should be the NeedsId
        public string Timestamp { get; set; }
        public string UshahidiId { get; set; }//not visible by default
        public string UshahidiUrl { get; set; }//not visible by default
        
        public string Status { get; set; }
        public string PpeStatus { get; set; }
        
        public string DateClosed { get; set; }
        public string ContactName { get; set; }        
        public string OrganisationName { get; set; } 
        public string PpeType { get; set; }
        public string PpeTypeOther { get; set; }//not visible by default
        public int? DailyShortage { get; set; }//not visible by default - I think as it is only entered for one type of ppe it should not be visible by default - borderline case perhaps?, 
        public string DailyShortageForWhom { get; set; }//not visible by default - see above
        public string SuppliesOfferBy { get; set; } 
        public string SuppliesOfferByOther { get; set; }  //not visible by default   
        public string ContactEmail { get; set; }
        public string PhoneNumber { get; set; }
        public string Department { get; set; } //not visible by default
        public string JobTitle { get; set; } //not visible by default
        public string NeedsOrgType { get; set; }
        public string NeedsOrgTypeOther { get; set; }//not visible by default
        public string AddressLineOne { get; set; }//not visible by default
        public string AddressLineTwo { get; set; }//not visible by default
        public string Postcode { get; set; }//not visible by default
        public string Town { get; set; }
        public string TweetId { get; set; }//not visible by default
        public string TwitterUrl { get; set; }//not visible by default
        public string TellUsMore { get; set; }//not visible by default
        public string Longitude { get; set; }//not visible by default
        public string Latitude { get; set; }//not visible by default

        public string NoteText { get; set; }
		public string NoteTimestamp { get; set; }
        public string NoteAuthor { get; set; }
    }
   
}