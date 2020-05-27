using MiniRedmine.Web.Models.Redmine;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace MiniRedmine.Web.ViewModels
{
    public class CreateTimeEntryViewModel
    {
        [Required, JsonProperty("spent_on")]
        public string SpentOn { get; set; }

        [Required, JsonProperty("issue")]
        public int IssueId { get; set; }

        [Required, JsonProperty("activity")]
        public int ActivityId { get; set; }
        
        [Required, JsonProperty("hours")]
        public double Hours { get; set; }
        
        [Required, StringLength(255), JsonProperty("comments")]
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
