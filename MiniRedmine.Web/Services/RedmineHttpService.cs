using MiniRedmine.Web.Models;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace MiniRedmine.Web.Services
{
    public class RedmineHttpService
    {
        private readonly HttpClient _client;
        private const string REDMINE_AUTH_HEADER = "X-Redmine-API-Key";
        public RedmineHttpService(HttpClient client)
        {
            _client = client;
        }

        public async Task<CurrentUser> GetCurrentUserAsync(string userApiKey)
        {
            CurrentUser result = null;
            _client.DefaultRequestHeaders.Add(REDMINE_AUTH_HEADER, userApiKey);
            using (var response = await _client.GetAsync("users/current.json"))
            {
                response.EnsureSuccessStatusCode();
                result = JsonSerializer.Deserialize<CurrentUserContainer>(await response.Content.ReadAsStringAsync())?.User;
            }
            return result;
        }

        public async Task<IEnumerable<TimeEntryActivity>> GetTimeEntryActivitiesASync(string userApiKey)
        {
            IEnumerable<TimeEntryActivity> result = null;
            _client.DefaultRequestHeaders.Add(REDMINE_AUTH_HEADER, userApiKey);
            using (var response = await _client.GetAsync("enumerations/time_entry_activities.json"))
            {
                response.EnsureSuccessStatusCode();
                result = JsonSerializer.Deserialize<TimeEntryActivitiesContainer>(await response.Content.ReadAsStringAsync())?.TimeEntryActivites;
            }
            return result;
        }
    }
}
