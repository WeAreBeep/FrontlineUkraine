//using Newtonsoft.Json;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text.RegularExpressions;
//using System.Threading.Tasks;
//using Web.Snippets.System.Collections.Generic;

//namespace Web.Db
//{
//    public class NeedsPost : PostBase
//    {
//        public string ContactName { get; set; } //FORM ORDER 
//        public List<string> PpeTypes { get; set; }
//        public string OtherPpeTypes { get; set; }
//        public string Organisation { get; set; }
//        public string OrganisationType { get; set; }
//        public string OtherOrganisationType { get; set; }
//        public string Postcode { get; set; }
//        public string TownOrCity { get; set; }
//        public string TellUsMore { get; set; }
//        public string TweetId { get; set; }
//        public string Department { get; set; }
//        public string JobTitle { get; set; }
//        public int? FFP1DailyShortage { get; set; }
//        public string FFP1DailyDetails { get; set; }

//        [JsonIgnore]
//        public bool TwitterIdValid => !String.IsNullOrWhiteSpace(TweetId)
//                                    && new Regex(@"^[0-9]+$").IsMatch(TweetId);

//        [JsonIgnore]
//        public bool IsAnonymous => String.IsNullOrWhiteSpace(ContactName) || ContactName.IsIn(StringComparison.OrdinalIgnoreCase, AnonymousNames);
//        public static string[] AnonymousNames => new[] { "anon", "anonymous" };

//    }


//    public class SuppliesPost : PostBase
//    {
//        public string Organisation { get; set; }
//        public string OrganisationDescription { get; set; }
//        public string OrganisationType { get; set; }
//        public string OtherOrganisationType { get; set; }
//        public List<string> PpeTypes { get; set; }
//        public string OtherPpeTypes { get; set; }
//        public string Capacity { get; set; }
//        public string ContactDetails { get; set; }
//        public string Postcode { get; set; }
//        public string ComplianceType { get; set; }
//        public List<string> CostTypes { get; set; }
//        public string Website { get; set; }
//        public string TellUsMore { get; set; }

//    }

//    public class PostBase
//    {
//        public long Id { get; set; }
//        public DateTime DateTime { get; set; }
//        public Location Location { get; set; }

//        [JsonIgnore]
//        public List<decimal> LocationArry => new List<decimal> { Location.Lat, Location.Lon };
//    }

//    public struct Location
//    {
//        public decimal Lat { get; set; }
//        public decimal Lon { get; set; }
//    }

//    public interface IPost
//    {
//        public long Id { get; set; }
//        public Location Location { get; set; }
//        public List<string> PpeTypes { get; set; }
//        public string OtherPpeTypes { get; set; }
//        public string Postcode { get; set; }
//        public DateTime DateTime { get; set; }
//    }
//}
