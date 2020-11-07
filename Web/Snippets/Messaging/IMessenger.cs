namespace Web.Snippets.Messaging
{
	public interface IMessenger
	{
		void AddMessage(MsgTypes type, string text);
		string GetOneTimeMsgJson(); 
	}
}
