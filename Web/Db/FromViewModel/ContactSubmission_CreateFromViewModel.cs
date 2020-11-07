using System;
using Web.Models;

namespace Web.Db
{
    public partial class ContactSubmission
    {
		public static ContactSubmission CreateFromViewModel(ContactUsViewModel s)
		{
			return new ContactSubmission
			{
				Name = s.Name,
				Email = s.Email,
				Message = s.Message,
				Created = DateTimeOffset.Now,
			};
		}
    }
}
