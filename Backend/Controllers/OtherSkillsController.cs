using LMS.Models.Repository;
using Microsoft.AspNetCore.Mvc;

namespace LMS.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OtherSkillsController : Controller
    {
        private readonly OtherSkillsRepository otherSkillsRepository;

        public OtherSkillsController(OtherSkillsRepository otherSkillsRepository)
        {
            this.otherSkillsRepository = otherSkillsRepository;
        }

        [HttpGet("{id}")]
        public IActionResult GetOtherSkillsByEmployeeId(int empId)
        {
            var otherSkills = otherSkillsRepository.GetOtherSkillsByEmployeeId(empId);
            if (otherSkills != null)
            {
                return Ok();
            }
            return NotFound();
        }


    }
}
