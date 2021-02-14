using System;
using ContentfulModels = Contentful.Core.Models;

namespace Web.Models.Contentful
{
    public class HomePageViewModel
    {
        public ContentfulModels.SystemProperties Sys { get; set; }

        public string Title { get; set; }

        public ContentfulModels.Document Content { get; set; }
    }
}
