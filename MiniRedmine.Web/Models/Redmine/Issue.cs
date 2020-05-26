using Newtonsoft.Json;

namespace MiniRedmine.Web.Models.Redmine
{
    public class Issue
    {
        [JsonProperty(PropertyName = "id")]
        public int Id { get; set; }

        [JsonProperty(PropertyName = "project")]
        public IdNameBase Project { get; set; }

        [JsonProperty(PropertyName = "assigned_to")]
        public IdNameBase AssignedTo { get; set; }

        [JsonProperty(PropertyName = "subject")]
        public string Subject { get; set; }

        [JsonProperty(PropertyName = "description")]
        public string Description { get; set; }

        [JsonProperty(PropertyName = "start_date")]
        public string start_date { get; set; }

        [JsonProperty(PropertyName = "spent_hours")]
        public double SpentHours { get; set; }

        [JsonProperty(PropertyName = "total_spent_hours")]
        public double TotalSpentHours { get; set; }
    }
}