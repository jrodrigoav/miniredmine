using System.Collections.Generic;

namespace MiniRedmine.Web.ViewModels
{
    public class TeamEntriesReport
    {
        public int ProjectId { get; init; }
        public string Project { get; init; }
        public IEnumerable<MemberHours> MemberHours { get; init; }

    }

    public class MemberHours
    {
        public int IssueId { get; init; }
        public string Issue { get; init; }
        public string Name { get; init; }
        public double Hours { get; init; }
    }
}
