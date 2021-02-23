using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MiniRedmine.Web.Models;
using MiniRedmine.Web.Models.Redmine;
using MiniRedmine.Web.Services;
using MiniRedmine.Web.ViewModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MiniRedmine.Web.Controllers
{
    [Route("api/redmine"), ApiController]
    public class RedmineController : ControllerBase
    {
        private readonly RedmineHttpService _redmineHttpService;

        public RedmineController(RedmineHttpService redmineHttpService)
        {
            _redmineHttpService = redmineHttpService;
        }

        [HttpGet("userinfo")]
        public async Task<IActionResult> GetCurrentUserAsync([FromHeader(Name = "Redmine-Key")] string userApiKey)
        {
            if (string.IsNullOrWhiteSpace(userApiKey)) return BadRequest(new { Message = "Try again" });
            var result = await _redmineHttpService.GetCurrentUserAsync(userApiKey);
            return Ok(result);
        }

        [HttpGet("issue/{issueId}")]
        public async Task<IActionResult> GetIssueAsync([FromRoute, Range(0, 999999)] int issueId, [FromHeader(Name = "Redmine-Key")] string userApiKey)
        {
            if (string.IsNullOrWhiteSpace(userApiKey)) return BadRequest(new { Message = "Try again" });
            var result = await _redmineHttpService.GetIssueAsync(userApiKey, issueId);
            return Ok(result);
        }

        [HttpGet("timeentryactivities")]
        public async Task<IActionResult> GetTimeEntryActivitiesASync([FromHeader(Name = "Redmine-Key")] string userApiKey)
        {
            if (string.IsNullOrWhiteSpace(userApiKey)) return BadRequest(new { Message = "Try again" });
            var result = await _redmineHttpService.GetTimeEntryActivitiesASync(userApiKey);
            return Ok(result);
        }

        [HttpGet("timeentries")]
        public async Task<IActionResult> GetTimeEntriesAsync([FromHeader(Name = "Redmine-Key")] string userApiKey, [FromQuery] int userId, [FromQuery] string from, [FromQuery] string to)
        {
            if (string.IsNullOrWhiteSpace(userApiKey)) return BadRequest(new { Message = "Try again" });
            if (userId == 0) return BadRequest(new { Message = "Try again" });
            if (string.IsNullOrWhiteSpace(from)) return BadRequest(new { Message = "Try again" });
            if (string.IsNullOrWhiteSpace(to)) return BadRequest(new { Message = "Try again" });
            var result = await _redmineHttpService.GetTimeEntriesAsync(userApiKey, userId, from, to);

            return Ok(result);
        }

        [HttpPost("timeentries")]
        public async Task<IActionResult> CreateTimeEntriesAsync([FromHeader(Name = "Redmine-Key")] string userApiKey, [FromBody] CreateTimeEntryViewModel newTimeEntry)
        {
            await _redmineHttpService.GetCurrentUserAsync(userApiKey);
            return Created("", await _redmineHttpService.CreateTimeEntriesAsync(userApiKey, newTimeEntry.ConvertToCreateTimeEntry()));
            /*var timeEntry = new TimeEntry
            {
                Activity = new Activity { Name = "Created", Id = newTimeEntry.ActivityId },
                Id = new Random().Next(99990000, 99999999),
                Comments = newTimeEntry.Comments,
                Hours = newTimeEntry.Hours,
                Issue = new IdNameBase { Name = "Created", Id = newTimeEntry.IssueId },
                Project = new IdNameBase { Name = "Test Project", Id = 1 },
                SpentOn = newTimeEntry.SpentOn
            };
            return Created("", timeEntry);*/
        }

        [HttpGet("leads")]
        public IActionResult GetLeads([FromServices] IOptionsMonitor<UnosquareSettings> optionsMonitor) => Ok(optionsMonitor.CurrentValue.LeadIds);

        [HttpPost("teamtimeentries")]
        public async Task<IActionResult> GetTimeTimeEntries([FromHeader(Name = "Redmine-Key")] string userApiKey, [FromForm] GetTeamTimeEntriesViewModel model, [FromServices] IOptionsMonitor<UnosquareSettings> optionsMonitor)
        {
            if (string.IsNullOrWhiteSpace(userApiKey)) return BadRequest(new { Message = "Try again" });
            if (model.TeamMembers.Length == 0) return BadRequest(new { Message = "Try again" });
            var currentUser = await _redmineHttpService.GetCurrentUserAsync(userApiKey);
            if (optionsMonitor.CurrentValue.LeadIds.Contains(currentUser.Id))
            {
                var teamIds = model.TeamMembers.Append(currentUser.Id);
                var entries = new List<TimeEntry>();
                foreach (var userId in teamIds)
                {
                    var userEntries = await _redmineHttpService.GetTimeEntriesAsync(userApiKey, userId, model.From, model.To);
                    if (userEntries?.Any() == true)
                    {
                        entries.AddRange(userEntries);
                    }
                }
                var projects = entries.Select(s => s.Project.Id).Distinct();
                var result = new System.Collections.Concurrent.ConcurrentBag<TeamEntriesReport>();
                Parallel.ForEach(projects, p =>
                {
                    var proj = entries.First(r => r.Project.Id == p);

                    var memberEntries = entries.Where(k => k.Project.Id == p).GroupBy(j => j.Issue.Id).Select(r => new MemberHours { IssueId = r.Key, Issue = r.First().Issue.Name, Name = r.First().User.Name, Hours = r.Sum(h => h.Hours) });
                    var report = new TeamEntriesReport { Project = proj.Project.Name, ProjectId = p, MemberHours = memberEntries };
                    result.Add(report);
                });
                return Ok(result.ToList());
            }

            return Forbid();
        }

    }
}