using Newtonsoft.Json;

namespace MiniRedmine.Web.Models.Redmine
{
    public class Activity : IdNameBase
    {
        [JsonProperty("is_default")]
        public bool IsDefault { get; set; }
    }
}
