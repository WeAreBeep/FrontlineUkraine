using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Web.Infrastructure
{
    public class FrontEndFilter : ActionFilterAttribute 
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if(context.Controller is Controller controller)
            {
                controller.ViewData[Settings.LayoutFrontEndModeEditKey] = true;
			}
		}
	}
}
