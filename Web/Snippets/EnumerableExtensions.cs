using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace Web.Snippets.System.Collections.Generic
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

        /// <summary>
        /// Simply runs Select(selector).ToList() to save some calling code 
        /// </summary>
        public static List<TResult> SelectToList<TSource, TResult>(this IEnumerable<TSource> source, Func<TSource, TResult> selector)
        {
            return source.Select(selector).ToList();
        }

		/// <summary>
		/// Simply runs Where(filter).ToList() to save some calling code 
		/// </summary>
		public static List<TSource> WhereToList<TSource>(this IEnumerable<TSource> source, Func<TSource, bool> filter)
		{
			return source.Where(filter).ToList();
		}

        public static List<TResult> SelectToList<TSource, TResult>(this IEnumerable<TSource> source, Func<TSource, int, TResult> selector)
        {
            return source.Select(selector).ToList();
        }

        /// <summary>
        /// Simply runs .Cast&lt;TType&gt;().ToList() to save some calling code 
        /// </summary>
        public static List<TResult> CastToList<TResult>(this IEnumerable source)
        {
            return source.Cast<TResult>().ToList();
        }

        public static void Each<T>(this IEnumerable<T> ie, Action<T, int> action)
        {
            int i = 0;
            foreach (var e in ie) action(e, i++);
        }

      
        public static List<T> ForEachToList<T>(this List<T> ie, Action<T, int> action)
        {
            ie.Each(action);
            return ie;
        }
        
        /// <summary>
        /// Uses the default equality comparer, which will use an IEquatable T implementation or the object.Equals(object) method.
        /// cref:https://stackoverflow.com/questions/12795882/quickest-way-to-compare-two-list
        /// </summary>
        public static bool ListsAreEqual<T>(List<T> list1, List<T> list2)
        {
            List<T> firstNotSecond = list1.Except(list2).ToList();
            List<T> secondNotFirst = list2.Except(list1).ToList();
            return !firstNotSecond.Any() && !secondNotFirst.Any();
        }

        /// <summary>
        /// cref:https://stackoverflow.com/questions/12795882/quickest-way-to-compare-two-list
        /// </summary>
        public static bool ListsAreEqualMsdn<T>(List<T> list1, List<T> list2)
        {
            return Enumerable.SequenceEqual(list1, list2);
        }
    }
}
