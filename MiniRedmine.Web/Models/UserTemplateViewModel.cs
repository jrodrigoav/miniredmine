using System;
using MiniRedmine.Web.DbModels;

namespace MiniRedmine.Web.Models
{
    public class UserTemplateViewModel
    {
        public UserTemplateViewModel(UserTemplate template)
        {
            Id = template.Id;
            ActivityId = template.ActivityId;
            Comments = template.Comments;
            Hours = template.Hours;
        }

        public Guid Id { get; }
        public int ActivityId { get; }
        public string Comments { get; }
        public double Hours { get; }
    }
}