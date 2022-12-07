
using API.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using API.interfaces;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using API.Extensions;
using API.Middleware;
using API.SignalR;
using System;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _config;
        private readonly bool IsDevelopment;
        public Startup(IConfiguration config, IWebHostEnvironment env)
        {
            _config = config;
            IsDevelopment = env.IsDevelopment();
        }

       

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {   var connString = "";
            services.AddApplicationServices(_config);

            services.AddControllers();
           // services.AddSwaggerGen(c =>
           // {
           //     c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
           // });
            services.AddCors();
            services.AddIdentityServices(_config);
            services.AddSignalR();

            if (IsDevelopment) 
            { 
                 connString = _config.GetConnectionString("DefaultConnection");
            
            }  
            else 
            {
                  // Use connection string provided at runtime by flyio.
                var connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

                 // Parse connection URL to connection string for Npgsql
                 connUrl = connUrl.Replace("postgres://", string.Empty);
                 var pgUserPass = connUrl.Split("@")[0];
                 var pgHostPortDb = connUrl.Split("@")[1];
                 var pgHostPort = pgHostPortDb.Split("/")[0];
                 var pgDb = pgHostPortDb.Split("/")[1];
                 var pgUser = pgUserPass.Split(":")[0];
                 var pgPass = pgUserPass.Split(":")[1];
                 var pgHost = pgHostPort.Split(":")[0];
                 var pgPort = pgHostPort.Split(":")[1];

                 connString = $"Server={pgHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb};";
            }
            
            services.AddDbContext<DataContext>(opt =>
            {
             opt.UseNpgsql(connString);
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            
            app.UseMiddleware<ExceptionMiddleware>();

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors(policy => policy.AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials()
            .WithOrigins("https://localhost:4200")); 

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<PresenceHub>("hubs/presence");
                endpoints.MapHub<MessageHub>("hubs/message");
                endpoints.MapFallbackToController("Index", "Fallback");
            });
        }
    }
}
