using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using MiniRedmine.Web.Models;
using System;
using System.Linq;

namespace MiniRedmine.Web.Helpers
{
    public static class SessionExtensions
    {
        private const string SESSION_KEY = "UserInformation";
        
        public static UserInformation GetUserInformation(this ISession session)
        {
            if (!session.Keys.Contains(SESSION_KEY)) return null;
            return JsonConvert.DeserializeObject<UserInformation>(session.GetString(SESSION_KEY));
        }

        public static void SetUserInformation(this ISession session, UserInformation model)
        {
            session.SetString(SESSION_KEY, JsonConvert.SerializeObject(model));
        }        
    }
}
