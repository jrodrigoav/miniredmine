using System.Text.Json.Serialization;

namespace MiniRedmine.Web.Models.Redmine
{
    public class IssueContainer
    {
        [JsonPropertyName( "issue")]
        public Issue Issue { get; set; }
    }
}