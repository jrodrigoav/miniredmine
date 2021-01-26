using System.Collections.Generic;

namespace MiniRedmine.Web.Models
{
    public class UnosquareSettings
    {
        public List<TeamLead> Leads { get; init; }
    }

    public class TeamLead
    {
        public string Name { get; init; }
        public int UserId { get; init; }
    }
}
