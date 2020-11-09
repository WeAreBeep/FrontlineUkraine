using System;
using System.Collections.Generic;
using System.Text;

namespace Shared
{
    public interface IPost
    {
        long Id { get; set; }
        Location Location { get; set; }
        List<string> PpeTypes { get; set; }
        string OtherPpeTypes { get; set; }
        string Postcode { get; set; }
        DateTime DateTime { get; set; }
    }
}
