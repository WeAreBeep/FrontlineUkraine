using System;
using System.Collections.Generic;
using System.Linq;

namespace Snippets.System.Collections.Generic
{
	public static class EnumerableExtensions
	{
		public static bool IsIn(this string value, StringComparison comparer, params string[] list)
		{
			return list.Any(x => x.Equals(value, comparer));
		}

		/// <summary>
		/// Provides a nice syntax without use of new List
		/// </summary>
		public static bool IsIn<T>(this T value, params T[] list)
		{
			return value.IsIn(list.ToList());
		}

		/// <summary>
		/// Checks a object initialised List for occurrence of item of value equivalence
		/// e.g. use for Enums to avoid long syntax for logical or
		/// (Roles currentUserRole) => currentUserRole == Roles.Admin || currentUserRole == Roles.SeniorAdmin || currentUserRole == Roles.SuperAdmin;
		/// becomes
		/// (Roles currentUserRole) => currentUserRole.IsIn(new { Roles.Admin, Roles.SeniorAdmin, Roles.SuperAdmin });
		/// TODO:TD think cannot pass anonymous like new { Roles.Admin, Roles.SeniorAdmin, Roles.SuperAdmin } and must be a list. 
		/// </summary>
		public static bool IsIn<T>(this T value, List<T> list)
		{
			//List<T> l = (List<T>)list;
			return list.Any(x => x.Equals(value));
		}
	}
}
