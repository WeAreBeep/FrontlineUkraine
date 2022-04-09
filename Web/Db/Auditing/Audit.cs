using System;

namespace Web.Db.Auditing
{
    public class Audit  
    {  
        public long Id { get; set; }  
        public DateTimeOffset Timestamp { get; set; }  
        public string Username { get; set; }  
        public string TableName { get; set; }  
        public string Action { get; set; }  
        public string KeyValues { get; set; }  
        public string OldValues { get; set; }  
        public string NewValues { get; set; }  
    }  
}
