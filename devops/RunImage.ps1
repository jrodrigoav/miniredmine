$redmineurl="";
docker run --detach --publish 62474:80 --env Unosquare__RedmineUrl=$redmineurl --env ASPNETCORE_ENVIRONMENT="Development" jrodrigoav/miniredmine:2.5.1