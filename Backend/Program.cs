using LMS.Models.Repository;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var Configuration = builder.Configuration;

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders =
        ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
}); // To configure Local IP address

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder =>
        {
            builder.WithOrigins("http://localhost:3000", "http://192.168.2.42:3000", "https://rk-lms.netlify.app")
                           .AllowAnyHeader()
                           .AllowAnyMethod()
                           .AllowCredentials();
        });
});

builder.Services.AddScoped<EmployeeRepository>();
builder.Services.AddScoped<SkillAssessmentRepository>();
builder.Services.AddScoped<OtherSkillsRepository>();
builder.Services.AddScoped<AnyOtherForiegnLanguageRepository>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseSwagger();
app.UseSwaggerUI();

app.UseForwardedHeaders();

app.UseHttpsRedirection();

app.UseCors("AllowReactApp");

/*app.Urls.Add("http://0.0.0.0:5002");*/

app.UseAuthorization();

app.MapControllers();

app.Run();
