using Newtonsoft.Json;

namespace MiniRedmine.Web.Models
{
    public class CreateTimeEntryResult
    {
        [JsonProperty("time_entry")]
        public TimeEntry TimeEntry { get; set; }
    }
}
