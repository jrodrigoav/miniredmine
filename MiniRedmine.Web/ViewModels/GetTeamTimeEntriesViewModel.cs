namespace MiniRedmine.Web.ViewModels
{
    public class GetTeamTimeEntriesViewModel
    {
        public string From { get; init; }
        public string To { get; init; }
        public int[] TeamMembers { get; init; }
    }
}
