using Newtonsoft.Json;
using System.Collections.Generic;

namespace MiniRedmine.Web.Models
{
    public class TimeEntryActivitiesContainer
    {
        [JsonProperty("time_entry_activities")]
        public IEnumerable<TimeEntryActivity> TimeEntryActivites { get; set; }
    }
}
