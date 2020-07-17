using MiniRedmine.Web.Models.Redmine;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace MiniRedmine.Web.ViewModels
{
    public class CreateTimeEntryViewModel
    {
        [Required, JsonPropertyName("spent_on")]
        public string SpentOn { get; set; }

        [Required, JsonPropertyName("issue")]
        public int IssueId { get; set; }

        [Required, JsonPropertyName("activity")]
        public int ActivityId { get; set; }
        
        [Required, JsonPropertyName("hours")]
        public double Hours { get; set; }
        
        [Required, StringLength(255), JsonPropertyName("comments")]
        public string Comments { get; set; }

        public CreateTimeEntry ConvertToCreateTimeEntry()
        {
            return new CreateTimeEntry{
                SpentOn = SpentOn,
                IssueId = IssueId,
                ActivityId = ActivityId,
                Comments = Comments,
                Hours = Hours
            };
        }
    }
}
