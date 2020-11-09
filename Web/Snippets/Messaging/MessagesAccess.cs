using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Web.Snippets.Microsoft.AspNetCore;

namespace Web.Snippets.Messaging
{
	public class MessagesAccess
	{
		public void Store(Dictionary<MsgTypes, List<string>> messages) => _messages = messages;
		public Dictionary<MsgTypes, List<string>> Get() => _messages ?? new Dictionary<MsgTypes, List<string>>();

		Dictionary<MsgTypes, List<string>> _messages
		{
			get => _session.Get<Dictionary<MsgTypes, List<string>>>("Messages");
			set => _session.Set<Dictionary<MsgTypes, List<string>>>("Messages", value);
		}
		public MessagesAccess(ISession session) { _session = session; }
		readonly ISession _session;
	}
}
