using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Globalization;
using Web.Infrastructure;
using Web.Snippets.System.ComponentModel.DataAnnotations;

namespace Web.Models
{
	public partial class LocationViewModel
	{
        [Display(Name = "Longitude", Description = "")]
        //TODO:will this work x VMs ? RequiredIf("PostStatus", "Published", ErrorMessage = Settings.ValMsgs.Required)]
        public decimal? Longitude { get; set; }

        [Display(Name = "Latitude", Description = "")]
        public decimal? Latitude { get; set; }

        public Dictionary<string, string> LocationSearchParams
        {
	        get
	        {
		        if (Latitude is { } lat && Longitude is { } lng)
		        {
			        return new Dictionary<string, string>
			        {
				        { "lat", lat.ToString(CultureInfo.InvariantCulture) },
				        { "lng", lng.ToString(CultureInfo.InvariantCulture) },
				        { "zoom", "20" },
			        };
		        }

		        return null;
	        }
        }
    }
}
