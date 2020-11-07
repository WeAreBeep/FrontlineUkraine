using System;
using Microsoft.AspNetCore.Mvc.ViewFeatures;

namespace Web.Infrastructure
{
    public static class Helper
    {
        public static string GetBodyClass(ViewDataDictionary viewData)
        {
            string bodyClass = "workable_styles";
            if(viewData.TryGetValue(Settings.LayoutFrontEndModeEditKey, out object isFrontEnd) && Convert.ToBoolean(isFrontEnd))
            {
                bodyClass = "";
            }
            return bodyClass;
        }
    }
}