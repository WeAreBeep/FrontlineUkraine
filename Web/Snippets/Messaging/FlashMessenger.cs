using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Web.Infrastructure;

namespace Web.Snippets.Messaging
{
	public class FlashMessenger : IMessenger
	{
		/// <summary>
		/// Works well with PRG
		/// </summary>
		public string GetOneTimeMsgJson()
		{
			string respVal = "";
			Dictionary<MsgTypes, List<string>> messages = _messagesAccess.Get();
			if(messages != null && messages.Count > 0)
			{
				respVal = JsonConvert.SerializeObject(messages, Settings.ClientSideSerializerSettings); //, Settings.SerializerSettings
			}
			_messagesAccess.Store(null);
			return respVal;
		}

		public void AddMessage(MsgTypes type, string text)
		{
			Dictionary<MsgTypes, List<string>> messages = _messagesAccess.Get();
			if(!messages.ContainsKey(type))
			{
				messages.Add(type, new List<string>());
			}
			messages[type].Add(text);
			_messagesAccess.Store(messages);
		}

		public FlashMessenger(ISession session)
		{
			_messagesAccess = new MessagesAccess(session);
		}
		readonly MessagesAccess _messagesAccess;
	}

	
}