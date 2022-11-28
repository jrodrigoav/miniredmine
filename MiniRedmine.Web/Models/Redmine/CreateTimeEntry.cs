using System.Text.Json.Serialization;

namespace MiniRedmine.Web.Models.Redmine
{
    public class CreateTimeEntryContainer
    {
        [JsonPropertyName("time_entry")]
        public CreateTimeEntry TimeEntry { get; set; } = new CreateTimeEntry();
    }

    public class CreateTimeEntry
    {
        [JsonPropertyName("issue_id")]
        public int IssueId { get; set; }
        [JsonPropertyName("activity_id")]
        public int ActivityId { get; set; }
        [JsonPropertyName("hours")]
        public double Hours { get; set; }
        [JsonPropertyName("spent_on")]
        public string SpentOn { get; set; }
        [JsonPropertyName("comments")]
        public string Comments { get; set; }
    }
}
