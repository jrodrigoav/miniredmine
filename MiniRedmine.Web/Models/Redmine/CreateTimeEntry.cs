using System.Text.Json.Serialization;

namespace MiniRedmine.Web.Models.Redmine
{
    public class CreateTimeEntryContainer<T> where T : class
    {
        [JsonPropertyName("time_entry")]
        public T TimeEntry { get; set; } = null!;
    }

    public abstract class CreateTimeEntry
    {
        [JsonPropertyName("activity_id")]
        public int ActivityId { get; set; }

        [JsonPropertyName("hours")]
        public double Hours { get; set; }

        [JsonPropertyName("spent_on")]
        public string SpentOn { get; set; }

        [JsonPropertyName("comments")]
        public string Comments { get; set; }
    }

    public class CreateProjectTimeEntry : CreateTimeEntry
    {
        [JsonPropertyName("project_id")]
        public int ProjectId { get; set; }
    }

    public class CreateIssueTimeEntry : CreateTimeEntry
    {
        [JsonPropertyName("issue_id")]
        public int IssueId { get; set; }

    }
}
