using System.Collections.Generic;

namespace MiniRedmine.Web.Models.Redmine
{

    public class TimeEntriesContainer
    {
        public List<TimeEntry> Time_entries { get; set; }
        public int Total_count { get; set; }
        public int Offset { get; set; }
        public int Limit { get; set; }
    }
}
