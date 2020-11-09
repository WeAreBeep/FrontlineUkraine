using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;

namespace Shared
{
    public class PostBase
    {
        public long Id { get; set; }
        public DateTime DateTime { get; set; }
        public Location Location { get; set; }

        public string PostedHtml
        {
            get
            {
                if(String.IsNullOrWhiteSpace(_postedHtml))
                {
                    _postedHtml = HtmlHelp.PostedHtml(DateTime);
                }
                return _postedHtml;
            }
        }
        string _postedHtml;

        [JsonIgnore]
        public List<decimal> LocationArry => new List<decimal> { Location.Lat, Location.Lon };
    }
}