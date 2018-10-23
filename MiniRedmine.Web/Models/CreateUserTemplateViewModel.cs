using System.ComponentModel.DataAnnotations;

namespace MiniRedmine.Web.Models
{
    public class CreateUserTemplateViewModel
    {
        public int ActivityId {get;set;}

        [Required,StringLength(254)]
        public string Comments {get;set;}

        [Range(0,8)]
        public double Hours {get;set;}
    }
}
