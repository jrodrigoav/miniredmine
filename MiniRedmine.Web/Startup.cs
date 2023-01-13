using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MiniRedmine.Web.Models;
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

            services.AddHttpClient<RedmineHttpService>();
            services.AddControllers();
            services.AddSpaStaticFiles(configure => configure.RootPath = "wwwroot");

            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    builder =>
                    {
                        builder.WithOrigins("http://localhost",
                                            "https://miniremine.herokuapp.com");
                    });
            });

            services.Configure<UnosquareSettings>(Configuration.GetSection("Unosquare"));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app,IWebHostEnvironment environment)
        {
            app.UseExceptionHandler("/api/Error/500");
            app.UseStatusCodePagesWithReExecute("/api/Error/{0}");
            if (!environment.IsDevelopment())
            {
                app.Use(async (context, next) =>
                {
                    context.Response.Headers.Add("Content-Security-Policy-Report-Only", "default-src 'self'; script-src 'report-sample' 'self' https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js https://kit.fontawesome.com/2f00ba8004.js; style-src 'report-sample' 'self' https://cdn.jsdelivr.net; object-src 'none'; base-uri 'self'; connect-src 'self' https://ka-f.fontawesome.com; font-src 'self' https://ka-f.fontawesome.com; frame-src 'self'; img-src 'self'; manifest-src 'self'; media-src 'self'; report-uri https://jrodrigoav.report-uri.com/r/d/csp/reportOnly; worker-src 'none';");
                    await next();
                });
                app.UseHsts();
            }
            app.UseSerilogRequestLogging();

            app.UseDefaultFiles(new DefaultFilesOptions
            {
                DefaultFileNames = new List<string> { "index.html" }
            });

            const string cacheMaxAge = "604800";
            app.UseStaticFiles(new StaticFileOptions
            {
                OnPrepareResponse = ctx =>
                {
                    // using Microsoft.AspNetCore.Http;
                    ctx.Context.Response.Headers.Append("Cache-Control", $"public, max-age={cacheMaxAge}");
                }
            });

            app.UseRouting();
            app.UseCors();
            app.UseEndpoints(endpoints => endpoints.MapControllers());
            app.UseSpa(options => options.Options.DefaultPage = new Microsoft.AspNetCore.Http.PathString("/index.html"));
        }
    }
}
