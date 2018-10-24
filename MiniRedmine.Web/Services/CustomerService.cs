using MiniRedmine.Web.DbModels;
using MiniRedmine.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MiniRedmine.Web.Services
{
    public class CustomerService
    {
        private readonly RedmineUDB4Context _dbContext;

        public CustomerService(RedmineUDB4Context context)
        {
            _dbContext = context;
        }

        public IEnumerable<CustomerViewModel> GetCustomers() => _dbContext.Customers.Select(c=> new CustomerViewModel(c));
        public void AddOrUpdateCustomer(int userId, string ipAddress)
        {
            var customer =_dbContext.Customers.FirstOrDefault(s=>s.UserId==userId && s.IpAddress == ipAddress);
            if(customer == null)
            {
                customer =new Customer
                {
                    UserId=userId,
                    IpAddress=ipAddress
                };
                _dbContext.Customers.Add(customer);
            }
            else
            {
                customer.LastAccess = DateTime.UtcNow;
                _dbContext.Update(customer);
            }
            _dbContext.SaveChanges();
        }
    }
}