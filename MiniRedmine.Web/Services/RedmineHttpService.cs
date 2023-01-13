using Microsoft.Extensions.Options;
using MiniRedmine.Web.Models;
using MiniRedmine.Web.Models.Redmine;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;

namespace MiniRedmine.Web.Services
{
    public class RedmineHttpService
    {
        private const string REDMINE_AUTH_HEADER = "X-Redmine-API-Key";
        private readonly UnosquareSettings _settings;
        private readonly HttpClient _httpClient;

        public RedmineHttpService(HttpClient httpClient,IOptionsMonitor<UnosquareSettings> optionsMonitor)
        {
            _settings = optionsMonitor.CurrentValue;
            _httpClient = httpClient;
            _httpClient.BaseAddress = new System.Uri(_settings.RedmineUrl, System.UriKind.Absolute);
        }

        public async Task<CurrentUser> GetCurrentUserAsync(string userApiKey)
        {
            if (_httpClient.DefaultRequestHeaders.Contains(REDMINE_AUTH_HEADER) == false)
            {
                _httpClient.DefaultRequestHeaders.Add(REDMINE_AUTH_HEADER, userApiKey);
            }
            var container = await _httpClient.GetFromJsonAsync<CurrentUserContainer>("users/current.json");
            if (container?.User is CurrentUser) return container.User;
            return null;
        }

        public async Task<Issue> GetIssueAsync(string userApiKey, int issueId)
        {
            if (_httpClient.DefaultRequestHeaders.Contains(REDMINE_AUTH_HEADER) == false)
            {
                _httpClient.DefaultRequestHeaders.Add(REDMINE_AUTH_HEADER, userApiKey);
            }
            var container = await _httpClient.GetFromJsonAsync<IssueContainer>($"issues/{issueId}.json");
            if (container?.Issue is Issue) return container.Issue;
            return null;
        }

        public async Task<IEnumerable<Activity>> GetTimeEntryActivitiesASync(string userApiKey)
        {
            if (_httpClient.DefaultRequestHeaders.Contains(REDMINE_AUTH_HEADER) == false)
            {
                _httpClient.DefaultRequestHeaders.Add(REDMINE_AUTH_HEADER, userApiKey);
            }
            var container = await _httpClient.GetFromJsonAsync<TimeEntryActivitiesContainer>("enumerations/time_entry_activities.json");
            if (container?.TimeEntryActivites?.Any() == true) return container.TimeEntryActivites;
            return default;
        }

        public async Task<IEnumerable<TimeEntry>> GetTimeEntriesAsync(string userApiKey, int userId, string from, string to)
        {
            if (_httpClient.DefaultRequestHeaders.Contains(REDMINE_AUTH_HEADER) == false)
            {
                _httpClient.DefaultRequestHeaders.Add(REDMINE_AUTH_HEADER, userApiKey);
            }
            var container = await _httpClient.GetFromJsonAsync<TimeEntriesContainer>($"time_entries.json?limit=100&user_id={userId}&from={from}&to={to}");
            return container.TimeEntries;
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
