using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Web.Snippets.Messaging;
using Web.Snippets.Microsoft.AspNetCore;

namespace Web.ViewComponents
{
	public class MessagesViewComponent : ViewComponent
	{
		public IViewComponentResult Invoke()
		{
			return View("Default", new FlashMessenger(HttpContext.Session).GetOneTimeMsgJson());
		}
	}
}
