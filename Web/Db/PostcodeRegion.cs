using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Db
{
    public partial class PostcodeRegion
    {
        public string Postcode { get; set; }
        public byte NhsRegionId { get; set; }

        [NotMapped]
        public NhsRegions NhsRegion => (NhsRegions)NhsRegionId;
    }
}
