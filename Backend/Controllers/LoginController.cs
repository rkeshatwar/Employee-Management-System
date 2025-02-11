using LMS.Models;
using LMS.Models.Repository;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Net;

namespace LMS.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : Controller
    {
        private readonly EmployeeRepository employeeRepository;

        public LoginController(EmployeeRepository employeeRepository)
        {
            this.employeeRepository = employeeRepository;
        }

        [HttpPost]
        public IActionResult CheckCredentials (Login login)
        {
            if (login != null)
            {
                int id = login.EmployeeId;

                /*string ipAddress = HttpContext.Connection.RemoteIpAddress.ToString();*/

                /*var hostEntry = Dns.GetHostEntry(Dns.GetHostName());
                string ipAddress = hostEntry.AddressList[1].ToString();*/

                var employee = employeeRepository.GetEmployeesById(id);
                if (employee != null)
                {
                    if (employee.Password == login.password)
                    {
                        employeeRepository.AddLastLoggedInAndIpAdderss(login.EmployeeId, login.ipAddress);
                        return Ok("Authentication successful");
                    }
                    return Unauthorized("InValid Credentials");
                }
            }
                return NotFound();
        }
    }
}
