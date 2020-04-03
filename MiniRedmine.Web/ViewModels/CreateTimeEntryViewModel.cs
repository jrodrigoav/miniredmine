using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace MiniRedmine.Web.ViewModels
{
    public class CreateTimeEntryViewModel
    {
        public long Id { get; set; }
        [Required, JsonPropertyName("IssueId")]
        public int IssueId { get; set; }
        [Required, JsonPropertyName("ActivityId")]
        public int ActivityId { get; set; }
        [Required, JsonPropertyName("Hours")]
        public double Hours { get; set; }
        [Required, StringLength(255)]
        public string Comments { get; set; }
    }
}
