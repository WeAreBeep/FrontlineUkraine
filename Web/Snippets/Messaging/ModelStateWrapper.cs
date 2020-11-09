using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Web.Snippets.Messaging.Microsoft.AspNetCore.Mvc.ModelBinding
{
	public class ModelStateWrapper : IValidationDictionary
	{
		public ModelStateWrapper(ModelStateDictionary modelState)
		{
			_modelState = modelState;
		}

		public void AddError(string key, string errorMessage) => _modelState.AddModelError(key, errorMessage);

		public bool IsValid => _modelState.IsValid;

		ModelStateDictionary _modelState;
	}
}
