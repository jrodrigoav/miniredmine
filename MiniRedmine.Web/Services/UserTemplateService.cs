using MiniRedmine.Web.DbModels;
using MiniRedmine.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MiniRedmine.Web.Services
{
    public class UserTemplateService
    {
        private readonly RedmineUDB4Context _dbContext;

        public UserTemplateService(RedmineUDB4Context context)
        {
            _dbContext = context;
        }

        public IEnumerable<UserTemplateViewModel> GetUserTemplates(int userId)
        {
            var templates = _dbContext.UserTemplates.Where(ut => ut.UserId == userId).ToList();
            var result = new List<UserTemplateViewModel>();
            foreach (var item in templates)
            {
                result.Add(new UserTemplateViewModel(item));
            }
            return result;
        }

        public void AddUserTemplate(int userId, CreateUserTemplateViewModel model)
        {
                var newTemplate = new UserTemplate(userId)
                {
                    ActivityId = model.ActivityId,
                    Comments = model.Comments,
                    Hours = model.Hours
                };
            _dbContext.Add(newTemplate);
            _dbContext.SaveChanges();
        }

        public void DeleteTemplate(Guid templateId, int userId)
        {
            var item = _dbContext.UserTemplates.Find(templateId, userId);
            if(item!= null)
            {
                _dbContext.UserTemplates.Remove(item);
                _dbContext.SaveChanges();
            }
        }
    }
}