using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Shared;
using Web.Db;
using Web.Import;
using Web.Infrastructure;
using Web.Models;
using Web.Snippets;
using Web.Snippets.Messaging;
using Web.Snippets.System.Collections.Generic;
using what3words.dotnet.wrapper;
using what3words.dotnet.wrapper.response;

namespace Web.Controllers
{
    [Authorize(Policy = Settings.Authorization.EditRights)]
    public class AdminController : BaseController
    {
        private readonly string W3WApiKey;

        public AdminController(IOptions<ServerConfig> serverConfig)
        {
            W3WApiKey = serverConfig.Value.What3wordsApiKey;
        }

        [HttpGet("admin")]
        public IActionResult Admin() => View();


        [HttpGet("requests/{status?}")]
        public IActionResult Requests([FromServices] DataContext dataContext, PostStatus? status = null)
        {
            if(!userLoggedIn)
            {
                status = PostStatus.Published;
            }

			IQueryable<Request> data;
            if (status != null)
            {
                // NOTE: This is a workaround for https://github.com/dotnet/efcore/issues/21770
                data = dataContext.Requests.Where(s => s.StatusId == status.GetHashCode());
            }
            else
            {
                data = dataContext.Requests;
            }

			return View(new NeedsMatchingViewModel { NeedsMatchingItems = data.SelectToList(NeedPpeType.ToRequestsRow) });
        }



        [HttpGet("edit-needs/{id}")]
        public IActionResult EditNeeds([FromServices] DataContext dataContext, long id)
        {
            Need need = dataContext.Needs
				.Include(n => n.NeedPpeTypes)
				.Include(n => n.NeedNotes)
				.ThenInclude(n => n.Note)
				.ThenInclude(n => n.User)
				.Single(n => n.Id == id);
            List<Supplier> suppliers = dataContext.Suppliers.ToList();
            List<City> cities = dataContext.Cities.ToList();
            return View(EditNeedsViewModel.FromEntities(need, suppliers, cities));
        }
        [HttpPost("edit-needs/{id}")]
        public async Task<IActionResult> EditNeeds([FromServices] DataContext dataContext, EditNeedsPost data)
        {
            SimpleNotifier noty = notifier();
            List<Supplier> suppliers = dataContext.Suppliers.ToList();
            List<City> cities = dataContext.Cities.ToList();
            if(!ModelState.IsValid)
            {
                noty.AddMessage(MsgTypes.Warning, "Problems saving, please try again");
                return View("EditNeeds", EditNeedsViewModel.FromPostData(data, suppliers, cities));
            }
            else
            {
                var wrapper = new What3WordsV3(W3WApiKey);
                var address = await wrapper.ConvertToCoordinates(data.Request.Postcode).RequestAsync();
                if (!address.IsSuccessful)
                {
                    var message = address.Error.Error switch
                    {
                        What3WordsError.BadWords => "Bad what3words address is provided",
                        _ => "Unexpected error returned from what3words"
                    };
                    noty.AddMessage(MsgTypes.Warning, message);
                    return View("EditNeeds", EditNeedsViewModel.FromPostData(data, suppliers, cities));
                }

                Need existingNeed = dataContext.Needs.Include(p => p.NeedPpeTypes).Single(n => n.Id == data.Request.Id);
                existingNeed.Modify(data, currentUserId, address.Data.Coordinates);
                dataContext.SaveChanges(currentUserName);
                noty.AddMessage(MsgTypes.Success, "Successfully updated the Request");
                return Redirect("/requests"); 
            }
        }


        [HttpGet("edit-supplies/{id}")]
        public IActionResult EditSupplies([FromServices] DataContext dataContext, long id)
        {
            Supplier supplier = dataContext.Suppliers
				.Include(n => n.SupplierPpeTypes)
				.Include(n => n.SupplierNotes)
				.ThenInclude(n => n.Note)
				.ThenInclude(n => n.User)
				.Single(n => n.Id == id);
            return View(EditSuppliesViewModel.FromEntities(supplier));
        }
        [HttpPost("edit-supplies/{id}")]
        public IActionResult EditSupplies([FromServices] DataContext dataContext, EditSuppliesPost data)
        {
            SimpleNotifier noty = notifier();  
            if (!ModelState.IsValid)
            {
                noty.AddMessage(MsgTypes.Warning, "Problems saving, please try again");
                return View("EditSupplies", EditSuppliesViewModel.FromPostData(data));
            }
            else
            { 
                Supplier existingSupplies = dataContext.Suppliers.Include(p => p.SupplierPpeTypes).Single(n => n.Id == data.Supplies.Id);
                existingSupplies.Modify(data, currentUserId);
                dataContext.SaveChanges(currentUserName);
                noty.AddMessage(MsgTypes.Success, "Successfully updated Supplier");
                return Redirect("/suppliers");
            }
        }

        //[HttpGet("import")]
        //public async Task<ActionResult> Import([FromServices] DataContext dataContext)
        //{
        //    SimpleNotifier noty = notifier();
        //    try
        //    {
        //        using (HttpClient client = new HttpClient())
        //        {
        //            string needsJson = await client.GetStringAsync(Settings.NeedsImportUrl);
        //            string suppliesJson = await client.GetStringAsync(Settings.SuppliesImportUrl);

        //            List<WebNeed> webNeeds = JsonConvert.DeserializeObject<List<WebNeed>>(needsJson);
        //            List<WebSupply> webSupplies = JsonConvert.DeserializeObject<List<WebSupply>>(suppliesJson);

        //            List<Need> needsList = webNeeds.SelectToList(NeedProcessor.FromWebNeed);
        //            List<Supplier> supplierList = webSupplies.SelectToList(s => SupplierProcessor.FromWebSupply(s, currentUserId));

        //            needsList = needsList.Where(n => n != null).ToList();
        //            dataContext.Needs.AddRange(needsList);

        //            supplierList = supplierList.Where(n => n != null).ToList();
        //            dataContext.Suppliers.AddRange(supplierList);

        //            dataContext.SaveChanges(currentUserName, true);

        //            noty.AddMessage(MsgTypes.Success, $"Imported {needsList.Count}/{webNeeds.Count} Needs, {supplierList.Count}/{webSupplies.Count} Suppliers");
        //            return Redirect("/requests"); 
        //        }
        //    }
        //    catch (Exception e)
        //    {
        //        Debugger.Break();
        //        noty.AddMessage(MsgTypes.Error, "Import failed", e);
        //        return Redirect("/requests");
        //    }
        //}


    }
}