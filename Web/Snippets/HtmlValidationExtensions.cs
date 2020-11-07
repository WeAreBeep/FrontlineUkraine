using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq.Expressions;
using System.Net;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;

namespace Web.Snippets
{
	public static class HtmlValidationExtensions
	{
		/// <summary>
		/// Allows HTML content in Validation messages 
		/// </summary>
		public static IHtmlContent HtmlValidationMessageFor<TModel, TResult>(
			this IHtmlHelper<TModel> htmlHelper,
			Expression<Func<TModel, TResult>> expression)
		{
			if (htmlHelper == null)
			{
				throw new ArgumentNullException(nameof(htmlHelper));
			}

			if (expression == null)
			{
				throw new ArgumentNullException(nameof(expression));
			}

			IHtmlContent html = htmlHelper.ValidationMessageFor(expression, message: null, htmlAttributes: null, tag: null);
			if(html is TagBuilder x && x.HasInnerHtml)
			{
				x.InnerHtml.SetHtmlContent(htmlContentToUnencodedString(x.InnerHtml));
			}
			return html;
		}

		public static IHtmlContent HtmlValidationSummary(this IHtmlHelper htmlHelper, bool excludePropertyErrors)
		{
			if (htmlHelper == null)
			{
				throw new ArgumentNullException(nameof(htmlHelper));
			}

			return HtmlValidationSummary(htmlHelper, //htmlHelper.ValidationSummary(
				excludePropertyErrors,
				message: null,
				htmlAttributes: null,
				tag: null);
		}
		public static IHtmlContent HtmlValidationSummary(this IHtmlHelper htmlHelper,
			bool excludePropertyErrors,
			string message,
			object htmlAttributes,
			string tag)
		{
			return generateValidationSummary(htmlHelper, excludePropertyErrors, message, htmlAttributes, tag);
		}
		
		static IHtmlContent generateValidationSummary(this IHtmlHelper htmlHelper,
			bool excludePropertyErrors,
			string message,
			object htmlAttributes,
			string tag)
		{
			var tagBuilder = generateValidationSummary(//var tagBuilder = _htmlGenerator.GenerateValidationSummary(
				htmlHelper.ViewContext,
				excludePropertyErrors,
				message,
				headerTag: tag,
				htmlAttributes: htmlAttributes);
			if (tagBuilder == null)
			{
				return HtmlString.Empty;
			}

			return tagBuilder;
		}

		 public static TagBuilder generateValidationSummary(
            ViewContext viewContext,
            bool excludePropertyErrors,
            string message,
            string headerTag,
            object htmlAttributes)
        {
            if (viewContext == null)
            {
                throw new ArgumentNullException(nameof(viewContext));
            }

            var viewData = viewContext.ViewData;
            if (!viewContext.ClientValidationEnabled && viewData.ModelState.IsValid)
            {
                // Client-side validation is not enabled to add to the generated element and element will be empty.
                return null;
            }

            if (excludePropertyErrors &&
                (!viewData.ModelState.TryGetValue(viewData.TemplateInfo.HtmlFieldPrefix, out var entryForModel) ||
                 entryForModel.Errors.Count == 0))
            {
                // Client-side validation (if enabled) will not affect the generated element and element will be empty.
                return null;
            }

            TagBuilder messageTag;
            if (string.IsNullOrEmpty(message))
            {
                messageTag = null;
            }
            else
            {
                if (string.IsNullOrEmpty(headerTag))
                {
                    headerTag = viewContext.ValidationSummaryMessageElement;
                }

                messageTag = new TagBuilder(headerTag);
                messageTag.InnerHtml.SetContent(message);
            }

            // If excludePropertyErrors is true, describe any validation issue with the current model in a single item.
            // Otherwise, list individual property errors.
            var isHtmlSummaryModified = false;
            var modelStates = GetModelStateList(viewData, excludePropertyErrors);//ValidationHelpers.GetModelStateList(viewData, excludePropertyErrors);

            var htmlSummary = new TagBuilder("ul");
            foreach (var modelState in modelStates)
            {
                // Perf: Avoid allocations
                for (var i = 0; i < modelState.Errors.Count; i++)
                {
                    var modelError = modelState.Errors[i];
                    var errorText = GetModelErrorMessageOrDefault(modelError);//ValidationHelpers.GetModelErrorMessageOrDefault

                    if (!string.IsNullOrEmpty(errorText))
                    {
                        var listItem = new TagBuilder("li");
						listItem.InnerHtml.SetHtmlContent(errorText); //listItem.InnerHtml.SetContent(errorText);
                        htmlSummary.InnerHtml.AppendLine(listItem);
                        isHtmlSummaryModified = true;
                    }
                }
            }

            if (!isHtmlSummaryModified)
            {
                htmlSummary.InnerHtml.AppendHtml(HiddenListItem);
                htmlSummary.InnerHtml.AppendLine();
            }

            var tagBuilder = new TagBuilder("div");
            tagBuilder.MergeAttributes(GetHtmlAttributeDictionaryOrNull(htmlAttributes));

            if (viewData.ModelState.IsValid)
            {
                tagBuilder.AddCssClass(HtmlHelper.ValidationSummaryValidCssClassName);
            }
            else
            {
                tagBuilder.AddCssClass(HtmlHelper.ValidationSummaryCssClassName);
            }

            if (messageTag != null)
            {
                tagBuilder.InnerHtml.AppendLine(messageTag);
            }

            tagBuilder.InnerHtml.AppendHtml(htmlSummary);

            if (viewContext.ClientValidationEnabled && !excludePropertyErrors)
            {
                // Inform the client where to replace the list of property errors after validation.
                tagBuilder.MergeAttribute("data-valmsg-summary", "true");
            }

            return tagBuilder;
        }

		public static IList<ModelStateEntry> GetModelStateList(
			ViewDataDictionary viewData,
			bool excludePropertyErrors)
		{
			if (excludePropertyErrors)
			{
				viewData.ModelState.TryGetValue(viewData.TemplateInfo.HtmlFieldPrefix, out var ms);

				if (ms != null)
				{
					return new[] { ms };
				}
			}
			else if (viewData.ModelState.Count > 0)
			{
				var metadata = viewData.ModelMetadata;
				var modelStateDictionary = viewData.ModelState;
				var entries = new List<ModelStateEntry>();
				Visit(modelStateDictionary.Root, metadata, entries);

				if (entries.Count < modelStateDictionary.Count)
				{
					// Account for entries in the ModelStateDictionary that do not have corresponding ModelMetadata values.
					foreach (var entry in modelStateDictionary)
					{
						if (!entries.Contains(entry.Value))
						{
							entries.Add(entry.Value);
						}
					}
				}

				return entries;
			}

			return Array.Empty<ModelStateEntry>();
		}

		public static string GetModelErrorMessageOrDefault(ModelError modelError)
		{
			Debug.Assert(modelError != null);

			if (!string.IsNullOrEmpty(modelError.ErrorMessage))
			{
				return modelError.ErrorMessage;
			}

			// Default in the ValidationSummary case is no error message.
			return string.Empty;
		}

		private const string HiddenListItem = @"<li style=""display:none""></li>";

		private static void Visit(
			ModelStateEntry modelStateEntry,
			ModelMetadata metadata,
			List<ModelStateEntry> orderedModelStateEntries)
		{
			if (metadata.ElementMetadata != null && modelStateEntry.Children != null)
			{
				foreach (var indexEntry in modelStateEntry.Children)
				{
					Visit(indexEntry, metadata.ElementMetadata, orderedModelStateEntries);
				}
			}
			else
			{
				for (var i = 0; i < metadata.Properties.Count; i++)
				{
					var propertyMetadata = metadata.Properties[i];
					var propertyModelStateEntry = modelStateEntry.GetModelStateForProperty(propertyMetadata.PropertyName);
					if (propertyModelStateEntry != null)
					{
						Visit(propertyModelStateEntry, propertyMetadata, orderedModelStateEntries);
					}
				} 
			}

			if (!modelStateEntry.IsContainerNode)
			{
				orderedModelStateEntries.Add(modelStateEntry);
			}
		}

		private static IDictionary<string, object> GetHtmlAttributeDictionaryOrNull(object htmlAttributes)
		{
			IDictionary<string, object> htmlAttributeDictionary = null;
			if (htmlAttributes != null)
			{
				htmlAttributeDictionary = htmlAttributes as IDictionary<string, object>;
				if (htmlAttributeDictionary == null)
				{
					htmlAttributeDictionary = HtmlHelper.AnonymousObjectToHtmlAttributes(htmlAttributes);
				}
			}

			return htmlAttributeDictionary;
		}
		
		static string htmlContentToUnencodedString(IHtmlContent content)
		{
			return WebUtility.HtmlDecode(htmlContentToString(content));
		}
		static string htmlContentToString(IHtmlContent content, HtmlEncoder encoder = null)
		{
			if(encoder == null)
			{
				encoder = HtmlEncoder.Default;
			}
			using (StringWriter writer = new StringWriter())
			{
				content.WriteTo(writer, encoder);
				return writer.ToString();
			}
		}
	}
}