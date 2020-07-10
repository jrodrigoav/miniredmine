using System.Text.Json.Serialization;

namespace MiniRedmine.Web.Models.Redmine
{
    public class CreateTimeEntryResult
    {
        [JsonPropertyName("time_entry")]
        public TimeEntry TimeEntry { get; set; }
    }
}
