using System;
using System.Text.Json.Serialization;

namespace MiniRedmine.Web.Models
{
    public class TimeEntry
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("project")]
        public TimeEntryProject Project { get; set; }
        [JsonPropertyName("issue")]
        public TimeEntryIssue Issue { get; set; }
        [JsonPropertyName("user")]
        public TimeEntryUser User { get; set; }
        [JsonPropertyName("activity")]
        public TimeEntryActivity Activity { get; set; }
        [JsonPropertyName("hours")]
        public double Hours { get; set; }
        [JsonPropertyName("comments")]
        public string Comments { get; set; }
        [JsonPropertyName("spent_on")]
        public string SpentOn { get; set; }
        [JsonPropertyName("created_on")]
        public DateTime CreatedOn { get; set; }
        [JsonPropertyName("updated_on")]
        public DateTime UpdatedOn { get; set; }
    }
}
