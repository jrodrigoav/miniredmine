using Newtonsoft.Json;

namespace MiniRedmine.Web.Models.Redmine
{
    public class CurrentUserContainer
    {
        [JsonProperty("user")]
        public CurrentUser User { get; set; }
    }
}
