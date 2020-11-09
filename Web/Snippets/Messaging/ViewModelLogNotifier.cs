using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.Extensions.Logging;

namespace Web.Snippets.Messaging
{
	public class ViewModelLogNotifier<TEntity, TCaller> : LogNotifier<TCaller>
	{
		public void AddMemberMessage<TMember>(MsgTypes type, string message, Expression<Func<TEntity, TMember>> viewModelMember)
		{
			IEnumerable<string> propExpressionAsString = viewModelMember.ToString().Split('.').Skip(1);
			string propertyName = String.Join(".", propExpressionAsString);
			if (type == MsgTypes.Error)
			{
				_validationDictionary.AddError(propertyName, message);
			}
			else
			{
				AddMessage(type, message);
			}
		}

		public ViewModelLogNotifier(IValidationDictionary validationDictionary, IMessenger messenger, ILogger<TCaller> logger) : base(messenger, logger)
		{
			_validationDictionary = validationDictionary;
		}
		readonly IValidationDictionary _validationDictionary;
	}
}
