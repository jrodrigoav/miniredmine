using Newtonsoft.Json;

namespace MiniRedmine.Web.Models
{
    public class TimeEntryActivity : TimeEntryElement
    {
        [JsonProperty("is_default")]
        public bool IsDefault { get; set; }
    }
}
