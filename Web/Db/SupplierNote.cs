using System;
using System.Collections.Generic;

namespace Web.Db
{
    public partial class SupplierNote
    {
        public long SupplierId { get; set; }
        public long NoteId { get; set; }

        public virtual Note Note { get; set; }
        public virtual Supplier Supplier { get; set; }
    }
}
