using Newtonsoft.Json;
using System.Collections.Generic;

namespace MiniRedmine.Web.Models
{
    public class TimeEntriesContainer
    {
        [JsonProperty("time_entries")]
        public IEnumerable<TimeEntry> TimeEntries { get; set; }
    }
}
