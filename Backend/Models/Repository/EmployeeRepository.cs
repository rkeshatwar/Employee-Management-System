using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Net.Mail;
using System.Net;

namespace LMS.Models.Repository
{
    public class EmployeeRepository
    {
        private readonly AppDbContext appDbContext;

        public EmployeeRepository(AppDbContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }


        public IEnumerable<Employee> GetAllEmployees()
        {
            return appDbContext.Employees;
        }

        public Employee GetEmployeesById(int id)
        {
            var employee = appDbContext.Employees.SingleOrDefault(e => e.EmployeeId == id);
            if (employee != null)
            {
                return employee;
            }
            return null;
        }
        public IEnumerable<Employee> GetAllManagers()
        {
            return appDbContext.Employees.Where(e => e.Role == "Manager").ToList();
        }

        public void CreateEmployees(IEnumerable<Employee> employees)
        {
            foreach (var employee in employees)
            {
                appDbContext.Employees.Add(employee);
            }
            appDbContext.SaveChanges();
        }
        /*  internal void CreateEmployee(Employee employee)
          {
              appDbContext.Employees.Add(employee);
              appDbContext.SaveChanges();
          }*/

        public void UpdateEmployee(int employeeId, Employee employee)
        {
            var existingEmployee = GetEmployeesById(employeeId);

            if (existingEmployee != null)
            {
                existingEmployee.EmployeeId = employeeId;
                existingEmployee.FirstName = employee.FirstName;
                existingEmployee.LastName = employee.LastName;
                existingEmployee.Designation = employee.Designation;
                existingEmployee.ReportingManagerId = employee.ReportingManagerId;
                existingEmployee.Gender = employee.Gender;
                existingEmployee.Photo = employee.Photo;
                existingEmployee.DOB = employee.DOB;
                existingEmployee.ContactNumber = employee.ContactNumber;
                existingEmployee.EmailId = employee.EmailId;
                existingEmployee.Address = employee.Address;
                existingEmployee.DateOfJoining = employee.DateOfJoining;
                existingEmployee.TotalExperience = employee.TotalExperience;
                existingEmployee.BachelorDegree = employee.BachelorDegree;
                existingEmployee.BachelorSpecialization = employee.BachelorSpecialization;
                existingEmployee.MasterDegree = employee.MasterDegree;
                existingEmployee.MasterSpecialization = employee.MasterSpecialization;
                existingEmployee.Certification = employee.Certification;
                existingEmployee.Role = employee.Role;
                existingEmployee.Password = employee.Password;
                appDbContext.SaveChanges();
            }

        }

        public void DeleteEmployee(Employee employee)
        {
            appDbContext.Employees.Remove(employee);
            appDbContext.SaveChanges();
        }

        public IEnumerable<Employee> GetMyTeam(int ManagerId)
        {
            return appDbContext.Employees.Where(x => x.ReportingManagerId == ManagerId).ToList();
        }

        public IEnumerable<Employee> GetMyTeamWithPendingSkillAssessment(int managerId)
        {
            var query = from emp in appDbContext.Employees
                        join skill in appDbContext.SkillAssessment
                            on emp.EmployeeId equals skill.EmployeeId
                        where emp.ReportingManagerId == managerId && skill.Status == "Pending"
                        select emp;

            return query.ToList();
        }

        public List<Employee> AdvanceSearch(string skill, int rating)
        {
            var employees = appDbContext.Employees
                  .Join(appDbContext.SkillAssessment,
                        emp => emp.EmployeeId,
                        sa => sa.EmployeeId,
                        (emp, sa) => new { Employee = emp, SkillAssessment = sa })
                  .AsEnumerable() 
                  .Where(s => GetSkillRating(s.SkillAssessment, skill) >= rating)
                  .Select(e => e.Employee)
                  .ToList();


            return employees;
        }

       
        public int GetSkillRating(SkillAssessment skillAssessment, string skill)
        {
            switch (skill.ToLower())
            {
                case "database":
                    return skillAssessment.Database;
                case "programming":
                    return skillAssessment.Programming;
                case "java":
                    return skillAssessment.Java;
                case "csharp":
                    return skillAssessment.CSharp;
                case "python":
                    return skillAssessment.Python;
                case "webdevelopment":
                    return skillAssessment.WebDevelopment;
                case "verbalskills":
                    return skillAssessment.VerbalCommunication;
                case "writtenskills":
                    return skillAssessment.WrittenCommunication;
                case "teamwork":
                    return skillAssessment.Teamwork;
                case "problemsolving":
                    return skillAssessment.ProblemSolving;
                case "descisionmaking":
                    return skillAssessment.DescisionMaking;
                case "leadership":
                    return skillAssessment.Leadership;
                default:
                    return 0;
            }
        }

        public void AddLastLoggedInAndIpAdderss(int id, string ipAddress)
        {
            var employee =  GetEmployeesById(id);
            employee.LastLoggedIn = DateTime.Now;
            employee.CurrentIpAdderss = ipAddress;

            appDbContext.SaveChanges();
        }

        public void SendEmail(int id, string to)
        {
            var subject = "Password Change Request";

            var body = "<html><body>" +
              "<p>Dear User,</p>" +
              "<p>Please click <a href='http://localhost:3000/changePassword/"+id+ "'>here</a> to change your password.</p>" +
              "</body></html>";
            try
            {
               
                string smtpServer = "smtp.gmail.com";
                int smtpPort = 587; 

                using (var client = new SmtpClient(smtpServer, smtpPort))
                {
                    client.EnableSsl = true;

                    client.Credentials = new NetworkCredential("workpro857@gmail.com", "gfsg tell wszc zhuo");

                    using (var message = new MailMessage("workpro857@gmail.com", to, subject, body))
                    {
                        message.IsBodyHtml = true;
                        client.Send(message);
                        Console.WriteLine("Email sent successfully.");
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error sending email: " + ex.Message);
            }
        }

        public void ChangePassword(int id, string newPassword)
        {
            var employee = GetEmployeesById(id);
            employee.Password = newPassword;
            appDbContext.SaveChanges();
        }
    }
}
