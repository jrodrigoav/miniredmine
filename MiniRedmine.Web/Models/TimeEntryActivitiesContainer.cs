using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace MiniRedmine.Web.Models
{
    public class TimeEntryActivitiesContainer
    {
        [JsonPropertyName("time_entry_activities")]
        public IEnumerable<TimeEntryActivity> TimeEntryActivites { get; set; }
    }
}
