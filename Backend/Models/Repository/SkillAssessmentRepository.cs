namespace LMS.Models.Repository
{
    public class SkillAssessmentRepository
    {
        private readonly AppDbContext appDbContext;

        public SkillAssessmentRepository(AppDbContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }

        public SkillAssessment GetByEmployeeId(int empId)
        {
            return (appDbContext.SkillAssessment.FirstOrDefault(s => s.EmployeeId == empId));
        }
        public void CreateSkillAssessment(SkillAssessment skillAssessment)
        {
            appDbContext.SkillAssessment.Add(skillAssessment);
            appDbContext.SaveChanges();
        }

        public void UpdateSkillAssessment(int employeeId, SkillAssessment skillAssessment)
        {
            var existingData = GetByEmployeeId(employeeId);
            if (existingData != null) 
            { 
                existingData.EmployeeId = employeeId;
                existingData.Database = skillAssessment.Database;
                existingData.Programming = skillAssessment.Programming;
                existingData.Java = skillAssessment.Java;
                existingData.CSharp = skillAssessment.CSharp;
                existingData.Python = skillAssessment.Python;
                existingData.WebDevelopment = skillAssessment.WebDevelopment;
                existingData.VerbalCommunication = skillAssessment.VerbalCommunication;
                existingData.WrittenCommunication = skillAssessment.WrittenCommunication;
                existingData.Teamwork = skillAssessment.Teamwork;
                existingData.ProblemSolving = skillAssessment.ProblemSolving;
                existingData.DescisionMaking = skillAssessment.DescisionMaking;
                existingData.Leadership = skillAssessment.Leadership;
                existingData.Status = skillAssessment.Status;

                appDbContext.SaveChanges();
            }
        }

        public void DeleteSkillAssessment(SkillAssessment skillAssessment)
        {
            appDbContext.SkillAssessment.Remove(skillAssessment);
            appDbContext.SaveChanges();
        }

        public void UpdateSkillAssessmentStatus(int employeeId, string status)
        {
            var existingData = GetByEmployeeId(employeeId);
            if (existingData != null)
            {
                existingData.Status = status;
                appDbContext.SaveChanges();
            }
        }
    }
}
