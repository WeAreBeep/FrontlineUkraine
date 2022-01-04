﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using SendGrid;
using Shared;
using Web.Db;
using Web.Import;
using Web.Infrastructure;
using Web.Models;
using Web.Services;
using Web.Snippets;
using Web.Snippets.Messaging;
using Web.Snippets.System.Collections.Generic;

namespace Web.Controllers
{
	public class DataController : BaseController
	{

		[HttpGet("suppliers/{status?}")]
		public IActionResult Suppliers([FromServices] DataContext dataContext, PostStatus? status = null)
		{
			if(!userLoggedIn)
			{
				status = PostStatus.Published;
			}

			IQueryable<Supplies> data;
			if(status != null)
			{
				// NOTE: This is a workaround for https://github.com/dotnet/efcore/issues/21770
				data = dataContext.Supplies.Where(s => s.StatusId == status.GetHashCode());
			}
			else
			{
				data = dataContext.Supplies;
			}

			ViewBag.SuppliersDataSheet = Environment.GetEnvironmentVariable("APP_DATA_SUPPLIERS_SHEET");

			return View(new SupplierViewModel {
				Suppliers = data.SelectToList(SupplierPpeType.ToSupplierModel),
				UserLoggedIn = userLoggedIn,
			});
		}


		[HttpGet("register-supplies")]
		public IActionResult RegisterSupplies() => View(new SuppliesViewModel());
		[HttpPost("register-supplies")]
		public IActionResult RegisterSupplies([FromServices] DataContext dataContext, SuppliesViewModel data)
		{
			SimpleNotifier noty = notifier();
			if(ModelState.IsValid)
			{
				Supplier supplier = Supplier.CreateFromViewModel(data);
				dataContext.Suppliers.Add(supplier);
				List<SupplierPpeType> supplierPpeTypes = data.PpeTypes.Where(st => st.Selected).Select(st => SupplierPpeType.Create_FromViewModel(st, supplier)).ToList();
				supplierPpeTypes.ForEach(st => dataContext.SupplierPpeTypes.Add(st));
				dataContext.SaveChanges(currentUserName);
				noty.AddMessage(MsgTypes.Success, "Thanks you have been added to the database, we will be in contact in due course");
				return Redirect("/");
			}
			else
			{
				noty.AddMessage(MsgTypes.Warning, "Problems saving details, please fix and try again");
				return View(data);
			}
		}

		[HttpGet("request-ppe")]
		public IActionResult RequestPpe() => View(new NeedsViewModel());
		[HttpPost("request-ppe")]
		public IActionResult RequestPpe([FromServices] DataContext dataContext, NeedsViewModel vm)
		{
			SimpleNotifier noty = notifier();
			if(ModelState.IsValid)
			{
				Need need = Need.CreateFromViewModel(vm);
				dataContext.Needs.Add(need);
				dataContext.SaveChanges(currentUserName);
				noty.AddMessage(MsgTypes.Success, "Thanks you have been added to the database, we will be in contact in due course");
				return Redirect("/");
			}
			else
			{
				noty.AddMessage(MsgTypes.Warning, "Problems saving details, please fix and try again");
				return View(vm);
			}
		}



		[HttpGet("contact-us")]
		public IActionResult ContactUs() => View();
		[HttpPost("contact-us")]
		public async Task<ActionResult> ContactUs([FromServices] DataContext dataContext, ContactUsViewModel data)
		{
			if(ModelState.IsValid)
			{
				if(!Recaptcha.Validate(Request.Form["g-recaptcha-response"]))
				{
					ModelState.AddModelError("ReCaptchaValid", "ReCaptcha failed please try again");
				}
				else
				{
					ContactSubmission contactSubmission = ContactSubmission.CreateFromViewModel(data);
					contactSubmission.EmailedTo = Settings.Emails.ToAddresses;
					dataContext.ContactSubmissions.Add(contactSubmission);
					dataContext.SaveChanges(currentUserName);

					Response resp = await EmailFacade.SendAsync(contactSubmission);

					SimpleNotifier noty = notifier();

					if(resp.StatusCode == HttpStatusCode.Accepted)
					{
						noty.AddMessage(MsgTypes.Success, "Thanks for getting in contact, we will reply in due course");
						return Redirect("/");
					}
					else
					{
						noty.AddMessage(MsgTypes.Warning, "Problems sending sending your message, please try again.");
						return View(data);
					}
				}
			}
			return View(data);
		}

		[HttpGet("posttag-autocomplete")]
		public async Task<IActionResult> PosttagAutocomplete(
			[FromServices] PosttagService posttag,
			[FromServices] ILogger<DataController> logger,
			[FromQuery] string term)
		{
			if (String.IsNullOrEmpty(term))
			{
				return Ok(new List<PosttagAutocompleteViewModel>());
			}

			try
			{
				var result = await posttag.SearchByPostCode(term);
				var autoCompleteResult = result
					.Data
					.Select(datum => PosttagAutocompleteViewModel.FromResponse(term, datum));
				return Ok(autoCompleteResult);
			}
			catch (JsonException e) // Invalid JSON
			{
				logger.LogError(e, "Cannot parse response from Posttag");
				logger.LogError(e.Source);
				return NotFound();
			}
			catch (Exception e)
			{
				logger.LogError(e, "Unexcepted exception thrown when fetching search result from Posttag");
				throw e;
			}
		}
	}
}