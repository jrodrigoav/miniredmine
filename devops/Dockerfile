FROM node:23.9.0-alpine3.20 AS front
WORKDIR /node_builder/frontend-react
COPY MiniRedmine.Web/frontend-react .
RUN npm install --no-package-lock
RUN npm run build --if-present
FROM mcr.microsoft.com/dotnet/sdk:9.0-alpine3.20 AS publisher
WORKDIR /dotnet_builder
COPY MiniRedmine.Web .
COPY --from=front /node_builder/wwwroot wwwroot
RUN dotnet publish --output ./publish
FROM mcr.microsoft.com/dotnet/aspnet:9.0-alpine3.20
WORKDIR /miniredmine-app
COPY --from=publisher /dotnet_builder/publish .
EXPOSE 80
ENV ASPNETCORE_ENVIRONMENT=Development
ENV ASPNETCORE_HTTP_PORTS=80
ENTRYPOINT ["dotnet", "MiniRedmine.Web.dll"]