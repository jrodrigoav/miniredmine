using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace MiniRedmine.Web.ViewModels
{
    public abstract class CreateTimeEntryViewModel
    {
        [Required, JsonPropertyName("spent_on")]
        public string SpentOn { get; set; }

        [Required, JsonPropertyName("activity")]
        public int ActivityId { get; set; }
        
        [Required, JsonPropertyName("hours")]
        public double Hours { get; set; }
        
        [Required, StringLength(255), JsonPropertyName("comments")]
        public string Comments { get; set; }

    }

    public class CreateIssueTimeEntryViewModel : CreateTimeEntryViewModel
    {
        [JsonPropertyName("issue")]
        public int IssueId { get; set; }

        internal Models.Redmine.CreateIssueTimeEntry ToTimeEntry()
        {
            return new Models.Redmine.CreateIssueTimeEntry
            {
                ActivityId = ActivityId,
                Comments = Comments,
                Hours = Hours,
                IssueId = IssueId,
                SpentOn = SpentOn
            };
        }
    }

    public class CreateProjectTimeEntryViewModel : CreateTimeEntryViewModel
    {
        [JsonPropertyName("project")]
        public int ProjectId { get; set; }

        internal Models.Redmine.CreateProjectTimeEntry ToTimeEntry()
        {
            return new Models.Redmine.CreateProjectTimeEntry
            {
                ActivityId = ActivityId,
                Comments = Comments,
                Hours = Hours,
                ProjectId = ProjectId,
                SpentOn = SpentOn
            };
        }
    }
}
