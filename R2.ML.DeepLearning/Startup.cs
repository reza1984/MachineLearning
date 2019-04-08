using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InstaSharper.API;
using InstaSharper.API.Builder;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using R2.Domain.Context;
using R2.Domain.Repository;
using R2.ML.DeepLearning.Database;
using R2.ML.DeepLearning.Helper;
using R2.ML.DeepLearning.Models;

namespace R2.ML.DeepLearning
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddEnvironmentVariables();

            Configuration = builder.Build();
            Env = env;
        }

        public IConfiguration Configuration { get; }
        public IHostingEnvironment Env { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();

            string connectionString = Configuration.GetConnectionString("DefaultConnection");
            if (connectionString.Contains("%CONTENTROOTPATH%"))
            {
                connectionString = connectionString.Replace("%CONTENTROOTPATH%", Env.ContentRootPath);
            }

            // services.AddDbContext<DataContext> (options => options.UseSqlServer (connectionString));

            var dataContextBuilder = new DbContextOptionsBuilder<DataContext>()
                .UseSqlServer(connectionString);
            var context = new DataContext(dataContextBuilder.Options);
            services.AddSingleton<DataContext>(context);
            // Task.Run(()=>context.Database.Migrate());
            // context.Database.Migrate();
            services.AddSingleton<IUnitOfWork, UnitOfWork<DataContext>>();

            services.AddTransient(typeof(IRepository<>), typeof(Repository<>));
            services.AddTransient<IAppService, AppService>();

            services.AddSingleton<IInstagramHelper, InstagramHelper>();
            services.AddSingleton<IImageProcessing, ImageProcessing>();
            services.Configure<AppSettings>(Configuration.GetSection("ApplicationSettings"));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {

            app.Use(async (context, next) =>
            {
                await next();
                if (context.Response.StatusCode == 404 &&
                    !System.IO.Path.HasExtension(context.Request.Path.Value) &&
                    !context.Request.Path.Value.StartsWith("/api/"))
                {
                    context.Request.Path = "/index.html";
                    await next();
                }
            });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}