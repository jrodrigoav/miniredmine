using Microsoft.AspNetCore.Mvc;
using MiniRedmine.Web.Services;
using MiniRedmine.Web.ViewModels;
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
    }
}