using System.Text.Json.Serialization;

namespace MiniRedmine.Web.Models.Redmine
{
    public class Activity : IdNameBase
    {
        [JsonPropertyName("is_default")]
        public bool IsDefault { get; set; }
    }
}
