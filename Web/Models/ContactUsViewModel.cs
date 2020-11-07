using System.ComponentModel.DataAnnotations;
using Web.Infrastructure;

namespace Web.Models
{
	public class ContactUsViewModel
	{
		[Display(Name = "Name", Description = "Your name "),
		Required(ErrorMessage = Settings.ValMsgs.Required),
		StringLength(100, MinimumLength = 3, ErrorMessage = Settings.ValMsgs.StringLengthWithMinimum)]
		public string Name { get; set; }

		[Display(Name = "Email", Description = "Your email address"),
		Required(ErrorMessage = Settings.ValMsgs.Required),
		StringLength(100, MinimumLength = 3, ErrorMessage = Settings.ValMsgs.StringLengthWithMinimum),
		EmailAddress(ErrorMessage = Settings.ValMsgs.Email)]
		public string Email{ get; set; }

		[Display(Name = "Message", Description = "Your message"),
		Required(ErrorMessage = Settings.ValMsgs.Required),
		StringLength(10000, MinimumLength = 20, ErrorMessage = Settings.ValMsgs.StringLengthWithMinimum)]
		public string Message { get; set; }

		[Display(Name = "ReCaptcha", Description = "Prove you're not a robot by ticking the box"),
		Required(ErrorMessage = "Please complete the <b>{0}</b>")]
		public bool? ReCaptchaValid {get; set;} = null;
	}
}
