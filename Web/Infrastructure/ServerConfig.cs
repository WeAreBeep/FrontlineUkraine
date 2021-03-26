namespace Web.Infrastructure
{
    public enum ConnectionStringName
    {
        DataContext,
        Redis
    }

    // TODO: Move classes in Settings.cs to ServerConfig and make it to be injected by DI system?
    public class ServerConfig
    {
        public string PosttagEndpoint { get; set; }
        public string PosttagId { get; set; }
        public string PosttagApiKey { get; set; }
    }
}