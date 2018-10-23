using Microsoft.AspNetCore.Mvc;
using MiniRedmine.Web.Clients;
using MiniRedmine.Web.Models;
using MiniRedmine.Web.Models.Redmine;
using MiniRedmine.Web.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniRedmine.Web.Controllers
{
    [ApiController, Route("api/redmine")]
    public class RedmineController : Controller
    {
        private readonly RedmineClient _client;
        private readonly UserTemplateService _userTemplateService;

        public RedmineController(RedmineClient client, UserTemplateService userTemplateService)
        {
            _client = client;
            _userTemplateService = userTemplateService;
        }

        [HttpGet("info")]
        public async Task<IActionResult> GetUserInfo([FromHeader(Name = "X-ApiKey")]string apiKey, [FromHeader(Name = "X-IssueId")]string issueId, [FromServices]CustomerService customerService)
        {
            if (string.IsNullOrWhiteSpace(apiKey) || string.IsNullOrWhiteSpace(issueId)) return BadRequest("Invalid information");
            var issue = await _client.GetIssue(apiKey, issueId);
            if (issue != null)
            {
                customerService.AddOrUpdateCustomer(issue.Assigned_to.Id, HttpContext?.Connection?.RemoteIpAddress?.ToString());
            }
            return Json(issue);
        }

        [HttpGet("timeentries")]
        public async Task<IActionResult> GetTimeEntries([FromHeader(Name = "X-ApiKey")]string apiKey, [FromHeader(Name = "X-UserId")]string userId)
        {
            if (string.IsNullOrWhiteSpace(apiKey) || string.IsNullOrWhiteSpace(userId)) return BadRequest("Invalid information");

            var date = DateTime.Now;
            string period = "1";
            if (date.Day > 15)
            {
                period = "2";
            }
            var entriesContainer = await _client.GetTimeEntries(apiKey, userId, period);
            var activitiesContainer = await _client.GetTimeEntriesActivities(apiKey);
            var templates = _userTemplateService.GetUserTemplates(int.Parse(userId));

            return Json(new { entries = BuildTimeEntryRows(entriesContainer.Time_entries, activitiesContainer.Time_entry_activities, templates), activities = activitiesContainer.Time_entry_activities });
        }

        [HttpPost("timeentries")]
        public async Task<IActionResult> CreateTimeEntry([FromHeader(Name = "X-ApiKey")]string apiKey, [FromHeader(Name = "X-IssueId")]string issueId, CreateTimeEntryViewModel model)
        {
            if (string.IsNullOrWhiteSpace(apiKey) || string.IsNullOrWhiteSpace(issueId)) return BadRequest("Invalid information");

            model.IssueId = int.Parse(issueId);
            var result = await _client.CreateTimeEntry(apiKey, model);

            return Json(result.Time_entry);
        }

        [HttpGet("templates")]
        public IActionResult GetTemplates([FromHeader(Name = "X-UserId")]string userId)
        {
            if (string.IsNullOrWhiteSpace(userId)) return BadRequest("Invalid information");

            var result = _userTemplateService.GetUserTemplates(int.Parse(userId));

            return Json(result);
        }

        [HttpPost("templates")]
        public IActionResult CreateTemplates([FromHeader(Name = "X-UserId")]string userId, CreateUserTemplateViewModel template)
        {
            if (string.IsNullOrWhiteSpace(userId)) return BadRequest("Invalid information");

            _userTemplateService.AddUserTemplate(int.Parse(userId), template);

            return Ok();
        }

        [HttpDelete("templates/{templateId}")]
        public IActionResult DeleteTemplate([FromHeader(Name = "X-UserId")]string userId, Guid templateId)
        {
            if (string.IsNullOrWhiteSpace(userId)) return BadRequest("Invalid information");

            _userTemplateService.DeleteTemplate(templateId, int.Parse(userId));

            return NoContent();
        }

        private IEnumerable<TimeEntryViewModel> BuildTimeEntryRows(IEnumerable<TimeEntry> userEntries, IEnumerable<Activity> activities, IEnumerable<UserTemplateViewModel> templates)
        {
            var currentDate = DateTime.Now.Date;
            var day = currentDate.Day;
            var month = currentDate.Month;
            var year = currentDate.Year;
            var startDate = new DateTime(year, month, 1);
            var endDate = new DateTime(year, month, 15);
            if (currentDate.Day > 15)
            {
                startDate = startDate.AddDays(15);
                endDate = endDate.AddDays(-14).AddMonths(1).AddDays(-1);
            }
            currentDate = startDate;
            var fakeId = -1;
            var result = new List<TimeEntryViewModel>();
            var developmentActivity = activities.FirstOrDefault(s => s.Name == "Development");

            foreach (var item in userEntries)
            {
                result.Add(new TimeEntryViewModel(item));
            }
            var orderedResult = result.OrderByDescending(r => r.SpentOn).ThenByDescending(r => r.Id);
            while (currentDate <= endDate)
            {
                if (currentDate.Day <= day)
                {
                    var spentOnDate = currentDate.ToString("yyy-MM-dd");

                    if (!orderedResult.Any(s => s.SpentOn == spentOnDate) && currentDate.DayOfWeek != DayOfWeek.Saturday && currentDate.DayOfWeek != DayOfWeek.Sunday)
                    {
                        if (templates?.Any() == true)
                        {
                            foreach (var template in templates)
                            {
                                result.Add(new TimeEntryViewModel
                                {
                                    Id = fakeId--,
                                    ActivityId = template.ActivityId,
                                    //ActivityName = activities.FirstOrDefault(ac=>ac.Id == template.ActivityId)?.Name
                                    Comments = template.Comments,
                                    Hours = template.Hours,
                                    SpentOn = spentOnDate
                                });
                            }
                        }
                        else
                        {
                            if (developmentActivity != null)
                            {
                                result.Add(new TimeEntryViewModel
                                {
                                    Id = fakeId--,
                                    ActivityId = developmentActivity.Id,
                                    ActivityName = developmentActivity.Name,
                                    Hours = 6,
                                    Comments = "PBI Development",
                                    SpentOn = spentOnDate
                                });

                                result.Add(new TimeEntryViewModel
                                {
                                    Id = fakeId--,
                                    ActivityId = developmentActivity.Id,
                                    ActivityName = developmentActivity.Name,
                                    Hours = 1.5,
                                    Comments = "Bug Fixing",
                                    SpentOn = spentOnDate
                                });
                            }

                            var meetingActivity = activities.FirstOrDefault(s => s.Name == "Meeting");
                            if (meetingActivity != null)
                            {
                                result.Add(new TimeEntryViewModel
                                {
                                    Id = fakeId--,
                                    ActivityId = meetingActivity.Id,
                                    ActivityName = meetingActivity.Name,
                                    Hours = 0.5,
                                    Comments = "Daily Scrum",
                                    SpentOn = spentOnDate
                                });
                            }
                        }



                    }
                    var remainingHours = 8 - result.Where(r => r.SpentOn == spentOnDate).Sum(s => s.Hours);
                    if ((remainingHours > 0) && currentDate.DayOfWeek != DayOfWeek.Saturday && currentDate.DayOfWeek != DayOfWeek.Sunday)
                    {
                        result.Add(new TimeEntryViewModel
                        {
                            Id = fakeId--,
                            ActivityId = developmentActivity.Id,
                            ActivityName = developmentActivity.Name,
                            Hours = remainingHours,
                            Comments = "PBI Development",
                            SpentOn = spentOnDate
                        });
                    }
                }
                currentDate = currentDate.AddDays(1);
            }


            return result.OrderByDescending(r => r.SpentOn).ThenByDescending(r => r.Id);
        }


    }
}