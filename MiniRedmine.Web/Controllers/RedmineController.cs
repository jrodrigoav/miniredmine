﻿using Microsoft.AspNetCore.Mvc;
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

    }
}