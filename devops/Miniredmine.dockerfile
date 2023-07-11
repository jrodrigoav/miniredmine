FROM node:18.16.1 AS front
WORKDIR /node_builder/FrontEnd
COPY MiniRedmine.Web/FrontEnd .
RUN npm install --force --no-package-lock
RUN npm run publish --if-present
FROM mcr.microsoft.com/dotnet/sdk:7.0-alpine3.18 as publisher
WORKDIR /dotnet_builder
COPY MiniRedmine.Web .
COPY --from=front /node_builder/wwwroot wwwroot
RUN dotnet publish --output ./Publish
FROM mcr.microsoft.com/dotnet/aspnet:7.0-alpine3.18
WORKDIR /miniredmine-app
COPY --from=publisher /dotnet_builder/Publish .
EXPOSE 80
ENV ASPNETCORE_ENVIRONMENT=Development
ENTRYPOINT ["dotnet", "MiniRedmine.Web.dll"]