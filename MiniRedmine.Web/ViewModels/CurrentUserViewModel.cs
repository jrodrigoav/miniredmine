using MiniRedmine.Web.Models;
using System;

namespace MiniRedmine.Web.ViewModels
{
    public class CurrentUserViewModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Login { get; set; }
        public DateTime? LastLoginOn { get; set; }

        public CurrentUserViewModel()
        {

        }
        public CurrentUserViewModel(CurrentUser currentUser)
        {
            Id = currentUser.Id;
            FirstName = currentUser.FirstName;
            LastName = currentUser.LastName;
            Login = currentUser.Login;
            LastLoginOn = currentUser.LastLoginOn;
        }
    }
}
