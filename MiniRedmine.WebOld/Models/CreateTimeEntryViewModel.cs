using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.ComponentModel.DataAnnotations;

namespace MiniRedmine.Web.Models
{
    public class CreateTimeEntryViewModel
    {
        [Required]
        public int ActivityId { get; set; }

        [Required]
        public DateTime SpentOn { get; set; }

        [BindNever]
        public int IssueId { get; set; }

        [Required]
        public double Hours { get; set; }

        [Required, StringLength(255)]
        public string Comments { get; set; }}
}
