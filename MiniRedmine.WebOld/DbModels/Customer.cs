using System;
using System.ComponentModel.DataAnnotations;

namespace MiniRedmine.Web.DbModels
{
    public class Customer
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public int UserId { get; set; }

        [Required]
        public string IpAddress { get; set; }
        public DateTime CreatedDate { get; set; }
        public Nullable<DateTime> LastAccess { get; set; }

        public Customer()
        {
            Id = Guid.NewGuid();
            CreatedDate = DateTime.UtcNow;
        }
    }
}