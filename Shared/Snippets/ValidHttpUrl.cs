using System;
using System.Text.RegularExpressions;

namespace Snippets
{
	public class Urls
	{
		/// <summary>
		/// If http:// or https:// not present adds them 
		/// </summary>
		public static bool GetValidHttpUrl(string s, out Uri resultURI)
		{
			if (!Regex.IsMatch(s, @"^https?:\/\/", RegexOptions.IgnoreCase))
				s = "http://" + s;

			if (Uri.TryCreate(s, UriKind.Absolute, out resultURI))
				return (resultURI.Scheme == Uri.UriSchemeHttp || 
						resultURI.Scheme == Uri.UriSchemeHttps);

			return false;
		}

		/// <summary>
		/// If source is present,
		/// if no protocol adds http://
		/// tests result for url validity 
		/// </summary>
		public static string GetFullValidHttpUrl(string s)
		{
			string respVal = null;
			if(!String.IsNullOrWhiteSpace(s))
			{
				if(Urls.GetValidHttpUrl(s, out Uri uriResult))
				{
					if(new Regex(@"^((http|ftp|https|www)://)([\w+?\.\w+])+([a-zA-Z0-9\~\!\@\#\$\%\^\&\*\(\)_\-\=\+\\\/\?\.\:\;\'\,]*)?$").IsMatch(uriResult.AbsoluteUri))
					{
						respVal = uriResult.AbsoluteUri;
					}
				}
			}
			return respVal;
		}
	}
}
