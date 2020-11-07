using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SendGrid;
using SendGrid.Helpers.Mail;
using Web.Db;

namespace Web.Infrastructure
{
	public class EmailFacade
	{
		public static Task<Response> SendAsync(ContactSubmission contactSubmission)
		{
			SendGridClient client = new SendGridClient(Settings.Emails.SendGridKey);
			EmailAddress from = new EmailAddress(Settings.Emails.FromAddress);
			string subject = $"Message from the Frontline website - {contactSubmission.Name}";
			List<string> emailRecipients = contactSubmission.EmailedTo.Split(',').ToList();
			List<EmailAddress> to = emailRecipients.Select(MailHelper.StringToEmailAddress).ToList();
			string plainTextContent = "Name: " + contactSubmission.Name +"\r\nEmail: "+contactSubmission.Email+"\r\nMessage: "+contactSubmission.Message;
			SendGridMessage msg = MailHelper.CreateSingleEmailToMultipleRecipients(from, to, subject, plainTextContent, "");
			return client.SendEmailAsync(msg);
		}
	}
} 
