using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Web.Snippets.Messaging.Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Web.Snippets.Messaging
{
    public static class ControllerExtensions
    {
        public static ViewModelLogNotifier<TEntity, TCaller> GetViewModelLogNotifier<TEntity, TCaller>(this Controller source, ILogger<TCaller> logger) 
            => new ViewModelLogNotifier<TEntity, TCaller>(new ModelStateWrapper(source.ModelState), source.getMessenger(), logger);

        public static LogNotifier<TCaller> GetLogNotifier<TCaller>(this Controller source, ILogger<TCaller> logger) 
            => new LogNotifier<TCaller>(source.getMessenger(), logger);

        public static ViewModelNotifier<TEntity> GetViewModelNotifier<TEntity>(this Controller source) 
            => new ViewModelNotifier<TEntity>(new ModelStateWrapper(source.ModelState), source.getMessenger());

        public static SimpleNotifier GetNotifier(this Controller source) 
            => new SimpleNotifier(source.getMessenger());

        static IMessenger getMessenger(this Controller source) 
            => new FlashMessenger(source.HttpContext.Session);
    }
}
