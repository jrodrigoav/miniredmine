using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace MiniRedmine.Web.Models
{
    public class CreateTimeEntryContainer
    {
        [JsonPropertyName("time_entry"), JsonProperty(PropertyName = "time_entry")]
        public CreateTimeEntry TimeEntry { get; set; } = new CreateTimeEntry();
    }

    public class CreateTimeEntry
    {
        [JsonPropertyName("issue_id"), JsonProperty(PropertyName = "issue_id")]
        public int IssueId { get; set; }
        [JsonPropertyName("activity_id"), JsonProperty(PropertyName = "activity_id")]
        public int ActivityId { get; set; }
        [JsonPropertyName("hours"), JsonProperty(PropertyName = "hours")]
        public double Hours { get; set; }
        [JsonPropertyName("spent_on"), JsonProperty(PropertyName = "spent_on")]
        public string SpentOn { get; set; }
        [JsonPropertyName("comments"), JsonProperty(PropertyName = "comments")]
        public string Comments { get; set; }
    }
}
