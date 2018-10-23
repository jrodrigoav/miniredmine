using MiniRedmine.Models.Redmine;
using MiniRedmine.Web.Models;
using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace MiniRedmine.Web.Clients
{
    public class RedmineClient
    {
        //054ec0d4d33e09af643da08fefef6a9611a75efe
        private readonly HttpClient _client;

        public RedmineClient(HttpClient client)
        {
            _client = client;
        }

        public async Task<TimeEntriesContainer> GetTimeEntries(string apiKey, string userId, string period)
        {
            var month = DateTime.Now.Month;
            var year = DateTime.Now.Year;
            StringBuilder queryString = new StringBuilder();
            queryString.Append($"time_entries.json?key={apiKey}&user_id={userId}&limit=100");
            if (period == "1")
            {
                queryString.Append($"&spent_on=><{year}-{month:D2}-01|{year}-{month:D2}-15");
            }
            else if (period == "2")
            {
                var lastDay = new DateTime(year, month, 1).AddMonths(1).AddDays(-1);
                queryString.Append($"&spent_on=><{year}-{month:D2}-16|{year}-{month:D2}-{lastDay.Day}");
            }
            var entries = await _client.GetStringAsync(queryString.ToString());

            return Newtonsoft.Json.JsonConvert.DeserializeObject<TimeEntriesContainer>(entries);
        }

        public Task<Issue> GetIssue(string apiKey, string issueId)
        {
            return GetIssue(apiKey,int.Parse(issueId));
        }
        public async Task<Issue> GetIssue(string apiKey, int issueId)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append($"issues/{issueId}.json?key={apiKey}");

            var activities = await _client.GetStringAsync(queryString.ToString());

            var container = Newtonsoft.Json.JsonConvert.DeserializeObject<IssueContainer>(activities);
            return container.Issue;
        }

        public async Task<ActivitiesContainer> GetTimeEntriesActivities(string apiKey)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append($"enumerations/time_entry_activities.json?key={apiKey}");

            var activities = await _client.GetStringAsync(queryString.ToString());

            return Newtonsoft.Json.JsonConvert.DeserializeObject<ActivitiesContainer>(activities);
        }

        public async Task<CreatedTimeEntryResult> CreateTimeEntry(string apiKey, CreateTimeEntryViewModel model)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append($"time_entries.json?key={apiKey}");

            object timeEntry = new
            {
                time_entry = new
                {
                    issue_id = model.IssueId,
                    activity_id = model.ActivityId,
                    hours = model.Hours,
                    spent_on = model.SpentOn.ToString("yyyy-MM-dd"),
                    comments = model.Comments
                }
            };
            var responseMessage = await _client.PostAsJsonAsync(queryString.ToString(), timeEntry);

            responseMessage.EnsureSuccessStatusCode();

            return await responseMessage.Content.ReadAsAsync<CreatedTimeEntryResult>();
        }
    }
}