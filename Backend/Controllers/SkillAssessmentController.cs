using LMS.Models;
using LMS.Models.Repository;
using Microsoft.AspNetCore.Mvc;

namespace LMS.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SkillAssessmentController : Controller
    {
        private readonly SkillAssessmentRepository skillAssessmentRepository;

        public SkillAssessmentController(SkillAssessmentRepository skillAssessmentRepository)
        {
            this.skillAssessmentRepository = skillAssessmentRepository;
        }

        [HttpGet("{empId}")]
        public IActionResult GetByEmployeeId(int empId)
        {
            return Ok(skillAssessmentRepository.GetByEmployeeId(empId));
        }

        [HttpPost]
        public IActionResult CreateSkillAssessment(SkillAssessment skillAssessment)
        {
            var id = skillAssessment.EmployeeId;
            var existingSkillAssessment = skillAssessmentRepository.GetByEmployeeId(id);
            if (existingSkillAssessment == null)
            {
                skillAssessmentRepository.CreateSkillAssessment(skillAssessment);
                return CreatedAtAction(nameof(GetByEmployeeId), new { empId = skillAssessment.EmployeeId }, skillAssessment);
            }
            else
            {
                UpdateSkillAssessment(skillAssessment);
                return Ok();
               
            }
        }

        [HttpPut]
        public IActionResult UpdateSkillAssessment(SkillAssessment skillAssessment)
        {
            int employeeId = skillAssessment.EmployeeId;
            if (skillAssessmentRepository.GetByEmployeeId(employeeId) != null)
            {
                skillAssessmentRepository.UpdateSkillAssessment(employeeId, skillAssessment);
                return Ok(skillAssessment);
            }
            return NotFound();
        }

        [HttpDelete]
        public IActionResult DeleteSkillAssesment([FromQuery] int empId)
        {
            var skillAssessment = skillAssessmentRepository.GetByEmployeeId(empId);
            if (skillAssessment != null)
            {
                skillAssessmentRepository.DeleteSkillAssessment(skillAssessment);
                return Ok();
            }
            return NotFound();
        }
    }
}
