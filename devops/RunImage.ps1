$leads="-3,-2,-1,0";
docker run --detach --publish 62474:80 --env UNOSQUARE__LEADS=$leads --env ASPNETCORE_ENVIRONMENT="Production" jrodrigoav/miniredmine:2.4.1