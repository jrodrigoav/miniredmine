$leads="-3,-2,-1,0";
$redmineurl="";
docker run --detach --publish 62474:80 --env Unosquare__RedmineUrl=$redmineurl --env Unosquare__Leads=$leads --env ASPNETCORE_ENVIRONMENT="Development" jrodrigoav/miniredmine:2.4.2