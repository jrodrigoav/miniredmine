$olddir=${PWD};
Set-Location -Path MiniRedmine.Web;
[xml]$project=Get-Content -Path MiniRedmine.Web.csproj;
$tag=$project.Project.PropertyGroup.Version;
Set-Location -Path $olddir;
docker build --tag jrodrigoav/miniredmine:$tag --file devops/Miniredmine.dockerfile .;
docker push jrodrigoav/miniredmine:$tag;