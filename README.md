# MiniRedmine by Crococorn Industries is now provided as a docker image

# Currently hosted on

https://miniredmine.onrender.com

Never forget Heroku free dynos :(

## Current Versions:
- .NET 9
- React 19

## How to run

If you want to pull first do: `docker pull jrodrigoav/miniredmine:2025.3.6`

If you want to pull and run: `docker run --detach --publish 62474:80 --env Unosquare__RedmineUrl=$redmineurl --env ASPNETCORE_ENVIRONMENT="Production" --name miniredmine jrodrigoav/miniredmine:2025.3.6`
