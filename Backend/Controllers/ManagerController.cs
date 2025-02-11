using LMS.Models.Repository;
using Microsoft.AspNetCore.Mvc;

namespace LMS.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ManagerController : Controller
    {
        private readonly EmployeeRepository employeeRepository;
        private readonly SkillAssessmentRepository skillAssessmentRepository;

        public ManagerController(EmployeeRepository employeeRepository, SkillAssessmentRepository skillAssessmentRepository)
        {
            this.employeeRepository = employeeRepository;
            this.skillAssessmentRepository = skillAssessmentRepository;
        }

        [HttpGet("GetMyTeam")]
        public IActionResult GetMyTeam(int ManagerId)
        {
            return Ok(employeeRepository.GetMyTeam(ManagerId));
        }

        [HttpGet("GetMyTeamWithPendingSkillAssessment")]
        public IActionResult GetMyTeamWithPendingSkillAssessment(int ManagerId)
        {
            return Ok(employeeRepository.GetMyTeamWithPendingSkillAssessment(ManagerId));
        }

        [HttpPut("UpdateStatus")]
        public IActionResult UpdateSkillAssessmentStatus([FromQuery] int employeeId, [FromQuery] string status)
        {
            try
            {
                skillAssessmentRepository.UpdateSkillAssessmentStatus(employeeId, status);
                return Ok("Skill assessment status updated successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}
