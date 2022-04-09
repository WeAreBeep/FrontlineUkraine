using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Web.Db
{
    public partial class Note
    {
        public Note()
        {
            NeedNotes = new HashSet<NeedNote>();
            SupplierNotes = new HashSet<SupplierNote>();
        }

        public long Id { get; set; }
        public DateTimeOffset Timestamp { get; set; }
        public string UserId { get; set; }
        public string Text { get; set; }

        public virtual AppUser User { get; set; }

        public virtual ICollection<NeedNote> NeedNotes { get; set; }
        public virtual ICollection<SupplierNote> SupplierNotes { get; set; }
    }
}
