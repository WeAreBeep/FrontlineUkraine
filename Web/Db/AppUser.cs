using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Web.Db
{
    public class AppUser : IdentityUser
    {
        public AppUser() : base()
        {
            Notes = new HashSet<Note>();
        }

        public virtual ICollection<Note> Notes { get; set; }
    }
}
