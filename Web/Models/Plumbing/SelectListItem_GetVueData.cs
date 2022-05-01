using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Web.Models
{
    public partial class SelectListItemVueData
    {
        public string Label { get; set; }
        public string Id { get; set; }
        public string Value { get; set; }
        
        public static List<SelectListItemVueData> FromViewModels(List<SelectListItem> entities)
        {
            return entities.Select(FromViewModel).ToList();
        }

        public static SelectListItemVueData FromViewModel(SelectListItem item)
        {
            return new SelectListItemVueData
            {
                Id = item.Value,
                Value = item.Value,
                Label = item.Text
            };
        }
    }
}