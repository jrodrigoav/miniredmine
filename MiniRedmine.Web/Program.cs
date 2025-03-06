using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MiniRedmine.Web.Models;
using MiniRedmine.Web.Services;
using Serilog;
using Serilog.Events;

var builder = WebApplication.CreateBuilder(args);
{
    builder.Host.UseSerilog((hostingContext, loggerConfiguration) => loggerConfiguration
        .Enrich.FromLogContext()
        .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
        .MinimumLevel.Override("Microsoft.AspNetCore", LogEventLevel.Warning)
        .WriteTo.Console()
    );
    builder.Services.AddControllers();
    builder.Services.AddSpaStaticFiles(configure => configure.RootPath = "wwwroot");

    builder.Services.AddHttpClient<RedmineHttpService>();
    builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    builder =>
                    {
                        builder.WithOrigins("http://localhost",
                                            "https://miniredmine.onrender.com");
                    });
            });

    builder.Services.Configure<UnosquareSettings>(builder.Configuration.GetSection("Unosquare"));
}
var app = builder.Build();
{
    app.UseExceptionHandler("/api/Error/500");
    app.UseStatusCodePagesWithReExecute("/api/Error/{0}");
    app.UseSerilogRequestLogging();
    if (!app.Environment.IsDevelopment())
    {
        app.UseHsts();
        //const string cacheMaxAge = "1440";
        //app.UseStaticFiles(new StaticFileOptions
        //{
        //    OnPrepareResponse = ctx =>
        //    {
        //        // using Microsoft.AspNetCore.Http;
        //        ctx.Context.Response.Headers.Append("Cache-Control", $"public, max-age={cacheMaxAge}");
        //    }
        //});
        app.MapStaticAssets();
    }
    else
    {        
        app.UseStaticFiles(new StaticFileOptions
        {
            OnPrepareResponse = ctx =>
            {
                // using Microsoft.AspNetCore.Http;
                ctx.Context.Response.Headers.Append("Cache-Control", "no-cache");
            }
        });
    }
    app.UseCors();
    app.MapControllers();
    app.UseSpa(options => options.Options.DefaultPage = new Microsoft.AspNetCore.Http.PathString("/index.html"));

}
app.Run();
