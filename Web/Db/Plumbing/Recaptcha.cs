using System;
using System.IO;
using System.Net;
using Newtonsoft.Json.Linq;
using Web.Infrastructure;

namespace Web.Db
{
	public static class Recaptcha
	{
		public static bool Validate(string gRecaptchaResponse)
		{
			bool respVal = false;
			try
			{
				string queryString = $"secret={Settings.ReCaptcha.SecretKey}&response={gRecaptchaResponse}";
				HttpWebRequest request = (HttpWebRequest)WebRequest.Create($"https://www.google.com/recaptcha/api/siteverify?{queryString}");
				using(WebResponse response = request.GetResponse())
				{
					using(StreamReader stream = new StreamReader(response.GetResponseStream()))
					{
						JObject jResponse = JObject.Parse(stream.ReadToEnd());
						respVal = jResponse.Value<bool>("success");
					}
				}
			}
			catch(Exception exception)
			{
				throw exception; //TODO:Log exception
			}
			return respVal;
		}
	}
}