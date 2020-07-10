using System.Text.Json.Serialization;

namespace MiniRedmine.Web.Models.Redmine
{
    public class CurrentUserContainer
    {
        [JsonPropertyName("user")]
        public CurrentUser User { get; set; }
    }
}
