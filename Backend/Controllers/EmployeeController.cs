using LMS.Models;
using LMS.Models.Repository;
using Microsoft.AspNetCore.Mvc;

namespace LMS.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeeController : Controller
    {
        private readonly EmployeeRepository employeeRepository;

        public EmployeeController(EmployeeRepository employeeRepository)
        {
            this.employeeRepository = employeeRepository;
        }

        [HttpGet]
        public IActionResult GetAllEmployees()
        {
            return Ok(employeeRepository.GetAllEmployees());
        }

        [HttpGet("{id:int}")]
        public IActionResult GetEmployeesById(int id)
        {
            var Employee = employeeRepository.GetEmployeesById(id);
            if (Employee != null)
            {
                return Ok(Employee);
            }
            return NotFound();
        }

        [HttpGet("GetAllManagers")]
        public IActionResult GetAllManagers()
        {
            var Managers = employeeRepository.GetAllManagers();
            if(Managers != null)
            {
                return Ok(Managers);
            }
            return NotFound();
        }

        [HttpPost]
        public IActionResult AddEmployees([FromBody] List<Employee> employees)
        {
            if (employees == null || !employees.Any())
            {
                return BadRequest("No employees to add.");
            }
            employeeRepository.CreateEmployees(employees);

            return CreatedAtAction(nameof(GetAllEmployees), new { }, employees);
        }

        /*   [HttpPost]
           public IActionResult AddEmployee(Employee employee)
           {
               int employeeId = employee.EmployeeId;
                   employeeRepository.CreateEmployee(employee);
                   return CreatedAtAction(nameof(employeeRepository.GetEmployeesById), new { id = employee.EmployeeId }, employee);            
           }*/

        [HttpPut]
        public IActionResult UpdateEmployee(Employee employee)
        {
            int employeeId = employee.EmployeeId;
            if (employeeRepository.GetEmployeesById(employeeId) != null)
            {
                employeeRepository.UpdateEmployee(employee.EmployeeId, employee);
                return Ok(employee);
            }
            return NotFound();
        }

        [HttpPost("updatePassword")]
        public IActionResult UpdatePassword([FromQuery] int id, [FromQuery] string currentPassword, [FromQuery] string newPassword)
        {
            var employee = employeeRepository.GetEmployeesById(id);
            if (employee != null)
            {
                if (employee.Password.Equals(currentPassword))
                {
                    employeeRepository.ChangePassword(id, newPassword);
                    return Ok();
                }
                else
                {
                    return Unauthorized();
                }
            }
            return NotFound();
        }

        [HttpDelete]
        public IActionResult DeleteEmployee([FromQuery]  int id) 
        {
            var employee = employeeRepository.GetEmployeesById(id);
            if (employee != null)
            {
                employeeRepository.DeleteEmployee(employee);
                return Ok();
            }
            return NotFound();
        }

        [HttpGet("AdvanceSearch")]
        public IActionResult AdvanceSearch([FromQuery]  string skill, [FromQuery] int rating)
        {
            var employees = employeeRepository.AdvanceSearch(skill, rating);
            if(employees != null)
            {
                return Ok(employees);
            }
            return NotFound();
        }

        [HttpPost("ForgotPassword")]
        public IActionResult ForgotPassword([FromQuery] int id, [FromQuery] string email)
        {
            var employee = employeeRepository.GetEmployeesById(id);
            if (employee != null)
            {
                if (employee.EmailId.Equals(email))
                {
                    employeeRepository.SendEmail(id, email);
                    return Ok();
                }
                return Unauthorized();
            }
            return NotFound();
        }

        [HttpPost("ChangePassword")]
        public IActionResult ChangePassword([FromQuery] int id, [FromQuery] string newPassword)
        {
            var employee = employeeRepository.GetEmployeesById(id);
            if (employee != null)
            {
                employeeRepository.ChangePassword(id, newPassword);
                return Ok();
            }
            return NotFound();
        }

    }
}
