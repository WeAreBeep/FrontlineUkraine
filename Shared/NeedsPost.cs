using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;
using Newtonsoft.Json;
using Snippets.System.Collections.Generic;

namespace Shared
{
    public class NeedsPost : PostBase, IPost
    {
        public string ContactName { get; set; } //FORM ORDER 
        public List<string> PpeTypes { get; set; }
        public string OtherPpeTypes { get; set; }
        public string Organisation { get; set; }
        public string OrganisationType { get; set; }
        public string OtherOrganisationType { get; set; }
        public string Postcode { get; set; }
        public string TownOrCity { get; set; }
        public string TellUsMore { get; set; }
        public string TweetId { get; set; }
        public string Department { get; set; }
        public string JobTitle { get; set; }
        public int? FFP1DailyShortage { get; set; }
        public string FFP1DailyDetails { get; set; }

        [JsonIgnore]
        public bool TwitterIdValid => !String.IsNullOrWhiteSpace(TweetId)
                                      && new Regex(@"^[0-9]+$").IsMatch(TweetId);

        [JsonIgnore]
        public bool IsAnonymous => String.IsNullOrWhiteSpace(ContactName) || ContactName.IsIn(StringComparison.OrdinalIgnoreCase, Help.AnonymousNames);

        [JsonIgnore]
        public string TwitterHtml
        {
            get
            {
                if(!_twitterCalculated)
                {
                    if(TwitterIdValid)
                    {
                        _twitterHtml = $"<a class='twitter_link' target='_blank' title='View related tweet' href='https://twitter.com/i/web/status/{TweetId}'><i class='fab fa-twitter fa-2x'></i></a>";
                    }
                    _twitterCalculated = true;
                }
                return _twitterHtml;
            }
        }
        string _twitterHtml;
        bool _twitterCalculated;
    }
}