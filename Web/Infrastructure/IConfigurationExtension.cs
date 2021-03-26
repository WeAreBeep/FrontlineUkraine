using System;
using Microsoft.Extensions.Configuration;

namespace Web.Infrastructure.Extensions
{
    public static class IConfigurationGetConnectionStringExtension
    {
        public static string GetConnectionString(this IConfiguration configuration, ConnectionStringName connectionStringName)
        {
            return configuration.GetConnectionString(Enum.GetName( typeof(ConnectionStringName), connectionStringName));
        }
    }
}