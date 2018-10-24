using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using MiniRedmine.Web.Helpers;

namespace MiniRedmine.Web
{
    public class Program
    {
        public static void Main(string[] args)
        {
            BuildWebHost(args).Run();
        }

        public static IWebHost BuildWebHost(string[] args)
        {
            return WebHost.CreateDefaultBuilder(args)
             .ConfigureAppConfiguration((hostingContext, config) =>
             {
                 var env = hostingContext.HostingEnvironment;
                 config.SetBasePath(hostingContext.HostingEnvironment.ContentRootPath)
                 .Add(new WebConfigSource() { Path = "web.config", Optional = false, ReloadOnChange = true })
                 .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                 .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                 .AddEnvironmentVariables();
             })
            .UseStartup<Startup>()
            .Build();
        }
    }
}
