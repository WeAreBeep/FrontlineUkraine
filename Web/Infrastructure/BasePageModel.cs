using Microsoft.AspNetCore.Mvc.RazorPages;
using Web.Snippets.Messaging;
using Web.Snippets.Microsoft.AspNetCore.Mvc.RazorPages;

namespace Web.Infrastructure
{
    public class BasePageModel : PageModel
    {
        protected SimpleNotifier notifier() => this.GetNotifier();
    }
}
