using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace Web.Snippets.Microsoft.AspNetCore
{
	public static class SessionExtensions
	{
		public static void Set<T>(this ISession session, string key, T value)
		{
			session.SetString(key, JsonConvert.SerializeObject(value)); 
		}

		public static T Get<T>(this ISession session, string key)
		{
			string value = session.GetString(key);
			return value == null ? default : JsonConvert.DeserializeObject<T>(value); 
		}
	}
}
