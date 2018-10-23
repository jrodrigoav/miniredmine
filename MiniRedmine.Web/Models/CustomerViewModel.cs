using System;
using MiniRedmine.Web.DbModels;

namespace MiniRedmine.Web.Models
{
    public class CustomerViewModel
    {
        public CustomerViewModel()
        {

        }

        public CustomerViewModel(Customer customer)
        {
            UserId = customer.UserId;
            LastAccess = customer.LastAccess;
            IpAddress = customer.IpAddress;
        }

        public int UserId { get; set; }
        public DateTime? LastAccess { get; set; }
        public string IpAddress { get; set; }
    }
}