using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace Web.Snippets
{

    namespace System
    {
        public static class Enums
        {
            public static T Parse<T>(string value) where T : struct
            {
                if (!typeof(T).IsEnum)
                {
                    throw new ArgumentException("Parse : T must be an enumerated type");
                }
                if (String.IsNullOrWhiteSpace(value))
                {
                    throw new ArgumentNullException(nameof(value));
                }

                if (Enum.TryParse(value, out T r))
                {
                    return r;
                }
                else
                {
                    throw new ArgumentException("Parse : string value passed did not match an enum text");
                }
            }

            public static T? ParseNullable<T>(string value) where T : struct
            {
                T? respVal = null;
                if (!String.IsNullOrWhiteSpace(value))
                {
                    respVal = Parse<T>(value);
                }
                return respVal;
            }

            public static List<T> ToList<T>() where T : Enum
            {
                return Enum.GetValues(typeof(T)).Cast<T>().ToList();
            }

            public static Dictionary<string, T> ToDictionaryGetText<T>() where T : Enum
            {
                return AllList<T>().ToDictionary(k => k.GetText(), v => v);
            }

            /// <summary>
            /// Gets all items for an enum type.
            /// </summary>
            public static List<T> AllList<T>() where T : Enum
            {
                return Enum.GetValues(typeof(T)).Cast<T>().ToList();
            }

            /// <summary>
            /// Gets all items for an enum type.
            /// </summary>
            public static IEnumerable<T> All<T>() where T : Enum
            {
                return (T[])Enum.GetValues(typeof(T));
            }

        }

        public static class EnumExtns
        {


            /// <summary>
            /// Gets all items for an enum value.
            /// cref:https://stackoverflow.com/questions/105372/how-do-i-enumerate-an-enum-in-c
            /// </summary>
            public static IEnumerable<T> All<T>(this T value) where T : Enum
            {
                return (T[])Enum.GetValues(typeof(T));
            }


            /// <summary>
            /// Gets all items for an enum value.
            /// </summary>
            public static List<T> AllList<T>(this T value) where T : Enum
            {
                return Enum.GetValues(typeof(T)).Cast<T>().ToList();
            }


            /// <summary>
            /// Gets the Enum Text value from any attribute - or if none 
            /// To string and separates on Camel Casing
            /// </summary>
            public static string GetText(this Enum e)
            {
                string respVal = e.GetTextFromAttribute();
                if (String.IsNullOrWhiteSpace(respVal))
                {
                    respVal = e.GetTextSimple();
                }
                return respVal;
            }

            /// <summary>
            /// To string and separates on Camel Casing
            /// </summary>
            public static string GetTextSimple(this Enum e)
            {
                return e.ToString().SeparateCamelCase();
            }

            /// <summary>
            /// Gets the Enum Description value from any attribute
            /// - or if none The Text
            /// - or if none To string and separates on Camel Casing
            /// </summary>
            public static string GetDescription(this Enum e)
            {
                string respVal = e.GetDescriptionFromAttribute();
                if (String.IsNullOrWhiteSpace(respVal))
                {
                    respVal = e.GetText();
                }
                return respVal;
            }

            public static string GetTextFromAttribute(this Enum enumValue)
            {
                return enumValue.GetAttribute<EnumTextAttribute>()?.Text;
            }

            public static string GetDescriptionFromAttribute(this Enum enumValue)
            {
                return enumValue.GetAttribute<EnumTextAttribute>()?.Description;
            }

            public static T GetAttribute<T>(this Enum enumValue)
                where T : Attribute
            {
                return enumValue?.GetType()
                    .GetTypeInfo()
                    .GetDeclaredField(enumValue.ToString())//Was getting null here, as ToString returned a number not the name - if get this again try this - Enum.GetName(enumValue.GetType(), enumValue))
                    .GetCustomAttribute<T>();
            }
        }

        ///<summary>
        /// Attribute used to decorate enumerations with reader friendly names
        ///</summary>
        public sealed class EnumTextAttribute : Attribute
        {
            ///<summary>
            /// Returns the text representation of the value
            ///</summary>
            public string Text { get; }

            ///<summary>
            /// Returns the text description of the value
            ///</summary>
            public string Description { get; }

            ///<summary>
            /// Allows the creation of a friendly text representation of the enumeration.
            ///</summary>
            /// <param name="text">The reader friendly text to decorate the enum</param>
            public EnumTextAttribute(string text, string description) : this(text) { Description = description; }

            ///<summary>
            /// Allows the creation of a friendly text representation of the enumeration
            ///</summary>
            /// <param name="text">The reader friendly text to decorate the enum</param>
            public EnumTextAttribute(string text) { Text = text; }
        }
    }


}
