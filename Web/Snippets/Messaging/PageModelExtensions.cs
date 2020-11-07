using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using Web.Snippets.Messaging;
using Web.Snippets.Messaging.Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Web.Snippets.Microsoft.AspNetCore.Mvc.RazorPages
{
    public static class PageModelExtensions
    {
        public static ViewModelLogNotifier<TEntity, TCaller> GetViewModelLogNotifier<TEntity, TCaller>(this PageModel source, ILogger<TCaller> logger) 
            => new ViewModelLogNotifier<TEntity, TCaller>(new ModelStateWrapper(source.ModelState), source.getMessenger(), logger);

        public static LogNotifier<TCaller> GetLogNotifier<TCaller>(this PageModel source, ILogger<TCaller> logger) 
            => new LogNotifier<TCaller>(source.getMessenger(), logger);

        public static ViewModelNotifier<TEntity> GetViewModelNotifier<TEntity>(this PageModel source) 
            => new ViewModelNotifier<TEntity>(new ModelStateWrapper(source.ModelState), source.getMessenger());

        public static SimpleNotifier GetNotifier(this PageModel source) 
            => new SimpleNotifier(source.getMessenger());

        static IMessenger getMessenger(this PageModel source) 
            => new FlashMessenger(source.HttpContext.Session);
    }
}
