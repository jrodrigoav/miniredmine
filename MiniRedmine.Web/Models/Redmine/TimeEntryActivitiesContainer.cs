using Newtonsoft.Json;
using System.Collections.Generic;

namespace MiniRedmine.Web.Models.Redmine
{
    public class TimeEntryActivitiesContainer
    {
        [JsonProperty("time_entry_activities")]
        public IEnumerable<Activity> TimeEntryActivites { get; set; }
    }
}
