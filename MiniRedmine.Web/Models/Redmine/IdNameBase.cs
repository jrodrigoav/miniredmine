using Newtonsoft.Json;

namespace MiniRedmine.Web.Models.Redmine
{
    public class IdNameBase
    {
        [JsonProperty("id")]
        public int Id { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
    }
}
