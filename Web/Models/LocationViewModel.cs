using System.ComponentModel.DataAnnotations;
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
    }
}
