using System;
using System.Collections.Generic;

namespace Web.Db
{
    public partial class NeedNote
    {
        public long NeedId { get; set; }
        public long NoteId { get; set; }

        public virtual Need Need { get; set; }
        public virtual Note Note { get; set; }
    }
}
