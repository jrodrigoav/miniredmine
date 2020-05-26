using Newtonsoft.Json;

namespace MiniRedmine.Web.Models.Redmine
{
    public class CreateTimeEntryResult
    {
        [JsonProperty("time_entry")]
        public TimeEntry TimeEntry { get; set; }
    }
}
