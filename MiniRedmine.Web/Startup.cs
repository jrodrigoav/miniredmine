using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MiniRedmine.Web.Services;
using Serilog;
using System.Collections.Generic;

namespace MiniRedmine.Web
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddHttpClient<RedmineHttpService>(configureClient => configureClient.BaseAddress = new System.Uri("https://dev.unosquare.com/redmine/"));
            services.AddControllers();
            services.AddSpaStaticFiles(configure => configure.RootPath = "wwwroot");
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app)
        {
            app.UseExceptionHandler("/api/Error/500");
            app.UseStatusCodePagesWithReExecute("/api/Error/{0}");

            app.UseSerilogRequestLogging();


            app.UseDefaultFiles(new DefaultFilesOptions
            {
                DefaultFileNames = new List<string> { "index.html" }
            });

            app.UseStaticFiles();

            app.UseRouting();
            app.UseEndpoints(endpoints => endpoints.MapControllers());
            app.UseSpa(options => options.Options.DefaultPage = new Microsoft.AspNetCore.Http.PathString("/index.html"));
        }
    }
}
