using System.Text.Json.Serialization;

namespace MiniRedmine.Web.Models
{
    public class TimeEntryActivity : TimeEntryElement
    {
        [JsonPropertyName("is_default")]
        public bool IsDefault { get; set; }
    }
}
