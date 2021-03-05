using System;
using System.Collections.Generic;
using System.Linq;
using Web.Services;

namespace Web.Models
{
    public partial class PosttagAutocompleteViewModel
    {
        public static PosttagAutocompleteViewModel FromResponse(string postCode, PosttagSearchResponse.DataResponse result)
        {
            var lineOne = String.Join(
                    ", ",
                    (new List<string>
                    {
                        result.SubBuilding,
                        result.Building,
                        $"{result.Number} {result.Street}",
                    })
                    .Where(s => !String.IsNullOrEmpty(s)))
                .Replace("  ", " ");
            var lineTwo = String.Join(
                    ", ",
                    (new List<string>
                    {
                        result.Town,
                        result.Area,
                    })
                    .Where(s => !String.IsNullOrEmpty(s)))
                .Replace("  ", " ");

            return new PosttagAutocompleteViewModel
            {
                Label = lineOne,
                    Value = postCode,
                    AddressLineOne = lineOne,
                    AddressLineTwo = lineTwo
            };
        }
    }
}
