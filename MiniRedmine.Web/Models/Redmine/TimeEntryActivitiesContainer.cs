using Newtonsoft.Json;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace MiniRedmine.Web.Models.Redmine
{
    public class TimeEntryActivitiesContainer
    {
        [JsonPropertyName("time_entry_activities")]
        public IEnumerable<Activity> TimeEntryActivites { get; set; }
    }
}
