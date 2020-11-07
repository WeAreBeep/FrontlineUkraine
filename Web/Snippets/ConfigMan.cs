using Microsoft.Extensions.Configuration;

namespace Web.Snippets
{
	namespace Microsoft.Extensions.Configuration
	{
		/// <summary>
		/// Simple wrapper to provide static access to config like ConfigurationManager + web.config in .Net
		/// </summary>
		public class ConfigMan
		{
			public ConfigMan(IConfiguration config)
			{
				Values = config;
			}
			public static IConfiguration Values;
		}
	}
}
