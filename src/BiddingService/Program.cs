using BiddingService.Consumers;
using MassTransit;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using MongoDB.Driver;
using MongoDB.Entities;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddMassTransit(x =>
{
    x.AddConsumersFromNamespaceContaining<AuctionCreatedConsumer>();
    x.SetEndpointNameFormatter(new KebabCaseEndpointNameFormatter("bids", false));

    x.UsingRabbitMq((context, cfg) =>
    {
        cfg.Host(builder.Configuration["RabbitMq:Host"], "/", h => // h stands for host
        {
            h.Username(builder.Configuration.GetValue("RabbitMq:Username", "guest")); // default username is guest
            h.Password(builder.Configuration.GetValue("RabbitMq:Password", "guest")); // default password is guest
        });
        cfg.ConfigureEndpoints(context);
    });
});
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = builder.Configuration["IdentityServiceUrl"];
        options.RequireHttpsMetadata = false; // We are using http in dev env
        options.TokenValidationParameters.ValidateAudience = false; // We are not validating audience in dev env
        options.TokenValidationParameters.NameClaimType = "username";
    });


var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseAuthorization();

app.MapControllers();

await DB.InitAsync("BidDb", MongoClientSettings.
    FromConnectionString(builder.Configuration.GetConnectionString("BidDbConnection")));

app.Run();
