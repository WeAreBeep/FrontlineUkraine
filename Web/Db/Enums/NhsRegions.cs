using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Snippets.System;

namespace Web.Db
{
    public enum NhsRegions
    {
        Scotland = 1,
        [EnumText("North East and Yorkshire")]
        NorthEastAndYorkshire,
        [EnumText("North West")]
        NorthWest,
        Midlands,
        [EnumText("East of England")]
        EastOfEngland,
        London,
        [EnumText("South East")]
        SouthEast,      
        [EnumText("South West")]
        SouthWest,
        [EnumText("Northern Ireland")]
        NorthernIreland,
        Wales
    }
}
