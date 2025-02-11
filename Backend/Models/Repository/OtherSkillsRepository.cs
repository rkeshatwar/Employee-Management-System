
namespace LMS.Models.Repository
{
    public class OtherSkillsRepository
    {
        private readonly AppDbContext appDbContext;

        public OtherSkillsRepository(AppDbContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }

        public List<OtherSkills> GetOtherSkillsByEmployeeId(int empId)
        {
            return (appDbContext.OtherSkills.Where(o => o.EmployeeId == empId).ToList());
        }
    }
}
