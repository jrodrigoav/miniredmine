using Newtonsoft.Json;
using System;

namespace MiniRedmine.Web.Models.Redmine
{
    public class TimeEntry
    {
        [JsonProperty("id")]
        public int Id { get; set; }
        [JsonProperty("project")]
        public IdNameBase Project { get; set; }
        [JsonProperty("issue")]
        public IdNameBase Issue { get; set; }
        [JsonProperty("user")]
        public IdNameBase User { get; set; }
        [JsonProperty("activity")]
        public Activity Activity { get; set; }
        [JsonProperty("hours")]
        public double Hours { get; set; }
        [JsonProperty("comments")]
        public string Comments { get; set; }
        [JsonProperty("spent_on")]
        public string SpentOn { get; set; }
        [JsonProperty("created_on")]
        public DateTime CreatedOn { get; set; }
        [JsonProperty("updated_on")]
        public DateTime UpdatedOn { get; set; }
    }
}
