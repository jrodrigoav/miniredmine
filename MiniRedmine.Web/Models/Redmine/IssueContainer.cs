using Newtonsoft.Json;

namespace MiniRedmine.Web.Models.Redmine
{
    public class IssueContainer
    {
        [JsonProperty(PropertyName = "issue")]
        public Issue Issue { get; set; }
    }
}