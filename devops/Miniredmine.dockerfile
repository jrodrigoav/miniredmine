FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /miniredmine-app
COPY Publish .
EXPOSE 80
ENV ASPNETCORE_ENVIRONMENT=Development
ENTRYPOINT ["dotnet", "MiniRedmine.Web.dll"]