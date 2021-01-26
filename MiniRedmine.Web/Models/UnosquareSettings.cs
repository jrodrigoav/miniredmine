using System.Collections.Generic;

namespace MiniRedmine.Web.Models
{
    public class UnosquareLeads : List<TeamLead> { }

    public class TeamLead
    {
        public string Name { get; init; }
        public int UserId { get; init; }
    }
}
