using System.Threading.Tasks;
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Web.Infrastructure;
using Web.Models;
using Web.Snippets;
using Web.Snippets.Messaging;
using Web.Db;
using Web.Services;
using Web.Models.Contentful;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using Web.Snippets.System.Collections.Generic;

namespace Web.Controllers
{
	[FrontEndFilter]
	public class HomeController : BaseController
	{
		public IActionResult Index()
		{
			return RedirectToAction("Admin", "Admin");
		}

		public async Task<IActionResult> About([FromServices] IContentfulService contentfulService)
		{
			ViewData["contentful"] = await contentfulService.GetFirstByContentType<AboutUsPageViewModel>("about-us-page");
			return View();
		}

		[InvertedLayout]
		public async Task<IActionResult> Partners([FromServices] IContentfulService contentfulService)
		{
			ViewData["contentful"] = await contentfulService.GetFirstByContentType<PartnersPageViewModel>("partners-page");
			return View();
		}

        public IActionResult Resources() => View();
        public IActionResult Reports() => View();

        [HttpGet("terms-and-conditions")]
		public IActionResult TermsAndConditions() => View();
        public IActionResult Media() => View();

		public IActionResult Intro() => View();

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
		public IActionResult Error()
		{
			return View(new ErrorViewModel
			{
				RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier
			});
		}
	}
}