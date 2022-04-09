using System;
using System.ComponentModel.DataAnnotations;
using System.Reflection;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Web.Snippets.System.ComponentModel.DataAnnotations
{
	[AttributeUsage(AttributeTargets.Field | AttributeTargets.Property, AllowMultiple = false)]
	public abstract class ConditionalValidationAttribute : ValidationAttribute, IClientModelValidator
	{
		protected readonly ValidationAttribute InnerAttribute;
		public string DependentProperty { get; set; }
		public object TargetValue { get; set; }
		protected abstract string ValidationName { get; }
		public virtual void AddValidation(ClientModelValidationContext context)
		{
			if (context == null)
			{
				throw new ArgumentNullException(nameof(context));
			}
			context.Attributes.Add("data-val", "true");
			context.Attributes.Add($"data-val-{ValidationName}", FormatErrorMessage(context.ModelMetadata.GetDisplayName()));
			context.Attributes.Add($"data-val-{ValidationName}-dependentproperty", getDependentPropertyId(context, DependentProperty));
			context.Attributes.Add($"data-val-{ValidationName}-targetvalue", getTargetValue());
		}

		/// <summary>
		/// find the value on the control we depend on; if it's a bool, format it javascript style
		/// </summary>
		string getTargetValue()
		{
			string targetValue = (this.TargetValue ?? "").ToString();
			if (this.TargetValue.GetType() == typeof(bool))
			{
				targetValue = targetValue.ToLower();
			}
			return targetValue;
		}

		/// <summary>
		/// Mimic unhelpfully internal / HtmlHelper based GetFullHtmlFieldId type behaviour
		/// e.g. htmlHelper.GenerateIdFromName()
		/// i.e. Get the client side Id of a propName accounting for VM nesting etc
		/// </summary>
		string getDependentPropertyId(ClientModelValidationContext context, string propertyName)
		{
			string fullName = (context.ActionContext as ViewContext).ViewData.TemplateInfo.GetFullHtmlFieldName(propertyName);
			string fullId = fullName.Replace(".", "_"); //standard 
			return fullId.Replace("[", "_").Replace("]", "_"); //for lists 
		}

		protected override ValidationResult IsValid(object value, ValidationContext validationContext)
		{
			// get a reference to the property this validation depends upon
			Type containerType = validationContext.ObjectInstance.GetType();
			PropertyInfo field = containerType.GetProperty(this.DependentProperty);
			if (field != null)
			{
				object dependentvalue = field.GetValue(validationContext.ObjectInstance, null);

				// compare the value against the target value
				if ((dependentvalue == null && this.TargetValue == null) || (dependentvalue != null && dependentvalue.Equals(this.TargetValue)))
				{
					//return InnerAttribute.IsValid(value, validationContext);
					// match => means we should try validating this field
					if (!InnerAttribute.IsValid(value))
					{
						// validation failed - return an error
						return new ValidationResult(this.FormatErrorMessage(validationContext.DisplayName), new[] { validationContext.MemberName });
					}
				}
			}
			return ValidationResult.Success;
		}

		protected ConditionalValidationAttribute(ValidationAttribute innerAttribute, string dependentProperty, object targetValue)
		{
			this.InnerAttribute = innerAttribute;
			this.DependentProperty = dependentProperty;
			this.TargetValue = targetValue;
		}
	}
}
