using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Web.Snippets.Messaging;

namespace Web.Infrastructure
{
	public class BaseController : Controller
	{
        protected SimpleNotifier notifier() => this.GetNotifier();
		protected string currentUserName => HttpContext?.User?.Identity?.Name;
        protected string currentUserId =>  HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier); //_userManager.GetUserId(User)
		protected bool userLoggedIn => HttpContext?.User?.Identity?.IsAuthenticated?? false;
	}
}