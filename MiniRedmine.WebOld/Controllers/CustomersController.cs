using Microsoft.AspNetCore.Mvc;
using MiniRedmine.Web.Services;

namespace MiniRedmine.Web.Controllers
{
    [ApiController, Route("api/customers")]
    public class CustomersController : Controller
    {
        [HttpGet]
        public IActionResult GetCustomers([FromServices]CustomerService customerService)
        {
            return Json(customerService.GetCustomers());
        }
    }
}