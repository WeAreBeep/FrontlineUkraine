using System;
using System.Collections.Generic;
using System.Diagnostics;
using Microsoft.Extensions.Logging;
using Web.Infrastructure;
using Web.Snippets.System;

namespace Web.Snippets.Messaging
{
    /// <summary>
    /// Adds logging functionality in so can configure the application to log various important messages (such as exceptions etc). 
    /// </summary>
    /// <typeparam name="TCaller">The type of the calling MVC Controller / Razor PageModel</typeparam>
	public class LogNotifier<TCaller> : SimpleNotifier
    {
        public void LogMessage(MsgTypes type, string message, Exception exception = null) { AddMessage(type, message, exception, logMessage: true, notyMessage: false); }

        /// <summary>
        /// For Performance 
        /// default of no noty for logging for import routines etc
        /// keeps in RAM, then dump all at end
        /// avoids slowing down processes which 
        /// </summary>
        public void QueueMessage(MsgTypes type, string message, Exception exception = null, bool logMessage = false, bool notyMessage = false)
        {
            messagesQueue.Add(new MessageInfo() { type = type, message = message, exception  = exception, logMessage = logMessage, notyMessage = notyMessage });
        }

        public void DumpMessages(bool? forceNotyForAllMessage = null)
        {
            foreach(MessageInfo messageInfo in messagesQueue)
            {
                AddMessage(messageInfo.type, messageInfo.message, messageInfo.exception, messageInfo.logMessage, forceNotyForAllMessage?? messageInfo.notyMessage);
            }
        }
        class MessageInfo
        {
            public MsgTypes type;
            public string message;
            public Exception exception;
            public bool logMessage;
            public bool notyMessage;
        }

        List<MessageInfo> messagesQueue = new List<MessageInfo>();

        public override void AddMessage(MsgTypes type, string message, Exception exception = null, bool logMessage = false, bool notyMessage = true)
        {
            if (exception == null)
            {
                if (Settings.DeploymentContext == DeploymentContext.Development)
                {
                    Debug.WriteLine($"NOTIFIER >>>> {type.GetText()} : {message}");
                }
                if (logMessage || Settings.Notifications.LogAllMessages || (type == MsgTypes.Error || type == MsgTypes.Warning))
                {
                    log(type, message);
                }

                addMessageSimple(type, message, notyMessage);
            }
            else
            {
                if (Settings.DeploymentContext == DeploymentContext.Development)
                {
                    Debug.WriteLine($"NOTIFIER >>>> EXCP : {exception.Message}");
                }

                logException(type, message, exception);

                addMessage(type, message, exception, notyMessage);
            }
        }
      
        protected override void addMessage(MsgTypes type, string message, Exception exception, bool notyMessage)
        {
            base.addMessage(type, message, exception, notyMessage);
            if(!Settings.Notifications.ShowUserExceptionDetails)
            {
                messenger.AddMessage(MsgTypes.Warning, $"Exception Occurred : {Settings.Notifications.SystemWatcher} has been notified");
            }
        }
        /// <summary>
        /// Maps Success => Debug, Info, Warn, Error to same log methods  
        /// </summary>
        void log(MsgTypes type, string message)
        {
            if (type == MsgTypes.Success)
            {
                _logger.LogDebug(message);
            }
            else if (type == MsgTypes.Information)
            {
                _logger.LogInformation(message);
            }
            else if (type == MsgTypes.Warning)
            {
                _logger.LogWarning(message);
            }
            else if (type == MsgTypes.Error)
            {
                _logger.LogError(message);
            }
        }

        void logException(MsgTypes type, string message, Exception exception)
        {
            if (type == MsgTypes.Success)
            {
                _logger.LogDebug(exception, message);
            }
            else if (type == MsgTypes.Information)
            {
                _logger.LogInformation(exception, message);
            }
            else if (type == MsgTypes.Warning)
            {
                _logger.LogWarning(exception, message);
            }
            else if (type == MsgTypes.Error)
            {
                _logger.LogError(exception, message);
            }
        }

        public LogNotifier(IMessenger messenger, ILogger<TCaller> logger) : base(messenger)
        {
            _logger = logger;
        }
        readonly ILogger<TCaller> _logger;
    }
}
