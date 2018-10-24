using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MiniRedmine.Web.Clients;
using MiniRedmine.Web.DbModels;
using MiniRedmine.Web.Helpers;
using MiniRedmine.Web.Services;
using System;
using System.IO;

namespace MiniRedmine.Web
{
    public class Startup
    {
        public static IConfiguration Configuration { get; private set; }
        private readonly IHostingEnvironment _env;

        public Startup(IConfiguration configuration, IHostingEnvironment env)
        {
            Configuration = configuration;
            _env = env;
        }
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddHttpClient<RedmineClient>(client =>
            {
                client.BaseAddress = new Uri(Constants.REDMINE_APIURL);
            });

            services.AddDbContext<RedmineUDB4Context>(options =>
            {
                options.UseInMemoryDatabase("MiniRedmineDB");
                /*string connectionString = null;
                if (_env.IsProduction())
                {
                    connectionString = Environment.GetEnvironmentVariable("SQLSERVER_CONNECTION_STRING");
                    options.UseInMemoryDatabase("MiniRedmineDB");
                }
                else
                {
                    connectionString = Configuration.GetConnectionString("MiniRedmineDB");
                    options.UseSqlServer(connectionString);
                }*/
                
            });

            services.AddScoped<UserTemplateService>();
            services.AddScoped<CustomerService>();

            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseExceptionHandler(appBuilder =>
            {
                appBuilder.Run(async context =>
                {
                    context.Response.StatusCode = 500;
                    var ex = context.Features.Get<IExceptionHandlerFeature>();
                    if (ex != null)
                    {
                        await context.Response.WriteAsync($"Error [{ex.Error?.Message}]. Try again later.");
                    }
                    else
                    {
                        await context.Response.WriteAsync("An unexpected fault happened. Try again later.");
                    }
                });
            });

            DefaultFilesOptions options = new DefaultFilesOptions();
            options.DefaultFileNames.Clear();
            options.DefaultFileNames.Add("index.html");

            app.UseDefaultFiles(options);
            app.UseStaticFiles();
            app.UseMvc();
        }
    }
}
