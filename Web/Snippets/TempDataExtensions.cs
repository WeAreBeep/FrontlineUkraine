using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Newtonsoft.Json;

namespace Web.Snippets.Microsoft.AspNetCore
{
	/// <summary>
	/// //TODO:obsolete - TempData just uses ISession as backing (for redirects) anyhow. So no use at all.
	/// </summary>
	public static class TempDataExtensions
	{
		public static void Set<T>(this ITempDataDictionary tempData, string key, T value)
		{
			tempData[key] = JsonConvert.SerializeObject(value);
		}

		public static T Get<T>(this ITempDataDictionary tempData, string key)
		{
			tempData.TryGetValue(key, out object o);
			return o == null ? default : JsonConvert.DeserializeObject<T>((string)o);
		}
	}
}
