using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Shared
{
    public static class HtmlHelp
    {
        //Html focused
        public static string PostedHtml(DateTime dateTime) 
        {
            return HtmlTag(dateTime.ToString("ddd d MMM HH:mm"), "div", $"class='date_time act_as_hover' title='Received {dateTime:g}'");
        }
        public static string PostedHtml(string dateTime) 
        {
            return PostedHtml(DateTime.Parse(dateTime));
        }
        public static string ColorBoxHtml(string need, string className)
        {
            return $"<span class='{className}'></span>{need}";
        }
        public static string LabelledTag(string label, string text, string tag = "p", string extraClasses = "")
        {
            return !String.IsNullOrWhiteSpace(text) ? $"<span class='label {extraClasses}'>{label}</span>{HtmlTag(text, tag)}" : "";
        }
        public static string LabelledList(string label, List<string> strings)
        {
            string str = HtmlList(strings);
            return !String.IsNullOrWhiteSpace(str) ? $"<span class='label'>{label}</span>{str}" : "";
        }
        public static string HtmlList(List<string> strings)
        {
            string respVal = "";
            if (strings.Count > 0)
            {
                respVal = "<ul>";
                foreach(string s in strings)
                {
                    respVal += $"<li>{s}</li>";
                }
                respVal += "</ul>";
            }
            return respVal;
        }
        public static string HtmlTag(string text, string tag, string extraAttributes = "")
        {
            return !String.IsNullOrWhiteSpace(text) ? $"<{tag} {extraAttributes}>{text}</{tag}>" : "";
        }
        public static string BuildString<T>(List<T> parts, string separator = " ")
        {
            List<string> strings = parts.Select(p => p.ToString()).ToList();
            return BuildString(strings.AsEnumerable(), separator);
        }
        public static string BuildString(IEnumerable<string> parts, string separator = " ")
        {
            List<string> nonNulls = parts.Where(s => !String.IsNullOrWhiteSpace(s)).ToList();
            return String.Join(separator, nonNulls);
        }
    }
}
