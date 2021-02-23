using System.Linq;

namespace MiniRedmine.Web.Models
{
    public class UnosquareSettings
    {
        public string Leads { get; init; }
        public int[] LeadIds => Leads.Split(",").Select(k => int.Parse(k)).ToArray();
    }
}
