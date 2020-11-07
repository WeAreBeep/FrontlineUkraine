using System;

namespace Web.Db
{
    public partial class ContactSubmission
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Message { get; set; }
        public string EmailedTo { get; set; }
        public DateTimeOffset Created { get; set; }
    }
}
