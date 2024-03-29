﻿using System.Linq;

namespace MiniRedmine.Web.Models
{
    public class UnosquareSettings
    {
        public string RedmineUrl { get; init; }
        public string Leads { get; init; }
        public int[] LeadIds => Leads.Split(",").Select(k => int.Parse(k)).ToArray();
    }
}
