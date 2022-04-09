﻿using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Web.Db;
using Web.Infrastructure;
using Web.Snippets;
using Web.Snippets.Messaging;
using SignInResult = Microsoft.AspNetCore.Identity.SignInResult;

namespace Web.Areas.Identity.Pages.Account
{
    [AllowAnonymous]
    public class LoginModel : BasePageModel
    {
        readonly SignInManager<AppUser> _signInManager;
        readonly ILogger<LoginModel> _logger;

        public LoginModel(SignInManager<AppUser> signInManager, 
            ILogger<LoginModel> logger)
        {
            _signInManager = signInManager;
            _logger = logger;
        }

        [BindProperty]
        public InputModel Input { get; set; }

        public string ReturnUrl { get; set; }

        [TempData]
        public string ErrorMessage { get; set; }

        public class InputModel
        {
            [Required(ErrorMessage = Settings.ValMsgs.Required)
            ,EmailAddress(ErrorMessage = Settings.ValMsgs.Email)]
            public string Email { get; set; }

            [Required(ErrorMessage = Settings.ValMsgs.Required)
            ,DataType(DataType.Password)]
            public string Password { get; set; }

            [Display(Name = "Remember me?")]
            public bool RememberMe { get; set; }
        }

        public async Task OnGetAsync(string returnUrl = null)
        {
            if (!string.IsNullOrEmpty(ErrorMessage))
            {
                ModelState.AddModelError(string.Empty, ErrorMessage);
            }
            returnUrl = returnUrl ?? Url.Content("~/");
            await HttpContext.SignOutAsync(IdentityConstants.ExternalScheme);// Clear the existing external cookie to ensure a clean login process
            ReturnUrl = returnUrl;
        }

        public async Task<IActionResult> OnPostAsync(string returnUrl = null)
        {
            returnUrl = returnUrl ?? Url.Content("~/");

            if (ModelState.IsValid)
            {
                SignInResult result = await _signInManager.PasswordSignInAsync(Input.Email, Input.Password, Input.RememberMe, lockoutOnFailure: false);// To enable password failures to trigger account lockout, set lockoutOnFailure: true
                if (result.Succeeded)
                {
                    SimpleNotifier noty = notifier();    
                    noty.AddMessage(MsgTypes.Success, "You were logged in"); 
                    return LocalRedirect(returnUrl);
                }
                if (result.RequiresTwoFactor)
                {
                    return RedirectToPage("./LoginWith2fa", new { ReturnUrl = returnUrl, RememberMe = Input.RememberMe });
                }
                if (result.IsLockedOut)
                {
                    return RedirectToPage("./Lockout");
                }
                else 
                {
                    ModelState.AddModelError(string.Empty, "Invalid login attempt"); //N.B. This doesn't count login failures towards account lockout
                    return Page();
                }
            }
            return Page();// If we got this far, something failed, re-display form
        }
    }
}
