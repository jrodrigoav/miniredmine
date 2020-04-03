using System.Text.Json.Serialization;

namespace MiniRedmine.Web.Models
{
    public abstract class TimeEntryElement
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("name")]
        public string Name { get; set; }
    }
}
