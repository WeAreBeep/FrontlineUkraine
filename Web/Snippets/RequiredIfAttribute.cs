using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace Web.Snippets.System.ComponentModel.DataAnnotations
{
	public class RequiredIfAttribute : ConditionalValidationAttribute
	{
		public RequiredIfAttribute(string dependentProperty, object targetValue) 
			: base(new RequiredAttribute(), dependentProperty, targetValue) { }
		protected override string ValidationName => "requiredif";

		public override void AddValidation(ClientModelValidationContext context)
		{
			base.AddValidation(context);
			context.Attributes.Add($"data-val-{ValidationName}-rule", "required");
		}
	}
}
