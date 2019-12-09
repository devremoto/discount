using Microsoft.Extensions.Configuration;

namespace ProductService
{
    public static class ConfigurationExtension
    {
        public static T GetConfiguration<T>(this IConfigurationRoot configuration)
        where T : class
        {
            return configuration.GetSection(typeof(T).Name).Get<T>();
        }
    }
}
