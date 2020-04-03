using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace MiniRedmine.Web.ViewModels
{
    public class CreateTimeEntryViewModel
    {
        public long Id { get; set; }
        [Required, JsonProperty("IssueId")]
        public int IssueId { get; set; }
        [Required, JsonProperty("ActivityId")]
        public int ActivityId { get; set; }
        [Required, JsonProperty("Hours")]
        public double Hours { get; set; }
        [Required, StringLength(255)]
        public string Comments { get; set; }
    }
}
