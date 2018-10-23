using MiniRedmine.Web.Models.Redmine;

namespace MiniRedmine.Web.Models
{
    public class TimeEntryViewModel
    {
        public int Id { get; set; }                        
        public int ActivityId { get; set; }
        public string ActivityName { get; set; }
        public double Hours { get; set; }
        public string Comments { get; set; }
        public string SpentOn { get; set; }

        public TimeEntryViewModel()
        {

        }

        public TimeEntryViewModel(TimeEntry entry)
        {
            Id = entry.Id;
            ActivityId = entry.Activity.Id;
            ActivityName = entry.Activity.Name;
            Hours = entry.Hours;
            Comments = entry.Comments;
            SpentOn = entry.Spent_on;
        }
    }
}
