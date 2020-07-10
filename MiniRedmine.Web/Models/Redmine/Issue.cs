using System.Text.Json.Serialization;

namespace MiniRedmine.Web.Models.Redmine
{
    public class Issue
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("project")]
        public IdNameBase Project { get; set; }

        [JsonPropertyName("assigned_to")]
        public IdNameBase AssignedTo { get; set; }

        [JsonPropertyName("subject")]
        public string Subject { get; set; }

        [JsonPropertyName("description")]
        public string Description { get; set; }

        [JsonPropertyName("start_date")]
        public string StartDate { get; set; }

        [JsonPropertyName("spent_hours")]
        public double SpentHours { get; set; }

        [JsonPropertyName("total_spent_hours")]
        public double TotalSpentHours { get; set; }
    }
}