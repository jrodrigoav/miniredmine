using System.Text.Json.Serialization;

namespace MiniRedmine.Web.Models.Redmine
{
    public class Project : IdNameBase
    {
        [JsonPropertyName("identifier")]
        public string Identifier { get; set; }
        
        [JsonPropertyName("description")]
        public string Description { get; set; }
    }
}