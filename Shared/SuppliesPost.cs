using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;
using Snippets;

namespace Shared
{
    public class SuppliesPost:PostBase, IPost
    {
        public string Organisation { get; set; }
        public string OrganisationDescription { get; set; }
        public string OrganisationType { get; set; }
        public string OtherOrganisationType { get; set; }
        public List<string> PpeTypes { get; set; }
        public string OtherPpeTypes { get; set; }
        public string Capacity { get; set; }
        public string ContactDetails { get; set; }
        public string Postcode { get; set; }
        public string ComplianceType { get; set; }
        public List<string> CostTypes { get; set; }
        public string Website { get; set; }
        public string TellUsMore { get; set; }
		

        public string WebsiteHtml
        {
            get {
                if(!_twitterCalculated)
                {
                    if(!String.IsNullOrWhiteSpace(Website))
                    {
                        if(Urls.GetValidHttpUrl(Website, out Uri uriResult))
                        {
                            if(new Regex(@"^((http|ftp|https|www)://)([\w+?\.\w+])+([a-zA-Z0-9\~\!\@\#\$\%\^\&\*\(\)_\-\=\+\\\/\?\.\:\;\'\,]*)?$").IsMatch(uriResult.AbsoluteUri))
                            {
                                _twitterHtml = $"<a class='website_link' target='_blank' title='Visit supplier website' href='{uriResult.AbsoluteUri}'><i class='fas fa-link fa-2x'></i></a>";
                            }
                        }
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
