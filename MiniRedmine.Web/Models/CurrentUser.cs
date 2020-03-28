using System;
using System.Text.Json.Serialization;

namespace MiniRedmine.Web.Models
{
    public class CurrentUserContainer
    {
        [JsonPropertyName("user")]
        public CurrentUser User { get; set; }
    }

    public class CurrentUser
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("login")]
        public string Login { get; set; }
        [JsonPropertyName("firstname")]
        public string FirstName { get; set; }
        [JsonPropertyName("lastname")]
        public string LastName { get; set; }
        [JsonPropertyName("created_on")]
        public DateTime CreatedOn { get; set; }
        [JsonPropertyName("last_login_on")]
        public DateTime? LastLoginOn { get; set; }
        [JsonPropertyName("api_key")]
        public string ApiKey { get; set; }
    }
}
