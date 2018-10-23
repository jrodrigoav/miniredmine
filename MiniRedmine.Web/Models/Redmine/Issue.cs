using System;

namespace MiniRedmine.Web.Models.Redmine
{
    public class Issue
    {
        public int Id { get; set; }
        public Project Project { get; set; }
        public User Assigned_to { get; set; }
        public string Subject { get; set; }
        public string Description { get; set; }
        public string Start_date { get; set; }
        public int Done_ratio { get; set; }
        public double Spent_hours { get; set; }
        public double Total_spent_hours { get; set; }
        public DateTime Created_on { get; set; }
        public DateTime Updated_on { get; set; }
    }
}
