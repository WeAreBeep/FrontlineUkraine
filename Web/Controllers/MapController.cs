using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shared;
using Web.Models;
using Shared.Map;
using Web.Db;
using Web.Infrastructure;
using Web.Map;
using Web.Snippets.System;
using Web.Snippets.System.Collections.Generic;

namespace Web.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class MapController : BaseController
	{
		[HttpGet]
		public FeedNew Get([FromServices] DataContext dataContext)
		{
			//needs data
			List<Need> needs = dataContext.Needs.Where(n => n.StatusId == (int)PostStatus.Published).Include(n => n.NeedPpeTypes).ToList();
			List<NeedM> ints = needs.SelectToList(NeedM.ProjectFromDb);
			Dictionary<string, List<Point>> needPoints = Ppe.EmptyNeedsPointsDic();
			foreach(NeedM need in ints)
			{
				Need_ToFeed.AddPoints(need, needPoints);
			}

			MapData needsData = new MapData();
			needsData.Posts = ints.Where(p => p.PpeTypes.Count > 0).SelectToList(n => Need_ToFeed.ToPost(n, userLoggedIn));
			needsData.PointsList = needPoints.Select(ToPointsList).ToList();
			needsData.PointsCount = needPoints.Values.Sum(v => v.Count);

			//needs met data 
			List<Need> needsMet = dataContext.Needs.Where(n => n.StatusId == (int)PostStatus.Published).Include(n => n.NeedPpeTypes).ToList();
			List<NeedM> intsMet = needsMet.SelectToList(NeedM.ProjectFromDbMet);
			Dictionary<string, List<Point>> needMetPoints = Ppe.EmptyNeedsPointsDic();
			foreach(NeedM need in intsMet)
			{
				NeedMet_ToFeed.AddPoints(need, needMetPoints);
			}

			MapData needsMetData = new MapData();
			needsMetData.Posts = intsMet.Where(p => p.PpeTypes.Count > 0).SelectToList(n => NeedMet_ToFeed.ToPost(n, userLoggedIn));
			needsMetData.PointsList = needMetPoints.Select(ToPointsList).ToList();
			needsMetData.PointsCount = needMetPoints.Values.Sum(v => v.Count);


			List<Supplier> suppliers = dataContext.Suppliers.Where(n => n.StatusId == (int)PostStatus.Published).Include(n => n.SupplierPpeTypes).ToList();
			List<SupplyM> intsSups = suppliers.SelectToList(SupplyM.ProjectFromDb);
			Dictionary<string, List<Point>> supplyPoints = Ppe.EmptyNeedsPointsDic();
			foreach(SupplyM supply in intsSups)
			{
				Supply_ToFeed.AddPoints(supply, supplyPoints);
			}

			MapData suppliesData = new MapData();
			suppliesData.Posts = intsSups.SelectToList(s => Supply_ToFeed.ToPost(s, userLoggedIn));
			suppliesData.PointsList = supplyPoints.Select(ToPointsList).ToList();
			suppliesData.PointsCount = supplyPoints.Values.Sum(v => v.Count);

			var respVal = new FeedNew { Needs = needsData, NeedsMet = needsMetData, Supplies = suppliesData };

			return respVal;
		}

		public static Func<KeyValuePair<string, List<Point>>, PointsList> ToPointsList =>
			k => new PointsList { PpeType = k.Key, Class = Ppe.TypesToClasses[k.Key], Points = k.Value };

		public class Supply_ToFeed
		{
			public static void AddPoints(SupplyM s, Dictionary<string, List<Point>> dict)
			{
				List<string> allPpeTypes = s.PpeTypes.ToList();
				foreach(string ppeType in allPpeTypes)
				{
					string className = Ppe.TypesToClasses[ppeType];
					string need = Ppe.NeedFromType(ppeType, s.OtherPpeTypes);

					Point p = new Point {
						Location = s.LocationArry, 
						PopupHtml = $"<div class='supply'><h1>Supply</h1>{s.WebsiteHtml}{HtmlHelp.LabelledTag("PPE:", HtmlHelp.ColorBoxHtml(need, className))}{HtmlHelp.LabelledTag("Organisation:", s.Organisation)}{s.PostedHtml}</div>"
					};

					dict[ppeType].Add(p);
				}
			}

			public static Post ToPost(SupplyM s, bool isLoggedIn)
			{
				Post respVal = new Post();
				respVal.PopupHtml = toPopupHtml(s, isLoggedIn);
				respVal.Location = s.LocationArry;
				return respVal;
			}

			static string toPopupHtml(SupplyM s, bool isLoggedIn)
			{
				StringBuilder sb = new StringBuilder();
				sb.Append("<div class='supply'>");
				sb.Append("<h1>Supplies Post</h1>");
				sb.Append(s.WebsiteHtml);
				if(isLoggedIn)
				{
					sb.Append($"<a class='edit_link' target='_blank' title='View Record' href='/edit-supplies/{s.Id}'><i class='fas fa-link fa-2x'></i></a>");
				}
				sb.Append(HtmlHelp.LabelledTag("Organisation:", s.Organisation));
				sb.Append(HtmlHelp.LabelledTag("Description:", s.Description));
				sb.Append(HtmlHelp.LabelledList("Supplies:", s.PpeTypes));
				sb.Append(HtmlHelp.LabelledTag("Other Supplies:", s.OtherPpeTypes));
				sb.Append(HtmlHelp.LabelledTag("Capacity:", s.CapacityNotes)); //TODO:TD switch to compiled info from ppetTypes for new posts
				//TODO:contact details 
				sb.Append(s.PostedHtml);
				sb.Append("</div>");
				return sb.ToString();
			}
		}

		public class Need_ToFeed
		{
			public static void AddPoints(NeedM s, Dictionary<string, List<Point>> dict)
			{
				List<string> allPpeTypes = s.PpeTypes.ToList();
				foreach(string ppeType in allPpeTypes)
				{
					string className = Ppe.TypesToClasses[ppeType];
					string need = Ppe.NeedFromType(ppeType, s.OtherPpeTypes);

					Point p = new Point {
						Location = s.LocationArry, 
						PopupHtml = $"<div class='need'><h1>Need</h1>{s.TwitterHtml}{HtmlHelp.LabelledTag("PPE:", HtmlHelp.ColorBoxHtml(need, className))}{HtmlHelp.LabelledTag("Organisation:", s.Organisation)}{s.PostedHtml}</div>"
					};

					dict[ppeType].Add(p);
				}
			}

			public static Post ToPost(NeedM s, bool isLoggedIn)
			{
				Post respVal = new Post();
				respVal.PopupHtml = toPopupHtml(s, isLoggedIn);
				respVal.Location = s.LocationArry;
				return respVal;
			}

			static string toPopupHtml(NeedM s, bool isLoggedIn)
			{
				StringBuilder sb = new StringBuilder();
				sb.Append("<div class='need'>");
				sb.Append("<h1>Needs Post</h1>");
				sb.Append(s.TwitterHtml);
				if(isLoggedIn)
				{
					sb.Append($"<a class='edit_link' target='_blank' title='View Record' href='/edit-needs/{s.Id}'><i class='fas fa-link fa-2x'></i></a>");
				}
				sb.Append(HtmlHelp.LabelledTag("Postcode:", s.Postcode));
				sb.Append(HtmlHelp.LabelledTag("Organisation:", s.Organisation));
				sb.Append(HtmlHelp.LabelledList("Needs:", s.PpeTypes));
				sb.Append(HtmlHelp.LabelledTag("Other Needs:", s.OtherPpeTypes));
				sb.Append(s.PostedHtml);
				sb.Append("</div>");
				return sb.ToString();
			}
		}

		public class NeedMet_ToFeed
		{
			public static void AddPoints(NeedM s, Dictionary<string, List<Point>> dict)
			{
				List<string> allPpeTypes = s.PpeTypes.ToList();
				foreach(string ppeType in allPpeTypes)
				{
					string className = Ppe.TypesToClasses[ppeType];
					string need = Ppe.NeedFromType(ppeType, s.OtherPpeTypes);

					Point p = new Point {
						Location = s.LocationArry, 
						PopupHtml = $"<div class='need_met'><h1>Met Need</h1>{s.TwitterHtml}{HtmlHelp.LabelledTag("PPE:", HtmlHelp.ColorBoxHtml(need, className))}{HtmlHelp.LabelledTag("Organisation:", s.Organisation)}{s.PostedHtml}</div>"
					};

					dict[ppeType].Add(p);
				}
			}

			public static Post ToPost(NeedM s, bool isLoggedIn)
			{
				Post respVal = new Post();
				respVal.PopupHtml = toPopupHtml(s, isLoggedIn);
				respVal.Location = s.LocationArry;
				return respVal;
			}

			static string toPopupHtml(NeedM s, bool isLoggedIn)
			{
				StringBuilder sb = new StringBuilder();
				sb.Append("<div class='need_met'>");
				sb.Append("<h1>Met Needs</h1>");
				sb.Append(s.TwitterHtml);
				if(isLoggedIn)
				{
					sb.Append($"<a class='edit_link' target='_blank' title='View Record' href='/edit-needs/{s.Id}'><i class='fas fa-link fa-2x'></i></a>");
				}
				sb.Append(HtmlHelp.LabelledTag("Postcode:", s.Postcode));
				sb.Append(HtmlHelp.LabelledTag("Organisation:", s.Organisation));
				sb.Append(HtmlHelp.LabelledList("Needs Met:", s.PpeTypes));
				sb.Append(HtmlHelp.LabelledTag("Other Needs Met:", s.OtherPpeTypes));
				sb.Append(s.PostedHtml);
				sb.Append("</div>");
				return sb.ToString();
			}
		}

		public static class Ppe
		{
			/// <summary>
			/// Ensures our list of PPE only, with correct order 
			/// </summary>
			public static Dictionary<string, List<Point>> EmptyNeedsPointsDic() { return Ppe.TypesToClasses.ToDictionary(k => k.Key, v => new List<Point>()); }

			public static readonly Dictionary<string, string> TypesToClasses = new Dictionary<string, string>() {
				//Blues
				{ "Type IIR Surgical Masks", "b1" } //#A0C7E1
				,
				{ "FFP1 Respirator Masks", "b2" } //#4C80B6
				,
				{ "FFP2 Respirator Masks", "b3" } //#0C4C96
				,
				{ "FFP3 Respirator Masks", "b4" } //#20254B
				//Greens
				,
				{ "Gowns", "g1" } //#64AE3F
				,
				{ "Aprons", "g2" } //#21652D
				,
				{ "Gloves", "g3" } //#71C2AC
				,
				{ "Scrubs", "g4" } //#00966B
				//Purples 
				,
				{ "Safety Glasses", "p1" } //#9388AA
				,
				{ "Face Visors", "p2" } //#4B3F72
				,
				{ "Alcohol Hand Gel", "p3" } //#54243C
				//Grey
				,
				{ "Other...", "gr1" } //#706F6F
			};

			/// <summary>
			/// For Other... combines concats Other... with the free text  
			/// </summary>
			public static string NeedFromType(string ppeType, string otherPpeTypes)
			{
				string respValNeed;
				if(ppeType == PpeTypes.Other.GetText())
				{
					respValNeed = "Other... " + otherPpeTypes;
				}
				else
				{
					respValNeed = ppeType;
				}
				return respValNeed;
			}
		}
	}
}