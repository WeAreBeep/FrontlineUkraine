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

        public string WebsiteCanonicalUrl { get; set; } = "https://www.frontline.live";
        
        public string What3wordsApiKey { get; set; }
        
        public string AuthgearAppAdminPortalUrl { get; set; }
        
        public string PublicWebPublicMapUrl { get; set; }
        
        public string PublicWebSupplierMapUrl { get; set; }
    }
}