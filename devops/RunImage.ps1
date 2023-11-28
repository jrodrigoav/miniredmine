$redmineurl=Read-Host -Prompt "Redmine URL";
docker container stop miniredmine;
docker container rm miniredmine;
docker run --detach --publish 62474:80 --env Unosquare__RedmineUrl=$redmineurl --env ASPNETCORE_ENVIRONMENT="Development" --name miniredmine jrodrigoav/miniredmine:2.6.1