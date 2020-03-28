using System;
using System.ComponentModel.DataAnnotations;

namespace MiniRedmine.Web.DbModels
{
    public class UserTemplate
    {
        public Guid Id {get;set;}
        public int UserId {get;set;}
        public int ActivityId {get;set;}

        [Required,StringLength(254)]
        public string Comments {get;set;}

        [Range(0,8)]
        public double Hours{get;set;}
        public UserTemplate()
        {
            Id = Guid.NewGuid();
        }
        public UserTemplate(int userId):this()
        {
            UserId = userId;
        }
    }
}
