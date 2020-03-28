using System.Text.Json.Serialization;

namespace MiniRedmine.Web.Models
{
    public class TimeEntryActivity
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("name")]
        public string Name { get; set; }
        [JsonPropertyName("is_default")]
        public bool IsDefault { get; set; }
    }
}
