using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Web.Snippets
{
	public static class GuidAuthMiddlewareExtensions
	{
		public static IApplicationBuilder UseGuidAuth(this IApplicationBuilder builder) { return builder.UseMiddleware<GuidAuth>(); }
	}

	public class GuidAuth
	{
		readonly RequestDelegate _next;
		public GuidAuth(RequestDelegate next)
		{
			_next = next;
		}

		public async Task InvokeAsync(HttpContext httpContext)
		{
			if(!httpContext.User.Identity.IsAuthenticated && httpContext.Request.Path.Value.Contains(_pathToProtect) && !requestIncludesGuid(httpContext))
			{
				httpContext.Response.Redirect($"/Identity/Account/Login?ReturnUrl={httpContext.Request.Path}");
			}
			else
			{
				await _next(httpContext);
			}
		}

		protected bool requestIncludesGuid(HttpContext httpContext)
		{
			bool respVal = false;
			string valueFromQs = httpContext.Request.Query["x"].ToString();
			if(!String.IsNullOrEmpty(valueFromQs))
			{
				Guid guid;
				if(Guid.TryParse(valueFromQs, out guid))
				{
					if(comparissions.Contains(guid))
					{
						respVal = true;
					}
				}
			}
			return respVal;
		}

		List<Guid> comparissions => new List<Guid> {
			new Guid("b6f094ee-ab03-4576-af6c-d917c8c133a7")
		};

		string _pathToProtect = "/Identity/Account/Register";
	}
}