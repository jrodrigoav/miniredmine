using System;

namespace MiniRedmine.Web.Models.Redmine
{
    public class TimeEntry
    {
        public int Id { get; set; }
        public Project Project { get; set; }
        public Issue Issue { get; set; }
        public User User { get; set; }
        public Activity Activity { get; set; }
        public double Hours { get; set; }
        public string Comments { get; set; }
        public string Spent_on { get; set; }
        public DateTime Created_on { get; set; }
        public DateTime Updated_on { get; set; }
    }
}
