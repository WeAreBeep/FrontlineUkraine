using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Web.Db;
using Web.Infrastructure;
using Web.Snippets;
using Web.Snippets.Messaging;

namespace Web.Areas.Identity.Pages.Account
{
    [AllowAnonymous]
    public class ConfirmEmailModel : BasePageModel
    {
        readonly UserManager<AppUser> _userManager;

        public ConfirmEmailModel(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<IActionResult> OnGetAsync(string userId, string code)
        {
            if (userId == null || code == null)
            {
                return RedirectToPage("/Index");
            }

            AppUser user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return RedirectToPage("/Index");//let's NOT give potential attackers details about User Ids !!! return NotFound($"Unable to load user with ID '{userId}'.");
            }

            code = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(code));
            IdentityResult result = await _userManager.ConfirmEmailAsync(user, code);
            SimpleNotifier notifier = base.notifier();
            if (result.Succeeded)
            {
                notifier.AddMessage(MsgTypes.Information, "Thanks, your email was verified");
            }
            else
            {
                notifier.AddMessage(MsgTypes.Error, "Error confirming your email");
            }
            return Page();
        }
    }
}