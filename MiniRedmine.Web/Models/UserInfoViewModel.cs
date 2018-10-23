using System.ComponentModel.DataAnnotations;

namespace MiniRedmine.Web.Models
{
    public class UserInfoViewModel
    {
        [Required]
        public string ApiKey { get; set; }

        [Required]
        public int IssueId { get; set; }

    }
}
