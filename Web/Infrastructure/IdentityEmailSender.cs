using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.UI.Services;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Web.Infrastructure
{
    /// <summary>
    /// For Identity 
    /// </summary>
    public class IdentityEmailSender : IEmailSender
    {
        public Task SendEmailAsync(string email, string subject, string message)
        {
            return Execute(subject, message, email);
        }

        public Task Execute(string subject, string message, string email)
        {
            SendGridClient client = new SendGridClient(Settings.Emails.SendGridKey);
            SendGridMessage msg = new SendGridMessage
            {
                From = new EmailAddress(Settings.Emails.FromAddress),
                Subject = subject,
                PlainTextContent = message,
                HtmlContent = message
            };
            msg.AddTo(new EmailAddress(email));
            msg.SetClickTracking(false, false);// Disable click tracking. // See https://sendgrid.com/docs/User_Guide/Settings/tracking.html

            return client.SendEmailAsync(msg);
        }
    }
}
