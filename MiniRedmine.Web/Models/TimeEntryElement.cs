using Newtonsoft.Json;

namespace MiniRedmine.Web.Models
{
    public abstract class TimeEntryElement
    {
        [JsonProperty("id")]
        public int Id { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
    }
}
