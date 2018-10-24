using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Serilog;
using System;

namespace MiniRedmine.Web
{
    public class Program
    {
        public static void Main(string[] args)
        {   
           /* Log.Logger = new LoggerConfiguration()
            .MinimumLevel.Warning()
            //.MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
            .WriteTo.RollingFile("App_Data\\MiniRedmine-{Date}.txt")
            .CreateLogger();

            try
            {*/
               // Log.Information("Starting MiniRedmine");
                BuildWebHost(args).Run();
            /*}
            catch(Exception ex)
            {
                Log.Fatal(ex, "AspNetCore terminated unexpectedly");
            }
            finally{
                Log.CloseAndFlush();
            }*/

        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
            //.UseSerilog()
            .UseStartup<Startup>()
            .Build();
    }
}
