using System;
using System.Text.RegularExpressions;

namespace Snippets
{
	namespace System
	{
		public static class StringExtensions
		{
			public static string SeparateCamelCase(this String value)
			{
				return Regex.Replace(value, "((?<=[a-z])[A-Z]|[A-Z](?=[a-z]))", " $1").TrimStart();
			}

			public static string Brief(this String value, int maxLength = 25)
			{
				if (value.Length > maxLength)
				{ 
					return value.Substring(0, maxLength-3) + "...";
				}
				return value;
			}
		}
	}
}
