using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace MiniRedmine.Web.Models.Redmine
{
    public class TimeEntriesContainer
    {
        [JsonPropertyName("time_entries")]
        public IEnumerable<TimeEntry> TimeEntries { get; set; }
    }
}
