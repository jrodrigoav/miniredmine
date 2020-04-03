using Microsoft.AspNetCore.Mvc;
using MiniRedmine.Web.Models;
using MiniRedmine.Web.Services;
using MiniRedmine.Web.ViewModels;
using System;
using System.Collections.Generic;
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
        public async Task<IActionResult> UserInfoAsync([FromQuery]string userApiKey)
        {
            if (string.IsNullOrWhiteSpace(userApiKey)) return BadRequest(new { Message = "Try again" });
            var result = await _redmineHttpService.GetCurrentUserAsync(userApiKey);
            return Ok(new CurrentUserViewModel(result));
        }

        [HttpGet("timeentryactivities")]
        public async Task<IActionResult> TimeEntryActivitiesAsync([FromQuery]string userApiKey)
        {
            if (string.IsNullOrWhiteSpace(userApiKey)) return BadRequest(new { Message = "Try again" });
            var result = await _redmineHttpService.GetTimeEntryActivitiesASync(userApiKey);
            return Ok(result);
        }

        [HttpGet("timeentries")]
        public async Task<IActionResult> TimeEntriesAsync([FromQuery]string userApiKey, [FromQuery]int userId, [FromQuery]string from, [FromQuery]string to)
        {
            if (string.IsNullOrWhiteSpace(userApiKey)) return BadRequest(new { Message = "Try again" });
            if (userId == 0) return BadRequest(new { Message = "Try again" });
            if (string.IsNullOrWhiteSpace(from)) return BadRequest(new { Message = "Try again" });
            if (string.IsNullOrWhiteSpace(to)) return BadRequest(new { Message = "Try again" });
            var result = await _redmineHttpService.GetTimeEntriesAsync(userApiKey, userId, from, to);
            return Ok(result);
        }

        [HttpPost("timeentries")]
        public async Task<IActionResult> TimeEntriesAsync([FromQuery]string userApiKey, [FromQuery]string spentOn, [FromBody]IEnumerable<CreateTimeEntryViewModel> newTimeEntries)
        {
            if (IsValidTimeEntries(userApiKey, spentOn, newTimeEntries, out List<CreateTimeEntryContainer> createTimeEntries))
            {
                await _redmineHttpService.GetTimeEntryActivitiesASync(userApiKey);
                return Ok(await _redmineHttpService.CreateTimeEntriesAsync(userApiKey, createTimeEntries));
                //return Ok(new List<TimeEntry> { new TimeEntry { Id = DateTime.Now.Millisecond, Comments = "Created", SpentOn = spentOn, Activity = new TimeEntryActivity { Id = 50 }, Issue = new TimeEntryIssue { Id = 50283 } } });
            }
            return BadRequest(ModelState);
        }

        private bool IsValidTimeEntries(string userApiKey, string spentOn, IEnumerable<CreateTimeEntryViewModel> newTimeEntries, out List<CreateTimeEntryContainer> createTimeEntries)
        {
            bool result = false;
            if (!string.IsNullOrWhiteSpace(userApiKey) && !string.IsNullOrWhiteSpace(spentOn) && ModelState.IsValid)
            {
                createTimeEntries = new List<CreateTimeEntryContainer>();
                try
                {
                    foreach (var entry in newTimeEntries)
                    {

                        var createEntry = new CreateTimeEntryContainer
                        {
                            TimeEntry = new CreateTimeEntry
                            {
                                IssueId = entry.IssueId,
                                ActivityId = entry.ActivityId,
                                SpentOn = spentOn,
                                Hours = entry.Hours,
                                Comments = entry.Comments
                            }
                        };
                        createTimeEntries.Add(createEntry);
                    }
                    result = true;

                }
                catch (FormatException) { ModelState.AddModelError("", "Try Again"); }
                catch (OverflowException) { ModelState.AddModelError("", "Try Again"); }
            }
            else
            {
                ModelState.AddModelError("", "Try Again");
                createTimeEntries = null;
            }
            return result;
        }
    }
}