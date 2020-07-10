using System.Text.Json.Serialization;

namespace MiniRedmine.Web.Models.Redmine
{
    public class IdNameBase
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("name")]
        public string Name { get; set; }
    }
}
