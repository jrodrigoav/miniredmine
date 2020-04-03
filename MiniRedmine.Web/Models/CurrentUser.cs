using Newtonsoft.Json;
using System;

namespace MiniRedmine.Web.Models
{
    public class CurrentUser
    {
        [JsonProperty("id")]
        public int Id { get; set; }
        [JsonProperty("login")]
        public string Login { get; set; }
        [JsonProperty("firstname")]
        public string FirstName { get; set; }
        [JsonProperty("lastname")]
        public string LastName { get; set; }
        [JsonProperty("created_on")]
        public DateTime CreatedOn { get; set; }
        [JsonProperty("last_login_on")]
        public DateTime? LastLoginOn { get; set; }
        [JsonProperty("api_key")]
        public string ApiKey { get; set; }
    }
}
