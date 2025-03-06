using System.Text.Json.Serialization;

namespace MiniRedmine.Web.Models.Redmine
{
    public class ProjectContainer
    {
        [JsonPropertyName("project")]
        public Project Project { get; set; }
    }
}