using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LMS.Models
{
    public class SkillAssessment
    {
        [Key]
        public int Id { get; set; }
        
        [ForeignKey("EmployeeId")]
        public int EmployeeId { get; set; }
        public int Database { get; set; }
        public int Programming { get; set; }
        public int Java { get; set; }
        public int CSharp { get; set; }
        public int Python { get; set; }
        public int WebDevelopment { get; set; }
        public string? OtherSkills { get; set; }
        public int VerbalCommunication { get; set; }
        public int WrittenCommunication { get; set; }
        public int Teamwork { get; set; }
        public int ProblemSolving { get; set; }
        public int DescisionMaking { get; set; }
        public int Leadership { get; set; }
        public string? ForiegnLanguage { get; set; }
        public string Status { get; set; }
    }
}
