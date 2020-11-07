namespace Web.Snippets.Messaging
{
	public interface IValidationDictionary
	{
		void AddError(string key, string errorMessage);
		bool IsValid { get; }
	}
}
