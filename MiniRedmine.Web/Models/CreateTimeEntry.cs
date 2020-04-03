using Newtonsoft.Json;

namespace MiniRedmine.Web.Models
{
    public class CreateTimeEntryContainer
    {
        [JsonProperty(PropertyName = "time_entry")]
        public CreateTimeEntry TimeEntry { get; set; } = new CreateTimeEntry();
    }

    public class CreateTimeEntry
    {
        [JsonProperty(PropertyName = "issue_id")]
        public int IssueId { get; set; }
        [JsonProperty(PropertyName = "activity_id")]
        public int ActivityId { get; set; }
        [JsonProperty(PropertyName = "hours")]
        public double Hours { get; set; }
        [JsonProperty(PropertyName = "spent_on")]
        public string SpentOn { get; set; }
        [JsonProperty(PropertyName = "comments")]
        public string Comments { get; set; }
    }
}
