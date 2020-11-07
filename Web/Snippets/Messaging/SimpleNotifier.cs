using System;
using System.Diagnostics;
using Web.Infrastructure;
using Web.Snippets.System;

namespace Web.Snippets.Messaging
{
    public class SimpleNotifier
    {
        public virtual void AddMessage(MsgTypes type, string message, Exception exception = null, bool logMessage = false, bool notyMessage = true)
        {
            if (exception == null)
            {
                if (Settings.DeploymentContext == DeploymentContext.Development)
                {
                    Debug.WriteLine($"NOTIFIER >>>> {type.GetText()} : {message}");
                }
                addMessageSimple(type, message, notyMessage);
            }
            else
            {
                if (Settings.DeploymentContext == DeploymentContext.Development)
                {
                    Debug.WriteLine($"NOTIFIER >>>> EXCP : {exception.Message}");
                }
                addMessage(type, message, exception, notyMessage);
            }
        }

        protected virtual void addMessageSimple(MsgTypes type, string message, bool notyMessage)
        {
            if(notyMessage)
            {
                messenger.AddMessage(type, message);
            }
        }

        protected virtual void addMessage(MsgTypes type, string message, Exception exception, bool notyMessage)
        {
            addMessageSimple(type, message, notyMessage);
            if(Settings.Notifications.ShowUserExceptionDetails)
            {
                messenger.AddMessage(MsgTypes.Warning, $"Exp : {exception.Message}");
            }
        }

        public SimpleNotifier(IMessenger messenger)
        {
            this.messenger = messenger;
        }
        protected readonly IMessenger messenger;
    }
}
