using Microsoft.EntityFrameworkCore;

namespace LMS.Models.Repository
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) 
        {
            
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<SkillAssessment> SkillAssessment { get; set; }
        public DbSet<OtherSkills> OtherSkills { get; set; }
        public DbSet<AnyOtherForiegnLanguage> AnyOtherForiegnLanguages { get; set; }
    }
}
