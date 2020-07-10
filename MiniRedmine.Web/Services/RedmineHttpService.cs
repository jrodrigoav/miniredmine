using MiniRedmine.Web.Models.Redmine;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;

namespace MiniRedmine.Web.Services
{
    public class RedmineHttpService
    {
        private const string REDMINE_AUTH_HEADER = "X-Redmine-API-Key";
        private readonly HttpClient _httpClient;

        public RedmineHttpService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<CurrentUser> GetCurrentUserAsync(string userApiKey)
        {
            _httpClient.DefaultRequestHeaders.Add(REDMINE_AUTH_HEADER, userApiKey);
            return (await _httpClient.GetFromJsonAsync<CurrentUserContainer>("users/current.json")).User ?? null;
        }

        public async Task<Issue> GetIssueAsync(string userApiKey, int issueId)
        {
            _httpClient.DefaultRequestHeaders.Add(REDMINE_AUTH_HEADER, userApiKey);
            return (await _httpClient.GetFromJsonAsync<IssueContainer>($"issues/{issueId}.json")).Issue ?? null;
        }

        public async Task<IEnumerable<Activity>> GetTimeEntryActivitiesASync(string userApiKey)
        {
            _httpClient.DefaultRequestHeaders.Add(REDMINE_AUTH_HEADER, userApiKey);
            return (await _httpClient.GetFromJsonAsync<TimeEntryActivitiesContainer>("enumerations/time_entry_activities.json")).TimeEntryActivites ?? null;
        }

        public async Task<IEnumerable<TimeEntry>> GetTimeEntriesAsync(string userApiKey, int userId, string from, string to)
        {
            _httpClient.DefaultRequestHeaders.Add(REDMINE_AUTH_HEADER, userApiKey);
            return (await _httpClient.GetFromJsonAsync<TimeEntriesContainer>($"time_entries.json?limit=100&user_id={userId}&from={from}&to={to}")).TimeEntries ?? null;
        }

        public Task<TimeEntry> CreateTimeEntriesAsync(string userApiKey, CreateTimeEntry createTimeEntryViewModel)
        {
            return CreateTimeEntriesAsync(userApiKey, new CreateTimeEntryContainer { TimeEntry = createTimeEntryViewModel });
        }
        public async Task<TimeEntry> CreateTimeEntriesAsync(string userApiKey, CreateTimeEntryContainer createTimeEntryContainer)
        {
            TimeEntry result = null;
            using (var response = await _httpClient.PostAsJsonAsync<CreateTimeEntryContainer>($"time_entries.json?key={userApiKey}", createTimeEntryContainer))
            {
                response.EnsureSuccessStatusCode();
                var createTimeEntryResult = await response.Content.ReadFromJsonAsync<CreateTimeEntryResult>();
                if (createTimeEntryResult is CreateTimeEntryResult)
                {
                    result = createTimeEntryResult.TimeEntry;
                }
            }
            return result;
        }
    }
}
