using Newtonsoft.Json;

namespace MiniRedmine.Web.Models
{
    public class CurrentUserContainer
    {
        [JsonProperty("user")]
        public CurrentUser User { get; set; }
    }
}
